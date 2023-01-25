package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

func CreateEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for inserting new record of `subject` table
		HTTP POST : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/
	//var student entity.Student
	//var student entit.Student
	var enroll entity.Enroll
	var subject entity.Subject

	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

	var student entity.Student
	//var room entity.room

	if err := c.ShouldBindJSON(&enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("subject_id = ?", enroll.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", enroll.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", enroll.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	new_enroll := entity.Enroll{
		Enroll_ID:      enroll.Enroll_ID,
		Subject:        subject,
		Class_Schedule: class_schedule,
		Exam_Schedule:  exam_schedule,
		Student:        student,
		Section:        enroll.Section,
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_enroll})
}

func ListEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for list all records from `subject` table.
		HTTP GET : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var enroll []entity.Enroll

	// ======================== Normal select ========================
	if err := entity.DB().Raw("SELECT * FROM enrolls").Scan(&enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})

}

// GET /subject/:subject_id
func GetEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting record(s) from `subject` table filtered by `subject_id`.
		HTTP GET : /subject/:subject_id
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var enroll entity.Enroll
	enroll_id := c.Param("enroll_id")
	if tx := entity.DB().Where("enroll_id = ?", enroll_id).Select(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

func GetPreviousEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting last record from `subject` table.
		HTTP GET : /last_subject
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var enroll entity.Enroll
	if tx := entity.DB().Last(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

// PATCH /subjects
func UpdateEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for updating current record from `subject` table.
		HTTP PATCH : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var enroll entity.Enroll
	if err := c.ShouldBindJSON(&enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("enroll_id = ? AND student_id = ?", enroll.Enroll_ID, enroll.Student).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	if err := entity.DB().Save(&enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

// DELETE /subject/:subject_id/:section
func DeleteEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for deleting record from `subject` table filtered by `subject_id` and `section`.
		HTTP DELETE : /subject/:subject_id/:section
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	enroll_id := c.Param("enroll_id")
	student := c.Param("student_id")

	if tx := entity.DB().Exec("DELETE FROM enroll WHERE enroll_id = ? AND student = ?", enroll_id, student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enroll_id})
}
