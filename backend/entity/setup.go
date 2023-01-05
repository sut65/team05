package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func OpenDatabase() {
	/* Function for opening database file */
	database, err := gorm.Open(sqlite.Open("team05.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	db = database

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("team05.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		&Admin{},
		&Qualification{},
		&Major{},
		&Status{},
		&Professor{},
		&Building{},
		&RoomType{},
		&RoomInform{},

		// Entites migrated by HanawuZ
		&Institute{},
		&Course{},
		&Subject_Status{},
		&Class_Type{},
		&Subject_Category{},
		&Subject{},
	)

	db = database

}
