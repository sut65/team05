package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
)

type extendedApproval struct {
	entity.Approval
	Request_ID         string
	Student_ID         string
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
	if tx := entity.DB().Where("professor_id = ?", approval.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	if tx := entity.DB().Where("request_id = ?", approval.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

	// Communication Diagram Step
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

	if _, err := govalidator.ValidateStruct(new_approval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_approval).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": new_approval})
}

// List /approval
func ListApprovalProfessor(c *gin.Context) {
	var extendedApproval []extendedApproval
	id := c.Param("approval_id")
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND   a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id WHERE p.professor_id = ?",id).Find(&extendedApproval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedApproval})
}

func ListApprovalStudent(c *gin.Context) {
	var extendedApproval []extendedApproval
	id := c.Param("student_id")
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id WHERE sd.student_id = ?",id).Find(&extendedApproval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedApproval})
}

func ListApproval(c *gin.Context) {
	var extendedApproval []extendedApproval
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND   a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id").Scan(&extendedApproval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedApproval})
}

func ListApprovalForUpdate(c *gin.Context) {
	var extendedApproval []extendedApproval
	id := c.Param("approval_id")
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND   a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id WHERE a.approval_id = ?",id).Scan(&extendedApproval)
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

func UpdateApproval(c *gin.Context) {
	var approval entity.Approval
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
	if tx := entity.DB().Where("professor_id = ?", approval.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	if tx := entity.DB().Where("request_id = ?", approval.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

	// Communication Diagram Step
	if tx := entity.DB().Where("approval_type_id = ?", approval.Approval_Type_ID).First(&approval_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approval type not found"})
		return
	}

	update_approval := entity.Approval{
		Approval_ID:      approval.Approval_ID,
		Reason:           update_reason,
		Professor:        professor,
		Section:          update_section,
		Request:          request,
		Approval_Type_ID: approval.Approval_Type_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Where("approval_id = ?", approval.Approval_ID).Updates(&update_approval).Error; err != nil {
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
