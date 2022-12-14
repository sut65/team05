package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

type extendedSubject struct {
	entity.Subject
	Course_Name    string
	Professor_Name string
}

// POST /subjects
func CreateSubject(c *gin.Context) {
	var professor entity.Professor
	var course entity.Course
	var subject_status entity.Subject_Status
	var subject_category entity.Subject_Category
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

	// Communication Diagram Step
	// ค้นหา entity Professor ด้วย id ของ Professor ที่รับเข้ามา
	// SELECT * FROM `professors` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("subject_category_id = ?", subject.Subject_Category_ID).First(&subject_category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject category not found"})
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
		ID:               subject.ID,
		Subject_ID:       subject.Subject_ID,
		Course:           course,
		Subject_Status:   subject_status,
		Class_Type:       class_type,
		Professor:        professor,
		Subject_Category: subject_category,
		Subject_TH_Name:  subject.Subject_TH_Name,
		Subject_EN_Name:  subject.Subject_EN_Name,
		Capacity:         subject.Capacity,
		Enroll:           subject.Enroll,
		Reserved:         subject.Reserved,
		Reserved_Enroll:  subject.Reserved,
		Unit:             subject.Unit,
		Section:          subject.Section,
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_subject})
}

// GET /subjects
func ListSubjects(c *gin.Context) {

	var extendedSubjects []extendedSubject

	// ======================== Normal select ========================
	// var subjects []entity.Subject
	// if err := entity.DB().Raw("SELECT * FROM subjects").Scan(&subjects).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// ======================== Join select ========================
	// Subject Join with Courses and with Professors
	/*
		SELECT s.*, c.Course_Name, p.professor_name
		FROM `subjects` s
		JOIN `courses` c
		JOIN `professors` p
		ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id;
	*/
	query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name FROM subjects s JOIN courses c JOIN professors p ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id").Scan(&extendedSubjects)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})

}

// GET /subject/:subject_id
func GetSubject(c *gin.Context) {
	/* Query subject record(s) by subject_id */

	var subject []entity.Subject
	subject_id := c.Param("subject_id")
	if tx := entity.DB().Where("subject_id = ?", subject_id).Find(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// Maybe
// GET /subject/:subject_id/:section
func GetSubjectBySection(c *gin.Context) {
	/* Query subject record by subject_id and section */

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
	var subject entity.Subject
	if tx := entity.DB().Last(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// ################################################################################################
// PATCH /subjects
func UpdateSubjects(c *gin.Context) {
	var subject entity.Subject
	var course entity.Course
	var subject_status entity.Subject_Status
	var subject_category entity.Subject_Category
	var class_type entity.Class_Type
	var professor entity.Professor
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var updated_th_name = subject.Subject_TH_Name
	var updated_en_name = subject.Subject_EN_Name
	var updated_capacity = subject.Capacity
	var updated_enroll = subject.Enroll
	var updated_reserved = subject.Reserved
	var updated_reserved_enroll = subject.Reserved_Enroll
	var updated_unit = subject.Unit

	if tx := entity.DB().Where("course_id = ?", subject.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	if tx := entity.DB().Where("subject_status_id = ?", subject.Subject_Status_ID).First(&subject_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject status not found"})
		return
	}

	if tx := entity.DB().Where("class_type_id = ?", subject.Class_Type_ID).First(&class_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class type not found"})
		return
	}

	if tx := entity.DB().Where("professor_id = ?", subject.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	if tx := entity.DB().Where("subject_category_id = ?", subject.Subject_Category_ID).First(&subject_category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject category not found"})
		return
	}

	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject.Subject_ID, subject.Section).Find(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	updated_subject := entity.Subject{
		ID:               subject.ID,
		Subject_ID:       subject.Subject_ID,
		Course:           course,
		Subject_Status:   subject_status,
		Class_Type:       class_type,
		Professor:        professor,
		Subject_Category: subject_category,
		Subject_TH_Name:  updated_th_name,
		Subject_EN_Name:  updated_en_name,
		Capacity:         updated_capacity,
		Enroll:           updated_enroll,
		Reserved:         updated_reserved,
		Reserved_Enroll:  updated_reserved_enroll,
		Unit:             updated_unit,
		Section:          subject.Section,
	}

	if err := entity.DB().Save(&updated_subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject})
}

//################################################################################################

// DELETE /subject/:subject_id/:section
func DeleteSubject(c *gin.Context) {
	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Exec("DELETE FROM subjects WHERE subject_id = ? AND section = ?", subject_id, section); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject_id})
}

// //------------------------------------------------------------------------------------
// GET /class_types
func ListClassType(c *gin.Context) {
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
	var subject_statuses []entity.Subject_Status
	if err := entity.DB().Raw("SELECT * FROM subject_statuses").Scan(&subject_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject_statuses})

}
