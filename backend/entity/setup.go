package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		&Status{},
		&RoomType{},
		&Building{},
		&RoomInform{},
		&Professor{},

		&Qualification{},
		&Institute{},
		&Major{},
		&Course{},

		&Dormitory{},
		&Student{},

		&Subject_Status{},
		&Class_Type{},
		&Subject_Category{},
		&Subject{},

		&Enroll{},
		&Adding_reducing{},

		&Grade{},
		&Adding_point{},

		&Approval_Type{},
		&Approval{},

		&Request{},
		&Request_Type{},
	)

	db = database

}
