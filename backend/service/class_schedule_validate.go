package service

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/B6025212/team05/entity"
)

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

type ClassScheduleError struct {
	msg string
}

func (e ClassScheduleError) Error() string {
	return e.msg
}

func ValidateClassScheduleUnique(new_day string, room entity.Room, new_start_time string, new_end_time string, subject entity.Subject) (bool, error) {
	time_pattern := "15:04"
	var class_schedules []entity.Class_Schedule
	database := entity.OpenDatabase()
	fmt.Println(new_day, room.Room_ID, new_start_time, new_end_time, subject.Subject_ID)

	// ตรวจสอบว่าใน database มีรายวิชาอื่น ที่ใช้ห้องในวันดังกล่าว และช่วงเวลาดังกล่าวหรือไม่
	// E.g. SELECT * FROM class_schedules WHERE room_id = 'B2101' AND day = 'Mon' AND subject_id != '523332' AND start_time = '13:00' AND end_time = '15:00'
	// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
	if tx := database.Where("room_id = ? AND day = ? AND subject_id != ? AND start_time = ? AND end_time = ?", room.Room_ID, new_day, subject.Subject_ID, new_start_time, new_end_time).Find(&class_schedules); tx.RowsAffected >= 1 {
		err_message := fmt.Sprintf("Cannot add class schedule. In day %s, room %s, in time interval %s - %s, already occupied", new_day, room.Room_ID, new_start_time, new_end_time)
		return false, ClassScheduleError{err_message}

		// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องในวันดังกล่าวหรือไม่
		// E.g. SELECT * FROM class_schedules WHERE room_id = 'B2101' AND day = 'Mon' AND subject_id != '523332'
		// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
	} else if tx := database.Where("room_id = ? AND day = ? AND subject_id != ?", room.Room_ID, new_day, subject.Subject_ID).Find(&class_schedules); tx.RowsAffected >= 1 {
		var listed_class_schedules = class_schedules

		// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องในวันดังกล่าว และมี start_time ตรงกันหรือไม่
		// E.g. SELECT * FROM class_schedules WHERE room_id = 'B2101' AND day = 'Mon' AND start_time = '13:00' AND subject_id != '523331'
		// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
		if tx := database.Where("room_id = ? AND day = ? AND start_time = ? AND subject_id != ?", room.Room_ID, new_day, new_start_time, subject.Subject_ID).Find(&class_schedules); tx.RowsAffected >= 1 {

			err_message := fmt.Sprintf("Cannot add class schedule. In day %s, room %s, start time %s already occupied", new_day, room.Room_ID, new_start_time)
			return false, ClassScheduleError{err_message}

			// ตรวจสอบว่าใน database มีรายวิชาอื่นที่ใช้ห้องในวันดังกล่าว และมี end_time ตรงกันหรือไม่
			// E.g. SELECT * FROM class_schedules WHERE room_id = 'B2101' AND day = 'Mon' AND end_time = '15:00' AND subject_id != '523331'
			// ถ้าไม่เจอจะไม่เข้าเงื่อนไขนี้
		} else if tx := database.Where("room_id = ? AND day = ? AND end_time = ? AND subject_id != ?", room.Room_ID, new_day, new_end_time, subject.Subject_ID).Find(&class_schedules); tx.RowsAffected >= 1 {
			err_message := fmt.Sprintf("Cannot add class schedule. In day %s, room %s, end time %s already occupied", new_day, room.Room_ID, new_end_time)
			return false, ClassScheduleError{err_message}

			// เมื่อตรวจสอบแล้ว ไม่มีรายวิชาอื่นที่ใช้ห้องในวันดังกล่าวใน database เลย
			// ตรวจสอบช่วงเวลาที่เหลื่อมล้ำกัน รวมรายวิชาอื่นและรายวิชาที่เพิ่มเข้ามาด้วย
		} else {

			database.Where("room_id = ? AND day = ?", room.Room_ID, new_day).Find(&listed_class_schedules)
			for _, record := range listed_class_schedules {
				check_start, _ := time.Parse(time_pattern, new_start_time)
				check_end, _ := time.Parse(time_pattern, new_end_time)
				start, _ := time.Parse(time_pattern, record.Start_Time)
				end, _ := time.Parse(time_pattern, record.End_Time)

				if inTimeSpan(start, end, check_start) {
					err_message := fmt.Sprintf("Cannot add class schedule. In day %s, room %s, start time %s is overlapped with some class schedule ", new_day, room.Room_ID, new_start_time)
					return false, ClassScheduleError{err_message}
				} else if inTimeSpan(start, end, check_end) {
					err_message := fmt.Sprintf("Cannot add class schedule. In day %s, room %s, end time %s is overlapped with some class schedule ", new_day, room.Room_ID, new_end_time)
					return false, ClassScheduleError{err_message}

				}
			}
			return true, nil
		}
	} else {
		database.Where("room_id = ? AND day = ?", room.Room_ID, new_day).Find(&class_schedules)
		for _, record := range class_schedules {
			check_start, _ := time.Parse(time_pattern, new_start_time)
			check_end, _ := time.Parse(time_pattern, new_end_time)
			start, _ := time.Parse(time_pattern, record.Start_Time)
			end, _ := time.Parse(time_pattern, record.End_Time)

			if inTimeSpan(start, end, check_start) {
				err_message := fmt.Sprintf("Cannot add %s class schedule. start time %s is overlapped", subject.Subject_ID, new_start_time)
				return false, ClassScheduleError{err_message}
			} else if inTimeSpan(start, end, check_end) {
				err_message := fmt.Sprintf("Cannot add %s class schedule. end time %s is overlapped", subject.Subject_ID, new_end_time)
				return false, ClassScheduleError{err_message}
			}
		}

		return true, nil
	}
}

func ValidateClassScheduleID(class_schedule_id string, new_class_schedule entity.Class_Schedule) (bool, error) {

	split_class_schedule := strings.Split(class_schedule_id, "-")
	// split_class_schedule = [CLS523332 1 B2101 Mon 13:00 15:00]
	new_subject_id := split_class_schedule[0][3:]
	new_section := split_class_schedule[1]
	new_room := split_class_schedule[2]
	new_day := split_class_schedule[3]
	new_start_time := split_class_schedule[4]
	new_end_time := split_class_schedule[5]

	if new_class_schedule.Subject.Subject_ID != new_subject_id ||
		strconv.Itoa(int(new_class_schedule.Section)) != new_section ||
		new_class_schedule.Room.Room_ID != new_room || new_class_schedule.Day != new_day ||
		new_class_schedule.Start_Time != new_start_time || new_class_schedule.End_Time != new_end_time {
		return false, ClassScheduleError{"Class Schedule ID format is not same as insert fields"}
	}

	return true, nil
}
