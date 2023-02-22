package controller

import (
	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

type extendedStudent struct {
	entity.Student
	Course_Name    string
	Dormitory_Name string
	Admin_Email    string
}

func CreateStudent(c *gin.Context) {

	var student entity.Student
	var course entity.Course
	var dormitory entity.Dormitory

	if err := c.ShouldBindJSON(&student); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	if tx := entity.DB().Where("course_id = ?", student.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	if tx := entity.DB().Where("dormitory_id = ?", student.Dormitory_ID).First(&dormitory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormitory not found"})
		return
	}

	new_student := entity.Student{
		Student_ID:       student.Student_ID,
		Student_Name:     student.Student_Name,
		Student_Password: student.Student_Password,
		Student_Age:      student.Student_Age,
		Datetime:         student.Datetime.Local(),
		Course_ID:        student.Course_ID,
		Dormitory_ID:     student.Dormitory_ID,
		Admin_ID:         student.Admin_ID,
	}
	if _, err := govalidator.ValidateStruct(new_student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hidePassword, err := bcrypt.GenerateFromPassword([]byte(student.Student_Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hidePassword"})
		return
	}

	// Assign hashpassword to Customers_Password (replace the un-hash)
	new_student.Student_Password = string(hidePassword)

	if err := entity.DB().Create(&new_student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": new_student})

}

// GET /user/:id

func GetStudentSearch(c *gin.Context) {

	var student []extendedStudent

	id := c.Param("student_id")

	if err := entity.DB().Raw("SELECT s.* , c.course_name , d.dormitory_name FROM students s JOIN courses c JOIN dormitories d ON s.course_id = c.course_id AND s.dormitory_id = d.dormitory_id  WHERE student_id = ?", id).Find(&student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": student})
}

func GetStudent(c *gin.Context) {

	var student extendedStudent
	student_id := c.Param("student_id")

	if err := entity.DB().Raw("SELECT s.* , c.course_name , a.admin_email, d.dormitory_name FROM students s JOIN courses c JOIN dormitories d JOIN admins a ON s.course_id = c.course_id AND s.dormitory_id = d.dormitory_id AND s.admin_id = a.admin_id WHERE student_id = ?", student_id).Find(&student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": student})

}

func ListStudentAdmin(c *gin.Context) {

	var student []extendedStudent
	id := c.Param("student_id")

	if err := entity.DB().Raw("SELECT s.*, dormitory_name ,admin_email,course_name FROM students s JOIN dormitories d JOIN admins a JOIN courses c ON s.dormitory_id = d.dormitory_id AND s.admin_id = a.admin_id AND s.course_id = c.course_id WHERE a.admin_id = ?", id).Find(&student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": student})

}

// GET /users

func ListStudents(c *gin.Context) {

	var students []extendedStudent

	if err := entity.DB().Preload("Course").Preload("Dormitory").Preload("Student").Raw("SELECT s.* , c.course_name , d.dormitory_name FROM students s JOIN courses c JOIN dormitories d ON s.course_id = c.course_id AND s.dormitory_id = d.dormitory_id").Scan(&students).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": students})

}

func DeleteStudents(c *gin.Context) {
	student_id := c.Param("student_id")

	if tx := entity.DB().Exec("DELETE FROM students WHERE student_id = ?", student_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "students not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student_id})
}

func UpdateStudents(c *gin.Context) {
	var student entity.Student
	var course entity.Course
	var dormitory entity.Dormitory

	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// var updated_Course_ID = course.Course_ID
	var updated_Student_name = student.Student_Name
	var updated_Student_password = student.Student_Password
	var updated_Student_Age = student.Student_Age
	var updated_Dormitory_name = student.Dormitory_ID
	var updated_Course_name = student.Course_ID
	var updated_Admin_name = student.Admin_ID
	var updated_Datetime = student.Datetime
	// var updated_Qualification_ID = course.Qualification_ID
	// var updated_Major_ID = course.Major_ID

	if tx := entity.DB().Where("course_id = ?", student.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	if tx := entity.DB().Where("dormitory_id = ?", student.Dormitory_ID).First(&dormitory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormitory not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", student.Student_ID).Find(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	updated_student := entity.Student{
		Student_ID:       student.Student_ID,
		Student_Name:     updated_Student_name,
		Student_Password: updated_Student_password,
		Student_Age:      updated_Student_Age,
		Datetime:         updated_Datetime.Local(),
		Course_ID:        updated_Course_name,
		Dormitory_ID:     updated_Dormitory_name,
		Admin_ID:         updated_Admin_name,
	}
	if _, err := govalidator.ValidateStruct(updated_student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(student.Student_Password[0:7] == "$2a$14$") {
		hidePassword, err := bcrypt.GenerateFromPassword([]byte(student.Student_Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hide password"})
			return

		}
		// Assign hashpassword
		updated_student.Student_Password = string(hidePassword)
	}

	if err := entity.DB().Save(&updated_student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_student})
}
