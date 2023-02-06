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

	Payment_Type_ID *string
	Payment_Type    Payment_Type `gorm:"references:Payment_Type_ID"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	Admin_ID *string
	Admin    Admin `gorm:"references:Admin_ID"`

	Receipt_number string `valid:"Receipt_number_check~Receipt_number_check not valid!!"`
	Date_Time      string `valid:"Date_Time~Date_Time not valid!!"`
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
	validator.CustomTypeTagMap.Set("Receipt_number_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[0-9]|[a-zA-Z]`, str)
		return match
	}))
}

func SetDate_TimeValidation() {
	validator.CustomTypeTagMap.Set("Receipt_number_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`[0-9]|[/:.]`, str)
		return match
	}))
	
}
