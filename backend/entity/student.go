package entity

import (
	"time"
)

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

	Admin_ID *string
	Admin    Admin `gorm:"references:Admin_ID"`

	Course_ID *string
	Course    Course `gorm:"references:Course_ID"`

	Dormitory_ID *string
	Dormitory    Dormitory `gorm:"references:Dormitory_ID"`

	Enrolls []Enroll `gorm:"foreignKey:Student_ID"`
}
