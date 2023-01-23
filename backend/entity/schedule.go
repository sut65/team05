package entity

type Class_Schedule struct {
	Class_Schedule_ID string `gorm:"primaryKey"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`
	Section    uint

	Admin_ID *string
	Admin    Admin `gorm:"references:Admin_ID"`
	Room_ID  *string
	Room     Room `gorm:"references:Room_ID"`

	Class_Schedule_Description string
	Day                        string
	Start_Time                 string `gorm:"column:start_time;sql:time"`
	End_Time                   string `gorm:"column:end_time;sql:time"`
}

type Exam_Schedule struct {
	Exam_Schedule_ID string `gorm:"primaryKey"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`
	Admin_ID   *string
	Admin      Admin `gorm:"references:Admin_ID"`
	Room_ID    *string
	Room       Room `gorm:"references:Room_ID"`

	Exam_Type string
	Exam_Date string

	Exam_Start_Time string `gorm:"column:exam_start_time;sql:time"`
	Exam_End_Time   string `gorm:"column:exam_end_time;sql:time"`
}
