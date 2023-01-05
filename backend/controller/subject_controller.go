package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func CreateSubject(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for inserting new record of `subject` table
		HTTP POST : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/
	var professor entity.Professor
	var course entity.Course
	var subject_status entity.Subject_Status
	var class_type entity.Class_Type
	var subject entity.Subject

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

	// Communication Diagram Step
	// ค้นหา entity Status ด้วย id ของ Status ที่รับเข้ามา
	// SELECT * FROM `subject_statuses` WHERE status_id = <subject.Subject_Status_ID>
	if tx := entity.DB().Where("subject_status_id = ?", subject.Subject_Status_ID).First(&subject_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Class_Type ด้วย id ของ Class_Type ที่รับเข้ามา
	// SELECT * FROM `class_types` WHERE class_type_id = <subject.Class_Type_ID>
	if tx := entity.DB().Where("class_type_id = ?", subject.Class_Type_ID).First(&class_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Professor ด้วย id ของ Professor ที่รับเข้ามา
	// SELECT * FROM `professors` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("professor_id = ?", subject.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
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
	new_subject := entity.Subject{
		// ID:              subject.ID,
		Model:           gorm.Model{ID: subject.ID},
		Subject_ID:      subject.Subject_ID,
		Course:          course,
		Subject_Status:  subject_status,
		Class_Type:      class_type,
		Professor:       professor,
		Subject_TH_Name: subject.Subject_TH_Name,
		Subject_EN_Name: subject.Subject_EN_Name,
		Capacity:        subject.Capacity,
		Enroll:          subject.Enroll,
		Reserved:        subject.Reserved,
		Reserved_Enroll: subject.Reserved,
		Unit:            subject.Unit,
		Section:         subject.Section,
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_subject})
}

func ListSubjects(c *gin.Context) {
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
func GetSubject(c *gin.Context) {
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

// GET /subject/:subject_id/:section
func GetSubjectBySection(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting record(s) from `subject` table filtered by `subject_id` and `section`.
		HTTP GET : /subject/:subject_id/:section
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var subject entity.Subject
	subject_id := c.Param("subject_id")
	section := c.Param("section")

	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject_id, section).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

func GetPreviousSubject(c *gin.Context) {
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
func UpdateSubjects(c *gin.Context) {
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
func DeleteSubject(c *gin.Context) {
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

// //---------------------------------------------------------------------------------------------
// GET /class_types
func ListClassType(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for listing all records from `class_type` table.
		HTTP GET : /class_types
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/
	var class_types []entity.Class_Type
	if err := entity.DB().Raw("SELECT * FROM class_types").Scan(&class_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_types})

}

// //------------------------------------------------------------------------------------
// GET /subject_statuses
func ListSubjectStatus(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for listing all records from `subject_statuses` table.
		HTTP GET : /subject_statuses
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/
	var subject_statuses []entity.Subject_Status
	if err := entity.DB().Raw("SELECT * FROM subject_statuses").Scan(&subject_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject_statuses})

}

// //------------------------------------------------------------------------------------
// GET /subject_categories
func ListSubjectCategory(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for listing all records from `subject_categories` table.
		HTTP GET : /subject_categories
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/
	var subject_categories []entity.Subject_Category
	if err := entity.DB().Raw("SELECT * FROM subject_categories").Scan(&subject_categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject_categories})

}
