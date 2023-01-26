package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)
type extendedRequest struct {
	entity.Request
	Subject_ID      string
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Request_Type_Name string
	Unit            string
	Section 		uint

}
// POST /course
func CreateRequest(c *gin.Context) {
	var request entity.Request
	// var student entity.Student
	var professor entity.Professor
	var subject entity.Subject
	var request_type entity.Request_Type

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	// if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
	// 	return
	// }
	if tx := entity.DB().Where("id = ?", request.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("subject_id = ?", request.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("request_type_id = ?", request.Request_Type_ID).First(&request_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	new_request := entity.Request{
		Request_ID:   request.Request_ID,
		// Student: student,
		Professor: professor,
		Subject: subject,
		Section: subject.Section,
		Reason: request.Reason,
		Request_Type_ID: request.Request_Type_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": new_request})
}

// List /request
func ListRequest(c *gin.Context) {
	var extendedRequest []extendedRequest
	// if err := entity.DB().Raw("SELECT e.*, c.* FROM requests e JOIN subjects c ON e.subject_id = c.subject_id  AND  e.section = c.section").Scan(&request).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
		query := entity.DB().Raw("SELECT e.*, c.*, r.* FROM requests e JOIN subjects c JOIN request_types r ON e.subject_id = c.subject_id  AND  e.section = c.section  AND  e.request_type_id = r.request_type_id").Scan(&extendedRequest)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedRequest})
}

// Get /request
func GetRequest(c *gin.Context) {
	var extendedRequest []extendedRequest

	id := c.Param("request_id")
	query := entity.DB().Raw("SELECT e.*, c.*, r.* FROM requests e JOIN subjects c JOIN request_types r ON e.subject_id = c.subject_id  AND  e.section = c.section  AND  e.request_type_id = r.request_type_id",id).Scan(&extendedRequest)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedRequest})
}

// DELETE /request
func DeleteRequest(c *gin.Context) {
	id := c.Param("request_id")

	if tx := entity.DB().Exec("DELETE FROM requests WHERE request_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func UpdateRequest(c *gin.Context) {
	var request entity.Request
	// var student entity.Student
	var professor entity.Professor
	var subject entity.Subject
	var request_type entity.Request_Type

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var update_reason = request.Reason
	var update_section = request.Section

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	// if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
	// 	return
	// }
	if tx := entity.DB().Where("id = ?", request.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("subject_id = ?", request.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("request_type_id = ?", request.Request_Type_ID).First(&request_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	update_request := entity.Request{
		Request_ID:   request.Request_ID,
		// Student: student,
		Professor: professor,
		Subject: subject,
		Section: update_section,
		Reason: update_reason,
		Request_Type_ID: request.Request_Type_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Save(&update_request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_request})
}

// 6: สร้างเลขที่รายการใหม่โดยอัตโนมัติ()	//* จะสร้างบน frontend
// GET /previous_activitymember
func GetPreviousRequest(c *gin.Context) {
	var request entity.Request
	if err := entity.DB().Last(&request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}
