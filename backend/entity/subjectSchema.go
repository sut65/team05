package entity

import (
	"regexp"

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
	Subject_ID string `gorm:"primaryKey" valid:"stringlength~Wrong Subject ID Format"`

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

	Subject_TH_Name string `valid:"subject_th_name_valid~Incorrect Subject TH Name format!!"`
	Subject_EN_Name string `valid:"subject_en_name_valid~Incorrect Subject EN Name format!!"`

	Capacity      uint
	Enroll_Amount uint

	Reserved        uint
	Reserved_Enroll uint

	Unit           uint `valid:"required~Unit must greater than 0"`
	Section        uint
	Enroll         []Enroll         `gorm:"foreignKey:Subject_ID"`
	Requests       []Request        `gorm:"foreignKey:Subject_ID"`
	Class_Schedule []Class_Schedule `gorm:"foreignKey:Subject_ID"`
	Exam_Schedules []Exam_Schedule  `gorm:"foreignKey:Subject_ID"`
}

func SetSubjectValidation() {
	validator.CustomTypeTagMap.Set("stringlength", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		if len(str) == 6 {
			return true
		} else if len(str) == 9 {
			match, _ := regexp.MatchString("^[a-zA-Z]{3}.*$", str)
			return match
		}
		return false
	}))

	validator.CustomTypeTagMap.Set("subject_en_name_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[a-zA-Z\s0-9]+$`, str)
		return match
	}))

	validator.CustomTypeTagMap.Set("subject_th_name_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[ก-๏\s0-9]+$`, str)
		return match

	}))
}
