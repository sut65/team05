package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)



// POST /adding_reducing
func CreateAdding_reducing(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	var student entity.Student
	var subject entity.Subject
	var enroll entity.Enroll
	//var adding_reducing entity.Adding_reducing

	if err := c.ShouldBindJSON(&adding_reducing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <adding_reducing.Student_ID>
	if tx := entity.DB().Where("student_id = ?", adding_reducing.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ Status ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <adding_reducing.Subject_ID>
	if tx := entity.DB().Where("subject_id = ?", adding_reducing.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity enroll ด้วย id ของenroll ที่รับเข้ามา
	// SELECT * FROM `enroll` WHERE enroll_id = <adding_reducing.enroll_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_reducing.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Enroll not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Class_schedule ด้วย id ของ Class_schedule ที่รับเข้ามา
	// SELECT * FROM `Class_schedule` WHERE Class_schedule_id = <adding_reducing.Class_schedule_ID>
	//if tx := entity.DB().Where("Class_schedule_id = ?", adding_reducing.Class_schedule_ID).First(&class_shedule); tx.RowsAffected == 0 {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": "Class_schedule not found"})
	//	return
	//}

	
	new_adding_reducing := entity.Adding_reducing{
		Change_ID:   	adding_reducing.Change_ID,
		Status: 		adding_reducing.Status,
		//Class_Schedule: Class_Schedule,
		Subject:        subject,
		Enroll:         enroll,
	}

	// บันทึก entity Adding_reducing
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_adding_reducing})
}

// GET /Adding_reducing
func ListAdding_reducing(c *gin.Context) {
	var adding_reducing []entity.Adding_reducing
	if err := entity.DB().Raw("SELECT * FROM adding_reducing").Scan(&adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": adding_reducing})
}

// DELETE /adding_reducing/:id
func DeleteAdding_reducing(c *gin.Context) {

	id := c.Param("Change_ID")

	if tx := entity.DB().Exec("DELETE FROM adding_reducing WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /adding_reducing
func UpdateAdding_reducing(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	if err := c.ShouldBindJSON(&adding_reducing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", adding_reducing.ID).First(&adding_reducing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": adding_reducing})

}
