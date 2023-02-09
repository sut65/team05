package entity

// "gorm.io/driver/sqlite"
// "gorm.io/gorm"

type Class_Schedule struct {
	Class_Schedule_ID string `gorm:"primaryKey" valid:"required~Class Schedule ID Cannot be blank"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID" valid:"-"`
	Section    uint

	Admin_ID *string `valid:"-"`
	Admin    Admin   `gorm:"references:Admin_ID" valid:"-"`
	Room_ID  *string `valid:"-"`
	Room     Room    `gorm:"references:Room_ID" valid:"-"`

	Class_Schedule_Description string
	Day                        string
	Start_Time                 string `gorm:"column:start_time;sql:time"`
	End_Time                   string `gorm:"column:end_time;sql:time"`
}

type Exam_Schedule struct {
	Exam_Schedule_ID string `gorm:"primaryKey" valid:"required~Exam Schedule ID Cannot be blank"`

	Subject_ID *string `valid:"-"`
	Subject    Subject `gorm:"references:Subject_ID" valid:"-"`
	Admin_ID   *string `valid:"-"`
	Admin      Admin   `gorm:"references:Admin_ID" valid:"-"`
	Room_ID    *string `valid:"-"`
	Room       Room    `gorm:"references:Room_ID" valid:"-"`

	Exam_Type string
	Exam_Date string

	Exam_Start_Time string `gorm:"column:exam_start_time;sql:time"`
	Exam_End_Time   string `gorm:"column:exam_end_time;sql:time"`
}

// 	var class_schedules []Class_Schedule
// 	new_class_schedule := strings.Split(class_schedule_id, "-")

// 	new_day := new_class_schedule[3]
// 	new_room := new_class_schedule[2]
// 	new_start_time := fmt.Sprintf("%s:%s", new_class_schedule[4][0:2], new_class_schedule[4][2:4])
// 	new_end_time := fmt.Sprintf("%s:%s", new_class_schedule[5][0:2], new_class_schedule[5][2:4])

// 	// if ค้นหาข้อมูล class_schedule ที่ room_id เท่ากัน, day เท่ากัน แล้วเจอข้อมูล then
// 	if tx := database.Where("room_id = ? AND day = ?", new_room, new_day).Find(&class_schedules); tx.RowsAffected >= 1 {
// 		var listed_class_schedules = class_schedules

// 		// if เจอข้อมูล class_schedule ที่ room_id = current_room_id, day = current_day, start_time = current_start_time then
// 		if tx := DB().Where("room_id = ? AND day = ? AND start_time = ?", new_room, new_day, new_start_time).Find(&class_schedules); tx.RowsAffected >= 1 {
// 			// fmt.Println("Cannot insert class_schedule")
// 			// fmt.Printf("In Day: %s Room_ID: %s\n", new_day, new_room)
// 			// fmt.Println("Because room_id, day and start_time is same")
// 			// return false
// 			// else if เจอข้อมูล class_schedule ที่ room_id = current_room_id, day = current_day, end_time = current_end_time then
// 		} else if tx := DB().Where("room_id = ? AND day = ? AND end_time = ?", new_room, new_day, new_end_time).Find(&class_schedules); tx.RowsAffected >= 1 {

// 			// fmt.Println("Cannot insert class_schedule")
// 			// fmt.Printf("In Day: %s Room_ID: %s\n", new_day, new_room)
// 			// fmt.Println("Because room_id, day and end_time is same")
// 			return false
// 		} else {
// 			time_pattern := "15:04"

// 			for _, record := range listed_class_schedules {

// 				// Parse time string to time.Time
// 				check_start, _ := time.Parse(time_pattern, new_start_time)
// 				check_end, _ := time.Parse(time_pattern, new_end_time)
// 				start, _ := time.Parse(time_pattern, record.Start_Time)
// 				end, _ := time.Parse(time_pattern, record.End_Time)

// 				// if นำ current_start_time ไปเช็คว่าอยู่ในช่วงเวลาของข้อมูล search_class_schedule แล้วเจออย่างน้อย 1 แถว then

// 				if inTimeSpan(start, end, check_start) {
// 					fmt.Println("Cannot insert class_schedule")
// 					fmt.Printf("In Day: %s Room_ID: %s\n", new_day, new_room)
// 					fmt.Printf("Because Start Time %s is in interval %s-%s\n", new_start_time, record.Start_Time, record.End_Time)
// 					return false
// 					// else if นำ current_end_time ไปเช็คว่าอยู่ในช่วงเวลาของข้อมูล search_class_schedule แล้วเจออย่างน้อย 1 แถว then
// 				} else if inTimeSpan(start, end, check_end) {
// 					fmt.Println("Cannot insert class_schedule")
// 					fmt.Printf("In Day: %s Room_ID: %s\n", new_day, new_room)
// 					fmt.Printf("Because End Time %s is in interval %s-%s\n", new_end_time, record.Start_Time, record.End_Time)
// 					return false
// 				}
// 				return true
// 			}
// 		}
// 	} else {
// 		return true
// 	}
// 	return true
// }))
