package entity



type Adding_reducing struct {
	
	Change_ID string `gorm:"primaryKey"`
	Status    string
	//Class_Schedule_ID *string
	//Class_Schedule     Class_Schedule 

	Subject_ID *string
	Subject    Subject `gorm:"references:Subject_ID"`

	Enroll_ID *string
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	// students []Student `gorm:"foreignKey:Student_ID"`
	// Enrolls  []Enroll  `gorm:"foreignKey:Enroll_ID"`
	// Subjects []Subject `gorm:"foreignKey:Subject_ID"`
	// Class_Schedule []Class_Schedule `gorm:"foreignKey:Class_Schedule_ID"`
}
