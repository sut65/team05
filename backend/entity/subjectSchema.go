package entity

////---------------------------------------------------------------

type Subject_Status struct {
	Subject_Status_ID          string `gorm:"primaryKey"`
	Subject_Status_Description string

	Subjects []Subject `gorm:"foreignKey:Subject_Status_ID"`
}

type Class_Type struct {
	Class_Type_ID   string `gorm:"primaryKey"`
	Class_Type_Name string

	Subjects []Subject `gorm:"foreignKey:Class_Type_ID"`
}

type Subject_Category struct {
	Subject_Category_ID   string `gorm:"primaryKey"`
	Subject_Category_Name string

	Subjects []Subject `gorm:"foreignKey:Subject_Category_ID"`
}

type Subject struct {
	ID         uint   `gorm:"primaryKey"`
	Subject_ID string `gorm:"primaryKey"`

	Professor_ID *uint
	Professor    Professor `gorm:"references:id"`

	Course_ID *string
	Course    Course `gorm:"references:Course_ID"`

	Subject_Status_ID *string
	Subject_Status    Subject_Status `gorm:"references:Subject_Status_ID"`

	Class_Type_ID *string
	Class_Type    Class_Type `gorm:"references:Class_Type_ID"`

	Subject_Category_ID *string
	Subject_Category    Subject_Category `gorm:"references:Subject_Category_ID"`

	Subject_TH_Name string
	Subject_EN_Name string

	Capacity      uint
	Enroll_Amount uint

	Reserved        uint
	Reserved_Enroll uint

	Unit     uint
	Section  uint
	Enroll   []Enroll  `gorm:"foreignKey:Subject_ID"`
	Requests []Request `gorm:"foreignKey:Subject_ID"`
}
