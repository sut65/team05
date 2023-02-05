package entity

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

	Receipt_number string
	Date_Time string `valid:"required~Date_Time cannot be blank"`
	Unit      uint	`valid:"required~Unit cannot be blank"`
	Payable   uint
	Amounts   uint	`valid:"required~amounts cannot be blank"`
}
