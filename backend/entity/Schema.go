package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Admin_name     string
	Admin_email    string
	Admin_password string
	Professors     []Professor `gorm:"foreignKey:AdminID"`
}

type Qualification struct {
	gorm.Model
	Qualification_name string
	Professors         []Professor `gorm:"foreignKey:QualificationID"`
}

type Status struct {
	gorm.Model
	Status_name string
	Professors  []Professor `gorm:"foreignKey:StatusID"`
}

type Major struct {
	gorm.Model
	Major_name string
	Professors []Professor `gorm:"foreignKey:MajorID"`
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
	RoomTypeID  *uint
	RoomType    RoomType `gorm:"references:id"`
	BuildingID  *uint
	Building    Building `gorm:"references:id"`
	AdminID     *uint
	Admin       Admin `gorm:"references:id"`
}

type Professor struct {
	gorm.Model
	ID_card            string
	Professor_name     string
	Professor_address  string
	Professor_email    string
	Professor_tel      string
	Professor_password string
	AdminID            *uint
	Admin              Admin `gorm:"references:id"`
	QualificationID    *uint
	Qualification      Qualification `gorm:"references:id"`
	StatusID           *uint
	Status             Status `gorm:"references:id"`
	MajorID            *uint
	Major              Major `gorm:"references:id"`
}
