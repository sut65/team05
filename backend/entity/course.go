package entity

import (
	"regexp"
	"time"

	validator "github.com/asaskevich/govalidator"
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
	Course_ID string `gorm:"primaryKey" valid:"courseidcheckul~Course ID cannot be lowercase !!!,courseidthaiall~Course ID  cannot be Thai Language !!!,required~Course ID cannot be null"`

	Course_Name string `valid:"coursenamechecklanguage~Course Name cannot be English Language,required~Course Name cannot be null,maxstringlength(35)~Course Name can not greater than 10 character"`

	Datetime time.Time `valid:"required~Datetime cannot be null,datetimecheckfuture~Datetime cannot be future"`

	Qualification_ID *string       `valid:"-"`
	Qualification    Qualification `gorm:"references:Qualification_ID" valid:"-"`

	Admin_ID *string `valid:"-"`
	Admin    Admin   `gorm:"references:Admin_ID" valid:"-"`

	Major_ID *string `valid:"-"`
	Major    Major   `gorm:"references:Major_ID" valid:"-"`

	Courses  []Course  `gorm:"foreignKey:Course_ID"`
	Subjects []Subject `gorm:"foreignKey:Course_ID"`
}

func SetCourseIDValidation() {
	validator.CustomTypeTagMap.Set("courseidcheckul", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([A-Zก-๏])`, str)
		return match

	}))

	validator.CustomTypeTagMap.Set("courseidthaiall", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([A-Za-z])`, str)
		return match

	}))
}
func SetCourseNameValidation() {
	validator.CustomTypeTagMap.Set("coursenamechecklanguage", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([ก-๏0-9])`, str)
		return match

	}))

}
func SetCourseDatetimeValidation() {
	validator.CustomTypeTagMap.Set("datetimecheckfuture", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		date := i.(time.Time)
		if date.After(time.Now()) {
			return false
		} else {
			return true
		}
	}))

}
