package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// POST /course
func CreateAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	var enroll entity.Enroll
	var professor entity.Professor
	var grade entity.Grade

	if err := c.ShouldBindJSON(&adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request ด้วย id ของ request ที่รับเข้ามา
	// SELECT * FROM requests` WHERE request_id = <request.Request_ID>
	if tx := entity.DB().Where("adding_point_id = ?", adding_point.Adding_point_ID).First(&adding_point); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_point.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("professor_id = ?", adding_point.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("grade_id = ?", adding_point.Grade_ID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	new_adding_point := entity.Adding_point{
		Adding_point_ID:  adding_point.Adding_point_ID,
		Enroll: enroll,
		Grade: adding_point.Grade,
		Professor: professor,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_adding_point})
}

// List /request
func ListAdding_point(c *gin.Context) {
	var adding_point []entity.Adding_point
	if err := entity.DB().Raw("SELECT * FROM adding_points").Scan(&adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": adding_point})
}

// Get /request
func GetAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	id := c.Param("adding_point_id")
	if err := entity.DB().Raw("SELECT * FROM adding_points WHERE adding_point_id = ?", id).Scan(&adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": adding_point})
}

// // DELETE /request
func DeleteAdding_point(c *gin.Context) {

	id := c.Param("Adding_point_ID")

	if tx := entity.DB().Exec("DELETE FROM adding_point WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func UpdateAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	var enroll entity.Enroll
	var professor entity.Professor
	var grade entity.Grade

	if err := c.ShouldBindJSON(&adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("enroll_id = ?", adding_point.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}
	if tx := entity.DB().Where("professor_id = ?", adding_point.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}
	// if tx := entity.DB().Where("subject_id = ? AND section = ?", request.Subject_ID, subject.Section).Find(&subject); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
	// 	return
	// }
	if tx := entity.DB().Where("grade_id = ?", adding_point.Grade_ID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade type not found"})
		return
	}

		updated_adding_point := entity.Adding_point{
		Adding_point_ID:  adding_point.Adding_point_ID,
		Grade: adding_point.Grade,
		Enroll: enroll,
		Professor: professor,
		
	}

	
	if err := entity.DB().Save(&updated_adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updated_adding_point})

}
func GetPreviousAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	if err := entity.DB().Last(&adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": adding_point})
}


func GetStudenByEnroll(c *gin.Context) {
	var  enroll []entity.Enroll
	section := c.Param("section")
	subject_id := c.Param("subject_id")
	if err := entity.DB().Raw("SELECT enrolls.student_id FROM enrolls WHERE subject_id = ? AND section = ?", subject_id,section).Find(&enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})
}


// func getSubjectByProfessor(c *gin.Context) {
// 	var  subject []entity.Subject
// 	id := c.Param("course_id")
	
// 	if err := entity.DB().Raw(" SELECT Subjects.professor_id FROM  subjects WHERE subject_id = ?", id).Find(&subject).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": subject})
// }