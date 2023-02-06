package controller

import (
	"net/http"

	validate_function "github.com/B6025212/team05/custom_validate_function"
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// POST /class_schedules
func CreateClassSchedule(c *gin.Context) {
	var subject entity.Subject
	var room entity.Room
	var admin entity.Admin
	var class_schedule entity.Class_Schedule

	if err := c.ShouldBindJSON(&class_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Subject ด้วย id ของ Subject ที่รับเข้ามา
	// SELECT * FROM `subjects` WHERE subject_id = <class_schedule.Subject_ID>
	if tx := entity.DB().Where("subject_id = ?", class_schedule.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Room ด้วย id ของ Room ที่รับเข้ามา
	// SELECT * FROM `rooms` WHERE room_id = <class_schedule.Room_ID>
	if tx := entity.DB().Where("room_id = ?", class_schedule.Room_ID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Admin ด้วย id ของ Admin ที่รับเข้ามา
	// SELECT * FROM `admins` WHERE admin_id = <class_schedule.Admin_ID>
	if tx := entity.DB().Where("admin_id = ?", class_schedule.Admin_ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	new_class_schedule := entity.Class_Schedule{
		Class_Schedule_ID:          class_schedule.Class_Schedule_ID,
		Subject:                    subject,
		Section:                    class_schedule.Section,
		Room:                       room,
		Admin:                      admin,
		Class_Schedule_Description: class_schedule.Class_Schedule_Description,
		Day:                        class_schedule.Day,
		Start_Time:                 class_schedule.Start_Time,
		End_Time:                   class_schedule.End_Time,
	}
	if _, err := validate_function.ValidateClassScheduleID(new_class_schedule.Class_Schedule_ID, new_class_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := validate_function.ClassScheduleValidate(new_class_schedule.Day, room, new_class_schedule.Start_Time, new_class_schedule.End_Time); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// บันทึก entity Class_Schedule
	if err := entity.DB().Create(&new_class_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_class_schedule})
}

// GET /subjects
func ListClassSchedule(c *gin.Context) {

	var class_Schedules []entity.Class_Schedule

	if err := entity.DB().Raw("SELECT * FROM class_schedules").Scan(&class_Schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_Schedules})

}

func GetClassBySubjectID_and_Section(c *gin.Context) {
	/* Query class record(s) by subject_id and section */
	// GET : /class_schedule/:subject_id/:section

	var class_schedules entity.Class_Schedule

	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject_id, section).First(&class_schedules); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule with this subject_id and section is not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": class_schedules})
}

// GET /class_schedule/:subject_id
func GetClassSchedule(c *gin.Context) {

	var class_Schedules []entity.Class_Schedule

	subject_id := c.Param("subject_id")

	if tx := entity.DB().Where("subject_id = ?", subject_id).Find(&class_Schedules); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class_schedule with this subject_id is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_Schedules})
}

// DELETE /class_schedule/:class_schedule_id
func DeleteClassSchedule(c *gin.Context) {
	class_schedule_id := c.Param("class_schedule_id")

	if tx := entity.DB().Exec("DELETE FROM class_schedules WHERE class_schedule_id = ?", class_schedule_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found class_schedule, cannot delete"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": class_schedule_id})
}

func UpdateClassSchedule(c *gin.Context) {
	var class_schedule entity.Class_Schedule
	var subject entity.Subject
	var room entity.Room
	var admin entity.Admin

	if err := c.ShouldBindJSON(&class_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updated_section = class_schedule.Section
	var updated_class_schedule_description = class_schedule.Class_Schedule_Description
	var updated_day = class_schedule.Day
	var updated_start_time = class_schedule.Start_Time
	var updated_end_time = class_schedule.End_Time

	if tx := entity.DB().Where("subject_id = ?", class_schedule.Subject_ID).First(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject not found"})
		return
	}

	if tx := entity.DB().Where("room_id = ?", class_schedule.Room_ID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	if tx := entity.DB().Where("class_schedule_id = ?", class_schedule.Class_Schedule_ID).Find(&class_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	updated_class_schedule := entity.Class_Schedule{
		Class_Schedule_ID:          class_schedule.Class_Schedule_ID,
		Subject:                    subject,
		Section:                    updated_section,
		Room:                       room,
		Admin:                      admin,
		Class_Schedule_Description: updated_class_schedule_description,
		Day:                        updated_day,
		Start_Time:                 updated_start_time,
		End_Time:                   updated_end_time,
	}

	if _, err := validate_function.ValidateClassScheduleID(updated_class_schedule.Class_Schedule_ID, updated_class_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := validate_function.ClassScheduleValidate(updated_class_schedule.Day, room, updated_class_schedule.Start_Time, updated_class_schedule.End_Time); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&updated_class_schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_class_schedule})
}
