package entity

import (
	"regexp"

	validator "github.com/asaskevich/govalidator"
)

// * ====================== Request System ======================

type Approval_Type struct {
	Approval_Type_ID   string `gorm:"primaryKey"`
	Approval_Type_Name string
	Approval           []Approval `gorm:"foreignKey:Approval_Type_ID" ` 
}
type Approval struct {
	// gorm.Model

	Approval_ID uint `gorm:"primaryKey"`

	Professor_ID *string   `valid:"-"`
	Professor    Professor `gorm:"references:Professor_ID" valid:"-"`
	Section      uint

	Request_ID *uint   `gorm:"UniqueIndex" valid:"-"`
	Request    Request `gorm:"references:Request_ID" valid:"-"`

	Reason string `valid:"required~Reason cannot be blank,approval_check~Reason cannot be special characters or number,maxstringlength(30)~The reason cannot be more than 30 characters"`
	// `valid:" required~Reason cannot be blank,approval_check~Reason cannot be special characters or number"`

	Approval_Type_ID *string       `valid:"-"`
	Approval_Type    Approval_Type `gorm:"references:Approval_Type_ID" valid:"-"`
}

func SetApprovalValidation() {
	validator.CustomTypeTagMap.Set("approval_check", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[a-zA-Z\sก-๏]+$`, str)
		return match
	}))
}
