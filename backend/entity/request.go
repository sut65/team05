package entity

// * ====================== Request System ======================

type Request_Type struct {
	Request_Type_ID   string `gorm:"primaryKey"`
	Request_Type_Name string
	Request           []Request `gorm:"foreignKey:Request_Type_ID"`
}
type Request struct {
	// gorm.Model

	Request_ID uint `gorm:"primaryKey"`

	Reason string

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`

	Request_Type_ID *string
	Request_Type    Request_Type `gorm:"references:Request_Type_ID"`
}
