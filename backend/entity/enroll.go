package entity

type Enroll struct {
	Enroll_ID string `gorm:"primaryKey"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`

	Exam_Schedule_ID *string
	Exam_Schedule    Exam_Schedule

	Class_Schedule_ID *string
	Class_Schedule    Class_Schedule

	Section uint
}
