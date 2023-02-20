package entity
import (
	"time"
)

type Enroll struct {
	Enroll_ID string `gorm:"primaryKey"`

	Student_ID *string `valid:"-"`
	Student    Student `gorm:"references:Student_ID" valid:"-"`

	Subject_ID *string `valid:"-"`
	Subject    Subject `gorm:"references:Subject_ID" valid:"-"`

	Exam_Schedule_ID *string `valid:"-"`
	Exam_Schedule    Exam_Schedule `gorm:"references:Exam_Schedule_ID" valid:"-"`

	Class_Schedule_ID *string `valid:"-"`
	Class_Schedule    Class_Schedule `gorm:"references:Class_Schedule_ID" valid:"-"`

	Enroll_Time_Stamp time.Time
   
	Section uint
}
