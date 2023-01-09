package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("se-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Qualification{},
		&Admin{},
		&Institute{},
		&Major{},
		&Course{},
		&Dormitory{},
		&Student{},
	)

	db = database

	//------------------------------------------------------------

	qualification1 := Qualification{
		Qualification_ID:   "QT01",
		Qualification_Name: "Bachelor's degree",
	}
	db.Model(&Qualification{}).Create(&qualification1)

	qualification2 := Qualification{
		Qualification_ID:   "QT02",
		Qualification_Name: "master's degree",
	}
	db.Model(&Qualification{}).Create(&qualification2)

	qualification3 := Qualification{
		Qualification_ID:   "QT03",
		Qualification_Name: "Ph.D.",
	}
	db.Model(&Qualification{}).Create(&qualification3)

	//------------------------------------------------------------

	//admin
	admin1 := Admin{
		Admin_ID:       "AD01",
		Admin_Email:    "Sompin@hotmail.com",
		Admin_Password: "Gianmii5731",
	}
	db.Model(&Admin{}).Create(&admin1)

	admin2 := Admin{
		Admin_ID:       "AD02",
		Admin_Email:    "Patsatit@hotmail.com",
		Admin_Password: "Devupindate9890",
	}
	db.Model(&Admin{}).Create(&admin2)

	admin3 := Admin{
		Admin_ID:       "AD03",
		Admin_Email:    "Alexander@hotmail.com",
		Admin_Password: "Suster3490",
	}
	db.Model(&Admin{}).Create(&admin3)

	//------------------------------------------------------------

	//Institute
	institute1 := Institute{
		Institute_ID:   "ENG",
		Institute_Name: "Engineering",
	}
	db.Model(&Institute{}).Create(&institute1)

	institute2 := Institute{
		Institute_ID:   "MED",
		Institute_Name: "Medical",
	}
	db.Model(&Institute{}).Create(&institute2)

	//------------------------------------------------------------

	major1 := Major{
		Major_ID:   "CPE",
		Major_Name: "Computer Engineering",
		Institute:  institute1,
	}
	db.Model(&Major{}).Create(&major1)

	major2 := Major{
		Major_ID:   "EE",
		Major_Name: "Electrical Engineering",
		Institute:  institute1,
	}
	db.Model(&Major{}).Create(&major2)

	//------------------------------------------------------------

	//Course
	course1 := Course{
		Course_ID:   "CPE2560",
		Course_Name: "หลักสูตรวิศวกรรมคอมพิวเตอร์ 2560",
		Datetime:    time.Now(),

		Qualification: qualification1,
		Admin:         admin1,
		Major:         major1,
	}
	db.Model(&Course{}).Create(&course1)

	course2 := Course{
		Course_ID:   "CPE2564",
		Course_Name: "หลักสูตรวิศวกรรมคอมพิวเตอร์ 2564",
		Datetime:    time.Now(),

		Qualification: qualification2,
		Admin:         admin1,
		Major:         major1,
	}
	db.Model(&Course{}).Create(&course2)

	course3 := Course{
		Course_ID:   "EE2560",
		Course_Name: "หลักสูตรวิศวกรรมไฟฟ้า2560",
		Datetime:    time.Now(),

		Qualification: qualification3,
		Admin:         admin1,
		Major:         major2,
	}
	db.Model(&Course{}).Create(&course3)

	//------------------------------------------------------------

	//Dormitory
	dormitory1 := Dormitory{
		Dormitory_ID:   "DT01",
		Dormitory_Name: "Dormitory8",
	}
	db.Model(&Dormitory{}).Create(&dormitory1)

	dormitory2 := Dormitory{
		Dormitory_ID:   "DT02",
		Dormitory_Name: "Dormitory7",
	}
	db.Model(&Dormitory{}).Create(&dormitory2)

	dormitory3 := Dormitory{
		Dormitory_ID:   "DT03",
		Dormitory_Name: "Dormitory13",
	}
	db.Model(&Dormitory{}).Create(&dormitory3)

	//------------------------------------------------------------

	student1 := Student{
		Student_ID:       "B631021",
		Student_Name:     "ปีเตอร์ สงบสุข",
		Student_Password: "Vuster2572",
		Datetime:         time.Now(),

		Admin:     admin1,
		Course:    course1,
		Dormitory: dormitory2,
	}
	db.Model(&Student{}).Create(&student1)

	student2 := Student{
		Student_ID:       "B620023",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "Oop1235",
		Datetime:         time.Now(),

		Admin:     admin1,
		Course:    course1,
		Dormitory: dormitory2,
	}
	db.Model(&Student{}).Create(&student2)

	student3 := Student{
		Student_ID:       "B620125",
		Student_Name:     "สมใจ ใยดี",
		Student_Password: "Kku5731mn",
		Datetime:         time.Now(),

		Admin:     admin1,
		Course:    course1,
		Dormitory: dormitory2,
	}
	db.Model(&Student{}).Create(&student3)

}
