package entity

type HistoryType struct {
	HistoryType_ID string`gorm:"primaryKey"`
	Type_Name  string
	Adding_reducing []Adding_reducing `gorm:"foreignKey:HistoryType_ID"`
}

type Adding_reducing struct {
	
	Change_ID uint `gorm:"primaryKey"`
	Status    string
	
	HistoryType_ID *string
	HistoryType		HistoryType`gorm:"references:HistoryType_ID"`

	Enroll_ID *string
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	Student_ID *string
	Student    Student `gorm:"references:Student_ID"`

	
}
