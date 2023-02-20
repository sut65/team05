package entity

import "time"

type HistoryType struct {
	History_Type_ID string `gorm:"primaryKey"`
	Type_Name       string
	Adding_reducing []Adding_reducing `gorm:"foreignKey:History_Type_ID"`
}

type Adding_reducing struct {
	Change_ID       uint `gorm:"primaryKey"`
	Date            time.Time
	History_Type_ID *string     `valid:"-"`
	HistoryType     HistoryType `gorm:"references:History_Type_ID" valid:"-"`

	Enroll_ID *string `valid:"-"`
	Enroll    Enroll  `gorm:"references:Enroll_ID"`

	Student_ID *string `valid:"-"`
	Student    Student `gorm:"references:Student_ID"`
}
