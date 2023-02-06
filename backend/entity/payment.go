package entity

import (
	"regexp"

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

	Receipt_number string `valid:"receipt_thai_check~receipt number cannot be thai character,receipt_english_check~receipt number cannot be english character"`
	Date_Time      string `valid:"datetime~datetime not valid!!"`
	Unit           uint   `valid:"required~Unit cannot be blank"`
	Payable        uint
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
		match, _ := regexp.MatchString(`[0-9ก-๏]`, str)
		return match
	}))

	validator.CustomTypeTagMap.Set("receipt_thai_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[a-zA-Z0-9]`, str)
		return match
	}))
}

func SetDate_TimeValidation() {
	validator.CustomTypeTagMap.Set("datetime", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[0-9]|[/:.]`, str)
		return match
	}))
}
