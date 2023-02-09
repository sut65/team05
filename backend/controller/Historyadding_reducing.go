package controller

import (
	"fmt"
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// แสดงค่าที่frontend
type extendedAdding_reducing struct {
	entity.Adding_reducing
	Change_ID       string
	HistoryType_ID  string
	Type_Name       string
	Subject_EN_Name string
	Subject_ID      string
}

// รับค่าจากsubmit
type createaddingandenroll struct {
	Change_ID         uint
	History_Type_ID   string
	Subject_ID        string
	Enroll_ID         string
	Student_ID        string
	Exam_Schedule_ID  string
	Class_Schedule_ID string
	Section           uint
}

// รับค่าจากsubmitUpdate
type Updateaddingandenroll struct {
	Change_ID         uint
	History_Type_ID   *string
	Subject_ID        *string
	Enroll_ID         string
	Student_ID        *string
	Exam_Schedule_ID  *string
	Class_Schedule_ID *string
	Section           uint
}

// รับค่ามาเพื่อสร้างตาราง
// POST /course
func CreateAdding_reducing(c *gin.Context) {
	var receive_enroll createaddingandenroll
	var student entity.Student
	var subject entity.Subject
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule
	var historyType entity.HistoryType

	if err := c.ShouldBindJSON(&receive_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// fmt.Println(receive_enroll)

	if tx := entity.DB().Where("subject_id = ?", receive_enroll.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject_id not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", receive_enroll.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", receive_enroll.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", receive_enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("history_type_id = ?", receive_enroll.History_Type_ID).First(&historyType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "historytype not found"})
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
		Enroll_ID:         receive_enroll.Enroll_ID,
		Student:           student,
		Subject:           subject,
		Exam_Schedule:     exam_schedule,
		Class_Schedule_ID: &class_schedule.Class_Schedule_ID,
		Section:           receive_enroll.Section,
	}

	new_adding_reducing := entity.Adding_reducing{
		Change_ID:       receive_enroll.Change_ID,
		Student:         student,
		History_Type_ID: &receive_enroll.History_Type_ID,
		Enroll_ID:       &receive_enroll.Enroll_ID,
	}

	entity.DB().Create(&new_enroll) //สร้างตารางenroll

	//สร้างตารางadding
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_enroll}) //ขึ้นสเตตัสว่าสร้างenrollเรียบร้อย

	// if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"data": new_adding_reducing})
}

//

// List /adding_reducing
func ListAdding_reducing(c *gin.Context) {
	var extendedAdding_reducing []extendedAdding_reducing
	id := c.Param("student_id")
	// if err := entity.DB().Raw("SELECT e.*, c.* FROM requests e JOIN subjects c ON e.subject_id = c.subject_id  AND  e.section = c.section").Scan(&request).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	//เป้นฟังก์ชั่นที่เรียกใช้ค่าในหน้าadding.tsx จากในdatabase
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,sd.*,e.* FROM adding_reducings a JOIN enrolls e JOIN history_types at JOIN courses c JOIN students sd JOIN subjects s ON a.enroll_id = e.enroll_id AND  e.subject_id = s.subject_id AND   s.section = e.section AND   a.history_type_id = at.history_type_id AND s.course_id = c.course_id AND sd.student_id = e.student_id  WHERE e.student_id = ?",id).Scan(&extendedAdding_reducing)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_reducing})
}

// 6: สร้างเลขที่รายการใหม่โดยอัตโนมัติ()	//* จะสร้างบน frontend
// GET /previous_activitymember
func GetPreviousAdding_reducing(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	if err := entity.DB().Last(&adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": adding_reducing})
}

// /ฟังชั่นสร้าง addingตารางเดียว
func CreateAdding_reducingonly(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	var enroll entity.Enroll
	var historytypes entity.HistoryType
	var student entity.Student

	if err := c.ShouldBindJSON(&adding_reducing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request ด้วย id ของ request ที่รับเข้ามา
	// SELECT * FROM requests` WHERE request_id = <request.Request_ID>
	// if tx := entity.DB().Where("adding_point_id = ?", adding_point.Adding_point_ID).First(&adding_point); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Adding_point not found"})
	// 	return
	// }
	if tx := entity.DB().Where("History_Type_ID = ?", adding_reducing.History_Type_ID).First(&historytypes); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "History_Type_ID not found"})
		return
	}
	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_reducing.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("Student_ID = ?", adding_reducing.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student_ID not found"})
		return
	}

	new_adding_reducing := entity.Adding_reducing{
		Change_ID:       adding_reducing.Change_ID,
		History_Type_ID: adding_reducing.History_Type_ID,
		Enroll_ID:       adding_reducing.Enroll_ID,
		Student_ID:      adding_reducing.Student_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_adding_reducing})
}

func UpdateEnrollforadding(c *gin.Context) {
	var update_enrolls Updateaddingandenroll
	var enroll entity.Enroll
	var student entity.Student
	var subject entity.Subject
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

	if err := c.ShouldBindJSON(&update_enrolls); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(update_enrolls.Enroll_ID)
	if tx := entity.DB().Where("subject_id = ?", update_enrolls.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject_id not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", update_enrolls.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", update_enrolls.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", update_enrolls.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}

	//var updated_th_name = enroll.Subject_TH_Name
	var update_student_id = update_enrolls.Student_ID
	var updated_exam_schedule_id = update_enrolls.Exam_Schedule_ID
	var update_class_schedule_id = update_enrolls.Class_Schedule_ID
	var update_subject_id = update_enrolls.Subject_ID
	var update_Section = update_enrolls.Section

	// fmt.Println(update_Section)
	//var section = entity.Subject_ID
	//var updated_capacity = enroll.Capacity
	//var updated_enroll = enroll.Enroll
	//var updated_reserved = enroll.Reserved
	//var updated_reserved_enroll = subject.Reserved_Enroll
	//var updated_unit = subject.Unit
	if tx := entity.DB().Where("enroll_id = ?", update_enrolls.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll_id not found"})
		return
	}

	updated_enroll := entity.Enroll{
		Enroll_ID: update_enrolls.Enroll_ID,
		Student_ID:        update_student_id,
		Subject_ID:        update_subject_id,
		Exam_Schedule_ID:  updated_exam_schedule_id,
		Class_Schedule_ID: update_class_schedule_id,
		Section:           update_Section,
	}

	if err := entity.DB().Save(&updated_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_enroll})
}

// Get /adding_reducing เรียกใช้เพื่อ
// func GetAdding_reducing(c *gin.Context) {
// 	var adding_reducing entity.Adding_reducing

// 	id := c.Param("change_id")
// 	query := entity.DB().Where("change_id = ?",id).First(&adding_reducing )
// 	if err := query.Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": adding_reducing })
// }

// DELETE /adding
func DeleteAdding_reducing(c *gin.Context) {
	Enroll_ID := c.Param("enroll_id")

	if tx := entity.DB().Exec("DELETE FROM enrolls WHERE enroll_id = ?", Enroll_ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "adding_reducing id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Enroll_ID})
}
