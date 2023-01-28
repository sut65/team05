package entity

import (
	"time"
)

// วุฒิ
type Qualification struct {
	Qualification_ID string `gorm:"primaryKey"`

	Qualification_Name string

	Courses []Course `gorm:"foreignKey:Qualification_ID"`
}

type Institute struct {
	Institute_ID   string `gorm:"primaryKey"`
	Institute_Name string
	Majors         []Major `gorm:"foreignKey:Institute_ID"`
}

type Major struct {
	Major_ID string `gorm:"primaryKey"`

	Major_Name string

	Institute_ID *string
	Institute    Institute `gorm:"references:Institute_ID"`

	Courses    []Course    `gorm:"foreignKey:Major_ID"`
	Professors []Professor `gorm:"foreignKey:MajorID"`
}

// หลักสูตร
type Course struct {
	Course_ID string `gorm:"primaryKey"`

	Course_Name string

	Datetime time.Time

	Qualification_ID *string
	Qualification    Qualification `gorm:"references:Qualification_ID"`

	Admin_ID *string
	Admin    Admin `gorm:"references:Admin_ID"`

	Major_ID *string
	Major    Major `gorm:"references:Major_ID"`

	Courses  []Course  `gorm:"foreignKey:Course_ID"`
	Subjects []Subject `gorm:"foreignKey:Course_ID"`
}
