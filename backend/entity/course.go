package entity

import (
	"time"
)

type Qualification struct {
	Qualification_ID   string `gorm:"primaryKey"`
	Qualification_Name string
	Courses            []Course `gorm:"foreignKey:Qualification_ID"`
}

type Admin struct {
	Admin_ID       string `gorm:"primaryKey"`
	Admin_Email    string
	Admin_Password string
	Courses        []Course `gorm:"foreignKey:Admin_ID"`
	Students        []Student `gorm:"foreignKey:Admin_ID"`
}

type Institute struct {
	Institute_ID   string `gorm:"primaryKey"`
	Institute_Name string
	Majors         []Major `gorm:"foreignKey:Institute_ID"`
}

type Major struct {
	Major_ID   string `gorm:"primaryKey"`
	Major_Name string

	Institute_ID *string
	Institute    Institute

	Courses []Course `gorm:"foreignKey:Major_ID"`
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

	Courses       []Course `gorm:"foreignKey:Course_ID"`
}
