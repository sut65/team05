package entity

type Adding_reducing struct {
	
	Change_ID uint `gorm:"primaryKey"`
	Status    string
	

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`

	Enroll_ID *string
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	// Student_ID *string
	// Student    Student `gorm:"references:Student_ID"`

	
}
