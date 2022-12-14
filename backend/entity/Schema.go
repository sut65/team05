package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	Admin_ID       string `gorm:"primaryKey"`
	Admin_Email    string
	Admin_Password string
	RoomInforms    []RoomInform `gorm:"foreignKey:AdminID"`
	Courses        []Course     `gorm:"foreignKey:Admin_ID"`
	Professors     []Professor  `gorm:"foreignKey:AdminID"`
	Students       []Student    `gorm:"foreignKey:Student_ID"`
}

type Status struct {
	gorm.Model
	Status_name string
	Professors  []Professor `gorm:"foreignKey:StatusID"`
}

type RoomType struct {
	gorm.Model
	RoomType_name string
	RoomInforms   []RoomInform `gorm:"foreignKey:RoomTypeID"`
}

type Building struct {
	gorm.Model
	Building_name string
	RoomInform    []RoomInform `gorm:"foreignKey:BuildingID"`
}

type RoomInform struct {
	gorm.Model
	Room_number string
	Seats       int
	Time_record time.Time

	RoomTypeID *uint
	RoomType   RoomType `gorm:"references:id"`

	BuildingID *uint
	Building   Building `gorm:"references:id"`

	// Field implemented by B6025121
	// AdminID     *uint
	// Admin       Admin `gorm:"references:id"`

	AdminID *string
	Admin   Admin `gorm:"references:Admin_ID"`
}

type Professor struct {
	gorm.Model
	ID_card            string
	Professor_name     string
	Professor_address  string
	Professor_email    string
	Professor_tel      string
	Professor_password string

	// Field implemented by B6025121
	// AdminID          *uint
	// Admin           Admin `gorm:"references:id"`

	AdminID *string
	Admin   Admin `gorm:"references:Admin_ID"`

	QualificationID *string
	Qualification   Qualification `gorm:"references:Qualification_ID"`

	StatusID *uint
	Status   Status `gorm:"references:id"`

	// Field implemented by B6025121
	// MajorID *uint
	// Major              Major `gorm:"references:id"`

	MajorID *string
	Major   Major `gorm:"references:Major_ID"`

	Subjects []Subject `gorm:"foreignKey:Professor_ID"`
}
