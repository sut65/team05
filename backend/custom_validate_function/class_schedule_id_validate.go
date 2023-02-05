package custom_validate_function

import (
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

func ClassScheduleValidate(new_day string, room entity.Room, new_start_time string, new_end_time string) (bool, error) {

	var class_schedules []entity.Class_Schedule
	database := entity.OpenDatabaseForTesting()

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
