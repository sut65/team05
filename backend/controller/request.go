package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/B6025212/team05/entity"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)
type extendedRequest struct {
	entity.Request
	Request_ID uint
	Subject_ID      string
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Request_Type_Name string
	Professor_Name string
	Unit            string
	Section 		uint
	Day             string
	Start_Time      string
	End_Time        string
	Exam_Date       string
	Exam_Start_Time string
	Exam_End_Time   string
	Approval_ID uint

}
// POST /course
func CreateRequest(c *gin.Context) {
	var request entity.Request
	// var student entity.Student
	var student entity.Student
	var subject entity.Subject
	var request_type entity.Request_Type
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

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

	if tx := entity.DB().Where("class_schedule_id = ?", request.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", request.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("request_type_id = ?", request.Request_Type_ID).First(&request_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request_type not found"})
		return
	}

	var enroll entity.Enroll
	if request_type.Request_Type_ID == "R02" {
		if tx := entity.DB().Where("subject_id = ? AND student_id = ?", request.Subject_ID,request.Student_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Can't change groups because you haven't registered"})
		return
		}
	}

	new_request := entity.Request{
		Request_ID:   request.Request_ID,
		Student: student,
		Subject: subject,
		Exam_Schedule_ID:  request.Exam_Schedule_ID,
		Class_Schedule_ID: request.Class_Schedule_ID,
		Section: request.Section,
		Reason: request.Reason,
		Request_Type_ID: request.Request_Type_ID,
	}
	if _, err := govalidator.ValidateStruct(new_request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := Validatechecksubject(new_request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := ValidateRequestCheckExamAndClass(new_request); err != nil {
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
	query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* FROM requests r JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.professor_id = sb.professor_id").Scan(&extendedRequest)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedRequest})
}

func ListRequestStudent(c *gin.Context) {
	var extendedRequest []extendedRequest
	id := c.Param("request_id")
	query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* ,s.* FROM requests r JOIN students s JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.student_id = s.student_id AND r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.professor_id = sb.professor_id WHERE s.student_id = ? GROUP BY r.request_id",id).Find(&extendedRequest)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedRequest})
}

func ListRequestForUpdate(c *gin.Context) {
	var extendedRequest []extendedRequest
	id := c.Param("request_id")
	query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* ,s.* FROM requests r JOIN students s JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.student_id = s.student_id AND r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.professor_id = sb.professor_id WHERE r.request_id = ?",id).Scan(&extendedRequest)
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
	professor := c.Param("professor_id")
	subject := c.Param("subject_id")

	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	// if tx := entity.DB().Where("student_id = ?", student).Find(&enroll); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "enroll with this student not found"})
	// 	return
	// }
	query := entity.DB().Raw("SELECT r.*, sb.*, rt.*,c.*, p.* ,s.* FROM requests r JOIN students s JOIN subjects sb JOIN request_types rt JOIN courses c JOIN professors p ON r.student_id = s.student_id AND r.subject_id = sb.subject_id AND  r.section = sb.section AND  r.request_type_id = rt.request_type_id AND sb.course_id = c.course_id AND p.professor_id = sb.professor_id WHERE sb.professor_id = ? AND sb.subject_id = ? GROUP BY r.request_id", professor,subject).Scan(&request)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}

// DELETE /request
func DeleteRequest(c *gin.Context) {
	id := c.Param("request_id")

	if _, err := Validatecheckapproval(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

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

	
	if tx := entity.DB().Where("class_schedule_id = ?", request.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", request.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
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
		Exam_Schedule_ID:  &exam_schedule.Exam_Schedule_ID,
		Class_Schedule_ID: &class_schedule.Class_Schedule_ID,
		Section: update_section,
		Reason: update_reason,
		Request_Type_ID: request.Request_Type_ID,
	}

	if _, err := Validatecheckapproval(strconv.FormatUint(uint64(update_request.Request_ID), 10)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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

func Validatechecksubject(subject entity.Request) (bool, error) {
	var request []entity.Request
	database := entity.OpenDatabase()
	fmt.Println(subject.Student.Student_ID)
	fmt.Println(subject.Subject.Subject_ID)
	if tx := database.Where("subject_id = ? AND student_id = ?", subject.Subject.Subject_ID, subject.Student.Student_ID).Find(&request); tx.RowsAffected >= 1 {
		return false, subjectError{"Subject cannot be added repeatedly"}
	}
	return true, nil
}


func Validatecheckapproval(id string) (bool, error) {
	var approval entity.Approval
	database := entity.OpenDatabase()
	//fmt.Println(subject.Student.Student_ID)
	//fmt.Println(request.Request.Request_ID)
	if tx := database.Where("request_id = ?", id).Find(&approval); tx.RowsAffected >= 1 {
		return false, subjectError{"The request cannot be resubmitted because the professor has already responded"}
	}
	return true, nil
}

func ValidateRequestCheckExamAndClass(request entity.Request) (bool, error) {
	var class_Schedule entity.Class_Schedule
	var list_request []entity.Request

	database := entity.OpenDatabase()
	fmt.Println(request.Class_Schedule.Day)
	fmt.Println(request.Class_Schedule.Start_Time)
	fmt.Println(request.Class_Schedule.End_Time)
	fmt.Println(request.Student.Student_ID)

	// fmt.Println(enrolls.Subject.Subject_ID)

	if tx := database.Where("student_id = ?", request.Student.Student_ID).Find(&list_request); tx.RowsAffected >= 1 {
		// err_message := fmt.Sprintf("Class Day cannot be added repeatedly.")
		// return false, subjectError{err_message}

		// วนลูป enroll ของนักศึกษาคนหนึ่ง ตาม student_id
		for _, record := range list_request {
			time_pattern := "15:04"

			// ดึงข้อมูล class schedule
			database.Where("class_schedule_id = ?", record.Class_Schedule_ID).First(&class_Schedule)

			// เก็บข้อมูล start time, end time และ day ของข้อมูลที่ดึงมาจาก class schedule
			var start_time = class_Schedule.Start_Time
			var end_time = class_Schedule.End_Time
			var day = class_Schedule.Day

			// ถ้า start_time, end_time และ day ตรงกันเป้ะ
			if start_time == request.Class_Schedule.Start_Time && end_time == request.Class_Schedule.End_Time && day == request.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly.")
				return false, subjectError{err_message}

				// กรณีเวลาเริ่มเท่ากัน และเวลาเลิกไม่เท่ากัน
			} else if start_time == request.Class_Schedule.Start_Time && day == request.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly, start time is same.")
				return false, subjectError{err_message}

				// กรณีเวลาเริ่มไม่เท่ากัน และเวลาเลิกเท่ากัน
			} else if end_time == request.Class_Schedule.End_Time && day == request.Class_Schedule.Day {
				err_message := fmt.Sprintf("Class Day cannot be added repeatedly, end time is same.")
				return false, subjectError{err_message}

				// กรณีเวลาซ้ำซ้อนกัน เช่น
				// ลงวิชา A 13:00 - 15:00
				// จะลงวิชา B 14:00 - 16:00 ไม่ได้
			} else {

				// แปลง start time, end time ของข้อมูลที่จะเพิ่ม เป็นค่าเวลา
				check_start, _ := time.Parse(time_pattern, request.Class_Schedule.Start_Time)
				check_end, _ := time.Parse(time_pattern, request.Class_Schedule.End_Time)

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
			return true, nil

		}

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

