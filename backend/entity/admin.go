package entity

type Admin struct {
	Admin_ID        string `gorm:"primaryKey"`
	Admin_Email     string
	Admin_Password  string
	RoomInforms     []Room           `gorm:"foreignKey:Admin_ID"`
	Courses         []Course         `gorm:"foreignKey:Admin_ID"`
	Professors      []Professor      `gorm:"foreignKey:AdminID"`
	Students        []Student        `gorm:"foreignKey:Admin_ID"`
	Class_Schedules []Class_Schedule `gorm:"foreignKey:Admin_ID"`
	Exam_Schedules  []Exam_Schedule  `gorm:"foreignKey:Admin_ID"`
}
