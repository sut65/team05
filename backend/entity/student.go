package entity

import (
	"regexp"
	"time"

	validator "github.com/asaskevich/govalidator"
)

// Dormitory
type Dormitory struct {
	Dormitory_ID string `gorm:"primaryKey"`

	Dormitory_Name string
	Students       []Student `gorm:"foreignKey:Dormitory_ID"`
}

type Student struct {
	Student_ID string `gorm:"primaryKey" valid:"studentchecklenght~Student ID Should be 8 characters,required~Student ID cannot be null"`

	Student_Name string `valid:"studentnamechecklanguage~Student Name cannot be English Language,required~Student Name cannot be null,maxstringlength(30)~Student Name can not greater than 30 character"`

	Student_Password string    `valid:"required~Student Password cannot be null,studentpasswordchecklanguage~Student Password cannot be Thai Language"`
	Datetime         time.Time `valid:"datetimecheckfuture~Datetime cannot be future"`

	Admin_ID *string `valid:"-"`
	Admin    Admin   `gorm:"references:Admin_ID" valid:"-"`

	Course_ID *string `valid:"-"`
	Course    Course  `gorm:"references:Course_ID" valid:"-"`

	Dormitory_ID *string   `valid:"-"`
	Dormitory    Dormitory `gorm:"references:Dormitory_ID" valid:"-"`

	Enrolls []Enroll `gorm:"foreignKey:Student_ID" valid:"-"`
}

func SetStudentIDValidation() {
	validator.CustomTypeTagMap.Set("studentchecklenght", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		if len(str) == 8 {
			return true
		} else {
			return false
		}
	}))

}

func SetStudentDatetimeValidation() {
	validator.CustomTypeTagMap.Set("datetimecheckfuture", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		date := i.(time.Time)
		if date.After(time.Now()) {
			return false
		} else {
			return true
		}
	}))

}

func SetStudentNameValidation() {
	validator.CustomTypeTagMap.Set("studentnamechecklanguage", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([ก-๏0-9])`, str)
		return match

	}))

}
func SetStudentPasswordValidation() {
	validator.CustomTypeTagMap.Set("studentpasswordchecklanguage", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		str := i.(string)
		match, _ := regexp.MatchString(`([a-zA-z0-9])`, str)
		return match

	}))

}
