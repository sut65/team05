package controller

import (
	"fmt"
	"net/http"
	"time"

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

// รับค่าจากsubmitที่ส่งมาจากfrontend
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

	new_enroll := entity.Enroll{
		Enroll_ID:      receive_enroll.Enroll_ID,
		Student:        student,
		Subject:        subject,
		Exam_Schedule:  exam_schedule,
		Class_Schedule: class_schedule,
		Section:        receive_enroll.Section,
	}
	// fmt.Printf(new_enroll.Subject.Subject_ID)
	// fmt.Printf(new_enroll.Student.Student_ID)

	if _, err := ValidateAdding_reducingChecksubject(new_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := ValidateAdding_reducingExamAndClass(new_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	new_adding_reducing := entity.Adding_reducing{
		Change_ID:       receive_enroll.Change_ID,
		Student:         student,
		History_Type_ID: &receive_enroll.History_Type_ID,
		Enroll_ID:       &receive_enroll.Enroll_ID,
		Date:            time.Now(),
	}

	entity.DB().Create(&new_enroll) //สร้างตารางenroll
	// if _, err := ValidateAdding_reducingChecksubject(new_adding_reducing); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if _, err := ValidateAdding_reducingExamAndClass(new_enroll); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	//สร้างตารางadding
	if err := entity.DB().Create(&new_adding_reducing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_enroll}) //ขึ้นสเตตัสว่าสร้างenrollเรียบร้อย

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
	query := entity.DB().Raw("SELECT a.*, s.*, at.*,c.*,sd.*,e.* FROM adding_reducings a JOIN enrolls e JOIN history_types at JOIN courses c JOIN students sd JOIN subjects s ON a.enroll_id = e.enroll_id AND  e.subject_id = s.subject_id AND   s.section = e.section AND   a.history_type_id = at.history_type_id AND s.course_id = c.course_id AND sd.student_id = e.student_id  WHERE e.student_id = ?", id).Scan(&extendedAdding_reducing)
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
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
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
		Date:            time.Now(),
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

	if tx := entity.DB().Where("enroll_id = ?", update_enrolls.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll_id not found"})
		return
	}

	updated_enroll := entity.Enroll{
		Enroll_ID:         update_enrolls.Enroll_ID,
		Student_ID:        update_student_id,
		Subject_ID:        update_subject_id,
		Exam_Schedule_ID:  updated_exam_schedule_id,
		Class_Schedule_ID: update_class_schedule_id,
		Section:           update_Section,
	}

	if _, err := ValidateAdding_reducingChecksubject(updated_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := ValidateAdding_reducingExamAndClass(updated_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&updated_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_enroll})
}

// DELETE /adding
func DeleteAdding_reducing(c *gin.Context) {
	Enroll_ID := c.Param("enroll_id")

	if tx := entity.DB().Exec("DELETE FROM enrolls WHERE enroll_id = ?", Enroll_ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "adding_reducing id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Enroll_ID})
}

// เชคห้ามลงทะเบียนรายวิชาซ้ำ
func ValidateAdding_reducingChecksubject(subject entity.Enroll) (bool, error) {
	var enroll []entity.Enroll
	database := entity.OpenDatabase()

	fmt.Println(subject.Student.Student_ID)
	fmt.Println(subject.Subject.Subject_ID)

	if tx := database.Where("subject_id = ? AND student_id = ?", subject.Subject.Subject_ID, subject.Student.Student_ID).Find(&enroll); tx.RowsAffected >= 1 {
		err_message := fmt.Sprintf("Subject cannot be added repeatedly.")
		return false, subjectError{err_message}
	}
	return true, nil
}

func ValidateAdding_reducingExamAndClass(enrolls entity.Enroll) (bool, error) {
	var class_Schedule entity.Class_Schedule
	var list_enroll []entity.Enroll

	database := entity.OpenDatabase()
	fmt.Println("ข้อมูลวิชากำลังที่ลงทะเบียน")
	fmt.Println(enrolls.Class_Schedule.Day)
	fmt.Println(enrolls.Class_Schedule.Start_Time)
	fmt.Println(enrolls.Class_Schedule.End_Time)
	fmt.Println(enrolls.Student.Student_ID)
	fmt.Println(enrolls.Subject.Subject_ID)
	fmt.Println("=======================================")

	// ค้นราข้อมูลการลงทะเบียนตามรหัสนักศึกษา แล้วเก็บไว้ในตัวแปร list_enroll
	if tx := database.Where("student_id = ?", enrolls.Student.Student_ID).Find(&list_enroll); tx.RowsAffected >= 1 {

		// วนลูป enroll ของนักศึกษาตามรหัสนักศึกษา
		fmt.Println("จำนวนรายวิชาที่ลงทะเบียน", len(list_enroll))
		for i, record := range list_enroll {
			time_pattern := "15:04"

			// ดึงข้อมูล class schedule จาก class_schedule_id ของข้อมูล enroll
			database.Raw("SELECT * FROM class_schedules WHERE class_schedule_id = ?", record.Class_Schedule_ID).First(&class_Schedule)
			// เก็บข้อมูล start time, end time และ day ของข้อมูลที่ดึงมาจาก class schedule
			var start_time = class_Schedule.Start_Time
			var end_time = class_Schedule.End_Time
			var day = class_Schedule.Day

			fmt.Printf("วิชาที่ %d - เรียนวัน %s เวลา %s - %s\n", i+1, day, start_time, end_time)
			// ถ้า start_time, end_time และ day ตรงกันเป้ะ
			if start_time == enrolls.Class_Schedule.Start_Time && end_time == enrolls.Class_Schedule.End_Time && day == enrolls.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly.")
				return false, subjectError{err_message}

				// กรณีเวลาเริ่มเท่ากัน และเวลาเลิกไม่เท่ากัน
			} else if start_time == enrolls.Class_Schedule.Start_Time && day == enrolls.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly, start time is same.")
				return false, subjectError{err_message}

				// กรณีเวลาเริ่มไม่เท่ากัน และเวลาเลิกเท่ากัน
			} else if end_time == enrolls.Class_Schedule.End_Time && day == enrolls.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly, end time is same.")
				return false, subjectError{err_message}

				// กรณีเวลาเรียนไม่เท่ากันทั้ง 2 วิชา แต่เวลาซ้าซ้อนกัน (วันเรียนเดียวกัน)
				// ลงวิชา A 13:00 - 15:00
				// จะลงวิชา B 14:00 - 16:00 ไม่ได้ เพราะวิชา B เวลา 14:00 เหลื่อมกับช่วงเวลาเรียนวิชา A
			} else if day == enrolls.Class_Schedule.Day {

				// แปลง start time, end time ของข้อมูลที่จะเพิ่ม เป็นค่าเวลา
				check_start, _ := time.Parse(time_pattern, enrolls.Class_Schedule.Start_Time)
				check_end, _ := time.Parse(time_pattern, enrolls.Class_Schedule.End_Time)

				// แปลง start time, end time ของข้อมูล class schedule จาก enroll ที่มีอยู่แล้วเป็นค่าเวลา
				start, _ := time.Parse(time_pattern, start_time)
				end, _ := time.Parse(time_pattern, end_time)

				// ตรวจสอบว่่า เวลาเริ่มอยู่ในช่วงเวลาเริ่ม - เวลาเลิกหรือไม้
				// ถ้าใช่ ให้ขึ้น error
				if inTimeSpan(start, end, check_start) {
					err_message := fmt.Sprintf("Cannot add class schedule. In start time %s is overlapped with some class schedule ", start_time)
					return false, subjectError{err_message}

					// ตรวจสอบว่่า เวลาเลิกอยู่ในช่วงเวลาเริ่ม - เวลาเลิกหรือไม้
					// ถ้าใช่ ให้ขึ้น error
				} else if inTimeSpan(start, end, check_end) {
					err_message := fmt.Sprintf("Cannot add class schedule. In end time %s is overlapped with some class schedule ", end_time)
					return false, subjectError{err_message}
				}

			}

		}
		return true, nil
	}
	return true, nil
	// วนลูป enroll ของ นศ สักคน
	// 		select class_schedule ตาม class_schedule_id ในแตละ enroll
	// 		เข้าถึงข้อมูล class_schedule ตาม id
	// 		เก็บค่า day, start_time, end_time
	// 		ตรวจสอบว่า day, start_time และ end_time ของ class_scheduleตรงกับข้อมูลที่จะเพิ่มหรือไม่ ถ้าใช่
	//			ลงทะเบียนไม่ได้ ส่งค่า error
	// จบลูป

}
