package entity

import "gorm.io/gorm"

type Status struct {
	// gorm.Model
	Status_ID   string `gorm:"primaryKey"`
	Status_name string
	Professors  []Professor `gorm:"foreignKey:StatusID"`
}
type Professor struct {
	gorm.Model
	Professor_ID       string `gorm:"primaryKey"`
	Professor_name     string
	Professor_address  string
	Professor_email    string
	Professor_tel      string
	Professor_password string

	// Field implemented by B6025121
	// AdminID          *uint
	// Admin           Admin `gorm:"references:id"`
	StatusID *string `valid:"-"`
	Status   Status `gorm:"references:Status_ID" valid:"-"`

	AdminID *string `valid:"-"`
	Admin   Admin `gorm:"references:Admin_ID" valid:"-"`

	Qualification_ID *string `valid:"-"`
	Qualification    Qualification `gorm:"references:Qualification_ID" valid:"-"`

	// Field implemented by B6025121
	// MajorID *uint
	// Major              Major `gorm:"references:id"`

	MajorID *string
	Major   Major `gorm:"references:Major_ID"`

	Subjects  []Subject  `gorm:"foreignKey:Professor_ID"`
	Approvals []Approval `gorm:"foreignKey:Professor_ID"`
}
