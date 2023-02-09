package entity

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}
func OpenDatabase() *gorm.DB {
	var db_path string
	path, _ := os.Getwd()
	// Will get something like :
	// If run in /backend/main.go then
	// 		..../backend
	// else if run in subdirectory e.g. /backend/test then
	// 		..../backend/test

	splitPath := regexp.MustCompile(`[/\\]`).Split(path, -1)
	if splitPath[len(splitPath)-1] != "backend" {
		db_path = filepath.Dir(path) + `\test.db`
	} else {
		db_path = path + `\test.db`
	}
	database, _ := gorm.Open(sqlite.Open(db_path), &gorm.Config{})
	fmt.Println(db_path)
	return database

}

func SetupDatabase() {
	path, err := os.Getwd()
	if err != nil {
		panic("failed to get working directory path!!")
	}

	db_path := path + `\test.db`

	if _, err := os.Stat(db_path); os.IsNotExist(err) {

		database, err := gorm.Open(sqlite.Open(db_path), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}
		db = database

		database.AutoMigrate(
			&Admin{},
			&Status{},
			&RoomType{},
			&Building{},

			&HistoryType{},
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

			&Payment{},
			&Payment_Type{},
		)

		db = database
		admin1_password, _ := bcrypt.GenerateFromPassword([]byte("Gianmii5731"), 14)
		admin2_password, _ := bcrypt.GenerateFromPassword([]byte("Devupindate9890"), 14)
		admin3_password, _ := bcrypt.GenerateFromPassword([]byte("Suster3490"), 14)

		// Create sample records
		admin1 := Admin{
			Admin_ID:       "AD1234567",
			Admin_Email:    "Sompin@hotmail.com",
			Admin_Password: string(admin1_password),
		}

		admin2 := Admin{
			Admin_ID:       "AD5402245",
			Admin_Email:    "Patsatit@hotmail.com",
			Admin_Password: string(admin2_password),
		}

		admin3 := Admin{
			Admin_ID:       "AD6312985",
			Admin_Email:    "Alexander@hotmail.com",
			Admin_Password: string(admin3_password),
		}
		db.Create(&admin1)
		db.Create(&admin2)
		db.Create(&admin3)

		////---------------------------------------------------------------

		engineering := Institute{Institute_ID: "ENG", Institute_Name: "Engineering"}

		medical := Institute{Institute_ID: "MED", Institute_Name: "Medical"}

		science := Institute{Institute_ID: "SCI", Institute_Name: "Science"}

		db.Create(&engineering)
		db.Create(&medical)
		db.Create(&science)

		cpe := Major{Major_ID: "CPE", Major_Name: "Computer Engineering", Institute: engineering}
		ee := Major{Major_ID: "EE", Major_Name: "Electrical Engineering", Institute: engineering}
		elec := Major{Major_ID: "ELEC", Major_Name: "Electronic Engineering", Institute: engineering}
		polymer := Major{Major_ID: "PE", Major_Name: "Polymer Engineering", Institute: engineering}
		civil := Major{Major_ID: "CIVIL", Major_Name: "Civil Engineering", Institute: engineering}
		mechanical := Major{Major_ID: "ME", Major_Name: "Mechanical Engineering", Institute: engineering}
		telecom := Major{Major_ID: "TE", Major_Name: "Telecommunication Engineering", Institute: engineering}
		industrial := Major{Major_ID: "IE", Major_Name: "Industrial Engineering", Institute: engineering}

		ph := Major{Major_ID: "PH", Major_Name: "Public Health", Institute: medical}
		com_sci := Major{Major_ID: "CS", Major_Name: "Computer Science", Institute: science}
		physics := Major{Major_ID: "PHYSC", Major_Name: "Physics", Institute: science}
		biology := Major{Major_ID: "BIO", Major_Name: "Biology", Institute: science}
		chemical := Major{Major_ID: "CHEM", Major_Name: "Chemistry", Institute: science}

		db.Create(&cpe)
		db.Create(&ee)
		db.Create(&elec)
		db.Create(&ph)
		db.Create(&polymer)
		db.Create(&civil)
		db.Create(&mechanical)
		db.Create(&telecom)
		db.Create(&industrial)
		db.Create(&com_sci)
		db.Create(&physics)
		db.Create(&biology)
		db.Create(&chemical)

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
			Admin:         admin2,
			Major:         ee,
		}
		db.Create(&cpe2560)
		db.Create(&cpe2564)
		db.Create(&ee2560)
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

		student1_password, _ := bcrypt.GenerateFromPassword([]byte("Vuster2572"), 14)
		student2_password, _ := bcrypt.GenerateFromPassword([]byte("Oop1235"), 14)
		student3_password, _ := bcrypt.GenerateFromPassword([]byte("Kku5731mn"), 14)

		student1 := Student{
			Student_ID:       "B6310211",
			Student_Name:     "ปีเตอร์ สงบสุข",
			Student_Password: string(student1_password),
			Datetime:      time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory2,
		}
		db.Model(&Student{}).Create(&student1)

		student2 := Student{
			Student_ID:       "B6200233",
			Student_Name:     "สมพงษ์ วิ่งวุฒิ",
			Student_Password: string(student2_password),
			Datetime:      time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory2,
		}
		db.Model(&Student{}).Create(&student2)

		student3 := Student{
			Student_ID:       "B6201259",
			Student_Name:     "สมใจ ใยดี",
			Student_Password: string(student3_password),
			Datetime:      time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory2,
		}
		db.Model(&Student{}).Create(&student3)

		//status
		status1 := Status{
			Status_ID:   "ST1",
			Status_name: "ยังทำการสอนอยู่",
		}
		db.Create(&status1)

		////---------------------------------------------------------------
		professor1_password, _ := bcrypt.GenerateFromPassword([]byte("B56221"), 14)
		professor2_password, _ := bcrypt.GenerateFromPassword([]byte("nun289546"), 14)
		professor3_password, _ := bcrypt.GenerateFromPassword([]byte("4924998abca"), 14)

		professor1 := Professor{
			Model:              gorm.Model{ID: 1},
			Professor_ID:       "P5302245",
			Professor_name:     "Thanakorn Punya",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "nun@gmail.com",
			Professor_tel:      "0958741258",
			Status:             status1,
			Admin:              admin3,
			Qualification:      qualification1,
			Major:              cpe,
			Professor_password: string(professor1_password),
		}

		professor2 := Professor{
			Model:              gorm.Model{ID: 2},
			Professor_ID:       "P3934578",
			Professor_name:     "Surachet Sukdee",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "nun2@gmail.com",
			Professor_tel:      "0958741258",
			Status:             status1,
			Admin:              admin3,
			Qualification:      qualification1,
			Major:              ee,
			Professor_password: string(professor2_password),
		}

		professor3 := Professor{
			Model:              gorm.Model{ID: 3},
			Professor_ID:       "P4924998",
			Professor_name:     "Weerachai Somsuk",
			Professor_address:  "Chiang Mai",
			Professor_email:    "nun2@gmail.com",
			Professor_tel:      "0958741258",
			Status:             status1,
			Admin:              admin3,
			Qualification:      qualification1,
			Major:              ee,
			Professor_password: string(professor3_password),
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

		project := Class_Type{
			Class_Type_ID:   "P",
			Class_Type_Name: "Project",
		}
		db.Create(&lecture)
		db.Create(&labs)
		db.Create(&project)

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
			Course:           cpe2564,
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
		software_engineering_sec3 := Subject{
			ID:               3,
			Subject_ID:       "523332",
			Professor:        professor1,
			Course:           cpe2564,
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
		db.Create(&software_engineering_sec3)
		operating_system_sec1 := Subject{
			ID:               3,
			Subject_ID:       "523354",
			Professor:        professor1,
			Course:           cpe2564,
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
			Subject_ID:       "523331",
			Professor:        professor2,
			Course:           ee2560,
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
			Subject_ID:       "523331",
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

		knowledge_discovery_and_data_mining := Subject{
			ID:               11,
			Subject_ID:       "523312",
			Professor:        professor1,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category2,
			Subject_TH_Name:  "การค้นพบความรู้และการทำเหมืองข้อมูล",
			Subject_EN_Name:  "Knowledge Discovery and Data Mining",
			Capacity:         40,
			Enroll_Amount:    0,
			Reserved:         5,
			Reserved_Enroll:  0,
			Unit:             4,
			Section:          1,
		}
		db.Create(&knowledge_discovery_and_data_mining)

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

		building_b1 := Building{Building_ID: "B1", Building_name: "อาคารเรียนรวม1"}
		building_b2 := Building{Building_ID: "B2", Building_name: "อาคารเรียนรวม2"}

		building_f11 := Building{Building_ID: "F11", Building_name: "อาคารสิรินธรวิศวพัฒน์"}
		building_b6 := Building{Building_ID: "B6", Building_name: "อาคารรัฐสีมาคุณากร"}

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
			Room_ID:  "F1141MircoP",
			Seats:    60,
			RoomType: lab_room_type,
			Admin:    admin1,
			Building: building_f11,
		}

		room_b6105 := Room{
			Room_ID:  "B6105",
			Seats:    50,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b6,
		}

		room_F11_software := Room{
			Room_ID:  "F1142Software",
			Seats:    60,
			RoomType: lab_room_type,
			Building: building_f11,
			Admin:    admin3,
		}
		db.Create(&room_b2101)
		db.Create(&room_b4101)
		db.Create(&room_F11_micro)
		db.Create(&room_F11_software)
		db.Create(&room_b6105)
		pluri_thai_class := Class_Schedule{
			Class_Schedule_ID:          "CLSIST202502-1-B4101-Wed-13:00-15:00",
			Subject:                    pluri_thai,
			Section:                    1,
			Room:                       room_b4101,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "รายวิชาไทยพหุ เรียนที่ห้อง B4101",
			Day:                        "Wed",
		}
		db.Create(&pluri_thai_class)

		system_analysis_sec1_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523331-1-B2101-Mon-13:00-15:00",
			Subject:                    system_analysis_sec1,
			Section:                    1,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "System Analysis sec1",
			Day:                        "Mon",
		}

		system_analysis_sec2_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523331-2-B2101-Mon-13:00-15:00",
			Subject:                    system_analysis_sec2,
			Section:                    2,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "System Analysis sec2",
			Day:                        "Mon",
		}

		os_sec1_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523354-1-B2101-Tue-13:00-15:00",
			Subject:                    operating_system_sec1,
			Section:                    1,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "Operating System sec2",
			Day:                        "Tue",
		}

		os_sec2_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523354-2-B2101-Tue-13:00-15:00",
			Subject:                    operating_system_sec2,
			Section:                    2,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "Operating System sec2",
			Day:                        "Tue",
		}
		db.Create(&os_sec2_class)

		ann_sec1_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523414-1-B6105-Mon-09:00-12:00",
			Subject:                    artificial_neural_network,
			Section:                    1,
			Room:                       room_b6105,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 9, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Artificial Neural Network class",
			Day:                        "Mon",
		}

		kdd_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523211-1-B6105-Fri-10:00-12:00",
			Subject:                    knowledge_discovery_and_data_mining,
			Section:                    1,
			Room:                       room_b6105,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Knowledge Discovery and Data Mining Class",
			Day:                        "Fri",
		}
		// Class_D : {Day : "Tue", Room_ID: "F-11-MicroP", 	 Start_Time:16:00, End_Time:19:00}
		os_lab_sec1_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523354-1-F1142Software-Thu-13:00-16:00",
			Subject:                    operating_system_sec1,
			Section:                    1,
			Room:                       room_F11_software,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Operating System Lab Class Sec1",
			Day:                        "Thu",
		}

		os_lab_sec2_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523354-2-F1142Software-Thu-16:00-19:00",
			Subject:                    operating_system_sec2,
			Section:                    2,
			Room:                       room_F11_software,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 16, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 19, 00),
			Class_Schedule_Description: "Operating System Lab Class Sec2",
			Day:                        "Thu",
		}

		problem_solving_sec1_class := Class_Schedule{
			Class_Schedule_ID:          "CLS523203-1-F1142Software-Mon-13:00-16:00",
			Subject:                    problem_solving_sec1,
			Section:                    1,
			Room:                       room_F11_software,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Problem Solving Sec 1 Class",
			Day:                        "Mon",
		}

		db.Create(&system_analysis_sec1_class)
		db.Create(&system_analysis_sec2_class)
		db.Create(&problem_solving_sec1_class)
		db.Create(&os_sec1_class)
		db.Create(&os_lab_sec1_class)
		db.Create(&os_lab_sec2_class)
		db.Create(&ann_sec1_class)
		db.Create(&kdd_class)

		system_analysis_midterm := Exam_Schedule{
			Exam_Schedule_ID: "EXAM523331-B2101-Mid-1805-15:00-17:00",
			Subject:          system_analysis_sec1,
			Room:             room_b2101,
			Admin:            admin2,
			Exam_Type:        "Midterm",
			Exam_Date:        "18/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 17, 00),
		}

		system_analysis_final := Exam_Schedule{
			Exam_Schedule_ID: "EXAM523331-B2101-Fin-2107-09:00-12:00",
			Subject:          system_analysis_sec1,
			Room:             room_b6105,
			Admin:            admin2,
			Exam_Type:        "Final",
			Exam_Date:        "21/07/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}
		db.Create(&system_analysis_midterm)
		db.Create(&system_analysis_final)

		os_final := Exam_Schedule{
			Exam_Schedule_ID: "EXAM523354-B6105-Fin-2207-15:00-17:00",
			Subject:          operating_system_sec1,
			Room:             room_b6105,
			Admin:            admin1,
			Exam_Type:        "Final",
			Exam_Date:        "22/07/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 17, 00),
		}

		ann_midterm := Exam_Schedule{
			Exam_Schedule_ID: "EXAM523414-B6105-Mid-1905-09:00-12:00",
			Subject:          artificial_neural_network,
			Room:             room_b6105,
			Admin:            admin1,
			Exam_Type:        "Final",
			Exam_Date:        "19/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}
		db.Create(&os_final)
		db.Create(&ann_midterm)

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
			Request_ID:   1,
			Reason:       "อยากเรียน",
			Student:      student2,
			Section:      2,
			Subject:        software_engineering_sec1,
			Class_Schedule: system_analysis_sec1_class,
			Exam_Schedule:  system_analysis_midterm,
			Request_Type: Request_Type1,
		}
		db.Create(&Request1)

		Request2 := Request{
			Request_ID:   2,
			Reason:       "เวลาเรียนชน",
			Student:      student1,
			Section:      1,
			Subject:        operating_system_sec1,
			Class_Schedule: os_sec1_class,
			Exam_Schedule:  os_final,
			Request_Type: Request_Type2,
		}
		db.Create(&Request2)
		enroll1 := Enroll{
			Enroll_ID:      "E001",
			Student:        student1,
			Subject:        software_engineering_sec1,
			Class_Schedule: system_analysis_sec1_class,
			Exam_Schedule:  system_analysis_midterm,
			Section:        1,
		}

		enroll2 := Enroll{
			Enroll_ID:      "E002",
			Student:        student2,
			Subject:        operating_system_sec1,
			Class_Schedule: os_sec1_class,
			Exam_Schedule:  os_final,
			Section:        1,
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

		///---histroryType1----

		HistoryType1 := HistoryType{
			History_Type_ID: "HT1",
			Type_Name:       "ประวัติเพิ่ม",
		}
		db.Create(&HistoryType1)

		HistoryType2 := HistoryType{
			History_Type_ID: "HT2",
			Type_Name:       "ประวัติลด",
		}
		db.Create(&HistoryType2)

		HistoryType3 := HistoryType{
			History_Type_ID: "HT3",
			Type_Name:       "ประวัติเปลี่ยนกลุ่ม",
		}
		db.Create(&HistoryType3)

		///-----------------------Adding_reducing------------------------
		Adding_reducing1 := Adding_reducing{
			Change_ID:   1,
			HistoryType: HistoryType1,
			Enroll:      enroll1,
			Student:     student1,
		}
		db.Create(&Adding_reducing1)

		Adding_reducing2 := Adding_reducing{
			Change_ID:   2,
			HistoryType: HistoryType2,
			Enroll:      enroll2,
			Student:     student2,
		}
		db.Create(&Adding_reducing2)
		// Adding_reducing3 := Adding_reducing{
		// 	Change_ID: 3,
		// 	Status:    "เปลี่ยนกลุ่ม",
		// 	HistoryType	:	HistoryType3,
		// 	Enroll:    enroll3,
		// 	Student :   student3,
		// }
		// db.Create(&Adding_reducing3)

		//grade
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

		//adding point

		Adding_point1 := Adding_point{
			Adding_point_ID: 1,
			Professor:       professor1,
			Enroll:          enroll1,
			Grade:           Grade1,
		}
		db.Create(&Adding_point1)

		Adding_point2 := Adding_point{
			Adding_point_ID: 2,
			Professor:       professor2,
			Enroll:          enroll2,
			Grade:           Grade2,
		}
		db.Create(&Adding_point2)

		payment_type1 := Payment_Type{
			Payment_Type_ID:   "P01",
			Payment_Type_Name: "เงินสด",
		}
		db.Create(&payment_type1)

		payment_type2 := Payment_Type{
			Payment_Type_ID:   "P02",
			Payment_Type_Name: "โอนชำระ",
		}
		db.Create(&payment_type2)

		payment1 := Payment{
			Payment_ID:      001,
			Student:         student2,
			Payment_Type_ID: &payment_type1.Payment_Type_ID,
			Receipt_number:  "asdf816188",
			Admin_ID:        &admin1.Admin_ID,
			Date_Time:       "02/03/2566_21:35",
			Unit:            20,
			Payable:         enroll1.Subject.Unit * 800,
			Amounts:         25000,
		}
		db.Create(&payment1)

		payment2 := Payment{
			Payment_ID:      002,
			Student:         student1,
			Payment_Type_ID: &payment_type2.Payment_Type_ID,
			Admin_ID:        &admin2.Admin_ID,
			Receipt_number:  "assdf81h6188",
			Date_Time:       "02/03/2566_21:35",
			Unit:            12,
			Payable:         enroll2.Subject.Unit * 800,
			Amounts:         10000,
		}
		db.Create(&payment2)

	} else {
		database, _ := gorm.Open(sqlite.Open(db_path), &gorm.Config{})
		// Migrate the schema
		db = database
	}

}
