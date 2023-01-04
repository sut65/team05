package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Admin_name     string
	Admin_email    string
	Admin_password string
	Professors     []Professor `gorm:"foreignKey:Admin_id"`
}

type Qualification struct {
	gorm.Model
	Qualification_name string
	Professors         []Professor `gorm:"foreignKey:Qualification_id"`
}

type Status struct {
	gorm.Model
	Status_name string
	Professors  []Professor `gorm:"foreignKey:Status_id"`
}

type Major struct {
	gorm.Model
	Major_name string
	Professors []Professor `gorm:"foreignKey:Major_id"`
}

type Professor struct {
	gorm.Model
	ID_card            string
	Professor_name     string
	Professor_address  string
	Professor_email    string
	Professor_tel      string
	Professor_password string
	Admin_id           *uint
	Admin              Admin `gorm:"references:id"`
	Qualification_id   *uint
	Qualification      Qualification `gorm:"references:id"`
	Status_id          *uint
	Status             Status `gorm:"references:id"`
	Major_id           *uint
	Major              Major `gorm:"references:id"`
}
