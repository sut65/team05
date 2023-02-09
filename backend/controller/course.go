package controller

import (
	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /users

type extendedCourse struct {
	entity.Course
	Qualification_Name string
	Major_Name         string
	Admin_Email        string
}

func CreateCourse(c *gin.Context) {

	var course entity.Course
	var qualification entity.Qualification
	var major entity.Major

	if err := c.ShouldBindJSON(&course); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	if tx := entity.DB().Where("qualification_id = ?", course.Qualification_ID).First(&qualification); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "qualification not found"})
		return
	}
	if tx := entity.DB().Where("major_id = ?", course.Major_ID).First(&major); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "major not found"})
		return
	}

	new_course := entity.Course{
		Course_ID:        course.Course_ID,
		Course_Name:      course.Course_Name,
		Datetime:         course.Datetime.Local(),
		Major_ID:         course.Major_ID,
		Qualification_ID: course.Qualification_ID,
		Admin_ID:         course.Admin_ID,
	}
	if _, err := govalidator.ValidateStruct(new_course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&new_course).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": new_course})

}

// GET /user/:id

func GetCourseSearch(c *gin.Context) {

	var course []extendedCourse

	id := c.Param("course_id")

	if err := entity.DB().Raw("SELECT c.*, m.major_name,qualification_name FROM courses c JOIN majors m JOIN qualifications q ON c.major_id = m.major_id AND c.qualification_id = q.qualification_id WHERE course_id = ?", id).Find(&course).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": course})

}

func GetCourse(c *gin.Context) {

	var course extendedCourse

	id := c.Param("course_id")

	if err := entity.DB().Raw("SELECT c.*, m.major_name,qualification_name ,admin_email FROM courses c JOIN majors m JOIN qualifications q JOIN admins a ON c.major_id = m.major_id AND c.qualification_id = q.qualification_id AND c.admin_id = a.admin_id WHERE course_id = ?", id).Find(&course).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": course})

}
func ListCoursesAdmin(c *gin.Context) {

	var courses []extendedCourse
	id := c.Param("course_id")

	if err := entity.DB().Raw("SELECT c.*, m.major_name,qualification_name ,admin_email FROM courses c JOIN majors m JOIN qualifications q JOIN admins a ON c.major_id = m.major_id AND c.qualification_id = q.qualification_id AND c.admin_id = a.admin_id WHERE a.admin_id = ?", id).Find(&courses).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": courses})

}

// GET /users

func ListCourses(c *gin.Context) {

	var courses []extendedCourse

	if err := entity.DB().Preload("Qualification").Preload("Major").Preload("Course").Raw("SELECT c.* , q.qualification_name , m.major_name FROM qualifications q JOIN courses c JOIN majors m ON q.qualification_ID = c.qualification_ID AND m.major_ID = c.major_ID").Scan(&courses).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": courses})

}

func DeleteCourse(c *gin.Context) {
	course_id := c.Param("course_id")

	if tx := entity.DB().Exec("DELETE FROM courses WHERE course_id = ?", course_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course_id})
}

func UpdateCourses(c *gin.Context) {
	var course entity.Course
	var qualification entity.Qualification
	var major entity.Major

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// var updated_Course_ID = course.Course_ID
	var updated_Course_name = course.Course_Name
	var updated_Qualification_name = course.Qualification_ID
	var updated_Major_name = course.Major_ID
	var updated_Admin_name = course.Admin_ID
	var updated_Datetime = course.Datetime
	// var updated_Qualification_ID = course.Qualification_ID
	// var updated_Major_ID = course.Major_ID

	if tx := entity.DB().Where("qualification_id = ?", course.Qualification_ID).First(&qualification); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "qualification not found"})
		return
	}
	if tx := entity.DB().Where("major_id = ?", course.Major_ID).First(&major); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "major not found"})
		return
	}

	if tx := entity.DB().Where("course_id = ?", course.Course_ID).Find(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	updated_course := entity.Course{
		Course_ID:        course.Course_ID,
		Course_Name:      updated_Course_name,
		Datetime:         updated_Datetime.Local(),
		Qualification_ID: updated_Qualification_name,
		Major_ID:         updated_Major_name,
		Admin_ID:         updated_Admin_name,
	}
	if _, err := govalidator.ValidateStruct(updated_course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&updated_course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_course})
}
