package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
)
type extendedRequest struct {
	entity.Request
	Subject_ID      string
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Request_Type_Name string
	Professor_Name string
	Unit            string
	Section 		uint

}
// POST /course
func CreateRequest(c *gin.Context) {
	var request entity.Request
	// var student entity.Student
	var student entity.Student
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
	if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
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
		Student: student,
		Subject: subject,
		Section: subject.Section,
		Reason: request.Reason,
		Request_Type_ID: request.Request_Type_ID,
	}
	if _, err := govalidator.ValidateStruct(new_request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
		query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* FROM requests r JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.id = sb.professor_id").Scan(&extendedRequest)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedRequest})
}

// Get /request
func GetRequest(c *gin.Context) {
	var request entity.Request

	id := c.Param("request_id")
	query := entity.DB().Where("request_id = ?",id).First(&request)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}
func GetRequestBySubjectID(c *gin.Context) {
	/* Query subject record by subject_id and section */
	var request []extendedRequest
	student := c.Param("student_id")
	subject := c.Param("subject_id")

	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	// if tx := entity.DB().Where("student_id = ?", student).Find(&enroll); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "enroll with this student not found"})
	// 	return
	// }
	query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* ,s.* FROM requests r JOIN students s JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.student_id = s.student_id AND r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.id = sb.professor_id WHERE sb.subject_id = ?", subject,student).Scan(&request)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
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
	var student entity.Student
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
	if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
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
		Student: student,
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
