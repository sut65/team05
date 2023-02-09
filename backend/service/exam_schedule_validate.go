package service

import (
	"fmt"
	"time"

	"github.com/B6025212/team05/entity"
)

// "github.com/B6025212/team05/entity"

type ExamScheduleError struct {
	msg string
}

func (e ExamScheduleError) Error() string {
	return e.msg
}

func ValidateExamScheduleUnique(new_exam_schedule entity.Exam_Schedule) (bool, error) {
	time_pattern := "15:04"
	var exam_schedules []entity.Exam_Schedule
	database := entity.OpenDatabase()

	var new_subject_id = new_exam_schedule.Subject.Subject_ID
	var new_exam_type = new_exam_schedule.Exam_Type
	var new_exam_date = new_exam_schedule.Exam_Date
	var new_room_id = new_exam_schedule.Room.Room_ID
	var new_exam_start_time = new_exam_schedule.Exam_Start_Time
	var new_exam_end_time = new_exam_schedule.Exam_End_Time
	fmt.Println(new_subject_id, new_exam_type, new_exam_date, new_room_id, new_exam_start_time, new_exam_end_time)
	// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องสอบ ในช่วงเวลาและวัน/เดือน/ปีและประเภทการสอบดังกล่าวหรือไม่
	/*
		SELECT * FROM exam_schedules
		WHERE subject_id != '523331'
		AND exam_type = 'Midterm'
		AND exam_date = '18/05/2020'
		AND room_id = 'B2101'
		AND exam_start_time = '15:00'
		AND exam_end_time = '17:00'
	*/
	// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
	if tx := database.Where("subject_id != ? AND exam_type = ? AND exam_date = ? AND room_id = ? AND exam_start_time = ? AND exam_end_time = ?", new_subject_id, new_exam_type, new_exam_date, new_room_id, new_exam_start_time, new_exam_end_time).Find(&exam_schedules); tx.RowsAffected >= 1 {
		err_message := fmt.Sprintf("Cannot add %s exam schedule. In date %s, room %s, in time interval %s - %s, already occupied", new_exam_type, new_exam_date, new_room_id, new_exam_start_time, new_exam_end_time)
		return false, ExamScheduleError{err_message}

		// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องสอบนั้นในวัน/เดือน/ปีและประเภทการสอบดังกล่าวหรือไม่
		// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
	} else if tx := database.Where("subject_id != ? AND exam_type = ? AND exam_date = ? AND room_id = ?", new_subject_id, new_exam_type, new_exam_date, new_room_id).Find(&exam_schedules); tx.RowsAffected >= 1 {
		var listed_exam_schedules = exam_schedules

		// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องสอบนั้นในวัน/เดือน/ปี, ประเภทการสอบดังกล่าวและ เวลาเริ่มสอบดังกล่าวหรือไม่
		// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
		if tx := database.Where("subject_id != ? AND exam_type = ? AND exam_date = ? AND room_id = ? AND exam_start_time = ?", new_subject_id, new_exam_type, new_exam_date, new_room_id, new_exam_start_time).Find(&exam_schedules); tx.RowsAffected >= 1 {

			err_message := fmt.Sprintf("Cannot add %s exam schedule. In date %s, room %s, exam start time %s already occupied", new_exam_type, new_exam_date, new_room_id, new_exam_start_time)
			return false, ClassScheduleError{err_message}

			// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องสอบนั้นในวัน/เดือน/ปี, ประเภทการสอบดังกล่าวและ เวลาเลิกสอบดังกล่าวหรือไม่
			// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
		} else if tx := database.Where("subject_id != ? AND exam_type = ? AND exam_date = ? AND room_id = ? AND exam_end_time = ?", new_subject_id, new_exam_type, new_exam_date, new_room_id, new_exam_end_time).Find(&exam_schedules); tx.RowsAffected >= 1 {
			err_message := fmt.Sprintf("Cannot add %s exam schedule. In date %s, room %s, exam end time %s already occupied", new_exam_type, new_exam_date, new_room_id, new_exam_end_time)
			return false, ClassScheduleError{err_message}
		} else {
			database.Where("exam_type = ? AND exam_date = ? AND room_id = ?", new_exam_type, new_exam_date, new_room_id).Find(&listed_exam_schedules)
			for _, record := range listed_exam_schedules {
				check_start, _ := time.Parse(time_pattern, new_exam_start_time)
				check_end, _ := time.Parse(time_pattern, new_exam_end_time)
				start, _ := time.Parse(time_pattern, record.Exam_Start_Time)
				end, _ := time.Parse(time_pattern, record.Exam_End_Time)

				if inTimeSpan(start, end, check_start) {
					err_message := fmt.Sprintf("Cannot add %s exam schedule. In date %s, room %s, exam start time %s is overlapped with some exam schedule ", new_exam_type, new_exam_date, new_room_id, new_exam_start_time)
					return false, ClassScheduleError{err_message}
				} else if inTimeSpan(start, end, check_end) {
					err_message := fmt.Sprintf("Cannot add %s exam schedule. In date %s, room %s, exam end time %s is overlapped with some exam schedule ", new_exam_type, new_exam_date, new_room_id, new_exam_end_time)
					return false, ClassScheduleError{err_message}

				}
			}
			return true, nil

		}

	} else {
		database.Where("exam_type = ? AND exam_date = ? AND room_id = ?", new_exam_type, new_exam_date, new_room_id).Find(&exam_schedules)
		for _, record := range exam_schedules {
			check_start, _ := time.Parse(time_pattern, new_exam_start_time)
			check_end, _ := time.Parse(time_pattern, new_exam_end_time)
			start, _ := time.Parse(time_pattern, record.Exam_Start_Time)
			end, _ := time.Parse(time_pattern, record.Exam_End_Time)

			if inTimeSpan(start, end, check_start) {
				err_message := fmt.Sprintf("Cannot add exam schedule")
				return false, ClassScheduleError{err_message}
			} else if inTimeSpan(start, end, check_end) {
				err_message := fmt.Sprintf("Cannot add exam schedule")
				return false, ClassScheduleError{err_message}

			}
		}
		return true, nil
	}
}
