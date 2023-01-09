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
	var course entity.Course
	var subject entity.Subject
	//var room entity.room

	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Course ด้วย id ของ Course ที่รับเข้ามา
	// SELECT * FROM `courses` WHERE course_id = <subject.Course_ID>
	if tx := entity.DB().Where("course_id = ?", subject.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	/*	Communication Diagram Step

		สร้างข้อมูล entity Subject โดย
		- โยง entity Course
		- โยง entity Status
		- โยง entity Class_Type
		- โยง entity Professor // ไปแก้ในรายงานด้วยนะ
		- เซ็ตจำนวนคนที่เปิดรับ
		- เซ็ตจำนวนคนที่นั่งสำรอง
		- เซ็ตจำนวนหน่วยกิจ
		- และเซ็ตกลุ่มเรียน
	*/
	new_enroll := entity.Enroll{
		// ID:              subject.ID,
		//Student_ID:
		Course_ID:  &course.Course_ID,
		Subject_ID: &subject.Subject_ID,
		//Room_Number: schedule.Room_Number,
		Unit:    subject.Unit,
		Section: subject.Section,
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

	var subjects []entity.Subject

	// ======================== Normal select ========================
	if err := entity.DB().Raw("SELECT * FROM subjects").Scan(&subjects).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subjects})

}

// GET /subject/:subject_id
func GetEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting record(s) from `subject` table filtered by `subject_id`.
		HTTP GET : /subject/:subject_id
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var subject entity.Subject
	subject_id := c.Param("subject_id")
	if tx := entity.DB().Where("subject_id = ?", subject_id).Select(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subjects not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

func GetPreviousEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting last record from `subject` table.
		HTTP GET : /last_subject
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var subject entity.Subject
	if tx := entity.DB().Last(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// PATCH /subjects
func UpdateEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for updating current record from `subject` table.
		HTTP PATCH : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var subject entity.Subject
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject.Subject_ID, subject.Section).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	if err := entity.DB().Save(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// DELETE /subject/:subject_id/:section
func DeleteEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for deleting record from `subject` table filtered by `subject_id` and `section`.
		HTTP DELETE : /subject/:subject_id/:section
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Exec("DELETE FROM subjects WHERE subject_id = ? AND section = ?", subject_id, section); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject_id})
}
