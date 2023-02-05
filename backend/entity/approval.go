package entity

import (
	"regexp"

	validator "github.com/asaskevich/govalidator"
)

// * ====================== Request System ======================

type Approval_Type struct {
	Approval_Type_ID   string `gorm:"primaryKey"`
	Approval_Type_Name string
	Approval           []Approval `gorm:"foreignKey:Approval_Type_ID"`
}
type Approval struct {
	// gorm.Model

	Approval_ID uint `gorn:"primaryKey"`

	Reason string `valid:"required~Reason cannot be blank,approval_valid~Reason cannot be special characters or number"`

	Professor_ID *string
	Professor    Professor `gorm:"references:Professor_ID"`
	Section      uint

	Request_ID *uint
	Request    Request `gorm:"references:Request_ID"`

	Approval_Type_ID *string
	Approval_Type    Approval_Type `gorm:"references:Approval_Type_ID"`
}


func SetApprovalValidation() {
	validator.CustomTypeTagMap.Set("approval_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[a-zA-Z\sก-๏]+$`, str)
		return match
	}))
}
