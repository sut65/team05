package entity

import (
	// "time"

	"time"

	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func OpenDatabase() {

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	db = database
}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		// &Status{},
		&RoomType{},
		&Building{},
		// &Room{},
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

		&Room{},
		&Class_Schedule{},
		&Exam_Schedule{},
	)

	db = database

	// Create sample records
	admin1 := Admin{
		Admin_ID:       "AD01",
		Admin_Email:    "Sompin@hotmail.com",
		Admin_Password: "Gianmii5731",
	}

	admin2 := Admin{
		Admin_ID:       "AD02",
		Admin_Email:    "Patsatit@hotmail.com",
		Admin_Password: "Devupindate9890",
	}

	admin3 := Admin{
		Admin_ID:       "AD03",
		Admin_Email:    "Alexander@hotmail.com",
		Admin_Password: "Suster3490",
	}
	db.Create(&admin1)
	db.Create(&admin2)
	db.Create(&admin3)

	////---------------------------------------------------------------

	engineering := Institute{
		Institute_ID:   "ENG",
		Institute_Name: "Engineering",
	}

	medical := Institute{
		Institute_ID:   "MED",
		Institute_Name: "Medical",
	}
	db.Create(&engineering)
	db.Create(&medical)

	cpe := Major{
		Major_ID:   "CPE",
		Major_Name: "Computer Engineering",
		Institute:  engineering,
	}

	ee := Major{
		Major_ID:   "EE",
		Major_Name: "Electrical Engineering",
		Institute:  engineering,
	}
	db.Create(&cpe)
	db.Create(&ee)

	//Qualification
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

	////---------------------------------------------------------------
	cpe2560 := Course{
		Course_ID:     "CPE2560",
		Course_Name:   "หลักสูตรวิศวกรรมคอมพิวเตอร์ 2560",
		Datetime:      time.Now(),
		Qualification: qualification1,
		Admin:         admin1,
		Major:         cpe,
	}

	cpe2564 := Course{
		Course_ID:     "CPE2564",
		Course_Name:   "หลักสูตรวิศวกรรมคอมพิวเตอร์ 2564",
		Datetime:      time.Now(),
		Qualification: qualification2,
		Admin:         admin1,
		Major:         cpe,
	}

	ee2560 := Course{
		Course_ID:     "EE2560",
		Course_Name:   "หลักสูตรวิศวกรรมไฟฟ้า 2560",
		Datetime:      time.Now(),
		Qualification: qualification3,
		Admin:         admin1,
		Major:         ee,
	}
	db.Create(&cpe2560)
	db.Create(&cpe2564)
	db.Create(&ee2560)

	////---------------------------------------------------------------

	professor1 := Professor{
		Model:              gorm.Model{ID: 1},
		ID_card:            "123456",
		Professor_name:     "Thanakorn Punya",
		Professor_address:  "Nakhonratchasima",
		Professor_email:    "nun@gmail.com",
		Professor_tel:      "0958741258",
		Admin:              admin3,
		Major:              cpe,
		Professor_password: "B56221",
	}

	professor2 := Professor{
		Model:              gorm.Model{ID: 2},
		ID_card:            "12345678",
		Professor_name:     "Surachet Sukdee",
		Professor_address:  "Nakhonratchasima",
		Professor_email:    "nun2@gmail.com",
		Professor_tel:      "0958741258",
		Admin:              admin3,
		Major:              ee,
		Professor_password: "B56221",
	}

	professor3 := Professor{
		Model:              gorm.Model{ID: 3},
		ID_card:            "6302245",
		Professor_name:     "Weerachai Somsuk",
		Professor_address:  "Chiang Mai",
		Professor_email:    "nun2@gmail.com",
		Professor_tel:      "0958741258",
		Admin:              admin3,
		Major:              ee,
		Professor_password: "B56221",
	}
	db.Create(&professor1)
	db.Create(&professor2)
	db.Create(&professor3)

	////---------------------------------------------------------------

	subject_open := Subject_Status{
		Subject_Status_ID:          "W",
		Subject_Status_Description: "เปิดรายวิขา",
	}

	subject_close := Subject_Status{
		Subject_Status_ID:          "X",
		Subject_Status_Description: "ปิดรายวิขา",
	}
	db.Create(&subject_open)
	db.Create(&subject_close)

	////---------------------------------------------------------------
	lecture := Class_Type{
		Class_Type_ID:   "C",
		Class_Type_Name: "Lecture",
	}
	labs := Class_Type{
		Class_Type_ID:   "L",
		Class_Type_Name: "Labs",
	}
	db.Create(&lecture)
	db.Create(&labs)

	////---------------------------------------------------------------
	category1 := Subject_Category{
		Subject_Category_ID:   "W",
		Subject_Category_Name: "วิชาบังคับ",
	}

	category2 := Subject_Category{
		Subject_Category_ID:   "E",
		Subject_Category_Name: "วิชาเลือกเฉพาะสาขา",
	}

	category3 := Subject_Category{
		Subject_Category_ID:   "F",
		Subject_Category_Name: "วิชาเลือกเสรี",
	}

	db.Create(&category1)
	db.Create(&category2)
	db.Create(&category3)

	////---------------------------------------------------------------
	software_engineering_sec1 := Subject{
		ID:               1,
		Subject_ID:       "523332",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       lecture,
		Subject_Category: category1,
		Subject_TH_Name:  "วิศวกรรมซอฟต์แวร์",
		Subject_EN_Name:  "Software Engineering",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         20,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          1,
	}

	software_engineering_sec2 := Subject{
		ID:               2,
		Subject_ID:       "523332",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       lecture,
		Subject_Category: category1,
		Subject_TH_Name:  "วิศวกรรมซอฟต์แวร์",
		Subject_EN_Name:  "Software Engineering",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         20,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          2,
	}
	db.Create(&software_engineering_sec1)
	db.Create(&software_engineering_sec2)

	operating_system_sec1 := Subject{
		ID:               3,
		Subject_ID:       "523354",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "ระบบปฏิบัติการ",
		Subject_EN_Name:  "Operating System",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         20,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          1,
	}

	operating_system_sec2 := Subject{
		ID:               4,
		Subject_ID:       "523354",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "ระบบปฏิบัติการ",
		Subject_EN_Name:  "Operating System",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         20,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          2,
	}
	db.Create(&operating_system_sec1)
	db.Create(&operating_system_sec2)
	pluri_thai := Subject{
		ID:               5,
		Subject_ID:       "IST202502",
		Professor:        professor2,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       lecture,
		Subject_Category: category3,
		Subject_TH_Name:  "ไทยพหุศึกษาเชิงวัฒนธรรม",
		Subject_EN_Name:  "Pluri-Thai Cultural Studies",
		Capacity:         1000,
		Enroll_Amount:    0,
		Reserved:         200,
		Reserved_Enroll:  0,
		Unit:             2,
		Section:          1,
	}
	db.Create(&pluri_thai)

	problem_solving_sec1 := Subject{
		ID:               6,
		Subject_ID:       "523203",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "การแก้ปัญหาด้วยโปรแรกม",
		Subject_EN_Name:  "Problem Solving with Programming",
		Capacity:         40,
		Enroll_Amount:    0,
		Reserved:         10,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          1,
	}

	problem_solving_sec2 := Subject{
		ID:               7,
		Subject_ID:       "523203",
		Professor:        professor1,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "การแก้ปัญหาด้วยโปรแรกม",
		Subject_EN_Name:  "Problem Solving with Programming",
		Capacity:         45,
		Enroll_Amount:    0,
		Reserved:         10,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          2,
	}
	db.Create(&problem_solving_sec1)
	db.Create(&problem_solving_sec2)

	system_analysis_sec1 := Subject{
		ID:               8,
		Subject_ID:       "523315",
		Professor:        professor2,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "การวิเคราะห์และออกแบบระบบ",
		Subject_EN_Name:  "System Analysis and Design",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         10,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          1,
	}

	system_analysis_sec2 := Subject{
		ID:               9,
		Subject_ID:       "523315",
		Professor:        professor2,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category1,
		Subject_TH_Name:  "การวิเคราะห์และออกแบบระบบ",
		Subject_EN_Name:  "System Analysis and Design",
		Capacity:         60,
		Enroll_Amount:    0,
		Reserved:         10,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          2,
	}
	db.Create(&system_analysis_sec1)
	db.Create(&system_analysis_sec2)

	artificial_neural_network := Subject{
		ID:               10,
		Subject_ID:       "523414",
		Professor:        professor3,
		Course:           cpe2560,
		Subject_Status:   subject_open,
		Class_Type:       labs,
		Subject_Category: category2,
		Subject_TH_Name:  "โครงข่ายประสาทเทียม",
		Subject_EN_Name:  "Artificial Neural Network",
		Capacity:         40,
		Enroll_Amount:    0,
		Reserved:         5,
		Reserved_Enroll:  0,
		Unit:             4,
		Section:          1,
	}
	db.Create(&artificial_neural_network)

	lab_room_type := RoomType{
		RoomType_ID:   "RT01",
		RoomType_name: "Labs",
	}
	lecture_room_type := RoomType{
		RoomType_ID:   "RT02",
		RoomType_name: "Lecture",
	}
	db.Create(&lab_room_type)
	db.Create(&lecture_room_type)

	building_b1 := Building{
		Building_ID:   "B1",
		Building_name: "อาคารเรียนรวม1",
	}
	building_b2 := Building{
		Building_ID:   "B2",
		Building_name: "อาคารเรียนรวม2",
	}
	db.Create(&building_b1)
	db.Create(&building_b2)

	room_b2101 := Room{
		Room_ID:  "B2101",
		Seats:    300,
		RoomType: lecture_room_type,
		Building: building_b1,
		Admin:    admin1,
	}

	room_b4101 := Room{
		Room_ID:  "B4101",
		Seats:    1000,
		RoomType: lecture_room_type,
		Building: building_b1,
		Admin:    admin2,
	}

	room_F11_micro := Room{
		Room_ID:  "F11-41-MircoP",
		Seats:    60,
		RoomType: lab_room_type,
		Admin:    admin1,
	}
	db.Create(&room_b2101)
	db.Create(&room_b4101)
	db.Create(&room_F11_micro)

	system_analysis_sec1_class := Class_Schedule{
		Class_Schedule_ID:          "CLS523332-1-B2101-MON-1300-1500",
		Subject:                    system_analysis_sec1,
		Section:                    1,
		Room:                       room_b2101,
		Admin:                      admin1,
		Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
		End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
		Class_Schedule_Description: "SA sec1",
		Day:                        "Mon",
	}

	os_sec1_class := Class_Schedule{
		Class_Schedule_ID:          "CLS523354-2-B2101-MON-1300-1500",
		Subject:                    operating_system_sec1,
		Section:                    1,
		Room:                       room_b2101,
		Admin:                      admin1,
		Start_Time:                 fmt.Sprintf("%02d:%02d", 9, 00),
		End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
		Class_Schedule_Description: "OS sec2",
		Day:                        "Mon",
	}
	db.Create(&system_analysis_sec1_class)
	db.Create(&os_sec1_class)

	system_analysis_midterm := Exam_Schedule{
		Exam_Schedule_ID: "EXAM-SA1",
		Subject:          system_analysis_sec1,
		Room:             room_b2101,
		Admin:            admin2,
		Exam_Type:        "Midterm",
		Exam_Date:        "18/05/2020",
		Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
		Exam_End_Time:    fmt.Sprintf("%02d:%02d", 17, 00),
	}
	db.Create(&system_analysis_midterm)

	///------------------------Request_Type------------------------
	Request_Type1 := Request_Type{
		Request_Type_ID:   "R01",
		Request_Type_Name: "กลุ่มเต็ม",
	}
	db.Create(&Request_Type1)

	Request_Type2 := Request_Type{
		Request_Type_ID:   "R02",
		Request_Type_Name: "เปลี่ยนกลุ่ม",
	}
	db.Create(&Request_Type2)

	///------------------------Request------------------------
	Request1 := Request{
		Request_ID: 1,
		Reason:     "อยากเรียน",
		// Student:       student1,
		Professor:    professor1,
		Section:      2,
		Subject:      operating_system_sec2,
		Request_Type: Request_Type1,
	}
	db.Create(&Request1)

	Request2 := Request{
		Request_ID: 2,
		Reason:     "เวลาเรียนชน",
		// Student:       student1,
		Professor:    professor1,
		Section:      1,
		Subject:      problem_solving_sec1,
		Request_Type: Request_Type2,
	}
	db.Create(&Request2)

	enroll1 := Enroll{
		Enroll_ID: "E001",
		// Student_ID : "",
		Subject:        software_engineering_sec1,
		Class_Schedule: system_analysis_sec1_class,
		Exam_Schedule:  system_analysis_midterm,
		Section:        1,
	}

	enroll2 := Enroll{
		Enroll_ID: "E002",
		// Student_ID : "",
		Subject:        operating_system_sec1,
		Class_Schedule: os_sec1_class,
		// Exam_Schedule: o,
		Section: 1,
	}
	db.Create(&enroll1)
	db.Create(&enroll2)

	///------------------------Approval_Type------------------------
	Approval_Type1 := Approval_Type{
		Approval_Type_ID:   "Y01",
		Approval_Type_Name: "อนุมัติ",
	}
	db.Create(&Approval_Type1)

	Approval_Type2 := Approval_Type{
		Approval_Type_ID:   "N01",
		Approval_Type_Name: "ไม่อนุมัติ",
	}
	db.Create(&Approval_Type2)

	///------------------------Approval------------------------
	Approval1 := Approval{
		Approval_ID:   1,
		Reason:        "รับแล้วจ้า",
		Professor:     professor1,
		Section:       2,
		Request:       Request1,
		Approval_Type: Approval_Type1,
	}
	db.Create(&Approval1)

	Approval2 := Approval{
		Approval_ID:   2,
		Request:       Request2,
		Reason:        "ไม่รับเพิ่ม",
		Professor:     professor1,
		Section:       1,
		Approval_Type: Approval_Type2,
	}
	db.Create(&Approval2)

	///-----------------------Adding_reducing------------------------
	Adding_reducing1 := Adding_reducing{
		Change_ID: 1,
		Status:    "เพิ่ม",
		// Student:       student1,
		Enroll:  enroll1,
		Subject: software_engineering_sec2,
	}
	db.Create(&Adding_reducing1)

	Adding_reducing2 := Adding_reducing{
		Change_ID: 2,
		Status:    "ลด",
		// Student:       student1,
		Enroll:  enroll2,
		Subject: operating_system_sec1,
	}
	db.Create(&Adding_reducing2)

	Grade1 := Grade{
		Grade_ID:    "A",
		Description: "ดีเยี่ยม",
	}
	db.Create(&Grade1)
	Grade2 := Grade{
		Grade_ID:    "B+",
		Description: "ดีมาก",
	}
	db.Create(&Grade2)

	Adding_point1 := Adding_point{
		Adding_point_ID: "AP1",
		Professor:       professor1,
		Enroll:          enroll1,
		Grade:           Grade1,
	}
	db.Create(&Adding_point1)

	Adding_point2 := Adding_point{
		Adding_point_ID: "AP2",
		Professor:       professor2,
		Enroll:          enroll2,
		Grade:           Grade2,
	}
	db.Create(&Adding_point2)

	//Student
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

	student1 := Student{
		Student_ID:       "B631021",
		Student_Name:     "ปีเตอร์ สงบสุข",
		Student_Password: "Vuster2572",
		Datetime:         time.Now(),
		Admin:            admin1,
		Course:           cpe2560,
		Dormitory:        dormitory2,
	}
	db.Model(&Student{}).Create(&student1)

	student2 := Student{
		Student_ID:       "B620023",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "Oop1235",
		Datetime:         time.Now(),
		Admin:            admin1,
		Course:           cpe2560,
		Dormitory:        dormitory2,
	}
	db.Model(&Student{}).Create(&student2)

	student3 := Student{
		Student_ID:       "B620125",
		Student_Name:     "สมใจ ใยดี",
		Student_Password: "Kku5731mn",
		Datetime:         time.Now(),
		Admin:            admin1,
		Course:           cpe2560,
		Dormitory:        dormitory2,
	}
	db.Model(&Student{}).Create(&student3)

}
