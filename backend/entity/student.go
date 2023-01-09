package entity

import (
	"time"
)

type Dormitory struct {
	Dormitory_ID   string `gorm:"primaryKey"`
	Dormitory_Name string
	Students       []Student `gorm:"foreignKey:Dormitory_ID"`
}

type Student struct {
	Student_ID       string `gorm:"primaryKey"`
	Student_Name     string
	Student_Password string
	Datetime         time.Time

	Admin_ID *string
	Admin    Admin

	Course_ID *string
	Course    Course

	Dormitory_ID *string
	Dormitory    Dormitory

	Enroll []Enroll `gorm:"foreignKey:Student_ID"`
}
