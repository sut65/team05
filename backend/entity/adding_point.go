package entity

type Grade struct {
	Grade_ID      string `gorm:"primaryKey"`
	Description   string
	Adding_points []Adding_point `gorm:"foreignKey:Grade_ID"`
}
type Adding_point struct {
	Adding_point_ID uint `gorm:"primaryKey "`


	Professor_ID *string `valid:"-"`
	Professor    Professor `gorm:"references:Professor_ID"`

	Enroll_ID *string `valid:"-"`
	Enroll    Enroll `gorm:"references:Enroll_ID" valid:"-"`

	Grade_ID string	`valid:"required~Grade_ID cannot be blank" `
	Grade    Grade `gorm:"references:Grade_ID " valid:"-"`

	//Professors      []Professor      `gorm:"foreignKey:Professor_ID"`
	//Enrolls         []Enroll         `gorm:"foreignKey:Enroll_ID"`
	//Subjects        []Subject        `gorm:"foreignKey:Subject_ID"`

}
