package entity

import (
	"time"

	"gorm.io/gorm"
)

type Institute struct {
	Institute_ID   string `gorm:"primaryKey"`
	Institute_Name string
	Majors         []Major `gorm:"foreignKey:Institute_ID"`
}

type Major struct {
	Major_ID   string `gorm:"primaryKey"`
	Major_Name string

	Institute_ID *string
	Institute    Institute `gorm:"references:Institute_ID"`

	Professors []Professor `gorm:"foreignKey:MajorID"`

	Courses []Course `gorm:"foreignKey:Major_ID"`
}

////---------------------------------------------------------------

// Not completed entity. Waiting Archawat to complete this
type Course struct {
	Course_ID   string `gorm:"primaryKey"`
	Course_Name string
	Datetime    time.Time

	Admin_ID *string
	Admin    Admin `gorm:"references:Admin_ID"`

	Major_ID *string
	Major    Major `gorm:"references:Major_ID"`

	Qualification_ID *uint
	Qualification    Qualification `gorm:"references:id"`

	Subjects []Subject `gorm:"foreignKey:Course_ID"`
}

type Subject_Status struct {
	Subject_Status_ID          string `gorm:"primaryKey"`
	Subject_Status_Description string

	Subjects []Subject `gorm:"foreignKey:Subject_Status_ID"`
}

type Class_Type struct {
	Class_Type_ID   string `gorm:"primaryKey"`
	Class_Type_Name string

	Subjects []Subject `gorm:"foreignKey:Class_Type_ID"`
}

type Subject_Category struct {
	Subject_Category_ID   string `gorm:"primaryKey"`
	Subject_Category_Name string

	Subjects []Subject `gorm:"foreignKey:Subject_Category_ID"`
}

type Subject struct {
	// ID         uint   `gorm:"primaryKey"`

	gorm.Model
	Subject_ID string `gorm:"primaryKey"`

	Professor_ID *uint
	Professor    Professor `gorm:"references:id"`

	Course_ID *string
	Course    Course `gorm:"references:Course_ID"`

	Subject_Status_ID *string
	Subject_Status    Subject_Status `gorm:"references:Subject_Status_ID"`

	Class_Type_ID *string
	Class_Type    Class_Type `gorm:"references:Class_Type_ID"`

	Subject_Category_ID *string
	Subject_Category    Subject_Category `gorm:"references:Subject_Category_ID"`

	Subject_TH_Name string
	Subject_EN_Name string

	Capacity uint
	Enroll   uint

	Reserved        uint
	Reserved_Enroll uint

	Unit    uint
	Section uint
}

/*

package entity

import "time"

type Admin struct {
	Admin_ID       string `gorm:"primaryKey"`
	Admin_Email    string
	Admin_Password string
	Courses        []Course `gorm:"references:Admin_ID"`
}

type Institute struct {
	Institute_ID   string `gorm:"primaryKey"`
	Institute_Name string
	Majors         []Major `gorm:"references:Institute_ID"`
}

type Major struct {
	Major_ID   string `gorm:"primaryKey"`
	Major_Name string

	Institute_ID *string
	Institute    Institute
	Courses      []Course `gorm:"references:Major_ID"`
}

type Course struct {
	Course_ID   string `gorm:"primaryKey"`
	Course_Name string
	Datetime    time.Time

	Admin_ID *string
	Admin    Admin

	Major_ID *string
	Major    Major

	// Quantification_ID	*string
	// Quantification		Quantification

	Subjects []Subject `gorm:"references:Course_ID"`
}

type Professor struct {
	Professor_ID      string `gorm:"primaryKey"`
	Professor_Name    string
	Professor_Address string
	Professor_Email   string
	Professor_Tel     string

	// Quantification_ID	*string
	// Quantification		Quantification

	// Professor_Status_ID	*string
	// Professor_Status	Professor_Status

	Admin_ID *string
	Admin    Admin

	Major_ID *string
	Major    Major

	Password string

	Subjects []Subject `gorm:"references:Professor_ID"`
}

type Subject_Status struct {
	Subject_Status_ID          string `gorm:"primaryKey"`
	Subject_Status_Description string

	Subjects []Subject `gorm:"references:Subject_Status_ID"`
}

type Class_Type struct {
	Class_Type_ID   string `gorm:"primaryKey"`
	Class_Type_Name string

	Subjects []Subject `gorm:"references:Class_Type_ID"`
}

type Subject_Category struct {
	Subject_Category_ID   string `gorm:"primaryKey"`
	Subject_Category_Name string

	Subjects []Subject `gorm:"references:Subject_Category_ID"`
}

type Subject struct {
	ID         uint   `gorm:"primaryKey"`
	Subject_ID string `gorm:"primaryKey"`

	Professor_ID *string
	Professor    Professor

	Course_ID *string
	Course    Course

	Subject_Status_ID *string
	Subject_Status    Subject_Status

	Class_Type_ID *string
	Class_Type    Class_Type

	Subject_Category_ID *string
	Subject_Category    Subject_Category

	Subject_TH_Name string
	Subject_EN_Name string

	Capacity uint
	Enroll   uint

	Reserved        uint
	Reserved_Enroll uint

	Unit    uint
	Section uint
}


*/
