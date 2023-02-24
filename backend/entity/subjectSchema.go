package entity

import (
	"regexp"
	"time"

	validator "github.com/asaskevich/govalidator"
)

////---------------------------------------------------------------

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
	ID         uint   `gorm:"primaryKey"`
	Subject_ID string `gorm:"primaryKey" valid:"subject_id_format~Wrong Subject ID Format, required~Subject ID cannot be blank"`

	Professor_ID *string   `valid:"-"`
	Professor    Professor `gorm:"references:Professor_ID" valid:"-"`

	Course_ID *string `valid:"-"`
	Course    Course  `gorm:"references:Course_ID" valid:"-"`

	Subject_Status_ID *string        `valid:"-"`
	Subject_Status    Subject_Status `gorm:"references:Subject_Status_ID" valid:"-"`

	Class_Type_ID *string    `valid:"-"`
	Class_Type    Class_Type `gorm:"references:Class_Type_ID" valid:"-"`

	Subject_Category_ID *string          `valid:"-"`
	Subject_Category    Subject_Category `gorm:"references:Subject_Category_ID" valid:"-"`

	Subject_TH_Name string `valid:"subject_th_name_valid~Incorrect Subject TH Name format!!"`
	Subject_EN_Name string `valid:"subject_en_name_valid~Incorrect Subject EN Name format!!"`

	Capacity      uint
	Enroll_Amount uint

	Latest_Updated time.Time

	Reserved        uint
	Reserved_Enroll uint

	Unit           uint             `valid:"required~Unit must greater than 0"`
	Section        uint             `valid:"required~Section must greater than 0"`
	Enroll         []Enroll         `gorm:"foreignKey:Subject_ID"`
	Requests       []Request        `gorm:"foreignKey:Subject_ID"`
	Class_Schedule []Class_Schedule `gorm:"foreignKey:Subject_ID"`
	Exam_Schedules []Exam_Schedule  `gorm:"foreignKey:Subject_ID"`
}

func SetSubjectValidation() {
	validator.CustomTypeTagMap.Set("subject_id_format", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		if len(str) == 6 {
			return true
		} else if len(str) == 9 {
			match, _ := regexp.MatchString("^[a-zA-Z]{3}[0-9].*$", str)
			return match
		}
		return false
	}))

	validator.CustomTypeTagMap.Set("subject_en_name_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[a-zA-Z\s0-9-]+$`, str)
		return match
	}))

	validator.CustomTypeTagMap.Set("subject_th_name_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[ก-๏\s0-9-]+$`, str)
		return match

	}))
}
