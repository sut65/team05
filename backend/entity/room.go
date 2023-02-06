package entity

type RoomType struct {
	// gorm.Model
	RoomType_ID   string `gorm:"primaryKey"`
	RoomType_name string
	RoomInforms   []Room `gorm:"foreignKey:RoomType_ID"`
}

type Building struct {
	// gorm.Model
	Building_ID   string `gorm:"primaryKey"`
	Building_name string
	RoomInforms   []Room `gorm:"foreignKey:Building_ID"`
}

type Room struct {
	Room_ID string `gorm:"primaryKey"`
	Seats   uint

	RoomType_ID *string  `valid:"-"`
	RoomType    RoomType `gorm:"references:RoomType_ID" valid:"-"`

	Building_ID *string  `valid:"-"`
	Building    Building `gorm:"references:Building_ID" valid:"-"`

	Admin_ID *string `valid:"-"`
	Admin    Admin   `gorm:"references:Admin_ID " valid:"-"`

	Class_Schedules []Class_Schedule `gorm:"foreignKey:Room_ID"`
	Exam_Schedules  []Exam_Schedule  `gorm:"foreignKey:Room_ID"`
}
