package entity

import (
	"time"
)

type Enroll struct {
	Enroll_ID string `gorm:"primaryKey"`

	//Stdent_ID string

	Course_ID *string
	Course    Course `gorm:"references:Course_ID"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`

	Room_Number string

	Day string

	Start_Time time.Time

	End_Time time.Time

	Exam_Schedule_ID string

	Section uint

	Unit uint
}
