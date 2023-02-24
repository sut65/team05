package entity

import (
	"regexp"
	"time"

	validator "github.com/asaskevich/govalidator"
)

type Grade struct {
	Grade_ID      string `gorm:"primaryKey"`
	Description   string
	Adding_points []Adding_point `gorm:"foreignKey:Grade_ID"`
}
type Adding_point struct {
	Adding_point_ID uint `gorm:"primaryKey"`
	Date 		time.Time

	Professor_ID *string
	Professor    Professor `gorm:"references:Professor_ID"`

	Enroll_ID *string	`gorm:"UniqueIndex"`
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	Grade_ID string	`valid:"required~Grade cannot be blank,gradeidchecklowercase~Please use uppercase letters,gradeidthaiall~Don't use ThaiAlphabet"`
	Grade    Grade `gorm:"references:Grade_ID "`

	
}


func SetGradeIDValidation() {
	validator.CustomTypeTagMap.Set("gradeidchecklowercase", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([A-Zก-๏+])`, str)
		return match

	}))

	validator.CustomTypeTagMap.Set("gradeidthaiall", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([A-Za-z+])`, str)
		return match

	}))
}
