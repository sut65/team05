package controller

import (
	"fmt"
	"net/http"

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
		Enroll_ID:         enroll.Enroll_ID,
		Student_ID:        &student.Student_ID,
		Subject_ID:        &subject.Subject_ID,
		Exam_Schedule_ID:  &exam_schedule.Exam_Schedule_ID,
		Class_Schedule_ID: &class_schedule.Class_Schedule_ID,
		Section: enroll.Section,
	}

	// บันทึก entity Subject
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
	query := entity.DB().Raw("SELECT e.*, s.* ,cs.day,cs.start_time,cs.end_time ,ex.* FROM enrolls e JOIN subjects s JOIN class_schedules cs JOIN exam_schedules ex ON e.subject_id = s.subject_id AND e.section = s.section AND e.class_schedule_id = cs.class_schedule_id AND e.exam_schedule_id = ex.exam_schedule_id").Scan(&extendedEnroll)
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
		Student_ID: update_student_id,
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

func GetSubjectByCourse(c *gin.Context) {
	var subject []entity.Subject
	id := c.Param("course_id")
	if err := entity.DB().Raw("SELECT e.*, c.* ,d.day,st.start_time,en.end_time ,co.course_id FROM `enrolls` e JOIN `subjects` c JOIN `class_schedules` cs JOIN `class_schedules` d JOIN `class_schedules` st JOIN `class_schedules` en JOIN `courses` co ON e.subject_id = c.subject_id AND  e.section = c.section AND e.subject_id = cs.subject_id AND e.subject_id = d.subject_id AND e.subject_id = st.subject_id AND c.subject_id WHERE co.course_id=?", id).Find(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}
