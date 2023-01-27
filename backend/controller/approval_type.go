package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

type extendedApproval struct {
	entity.Approval
	Request_ID         string
	Subject_ID         string
	Course_Name        string
	Subject_TH_Name    string
	Subject_EN_Name    string
	Approval_Type_Name string
	Professor_Name     string
	Unit               string
	Section            uint
}

// POST /course
func CreateApproval(c *gin.Context) {
	var approval entity.Approval
	var professor entity.Professor
	var request entity.Request
	var approval_type entity.Approval_Type

	if err := c.ShouldBindJSON(&approval); err != nil {
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
	if tx := entity.DB().Where("id = ?", approval.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("request_id = ?", approval.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("approval_type_id = ?", approval.Approval_Type_ID).First(&approval_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approval_type not found"})
		return
	}

	new_approval := entity.Approval{
		Approval_ID:      approval.Approval_ID,
		Professor:        professor,
		Section:          approval.Section,
		Reason:           approval.Reason,
		Approval_Type_ID: approval.Approval_Type_ID,
		Request_ID:       approval.Request_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_approval).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": new_approval})
}

// List /request
func ListApproval(c *gin.Context) {
	var extendedApproval []extendedApproval
	// if err := entity.DB().Raw("SELECT e.*, c.* FROM requests e JOIN subjects c ON e.subject_id = c.subject_id  AND  e.section = c.section").Scan(&request).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s ON a.request_id = r.request_id AND  r.subject_id = s.subject_id AND   s.section = r.section AND   a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND p.id = s.professor_id").Scan(&extendedApproval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedApproval})
}

// Get /request
func GetApproval(c *gin.Context) {
	var approval entity.Approval

	id := c.Param("approval_id")
	query := entity.DB().Where("approval_id = ?", id).First(&approval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": approval})
}

// DELETE /request
func DeleteApproval(c *gin.Context) {
	id := c.Param("approval_id")

	if tx := entity.DB().Exec("DELETE FROM approvals WHERE approval_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approval id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// // PATCH /professors
// func UpdateApproval(c *gin.Context) {
// 	var approval entity.Approval
// 	var professor entity.Professor
// 	var request entity.Request
// 	var approval_type entity.Approval_Type

// 	if err := c.ShouldBindJSON(&approval); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	var update_reason = approval.Reason
// 	var update_section = approval.Section
// 	// Communication Diagram Step
// 	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
// 	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
// 	// if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
// 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
// 	// 	return
// 	// }
// 	if tx := entity.DB().Where("id = ?", approval.Professor_ID).First(&professor); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
// 		return
// 	}

// 	// Communication Diagram Step
// 	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
// 	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
// 	if tx := entity.DB().Where("request_id = ?", approval.Request_ID).First(&request); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
// 		return
// 	}

// 	// Communication Diagram Step
// 	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
// 	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
// 	if tx := entity.DB().Where("approval_type_id = ?", approval.Approval_Type_ID).First(&approval_type); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "approval_type not found"})
// 		return
// 	}

// 	update_approval := entity.Approval{
// 		Approval_ID:   approval.Approval_ID,
// 		Professor:     professor,
// 		Section:       update_section,
// 		Reason:        update_reason,
// 		Approval_Type_ID: approval.Approval_Type_ID,
// 		Request:       request,
// 	}

// 	// บันทึก entity request
// 	if err := entity.DB().Save(&update_approval).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": update_approval})
// }

func UpdateApproval(c *gin.Context) {
	var approval entity.Approval
	// var student entity.Student
	var professor entity.Professor
	var request entity.Request
	var approval_type entity.Approval_Type

	if err := c.ShouldBindJSON(&approval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var update_reason = approval.Reason
	var update_section = approval.Section

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	// if tx := entity.DB().Where("student_id = ?", request.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
	// 	return
	// }
	if tx := entity.DB().Where("id = ?", approval.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("request_id = ?", approval.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("approval_type_id = ?", approval.Approval_Type_ID).First(&approval_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approval type not found"})
		return
	}

	update_approval := entity.Approval{
		Approval_ID:   approval.Approval_ID,
		Reason: update_reason,
		Professor: professor,
		Section: update_section,
		Request: request,
		Approval_Type_ID: approval.Approval_Type_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Where("approval_id = ?",approval.Approval_ID).Updates(&update_approval).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_approval})
}


// 6: สร้างเลขที่รายการใหม่โดยอัตโนมัติ()	//* จะสร้างบน frontend
// GET /previous_activitymember
func GetPreviousApproval(c *gin.Context) {
	var approval entity.Approval
	if err := entity.DB().Last(&approval).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": approval})
}
