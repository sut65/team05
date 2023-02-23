package entity

import (
	"regexp"
	"time"
	validator "github.com/asaskevich/govalidator"
)

type Payment_Type struct {
	Payment_Type_ID   string `gorm:"primaryKey"`
	Payment_Type_Name string
	Payments          []Payment `gorm:"foreignKey:Payment_ID"`
}

type Payment struct {
	Payment_ID uint `gorm:"primaryKey"`

	Payment_Type_ID *string	`valid:"-"`
	Payment_Type    Payment_Type `gorm:"references:Payment_Type_ID" valid:"-"`

	Student_ID *string	`valid:"-"`
	Student    Student `gorm:"references:Student_ID" valid:"-"`

	Admin_ID *string `valid:"-"`
	Admin    Admin `gorm:"references:Admin_ID" valid:"-"`

	Receipt_number string `valid:"receipt_thai_check~receipt number cannot be thai character,receipt_english_check~receipt number cannot be special character"`
	Date_Time      time.Time `valid:"datetimecheckfutures~Date_Time cannot be future"`
	Unit           uint   `valid:"required~Unit cannot be blank"`
	Payable        uint `valid:"required~Amounts cannot be blank"`
	Amounts        uint `valid:"required~Amounts cannot be blank"`
}

// func SetPaymentValidation() {
// 	validator.CustomTypeTagMap.Set("amount_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
// 		str := i.(string)
// 		match, _ := regexp.MatchString(`[0-9]`, str)
// 		return match
// 	}))
// }

func SetReceipt_numberValidation() {
	validator.CustomTypeTagMap.Set("receipt_english_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[a-zก-๏0-9]`, str)
		return match
	}))

	validator.CustomTypeTagMap.Set("receipt_thai_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[0-9#$@!*]`, str)
		return match
	}))
}

// func SetDate_TimeValidation() {
// 	validator.CustomTypeTagMap.Set("datetime", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
// 		str := i.(string)
// 		match, _ := regexp.MatchString(`[0-9]|[/:.]`, str)
// 		return match
// 	}))
// }
func SetPaymentDatetimeValidation() {
	validator.CustomTypeTagMap.Set("datetimecheckfutures", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {

		date := i.(time.Time)
		if date.After(time.Now()) {
			return false
		} else {
			return true
		}
	}))
}
