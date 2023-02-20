package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

type extendedEnroll struct {
	entity.Enroll
	Student         string
	Subject_ID      string
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Day             string
	Start_Time      string
	End_Time        string
	Exam_Date       string
	Unit            string
	Exam_Start_Time string
	Exam_End_Time   string
}

type extendedEnrollByStudent struct {
	entity.Enroll
	Student         string
	Subject_ID      string
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Day             string
	Start_Time      string
	End_Time        string
	Exam_Date       string
	Unit            string
	Exam_Start_Time string
	Exam_End_Time   string
}

func CreateEnroll(c *gin.Context) {
	var enroll entity.Enroll
	var student entity.Student
	var subject entity.Subject
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

	if err := c.ShouldBindJSON(&enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("subject_id = ?", enroll.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject_id not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", enroll.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", enroll.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}

	new_enroll := entity.Enroll{
		Enroll_ID:      enroll.Enroll_ID,
		Student:        student,
		Subject:        subject,
		Exam_Schedule:  exam_schedule,
		Class_Schedule: class_schedule,
		Section:        enroll.Section,
		Enroll_Time_Stamp: enroll.Enroll_Time_Stamp.Local(),
	}
	// บันทึก entity Subject
	if _, err := ValidateChecksubject(new_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := ValidateCheckExamAndClass(new_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&new_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_enroll})
}

func ListEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for list all records from `subject` table.
		HTTP GET : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	//var enroll []entity.Enroll

	//SELECT e.*, c.* ,cs.* FROM `enrolls` e JOIN `subjects` c  JOIN `class_schedules` cs ON e.subject_id = c.subject_id  AND  e.section = c.section AND e.subject_id = cs.subject_id
	//SELECT e.* , c.* , s.* , ex.* , sj.* FROM enrolls e JOIN class_schedules c JOIN students s JOIN subjects sj JOIN exam_schedules ex ON e.section = sj.section AND e.student_id = s.student_id AND e.subject_id = sj.subject_id AND c.class_schedule_id = e.class_schedule_id AND s.student_id = e.student_id AND ex.subject_id = c.subject_id
	//SELECT e.* , c.* , s.* , ex.* , sj.* FROM enrolls e JOIN class_schedules c JOIN students s JOIN subjects sj JOIN exam_schedules ex ON e.section = sj.section AND e.student_id = s.student_id AND e.subject_id = sj.subject_id AND c.class_schedule_id = e.class_schedule_id AND s.student_id = e.student_id AND ex.subject_id = c.subject_id
	//SELECT e.*, s.* ,cs.day,cs.start_time,cs.end_time FROM enrolls e JOIN subjects s JOIN class_schedules cs ON e.subject_id = s.subject_id AND e.section = s.section AND e.class_schedule_id = cs.class_schedule_id;
	var extendedEnroll []extendedEnroll
	query := entity.DB().Raw("SELECT e.*, s.* ,cs.day,cs.start_time,cs.end_time ,ex.* FROM enrolls e JOIN subjects s JOIN class_schedules cs JOIN exam_schedules ex ON e.subject_id = s.subject_id AND e.section = s.section AND e.class_schedule_id = cs.class_schedule_id AND e.exam_schedule_id = ex.exam_schedule_id WHERE student_id = ?").Scan(&extendedEnroll)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": extendedEnroll})

}

// GET /subject/:subject_id
func GetEnroll(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting record(s) from `subject` table filtered by `subject_id`.
		HTTP GET : /subject/:subject_id
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var enroll entity.Enroll
	enroll_id := c.Param("enroll_id")
	if tx := entity.DB().Where("enroll_id = ?", enroll_id).Find(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

//	func GetEnrollByStudentID(c *gin.Context) {
//		var enroll entity.Enroll
//		enroll_id := c.Param("enroll_id")
//		if tx := entity.DB().Where("enroll_id = ?", enroll_id).Find(&enroll); tx.RowsAffected == 0 {
//			c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
//			return
//		}
//		c.JSON(http.StatusOK, gin.H{"data": enroll})
//	}
func GetEnrollByStudentID(c *gin.Context) {
	/* Query subject record by subject_id and section */
	var enroll []extendedEnrollByStudent
	student := c.Param("student_id")
	subject := c.Param("subject_id")

	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	// if tx := entity.DB().Where("student_id = ?", student).Find(&enroll); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "enroll with this student not found"})
	// 	return
	// }
	query := entity.DB().Raw("SELECT e.*, s.* ,cs.day,cs.start_time,cs.end_time ,ex.* FROM enrolls e JOIN subjects s JOIN class_schedules cs JOIN exam_schedules ex ON e.subject_id = s.subject_id AND e.section = s.section AND e.class_schedule_id = cs.class_schedule_id AND e.exam_schedule_id = ex.exam_schedule_id WHERE student_id = ?", student, subject).Scan(&enroll)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

// PATCH /subjects
func UpdateEnroll(c *gin.Context) {
	var enroll entity.Enroll
	var student entity.Student
	var subject entity.Subject
	var class_schedule entity.Class_Schedule
	var exam_schedule entity.Exam_Schedule

	if err := c.ShouldBindJSON(&enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("subject_id = ?", enroll.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject_id not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", enroll.Class_Schedule_ID).First(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", enroll.Exam_Schedule_ID).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam_schedule_id not found"})
		return
	}

	if tx := entity.DB().Where("student_id = ?", enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}
	//var updated_th_name = enroll.Subject_TH_Name
	var update_student_id = enroll.Student_ID
	var updated_exam_schedule_id = enroll.Exam_Schedule_ID
	var update_class_schedule_id = enroll.Class_Schedule_ID
	var update_subject_id = enroll.Subject_ID
	var update_Section = enroll.Section
	var update_Enroll_Time_Stamp = enroll.Enroll_Time_Stamp

	fmt.Println(update_Section)
	//var section = entity.Subject_ID
	//var updated_capacity = enroll.Capacity
	//var updated_enroll = enroll.Enroll
	//var updated_reserved = enroll.Reserved
	//var updated_reserved_enroll = subject.Reserved_Enroll
	//var updated_unit = subject.Unit

	if tx := entity.DB().Where("enroll_id = ?", enroll.Enroll_ID).Find(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	updated_enroll := entity.Enroll{
		Enroll_ID:         enroll.Enroll_ID,
		Student_ID:        update_student_id,
		Subject_ID:        update_subject_id,
		Exam_Schedule_ID:  updated_exam_schedule_id,
		Class_Schedule_ID: update_class_schedule_id,
		Enroll_Time_Stamp: update_Enroll_Time_Stamp.Local(),
		Section:           update_Section,

	}
	if _, err := ValidateCheckExamAndClass(updated_enroll); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&updated_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_enroll})
}

func GetEnrollBySubjects(c *gin.Context) {
	/* Query subject record(s) by subject_id */

	var extendedEnroll []extendedEnroll

	subject_id := c.Param("subject_id")

	query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name FROM subjects s JOIN courses c JOIN professors p ON s.Course_ID = c.course_id AND s.professor_id = p.id WHERE subject_id = ?", subject_id).Scan(&extendedEnroll)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedEnroll})
}

// DELETE /subject/:subject_id/:section
func DeleteEnroll(c *gin.Context) {

	enroll_id := c.Param("enroll_id")
	//student := c.Param("student_id")

	if tx := entity.DB().Exec("DELETE FROM enrolls WHERE enroll_id = ? ", enroll_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enroll_id})
}

func GetPreviousREnroll(c *gin.Context) {
	var enroll entity.Enroll
	if err := entity.DB().Last(&enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enroll})
}

//	func GetSubjectByCourse(c *gin.Context) {
//		var subject []entity.Subject
//		id := c.Param("course_id")
//		if err := entity.DB().Raw("SELECT e.*, c.* ,d.day,st.start_time,en.end_time ,co.course_id FROM `enrolls` e JOIN `subjects` c JOIN `class_schedules` cs JOIN `class_schedules` d JOIN `class_schedules` st JOIN `class_schedules` en JOIN `courses` co ON e.subject_id = c.subject_id AND  e.section = c.section AND e.subject_id = cs.subject_id AND e.subject_id = d.subject_id AND e.subject_id = st.subject_id AND c.subject_id WHERE co.course_id=?", id).Find(&subject).Error; err != nil {
//			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//			return
//		}
//		c.JSON(http.StatusOK, gin.H{"data": subject})
//	}
func inTimeSpan(start, end, check time.Time) bool {
	_end := end
	_check := check
	if end.Before(start) {
		_end = end.Add(24 * time.Hour)
		if check.Before(start) {
			_check = check.Add(24 * time.Hour)
		}
	}
	return _check.After(start) && _check.Before(_end)
}

type subjectError struct {
	msg string
}

func (e subjectError) Error() string {
	return e.msg
}
//เชคห้ามลงทะเบียนรายวิชาซ้ำ
func ValidateChecksubject(subject entity.Enroll) (bool, error) {
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

func ValidateCheckExamAndClass(enrolls entity.Enroll) (bool, error) {
	var class_Schedule entity.Class_Schedule
	var list_enroll []entity.Enroll

	database := entity.OpenDatabase()
	fmt.Println(enrolls.Class_Schedule.Day)
	fmt.Println(enrolls.Class_Schedule.Start_Time)
	fmt.Println(enrolls.Class_Schedule.End_Time)
	fmt.Println(enrolls.Student.Student_ID)

	// fmt.Println(enrolls.Subject.Subject_ID)

	if tx := database.Where("student_id = ?", enrolls.Student.Student_ID).Find(&list_enroll); tx.RowsAffected >= 1 {
		// err_message := fmt.Sprintf("Class Day cannot be added repeatedly.")
		// return false, subjectError{err_message}

		// วนลูป enroll ของนักศึกษาคนหนึ่ง ตาม student_id
		for _, record := range list_enroll {
			time_pattern := "15:04"

			// ดึงข้อมูล class schedule
			database.Where("class_schedule_id = ?", record.Class_Schedule_ID).First(&class_Schedule)

			// เก็บข้อมูล start time, end time และ day ของข้อมูลที่ดึงมาจาก class schedule
			var start_time = class_Schedule.Start_Time
			var end_time = class_Schedule.End_Time
			var day = class_Schedule.Day

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

				// กรณีเวลาซ้ำซ้อนกัน เช่น
				// ลงวิชา A 13:00 - 15:00
				// จะลงวิชา B 14:00 - 16:00 ไม่ได้
			} else {

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

// if tx := database.Where("day = ? AND start_time = ? AND end_time = ? AND student_id = ?", enrolls.Class_Schedule.Day, enrolls.Class_Schedule.Start_Time,enrolls.Class_Schedule.End_Time,tudent_ID).Find(&class_Schedule); tx.RowsAffected >= 1 {
// 	err_message := fmt.Sprintf("Class Day cannot be added repeatedly.")
// 	return false, subjectError{err_message}
// }
