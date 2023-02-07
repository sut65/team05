package service

import (
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

func ValidateClassScheduleUnique(new_day string, room entity.Room, new_start_time string, new_end_time string) (bool, error) {

	var class_schedules []entity.Class_Schedule
	database := entity.OpenDatabase()

	if tx := database.Where("room_id = ? AND day = ?", room.Room_ID, new_day).Find(&class_schedules); tx.RowsAffected >= 1 {
		var listed_class_schedules = class_schedules
		if tx := database.Where("room_id = ? AND day = ? AND start_time = ?", room.Room_ID, new_day, new_start_time).Find(&class_schedules); tx.RowsAffected >= 1 {
			return false, ClassScheduleError{"Cannot add class schedule, this start time's already occupied"}
		} else if tx := database.Where("room_id = ? AND day = ? AND end_time = ?", room.Room_ID, new_day, new_end_time).Find(&class_schedules); tx.RowsAffected >= 1 {

			return false, ClassScheduleError{"Cannot add class schedule, this end time's already occupied"}
		} else {
			time_pattern := "15:04"

			for _, record := range listed_class_schedules {
				check_start, _ := time.Parse(time_pattern, new_start_time)
				check_end, _ := time.Parse(time_pattern, new_end_time)
				start, _ := time.Parse(time_pattern, record.Start_Time)
				end, _ := time.Parse(time_pattern, record.End_Time)

				if inTimeSpan(start, end, check_start) {
					return false, ClassScheduleError{"Cannot add class schedule, start time is overlapped"}
				} else if inTimeSpan(start, end, check_end) {
					return false, ClassScheduleError{"Cannot add class schedule, end time is overlapped"}

				}
			}
			return true, nil
		}
	} else {
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
