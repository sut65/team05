package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// POST /course
func CreateRequest(c *gin.Context) {
	var request entity.Request
	var student entity.Student
	var subject entity.Subject
	var request_type entity.Request_Type

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request ด้วย id ของ request ที่รับเข้ามา
	// SELECT * FROM requests` WHERE request_id = <request.Request_ID>
	if tx := entity.DB().Where("request_id = ?", request.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	if tx := entity.DB().Where("student_id = ?", student.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("subject_id = ?", subject.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("request_type_id = ?", request_type.Request_Type_ID).First(&request_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	new_request := entity.Request{
		Request_ID:   request.Request_ID,
		Request_Type: request.Request_Type,

		Student: student,
		Subject: subject,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_request})
}

// List /request
func ListRequest(c *gin.Context) {
	var request []entity.Request
	if err := entity.DB().Raw("SELECT * FROM requests").Scan(&request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}

// Get /request
func GetRequest(c *gin.Context) {
	var request entity.Request
	id := c.Param("request_id")
	if err := entity.DB().Raw("SELECT * FROM requests WHERE request_id = ?", id).Scan(&request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}

// // DELETE /request
// func DeleteRequest(c *gin.Context) {

// 	id := c.Param("Request_ID")

// 	if tx := entity.DB().Exec("DELETE FROM request WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// PATCH /professors
func UpdateRequest(c *gin.Context) {
	var request entity.Request
	var request_type entity.Request_Type
	var subject entity.Subject
	var student entity.Student

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}
	if tx := entity.DB().Where("subject_id = ?", request.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}
	if tx := entity.DB().Where("subject_id = ? AND section = ?", request.Subject_ID, subject.Section).Find(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	if tx := entity.DB().Where("request_type_id = ?", request.Request_Type_ID).First(&request_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

		updated_request := entity.Request{
		Request_ID:   request.Request_ID,
		Request_Type: request.Request_Type,

		Student: student,
		Subject: subject,
	}

	
	if err := entity.DB().Save(&updated_request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})

}
