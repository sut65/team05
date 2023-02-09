package entity

import (
	"time"
)

// Dormitory
type Dormitory struct {
	Dormitory_ID string `gorm:"primaryKey"`

	Dormitory_Name string
	Students       []Student `gorm:"foreignKey:Dormitory_ID"`
}

type Student struct {
	Student_ID string `gorm:"primaryKey"`

	Student_Name string

	Student_Password string
	Datetime         time.Time

	Admin_ID *string `valid:"-"`
	Admin    Admin   `gorm:"references:Admin_ID" valid:"-"`

	Course_ID *string `valid:"-"`
	Course    Course  `gorm:"references:Course_ID" valid:"-"`

	Dormitory_ID *string   `valid:"-"`
	Dormitory    Dormitory `gorm:"references:Dormitory_ID" valid:"-"`

	Enrolls []Enroll `gorm:"foreignKey:Student_ID" valid:"-"`
}
