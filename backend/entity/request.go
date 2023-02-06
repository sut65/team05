package entity
import (
	"regexp"

	validator "github.com/asaskevich/govalidator"
)
// * ====================== Request System ======================

type Request_Type struct {
	Request_Type_ID   string `gorm:"primaryKey"`
	Request_Type_Name string
	Request           []Request `gorm:"foreignKey:Request_Type_ID"`
}
type Request struct {
	// gorm.Model

	Request_ID uint `gorm:"primaryKey"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	Subject_ID *string 
	Subject    Subject `gorm:"references:Subject_ID"`
	Section    uint

	Reason          string `valid:"required~Reason cannot be blank,reason_valid~Reason cannot be special characters or number,maxstringlength(30)~The reason cannot be more than 30 characters"`
	
	
	Request_Type_ID *string
	Request_Type    Request_Type `gorm:"references:Request_Type_ID"`
}


func SetRequestValidation() {
	validator.CustomTypeTagMap.Set("reason_valid", validator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		str := i.(string)
		match, _ := regexp.MatchString(`^[a-zA-Z\sก-๏]+$`, str)
		return match
	}))
}
