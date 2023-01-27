package entity

type Grade struct {
	Grade_ID      string `gorm:"primaryKey"`
	Description   string
	Adding_points []Adding_point `gorm:"foreignKey:Grade_ID"`
}
type Adding_point struct {
	Adding_point_ID string `gorm:"primaryKey"`

	Professor_ID *string
	Professor    Professor `gorm:"references:id"`

	Enroll_ID *string
	Enroll    Enroll `gorm:"references:Enroll_ID"`

	Grade_ID *string
	Grade    Grade `gorm:"references:Grade_ID"`

	//Professors      []Professor      `gorm:"foreignKey:Professor_ID"`
	//Enrolls         []Enroll         `gorm:"foreignKey:Enroll_ID"`
	//Subjects        []Subject        `gorm:"foreignKey:Subject_ID"`

}
