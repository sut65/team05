package entity

 

import (
  "gorm.io/gorm"

)

type Adding_reducing struct {
  gorm.Model 
  Change_ID uint `gorm:"primaryKey"`
  Status string 
  //Class_Schedule_ID *string
	//Class_Schedule     Class_Schedule

	Subject_ID *uint
	Subject    Subject `gorm:"references:Subject_ID"`

	Enroll_ID *uint
	Enroll    Enroll  `gorm:"references:Enroll_ID"`

  Student_ID *uint
	Student    Student  `gorm:"references:student_ID"`


  students []Student `gorm:"foreignKey:student_ID"`
  Enrolls []Enroll `gorm:"foreignKey:Enroll_ID"`
  Subjects []Subject `gorm:"foreignKey:Subject_ID"`
  Class_Schedule []Class_Schedule `gorm:"foreignKey:Class_Schedule_ID"`


}
