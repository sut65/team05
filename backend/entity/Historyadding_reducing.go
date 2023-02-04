package entity

type HistoryType struct {
	History_Type_ID string `gorm:"primaryKey"`
	Type_Name       string
	Adding_reducing []Adding_reducing `gorm:"foreignKey:History_Type_ID"`
}

type Adding_reducing struct {
	Change_ID uint `gorm:"primaryKey"`
	
	History_Type_ID *string
	HistoryType     HistoryType `gorm:"references:History_Type_ID"`

	Enroll_ID *string
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`
}
