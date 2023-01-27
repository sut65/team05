package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)
type extendedAdding_reducing struct {
	entity.Adding_reducing
	entity.Enroll
	entity.Course
	extendedEnrollSubject //ดึงจากListEnrollSubject //เป้นฟังก์ชั่นของการแสดงข้อมูลที่ใช้ในหน้าcreate ในตารางทั้งหมด
	
	
	// Subject_ID      string
	// Course_Name     string
	// Subject_EN_Name string
	// Enroll_amount	uint
	// Capacity		uint
	// Unit            string
	// Section 		uint

}



// POST /course
func CreateAdding_reducing(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	// var student entity.Student
	var subject entity.Subject
	var enroll entity.Enroll
	

	if err := c.ShouldBindJSON(&adding_reducing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	// if tx := entity.DB().Where("student_id = ?", adding_reducing.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
	// 	return
	// }
	

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("subject_id = ?", adding_reducing.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_reducing.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	new_adding_reducing := entity.Adding_reducing{
		Change_ID:   adding_reducing.Change_ID,
		// Student: student,
		Subject_ID:	&subject.Subject_ID,	
		Enroll_ID: &enroll.Enroll_ID,
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": new_adding_reducing})
}

// List /adding_reducing
func ListAdding_reducing(c *gin.Context) {
	var extendedAdding_reducing []extendedAdding_reducing
	// if err := entity.DB().Raw("SELECT e.*, c.* FROM requests e JOIN subjects c ON e.subject_id = c.subject_id  AND  e.section = c.section").Scan(&request).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	//เป้นฟังก์ชั่นที่เรียกใช้ค่าในหน้าadding.tsx จากในdatabase
		query := entity.DB().Raw("SELECT a.*,e.*, s.*, c.course_name, x.day,x.start_time,x.end_time FROM adding_reducings a INNER JOIN enrolls e INNER JOIN subjects s INNER JOIN courses c INNER JOIN class_schedules x ON a.enroll_id = e.enroll_id  AND a.subject_id = s.subject_id  AND e.section = s.section AND s.course_id = c.course_id AND e.class_schedule_id = x.class_schedule_id ; ").Scan(&extendedAdding_reducing)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_reducing})
}

// Get /adding_reducing
func GetAdding_reducing(c *gin.Context) {
	var extendedAdding_reducing []extendedAdding_reducing

	id := c.Param("change_id")
	query := entity.DB().Raw("SELECT a.*,e.*, s.*, c.course_name, x.day,x.start_time,x.end_time FROM adding_reducings a INNER JOIN enrolls e INNER JOIN subjects s INNER JOIN courses c INNER JOIN class_schedules x ON a.enroll_id = e.enroll_id AND a.subject_id = s.subject_id AND e.section = s.section AND s.course_id = c.course_id AND e.class_schedule_id = x.class_schedule_id ;",id).Scan(&extendedAdding_reducing)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_reducing})
}

// DELETE /adding
func DeleteAdding_reducing(c *gin.Context) {
	id := c.Param("change_id")

	if tx := entity.DB().Exec("DELETE FROM adding_reducings WHERE change_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "adding_reducing id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func UpdateAdding_reducing(c *gin.Context) {
	var adding_reducing entity.Adding_reducing
	// var student entity.Student
	var subject entity.Subject
	var enroll entity.Enroll

	if err := c.ShouldBindJSON(&adding_reducing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var update_status = adding_reducing.Status
	

	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	// if tx := entity.DB().Where("student_id = ?", adding_reducing.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student status not found"})
	// 	return
	// }
	

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if tx := entity.DB().Where("subject_id = ?", adding_reducing.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_reducing.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	update_adding_reducing := entity.Adding_reducing{
		Change_ID:   adding_reducing.Change_ID,
		// Student: student,
		Subject_ID: &subject.Subject_ID,
		Enroll_ID: &enroll.Enroll_ID,
		Status: update_status,
	}

	// บันทึก entity request
	if err := entity.DB().Save(&update_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_adding_reducing})
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



func GetSubjectByCourse(c *gin.Context) {
	var  subject []entity.Subject
	id := c.Param("course_id")
	
	if err := entity.DB().Raw("SELECT s.* FROM subjects s WHERE course_id=?", id).Find(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// func ListForshowadding_reducing(c *gin.Context){

// 	var extendedAdding_reducings []extendedAdding_reducing
	
// 	query := entity.DB().Raw("SELECT e.*,cs.*,ex.* FROM `subjects` e INNER JOIN `class_schedules` cs INNER JOIN `exam_schedules` ex ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id").Scan(&extendedAdding_reducings)
// 	if err := query.Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}


// 	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_reducings})


// }
// List /adding_reducing
func ListAdding_reducingss(c *gin.Context) {
	var extendedAdding_reducing []extendedAdding_reducing
	// if err := entity.DB().Raw("SELECT e.*, c.* FROM requests e JOIN subjects c ON e.subject_id = c.subject_id  AND  e.section = c.section").Scan(&request).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
		query := entity.DB().Raw("SELECT a.* FROM adding_reducings a  ; ").Scan(&extendedAdding_reducing)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_reducing})
	
}

