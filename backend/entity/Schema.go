package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	admin_name     string
	admin_email    string
	admin_password string
	Professor      []Professor `gorm:"foreignKey:admin_id"`
}

type Qualification struct {
	qualification_name string
	Professor          []Professor `gorm:"foreignKey:qualification_id"`
}

type Status struct {
	status_name string
	Professor   []Professor `gorm:"foreignKey:status_id"`
}

type Major struct {
	major_name string
	Professor  []Professor `gorm:"foreignKey:major_id"`
}

type Professor struct {
	gorm.Model
	ID_card            string
	professor_name     string
	professor_address  string
	professor_email    string
	professor_tel      string
	professor_password string
	admin_id           *uint
	admin              Admin `gorm:"references:id"`
	qualification_id   *uint
	qualification      Qualification `gorm:"references:id"`
	status_id          *uint
	status             Status `gorm:"references:id"`
	major_id           *uint
	major              Major `gorm:"references:id"`
}
