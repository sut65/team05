package controller

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/B6025212/team05/entity"
	. "github.com/B6025212/team05/service"
	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
)

// POST /exam_schedules
func CreateExamSchedule(c *gin.Context) {
	var subject entity.Subject
	var room entity.Room
	var admin entity.Admin
	var exam_schedule entity.Exam_Schedule

	if err := c.ShouldBindJSON(&exam_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Subject ด้วย id ของ Subject ที่รับเข้ามา
	// SELECT * FROM `subjects` WHERE subject_id = <class_schedule.Subject_ID>
	if tx := entity.DB().Where("subject_id = ?", exam_schedule.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Room ด้วย id ของ Room ที่รับเข้ามา
	// SELECT * FROM `rooms` WHERE room_id = <class_schedule.Room_ID>
	if tx := entity.DB().Where("room_id = ?", exam_schedule.Room_ID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Admin ด้วย id ของ Admin ที่รับเข้ามา
	// SELECT * FROM `admins` WHERE admin_id = <class_schedule.Admin_ID>
	if tx := entity.DB().Where("admin_id = ?", exam_schedule.Admin_ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	var new_exam_schedule_id = fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000)
	new_exam_schedule := entity.Exam_Schedule{
		Exam_Schedule_ID: new_exam_schedule_id,
		Subject:          subject,
		Room:             room,
		Exam_Type:        exam_schedule.Exam_Type,
		Exam_Date:        exam_schedule.Exam_Date,
		Exam_Start_Time:  exam_schedule.Exam_Start_Time,
		Exam_End_Time:    exam_schedule.Exam_End_Time,
		Latest_Updated:   time.Now(),
		Admin:            admin,
	}
	if _, err := govalidator.ValidateStruct(new_exam_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := ValidateExamScheduleUnique(new_exam_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_exam_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_exam_schedule})
}

func UpdateExamSchedule(c *gin.Context) {
	var exam_schedule entity.Exam_Schedule
	var subject entity.Subject
	var room entity.Room

	if err := c.ShouldBindJSON(&exam_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updated_exam_type = exam_schedule.Exam_Type
	var updated_exam_date = exam_schedule.Exam_Date
	var updated_exam_start_time = exam_schedule.Exam_Start_Time
	var updated_exam_end_time = exam_schedule.Exam_End_Time

	if tx := entity.DB().Where("subject_id = ?", exam_schedule.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}

	if tx := entity.DB().Where("room_id = ?", exam_schedule.Room_ID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	if tx := entity.DB().Where("exam_schedule_id = ?", exam_schedule.Exam_Schedule_ID).Find(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}

	updated_exam_schedule := entity.Exam_Schedule{
		Exam_Schedule_ID: exam_schedule.Exam_Schedule_ID,
		Subject:          subject,
		Room:             room,
		Exam_Type:        updated_exam_type,
		Exam_Date:        updated_exam_date,
		Latest_Updated:   time.Now(),
		Exam_Start_Time:  updated_exam_start_time,
		Exam_End_Time:    updated_exam_end_time,
	}

	if err := entity.DB().Save(&updated_exam_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_exam_schedule})
}

// GET /exam_schedules
func ListExamSchedule(c *gin.Context) {

	var exam_Schedules []entity.Exam_Schedule

	if err := entity.DB().Raw("SELECT * FROM exam_schedules").Scan(&exam_Schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exam_Schedules})

}

// GET /exam_schedule/:subject_id
func GetExamSchedule(c *gin.Context) {

	var exam_schedules []entity.Exam_Schedule

	subject_id := c.Param("subject_id")

	if tx := entity.DB().Where("subject_id = ?", subject_id).Find(&exam_schedules); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exam_schedules})
}

// GET /exam_schedule/:subject_id/:exam_type
func GetExamScheduleByType(c *gin.Context) {

	var exam_schedule entity.Exam_Schedule

	subject_id := c.Param("subject_id")
	exam_type := c.Param("exam_type")

	if tx := entity.DB().Where("subject_id = ? AND exam_type = ?", subject_id, exam_type).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exam_schedule})
}

// DELETE /exam_schedule/:exam_schedule_id
func DeleteExamSchedule(c *gin.Context) {
	exam_schedule_id := c.Param("exam_schedule_id")

	if tx := entity.DB().Exec("DELETE FROM exam_schedules WHERE exam_schedule_id = ?", exam_schedule_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": exam_schedule_id})
}
