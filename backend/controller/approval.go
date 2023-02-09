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

type createaddingandapproval struct {
	Change_ID         uint
	History_Type_ID   string
	Subject_ID        string
	Enroll_ID         string
	Student_ID        string
	Exam_Schedule_ID  string
	Class_Schedule_ID string
	Section           uint
	Request_ID         uint
	Course_Name        string
	Subject_TH_Name    string
	Subject_EN_Name    string
	Approval_ID uint
	Approval_Type_ID string
	Professor_ID     string
	Reason 				string
	Unit               string
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

func CreateApprovalAdding_reducing(c *gin.Context) {
	var receive_adding createaddingandapproval
	var student entity.Student
	var subject entity.Subject
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule
	var historyType entity.HistoryType
	
	//var approval entity.Approval
	var professor entity.Professor
	var request entity.Request
	var approval_type entity.Approval_Type

	if err := c.ShouldBindJSON(&receive_adding); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// fmt.Println(receive_enroll)

	if tx := entity.DB().Where("subject_id = ?", receive_adding.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject_id not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", receive_adding.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", receive_adding.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", receive_adding.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("history_type_id = ?", receive_adding.History_Type_ID).First(&historyType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "historytype not found"})
		return
	}

	// Communication Diagram Step
	if tx := entity.DB().Where("professor_id = ?", receive_adding.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

		// Communication Diagram Step
	if tx := entity.DB().Where("request_id = ?", receive_adding.Request_ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request type not found"})
		return
	}

	// Communication Diagram Step
	if tx := entity.DB().Where("approval_type_id = ?", receive_adding.Approval_Type_ID).First(&approval_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "approval_type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	// if tx := entity.DB().Where("enroll_id = ?", adding_reducing.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
	// 	return
	// }

	new_enroll := entity.Enroll{
		Enroll_ID:         receive_adding.Enroll_ID,
		Student:           student,
		Subject:           subject,
		Exam_Schedule:     exam_schedule,
		Class_Schedule_ID: &class_schedule.Class_Schedule_ID,
		Section:           receive_adding.Section,
	}

	new_adding_reducing := entity.Adding_reducing{
		Change_ID:       receive_adding.Change_ID,
		Student:         student,
		History_Type_ID: &receive_adding.History_Type_ID,
		Enroll_ID:       &receive_adding.Enroll_ID,
	}

	new_approval := entity.Approval{
		Approval_ID:      receive_adding.Approval_ID,
		Professor:        professor,
		Section:          receive_adding.Section,
		Reason:           receive_adding.Reason,
		Approval_Type_ID: &receive_adding.Approval_Type_ID,
		Request_ID:       &receive_adding.Request_ID,
	}
	if _, err := govalidator.ValidateStruct(new_approval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// approval
	if err := entity.DB().Create(&new_approval).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := entity.DB().Create(&new_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// adding reducing

	//สร้างตารางadding
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_enroll}) //ขึ้นสเตตัสว่าสร้างenrollเรียบร้อย
}

// List /approval
func ListApprovalProfessor(c *gin.Context) {
	var extendedApproval []extendedApproval
	id := c.Param("approval_id")
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND   a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id WHERE p.professor_id = ? GROUP BY a.approval_id",id).Find(&extendedApproval)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedApproval})
}

func ListApprovalStudent(c *gin.Context) {
	var extendedApproval []extendedApproval
	id := c.Param("student_id")
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,p.*,sd.* FROM approvals a JOIN requests r JOIN approval_types at JOIN courses c JOIN professors p JOIN subjects s JOIN students sd ON a.request_id = r.request_id AND  sd.student_id = r.student_id AND  r.subject_id = s.subject_id AND  r.subject_id = s.subject_id AND s.section = r.section AND a.approval_type_id = at.approval_type_id AND s.course_id = c.course_id AND s.professor_id = p.id WHERE sd.student_id = ? GROUP BY a.approval_id",id).Find(&extendedApproval)
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
