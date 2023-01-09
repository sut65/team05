package entity

import (
	"time"
)

type Qualification struct {
	Qualification_ID   string `gorm:"primaryKey" valid:"required~Std cannot be blank"`
	Qualification_Name string
	Qualifications            []Qualification `gorm:"foreignKey:Qualification_ID"`
}

type Admin struct {
	Admin_ID       string `gorm:"primaryKey"`
	Admin_Email    string
	Admin_Password string
	Admins        []Admin `gorm:"foreignKey:Admin_ID"`
}

type Institute struct {
	Institute_ID   string `gorm:"primaryKey"`
	Institute_Name string
	Institutes        []Institute `gorm:"foreignKey:Institute_ID"`
}

type Major struct {
	Major_ID   string `gorm:"primaryKey"`
	Major_Name string

	Institute_ID *string
	Institute    Institute

	Majors []Major `gorm:"foreignKey:Major_ID"`
}

type Course struct {
	Course_ID   string `gorm:"primaryKey"`
	Course_Name string
	Datetime    time.Time

	Qualification_ID *string
	Qualification    Qualification

	Admin_ID *string
	Admin    Admin

	Major_ID *string
	Major    Major
}
