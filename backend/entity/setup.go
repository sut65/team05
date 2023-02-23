package entity

import (
	"fmt"
	"math/rand"
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
		admin1_password, _ := bcrypt.GenerateFromPassword([]byte("12345678"), 14)
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
			Year:          4,
			Qualification: qualification1,
			Admin:         admin1,
			Major:         cpe,
		}
		db.Create(&cpe2560)

		cpe2564 := Course{
			Course_ID:     "CPE2564",
			Course_Name:   "หลักสูตรวิศวกรรมคอมพิวเตอร์ 2564",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin1,
			Major:         cpe,
		}
		db.Create(&cpe2564)

		ee2560 := Course{
			Course_ID:     "EE2560",
			Course_Name:   "หลักสูตรวิศวกรรมไฟฟ้า 2560",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification3,
			Admin:         admin2,
			Major:         ee,
		}
		db.Create(&ee2560)

		cv2560 := Course{
			Course_ID:     "CV2560",
			Course_Name:   "หลักสูตรวิศวกรรมโยธา 2560",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin3,
			Major:         civil,
		}
		db.Create(&cv2560)

		elec2562 := Course{
			Course_ID:     "ELEC2562",
			Course_Name:   "หลักสูตรวิศวกรรมอิเล็กทรอนิกส์ 2562",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification3,
			Admin:         admin2,
			Major:         elec,
		}
		db.Create(&elec2562)

		polymer2564 := Course{
			Course_ID:     "PM2564",
			Course_Name:   "หลักสูตรวิศวกรรมพอลิเมอร์ 2564",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin3,
			Major:         polymer,
		}
		db.Create(&polymer2564)

		mechanical2564 := Course{
			Course_ID:     "MC2564",
			Course_Name:   "หลักสูตรวิศวกรรมเครื่องกล 2564",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin3,
			Major:         mechanical,
		}
		db.Create(&mechanical2564)

		telecom2560 := Course{
			Course_ID:     "TLC2560",
			Course_Name:   "หลักสูตรวิศวกรรมโทรคมนาคม 2560",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin1,
			Major:         telecom,
		}
		db.Create(&telecom2560)

		industrial2560 := Course{
			Course_ID:     "IS2560",
			Course_Name:   "หลักสูตรวิศวกรรมอุสาหการ 2560",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin2,
			Major:         industrial,
		}
		db.Create(&industrial2560)

		ph2561 := Course{
			Course_ID:     "PH2561",
			Course_Name:   "หลักสูตรสาธารณสุข 2561",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin2,
			Major:         industrial,
		}
		db.Create(&ph2561)

		com_sci2564 := Course{
			Course_ID:     "CS2564",
			Course_Name:   "หลักสูตรวิทยาการคอมพิวเตอร์ 2564",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin1,
			Major:         com_sci,
		}
		db.Create(&com_sci2564)

		physics2562 := Course{
			Course_ID:     "PS2562",
			Course_Name:   "หลักสูตรฟิสิกส์ 2562",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin3,
			Major:         physics,
		}
		db.Create(&physics2562)

		biology2561 := Course{
			Course_ID:     "BL2561",
			Course_Name:   "หลักสูตรชีววิทยา 2561",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin2,
			Major:         biology,
		}
		db.Create(&biology2561)

		chemical2564 := Course{
			Course_ID:     "CC2564",
			Course_Name:   "หลักสูตรเคมี 2564",
			Datetime:      time.Now(),
			Year:          4,
			Qualification: qualification2,
			Admin:         admin2,
			Major:         chemical,
		}
		db.Create(&chemical2564)
		//Student
		dormitory1 := Dormitory{
			Dormitory_ID:   "DT01",
			Dormitory_Name: "Suraniwet Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory1)

		dormitory2 := Dormitory{
			Dormitory_ID:   "DT02",
			Dormitory_Name: "Homesuke Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory2)

		dormitory3 := Dormitory{
			Dormitory_ID:   "DT03",
			Dormitory_Name: "Darkhold Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory3)

		dormitory4 := Dormitory{
			Dormitory_ID:   "DT04",
			Dormitory_Name: "Sunee Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory4)

		dormitory5 := Dormitory{
			Dormitory_ID:   "DT05",
			Dormitory_Name: "Phattan Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory5)

		dormitory6 := Dormitory{
			Dormitory_ID:   "DT06",
			Dormitory_Name: "Burean Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory6)

		dormitory7 := Dormitory{
			Dormitory_ID:   "DT07",
			Dormitory_Name: "Chalean Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory7)

		dormitory8 := Dormitory{
			Dormitory_ID:   "DT08",
			Dormitory_Name: "Pennapat Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory8)

		dormitory9 := Dormitory{
			Dormitory_ID:   "DT09",
			Dormitory_Name: "Lokkaew Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory9)

		dormitory10 := Dormitory{
			Dormitory_ID:   "DT10",
			Dormitory_Name: "Manee Dormitory",
		}
		db.Model(&Dormitory{}).Create(&dormitory10)

		student1_password, _ := bcrypt.GenerateFromPassword([]byte("abcd1234"), 14)
		student2_password, _ := bcrypt.GenerateFromPassword([]byte("abcd4321"), 14)
		student3_password, _ := bcrypt.GenerateFromPassword([]byte("suranaree5555"), 14)
		student4_password, _ := bcrypt.GenerateFromPassword([]byte("zxcv4321"), 14)
		student5_password, _ := bcrypt.GenerateFromPassword([]byte("qwer5555"), 14)

		student1 := Student{
			Student_ID:       "B6311111",
			Student_Name:     "ปีเตอร์ สงบสุข",
			Student_Password: string(student1_password),
			Student_Age:      19,
			Datetime:         time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory2,
		}
		db.Model(&Student{}).Create(&student1)

		student2 := Student{
			Student_ID:       "B6200001",
			Student_Name:     "สมพงษ์ วิ่งวุฒิ",
			Student_Password: string(student2_password),
			Student_Age:      20,
			Datetime:         time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory5,
		}
		db.Model(&Student{}).Create(&student2)

		student3 := Student{
			Student_ID:       "B6233333",
			Student_Name:     "สมใจ ใยดี",
			Student_Password: string(student3_password),
			Student_Age:      20,
			Datetime:         time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory1,
		}
		db.Model(&Student{}).Create(&student3)

		student4 := Student{
			Student_ID:       "B6312345",
			Student_Name:     "เทพกิต สมพิช",
			Student_Password: string(student4_password),
			Student_Age:      20,
			Datetime:         time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory4,
		}
		db.Model(&Student{}).Create(&student4)

		student5 := Student{
			Student_ID:       "B6302561",
			Student_Name:     "วิเดช สุทธิพัฒน์",
			Student_Password: string(student5_password),
			Student_Age:      21,
			Datetime:         time.Now(),
			Admin:            admin1,
			Course:           cpe2560,
			Dormitory:        dormitory8,
		}
		db.Model(&Student{}).Create(&student5)

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
		nunthawut_password, _ := bcrypt.GenerateFromPassword([]byte("kdd12345"), 14)
		chanwit_password, _ := bcrypt.GenerateFromPassword([]byte("se631234"), 14)
		komsan_password, _ := bcrypt.GenerateFromPassword([]byte("komsanoot"), 14)
		sarunya_password, _ := bcrypt.GenerateFromPassword([]byte("sarunyaos123"), 14)
		wichai_password, _ := bcrypt.GenerateFromPassword([]byte("wichaielec555"), 14)
		paramete_password, _ := bcrypt.GenerateFromPassword([]byte("jaow9876"), 14)
		supaporn_password, _ := bcrypt.GenerateFromPassword([]byte("datastruct444"), 14)
		kittisak_password, _ := bcrypt.GenerateFromPassword([]byte("kittisakthailand"), 14)
		nittiya_password, _ := bcrypt.GenerateFromPassword([]byte("nittiya_ai"), 14)
		kacha_password, _ := bcrypt.GenerateFromPassword([]byte("kachacompro54"), 14)
		parin_password, _ := bcrypt.GenerateFromPassword([]byte("parincyber"), 14)

		professor1 := Professor{
			// Model:              gorm.Model{ID: 1},
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
			// Model:              gorm.Model{ID: 2},
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
			// Model:              gorm.Model{ID: 3},
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

		// =========================== CPE Professor ======================================
		nunthawut_kaoangku := Professor{
			Professor_ID:       "P5788123",
			Professor_name:     "Nunthawut Kaoungku",
			Professor_address:  "Sakhon Nakhon",
			Professor_email:    "nunthawut@sut.ac.th",
			Professor_tel:      "044-224559",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              cpe,
			Professor_password: string(nunthawut_password),
		}

		kittisak_kerdprasop := Professor{
			Professor_ID:       "P3704667",
			Professor_name:     "Kittisak Kerdprasop",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "kerdpras@sut.ac.th",
			Professor_tel:      "044-224349",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification3,
			Major:              cpe,
			Professor_password: string(kittisak_password),
		}

		nittiya_kerdprasop := Professor{
			Professor_ID:       "P3789332",
			Professor_name:     "Nittiya Kerdprasop",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "nittaya@sut.ac.th",
			Professor_tel:      "044-224432",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification3,
			Major:              cpe,
			Professor_password: string(nittiya_password),
		}

		kacha_chansilp := Professor{
			Professor_ID:       "P3901556",
			Professor_name:     "Kacha Chansilp",
			Professor_address:  "Chiang rai",
			Professor_email:    "kacha@sut.ac.th",
			Professor_tel:      "044-224237",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              cpe,
			Professor_password: string(kacha_password),
		}

		paramete_horkaew := Professor{
			Professor_ID:       "P4401998",
			Professor_name:     "Paramete Horkaew",
			Professor_address:  "Ayutthaya",
			Professor_email:    "paramete@sut.ac.th",
			Professor_tel:      "044-224989",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              cpe,
			Professor_password: string(paramete_password),
		}

		chanwit_kaewkasi := Professor{
			Professor_ID:       "P4866743",
			Professor_name:     "Chanwit Kaewkasi",
			Professor_address:  "Bangkok",
			Professor_email:    "chanwi@sut.ac.th",
			Professor_tel:      "044-224424",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              cpe,
			Professor_password: string(chanwit_password),
		}

		sarunya_kanjanawatthana := Professor{
			Professor_ID:       "P5699811",
			Professor_name:     "Sarunya Kanjanawatthana",
			Professor_address:  "Lampang",
			Professor_email:    "sarunya.k@sut.ac.th",
			Professor_tel:      "044-224447",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              cpe,
			Professor_password: string(sarunya_password),
		}

		supaporn_bunrit := Professor{
			Professor_ID:       "P4957893",
			Professor_name:     "Supaporn Bunrit",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "sbunrit@sut.ac.th",
			Professor_tel:      "044-224175",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification1,
			Major:              cpe,
			Professor_password: string(supaporn_password),
		}

		wichai_srisurak := Professor{
			Professor_ID:       "P4299563",
			Professor_name:     "Wichai Srisurak",
			Professor_address:  "Nakhonratchasima",
			Professor_email:    "wichai@sut.ac.th",
			Professor_tel:      "044-224646",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification1,
			Major:              cpe,
			Professor_password: string(wichai_password),
		}

		parin_sornlertlamvanich := Professor{
			Professor_ID:       "P5138446",
			Professor_name:     "Parin Sornlertlamvanich",
			Professor_address:  "Songkla",
			Professor_email:    "parin@sut.ac.th",
			Professor_tel:      "044-224452",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification1,
			Major:              cpe,
			Professor_password: string(parin_password),
		}

		komsan_srivisut := Professor{
			Professor_ID:       "P6356778",
			Professor_name:     "Komsan Srivisut",
			Professor_address:  "Chiang Mai",
			Professor_email:    "komsan@sut.ac.th",
			Professor_tel:      "044-224461",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification1,
			Major:              cpe,
			Professor_password: string(komsan_password),
		}
		db.Create(&nunthawut_kaoangku)
		db.Create(&kittisak_kerdprasop)
		db.Create(&nittiya_kerdprasop)
		db.Create(&kacha_chansilp)
		db.Create(&paramete_horkaew)
		db.Create(&chanwit_kaewkasi)
		db.Create(&sarunya_kanjanawatthana)
		db.Create(&supaporn_bunrit)
		db.Create(&wichai_srisurak)
		db.Create(&parin_sornlertlamvanich)
		db.Create(&komsan_srivisut)

		// ====================== Electrical Engineering Professor ===========================
		kongpol_areerak_password, _ := bcrypt.GenerateFromPassword([]byte("kongpolpol"), 14)
		kongpan_areerak_password, _ := bcrypt.GenerateFromPassword([]byte("ppan444"), 14)
		keerati_chayakulkheeree_password, _ := bcrypt.GenerateFromPassword([]byte("keerati1999"), 14)
		anant_ounsiwilai_password, _ := bcrypt.GenerateFromPassword([]byte("anantmicrocontroller"), 14)
		boonruang_marungsri_password, _ := bcrypt.GenerateFromPassword([]byte("boonrounghighvolt"), 14)
		athit_srikaew_password, _ := bcrypt.GenerateFromPassword([]byte("athit_elec17547"), 14)

		kongpol_areerak := Professor{
			// P45XXXXX
			Professor_ID:       "P4894002",
			Professor_name:     "Kongpol Areerak",
			Professor_address:  "Samut Sakhon",
			Professor_email:    "kongpol@sut.ac.th",
			Professor_tel:      "044-556912",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              ee,
			Professor_password: string(kongpol_areerak_password),
		}
		kongpan_areerak := Professor{
			// P45XXXXX
			Professor_ID:       "P5011554",
			Professor_name:     "Kongpan Areerak",
			Professor_address:  "Samut Sakhon",
			Professor_email:    "kongpan@sut.ac.th",
			Professor_tel:      "044-556813",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              ee,
			Professor_password: string(kongpan_areerak_password),
		}

		keerati_chayakulkheeree := Professor{
			Professor_ID:       "P6300781",
			Professor_name:     "Keerati Chayakulkheeree",
			Professor_address:  "Bangkok",
			Professor_email:    "keerati.s@sut.ac.th",
			Professor_tel:      "044-224699",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification1,
			Major:              ee,
			Professor_password: string(keerati_chayakulkheeree_password),
		}

		anant_ounsiwilai := Professor{
			Professor_ID:       "P3896071",
			Professor_name:     "Anant Ounsiwilai",
			Professor_address:  "Bangkok",
			Professor_email:    "anant@sut.ac.th",
			Professor_tel:      "044-991934",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification3,
			Major:              ee,
			Professor_password: string(anant_ounsiwilai_password),
		}

		boonruang_marungsri := Professor{
			Professor_ID:       "P4964356",
			Professor_name:     "Boonruang Marungsri",
			Professor_address:  "Loei",
			Professor_email:    "bmshvee@sut.ac.th",
			Professor_tel:      "044-464975",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              ee,
			Professor_password: string(boonruang_marungsri_password),
		}

		athit_srikaew := Professor{
			Professor_ID:       "P5564644",
			Professor_name:     "Athit Srikaew",
			Professor_address:  "Kanchanaburi",
			Professor_email:    "athit@sut.ac.th",
			Professor_tel:      "044-119682",
			Status:             status1,
			Admin:              admin1,
			Qualification:      qualification2,
			Major:              ee,
			Professor_password: string(athit_srikaew_password),
		}
		db.Create(&kongpan_areerak)
		db.Create(&kongpol_areerak)
		db.Create(&anant_ounsiwilai)
		db.Create(&keerati_chayakulkheeree)
		db.Create(&boonruang_marungsri)
		db.Create(&athit_srikaew)

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
		// ============================ Computer Engineering Subjects ==============================
		software_engineering_sec1 := Subject{
			ID:               1,
			Subject_ID:       "523332",
			Professor:        chanwit_kaewkasi,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "วิศวกรรมซอฟต์แวร์",
			Subject_EN_Name:  "Software Engineering",
			Capacity:         60,
			Enroll_Amount:    0,
			Latest_Updated:   time.Now(),
			Reserved:         20,
			Reserved_Enroll:  0,
			Unit:             4,
			Section:          1,
		}

		software_engineering_sec2 := Subject{
			ID:               2,
			Subject_ID:       "523332",
			Professor:        chanwit_kaewkasi,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "วิศวกรรมซอฟต์แวร์",
			Subject_EN_Name:  "Software Engineering",
			Capacity:         60,
			Latest_Updated:   time.Now(),
			Enroll_Amount:    0,
			Reserved:         20,
			Reserved_Enroll:  0,
			Unit:             4,
			Section:          2,
		}
		software_engineering_sec3 := Subject{
			ID:               3,
			Subject_ID:       "523332",
			Professor:        chanwit_kaewkasi,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "วิศวกรรมซอฟต์แวร์",
			Subject_EN_Name:  "Software Engineering",
			Capacity:         60,
			Latest_Updated:   time.Now(),
			Enroll_Amount:    0,
			Reserved:         20,
			Reserved_Enroll:  0,
			Unit:             4,
			Section:          3,
		}
		db.Create(&software_engineering_sec1)
		db.Create(&software_engineering_sec2)
		db.Create(&software_engineering_sec3)
		operating_system_sec1 := Subject{
			ID:               4,
			Subject_ID:       "523354",
			Professor:        sarunya_kanjanawatthana,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "ระบบปฏิบัติการ",
			Subject_EN_Name:  "Operating System",
			Capacity:         60,
			Latest_Updated:   time.Now(),
			Enroll_Amount:    0,
			Reserved:         20,
			Reserved_Enroll:  0,
			Unit:             4,
			Section:          1,
		}

		operating_system_sec2 := Subject{
			ID:               5,
			Subject_ID:       "523354",
			Professor:        sarunya_kanjanawatthana,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "ระบบปฏิบัติการ",
			Subject_EN_Name:  "Operating System",
			Capacity:         60,
			Enroll_Amount:    0,
			Latest_Updated:   time.Now(),

			Reserved:        20,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}
		db.Create(&operating_system_sec1)
		db.Create(&operating_system_sec2)
		pluri_thai := Subject{
			ID:               6,
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
			Latest_Updated:   time.Now(),

			Reserved:        200,
			Reserved_Enroll: 0,
			Unit:            2,
			Section:         1,
		}
		db.Create(&pluri_thai)

		problem_solving_sec1 := Subject{
			ID:               7,
			Subject_ID:       "523203",
			Professor:        komsan_srivisut,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "การแก้ปัญหาด้วยโปรแรกม",
			Subject_EN_Name:  "Problem Solving with Programming",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		problem_solving_sec2 := Subject{
			ID:               8,
			Subject_ID:       "523203",
			Professor:        komsan_srivisut,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "การแก้ปัญหาด้วยโปรแรกม",
			Subject_EN_Name:  "Problem Solving with Programming",
			Capacity:         45,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}
		db.Create(&problem_solving_sec1)
		db.Create(&problem_solving_sec2)

		system_analysis_sec1 := Subject{
			ID:               9,
			Subject_ID:       "523331",
			Professor:        chanwit_kaewkasi,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "การวิเคราะห์และออกแบบระบบ",
			Subject_EN_Name:  "System Analysis and Design",
			Capacity:         60,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		system_analysis_sec2 := Subject{
			ID:               10,
			Subject_ID:       "523331",
			Professor:        chanwit_kaewkasi,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "การวิเคราะห์และออกแบบระบบ",
			Subject_EN_Name:  "System Analysis and Design",
			Capacity:         60,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}
		db.Create(&system_analysis_sec1)
		db.Create(&system_analysis_sec2)

		artificial_neural_network := Subject{
			ID:               11,
			Subject_ID:       "523414",
			Professor:        supaporn_bunrit,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category2,
			Subject_TH_Name:  "โครงข่ายประสาทเทียม",
			Subject_EN_Name:  "Artificial Neural Network",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		db.Create(&artificial_neural_network)

		knowledge_discovery_and_data_mining := Subject{
			ID:               12,
			Subject_ID:       "523312",
			Professor:        nunthawut_kaoangku,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category2,
			Subject_TH_Name:  "การค้นพบความรู้และการทำเหมืองข้อมูล",
			Subject_EN_Name:  "Knowledge Discovery and Data Mining",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		db.Create(&knowledge_discovery_and_data_mining)

		data_structure_and_algorithms := Subject{
			ID:               13,
			Subject_ID:       "523231",
			Professor:        supaporn_bunrit,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "โครงสร้างข้อมูลและขั้นตอนวิธี",
			Subject_EN_Name:  "Data Structure and Algorithms",
			Capacity:         120,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		db.Create(&data_structure_and_algorithms)

		oot_sec1 := Subject{
			ID:               14,
			Subject_ID:       "523232",
			Professor:        komsan_srivisut,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "เทคโนโลยีเชิงวัตถุ",
			Subject_EN_Name:  "Object-Oriented Technology",
			Capacity:         45,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		oot_sec2 := Subject{
			ID:               15,
			Subject_ID:       "523232",
			Professor:        komsan_srivisut,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       labs,
			Subject_Category: category1,
			Subject_TH_Name:  "เทคโนโลยีเชิงวัตถุ",
			Subject_EN_Name:  "Object-Oriented Technology",
			Capacity:         45,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        10,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}

		db.Create(&oot_sec1)
		db.Create(&oot_sec2)

		digital_system_design_sec1 := Subject{
			ID:               16,
			Subject_ID:       "523273",
			Professor:        wichai_srisurak,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "การออกแบบระบบดิจิทัล",
			Subject_EN_Name:  "Digital System Design",
			Capacity:         50,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		digital_system_design_sec2 := Subject{
			ID:               17,
			Subject_ID:       "523273",
			Professor:        wichai_srisurak,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "การออกแบบระบบดิจิทัล",
			Subject_EN_Name:  "Digital System Design",
			Capacity:         50,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}
		db.Create(&digital_system_design_sec1)
		db.Create(&digital_system_design_sec2)

		computer_vision := Subject{
			ID:               18,
			Subject_ID:       "523453",
			Professor:        paramete_horkaew,
			Course:           cpe2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category2,
			Subject_TH_Name:  "การมองเห็นด้วยคอมพิวเตอร์",
			Subject_EN_Name:  "Computer Vision",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		db.Create(&computer_vision)

		// ============================ Electrical Engineering Subjects ==============================
		electrical_circuit_1_sec1 := Subject{
			ID:               19,
			Subject_ID:       "529201",
			Professor:        kongpan_areerak,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "วงจรไฟฟ้า",
			Subject_EN_Name:  "Electrical Circuits",
			Capacity:         60,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		electrical_circuit_1_sec2 := Subject{
			ID:               20,
			Subject_ID:       "529201",
			Professor:        kongpol_areerak,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "วงจรไฟฟ้า",
			Subject_EN_Name:  "Electrical Circuits",
			Capacity:         60,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}

		engineering_electronics := Subject{
			ID:               21,
			Subject_ID:       "529204",
			Professor:        athit_srikaew,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "อิเล็กทรอนิกส์วิศวกรรม",
			Subject_EN_Name:  "Engineering Electronics",
			Capacity:         60,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		digital_logic_sec1 := Subject{
			ID:               22,
			Subject_ID:       "529207",
			Professor:        anant_ounsiwilai,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "ดิจิทัลลอจิก",
			Subject_EN_Name:  "Digital Logic",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}
		digital_logic_sec2 := Subject{
			ID:               23,
			Subject_ID:       "529207",
			Professor:        anant_ounsiwilai,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "ดิจิทัลลอจิก",
			Subject_EN_Name:  "Digital Logic",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}

		matlab_programming_sec1 := Subject{
			ID:               24,
			Subject_ID:       "529212",
			Professor:        athit_srikaew,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "การเขียนโปรแกรมแม็ตแล็บ",
			Subject_EN_Name:  "Matlab Programming",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         1,
		}

		matlab_programming_sec2 := Subject{
			ID:               25,
			Subject_ID:       "529212",
			Professor:        athit_srikaew,
			Course:           ee2560,
			Subject_Status:   subject_open,
			Class_Type:       lecture,
			Subject_Category: category1,
			Subject_TH_Name:  "การเขียนโปรแกรมแม็ตแล็บ",
			Subject_EN_Name:  "Matlab Programming",
			Capacity:         40,
			Latest_Updated:   time.Now(),

			Enroll_Amount:   0,
			Reserved:        5,
			Reserved_Enroll: 0,
			Unit:            4,
			Section:         2,
		}
		db.Create(&electrical_circuit_1_sec1)
		db.Create(&electrical_circuit_1_sec2)
		db.Create(&engineering_electronics)
		db.Create(&digital_logic_sec1)
		db.Create(&digital_logic_sec2)
		db.Create(&matlab_programming_sec1)
		db.Create(&matlab_programming_sec2)

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

		room_b1214 := Room{
			Room_ID:  "B1214",
			Seats:    75,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}
		room_b1209 := Room{
			Room_ID:  "B1209",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_b1120 := Room{
			Room_ID:  "B1120",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_b1118 := Room{
			Room_ID:  "B1118",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_b1207 := Room{
			Room_ID:  "B1207",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_b1208 := Room{
			Room_ID:  "B1208",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_b1134 := Room{
			Room_ID:  "B1134",
			Seats:    60,
			RoomType: lecture_room_type,
			Admin:    admin2,
			Building: building_b1,
		}

		room_F11_software := Room{
			Room_ID:  "F1142Software",
			Seats:    60,
			RoomType: lab_room_type,
			Building: building_f11,
			Admin:    admin3,
		}
		db.Create(&room_b2101)
		db.Create(&room_b1120)
		db.Create(&room_b1118)
		db.Create(&room_b1134)
		db.Create(&room_b1214)
		db.Create(&room_b1209)
		db.Create(&room_b1208)
		db.Create(&room_b1207)
		db.Create(&room_b4101)
		db.Create(&room_F11_micro)
		db.Create(&room_F11_software)
		db.Create(&room_b6105)

		pluri_thai_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
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
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    system_analysis_sec1,
			Section:                    1,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "System Analysis sec1",
			Day:                        "Mon",
		}

		system_analysis_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    system_analysis_sec2,
			Section:                    2,
			Room:                       room_b1118,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "System Analysis sec2",
			Day:                        "Mon",
		}
		ann_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    artificial_neural_network,
			Section:                    1,
			Room:                       room_b6105,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 14, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Artificial Neural Network class",
			Day:                        "Mon",
		}

		electrical_circuit_1_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    electrical_circuit_1_sec1,
			Section:                    1,
			Room:                       room_b1207,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 8, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 11, 00),
			Class_Schedule_Description: "Electrical Circuit in room b1207 sec1",
			Day:                        "Mon",
		}

		electrical_circuit_1_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    electrical_circuit_1_sec1,
			Section:                    2,
			Room:                       room_b1207,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Electrical Circuit in room b1206 sec2",
			Day:                        "Mon",
		}

		problem_solving_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    problem_solving_sec1,
			Section:                    1,
			Room:                       room_F11_software,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Problem Solving Sec 1 Class",
			Day:                        "Mon",
		}

		problem_solving_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    problem_solving_sec2,
			Section:                    2,
			Room:                       room_F11_software,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 16, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 19, 00),
			Class_Schedule_Description: "Problem Solving Sec 2 Class",
			Day:                        "Mon",
		}

		db.Create(&system_analysis_sec1_class)
		db.Create(&system_analysis_sec2_class)
		db.Create(&problem_solving_sec1_class)
		db.Create(&problem_solving_sec2_class)
		db.Create(&electrical_circuit_1_sec1_class)
		db.Create(&electrical_circuit_1_sec2_class)

		os_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    operating_system_sec1,
			Section:                    1,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "Operating System sec1 class",
			Day:                        "Tue",
		}

		os_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    operating_system_sec2,
			Section:                    2,
			Room:                       room_b2101,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 15, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 17, 00),
			Class_Schedule_Description: "Operating System sec2",
			Day:                        "Tue",
		}

		digital_system_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    digital_system_design_sec1,
			Section:                    1,
			Room:                       room_b1120,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Digital sec1 class in room b1120",
			Day:                        "Tue",
		}

		digital_system_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    digital_system_design_sec2,
			Section:                    2,
			Room:                       room_b1120,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 15, 00),
			Class_Schedule_Description: "Digital sec2 class in room b1120",
			Day:                        "Tue",
		}

		db.Create(&digital_system_sec1_class)
		db.Create(&digital_system_sec2_class)
		db.Create(&os_sec2_class)
		db.Create(&os_sec1_class)

		se_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    software_engineering_sec1,
			Section:                    1,
			Room:                       room_F11_micro,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 9, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Software Engineering Sec 1 Class",
			Day:                        "Wed",
		}

		se_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    software_engineering_sec1,
			Section:                    2,
			Room:                       room_F11_micro,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Software Engineering Sec 2 Class",
			Day:                        "Wed",
		}

		data_structure_and_algorithms_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    data_structure_and_algorithms,
			Section:                    1,
			Room:                       room_b1209,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Class Scheduel of Data Structure and Algorithms",
			Day:                        "Wed",
		}

		matlab_programming_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    matlab_programming_sec1,
			Section:                    1,
			Room:                       room_F11_software,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "Matlab Sec 1 class in F11Software",
			Day:                        "Wed",
		}

		matlab_programming_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    matlab_programming_sec1,
			Section:                    2,
			Room:                       room_F11_software,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 16, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 19, 00),
			Class_Schedule_Description: "Matlab Sec 2 class in F11Software",
			Day:                        "Wed",
		}

		db.Create(&se_sec1_class)
		db.Create(&se_sec2_class)
		db.Create(&data_structure_and_algorithms_class)
		db.Create(&matlab_programming_sec1_class)
		db.Create(&matlab_programming_sec2_class)

		oot_sec1_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    oot_sec1,
			Section:                    1,
			Room:                       room_F11_software,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 9, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "OOT Lab Sec1 class",
			Day:                        "Thu",
		}

		oot_sec2_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    oot_sec2,
			Section:                    2,
			Room:                       room_F11_software,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 13, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 16, 00),
			Class_Schedule_Description: "OOT Lab Sec1 class",
			Day:                        "Thu",
		}

		computer_vision_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    computer_vision,
			Section:                    1,
			Room:                       room_b1214,
			Admin:                      admin2,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "ComVision sec1 class in room b1214",
			Day:                        "Thu",
		}
		db.Create(&oot_sec1_class)
		db.Create(&oot_sec2_class)
		db.Create(&computer_vision_class)

		kdd_class := Class_Schedule{
			Class_Schedule_ID:          fmt.Sprintf("CLS%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:                    knowledge_discovery_and_data_mining,
			Section:                    1,
			Room:                       room_b6105,
			Admin:                      admin1,
			Start_Time:                 fmt.Sprintf("%02d:%02d", 10, 00),
			End_Time:                   fmt.Sprintf("%02d:%02d", 12, 00),
			Class_Schedule_Description: "Knowledge Discovery and Data Mining Class",
			Day:                        "Fri",
		}

		db.Create(&ann_sec1_class)
		db.Create(&kdd_class)

		pluri_thai_midterm := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          pluri_thai,
			Room:             room_b4101,
			Admin:            admin2,
			Exam_Type:        "Midterm",
			Exam_Date:        "23/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 13, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 15, 00),
		}
		db.Create(&pluri_thai_midterm)

		system_analysis_midterm := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          system_analysis_sec1,
			Room:             room_b2101,
			Admin:            admin2,
			Exam_Type:        "Midterm",
			Exam_Date:        "18/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 17, 00),
		}

		db.Create(&system_analysis_midterm)

		os_final := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          operating_system_sec1,
			Room:             room_b6105,
			Admin:            admin1,
			Exam_Type:        "Final",
			Exam_Date:        "22/07/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 17, 00),
		}

		ann_midterm := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          artificial_neural_network,
			Room:             room_b6105,
			Admin:            admin1,
			Exam_Type:        "Final",
			Exam_Date:        "19/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}
		ps_final := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          problem_solving_sec1,
			Room:             room_b6105,
			Admin:            admin1,
			Exam_Type:        "Final",
			Exam_Date:        "19/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}

		oot_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          oot_sec1,
			Room:             room_b1209,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "19/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 15, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 18, 00),
		}

		computer_vision_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          computer_vision,
			Room:             room_b1209,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "19/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 13, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 15, 00),
		}

		se_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          software_engineering_sec1,
			Room:             room_b1214,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "16/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 16, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 18, 00),
		}

		electrical_circuit_1_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          electrical_circuit_1_sec1,
			Room:             room_b1207,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "16/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 13, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 15, 00),
		}

		matlab_programming_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          matlab_programming_sec1,
			Room:             room_b1208,
			Admin:            admin2,
			Exam_Type:        "Midterm",
			Exam_Date:        "17/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}

		digital_system_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          digital_system_design_sec1,
			Room:             room_F11_micro,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "20/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 9, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 12, 00),
		}

		kdd_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          knowledge_discovery_and_data_mining,
			Room:             room_b1120,
			Admin:            admin1,
			Exam_Type:        "Midterm",
			Exam_Date:        "21/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 13, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 15, 00),
		}

		data_structure_and_algorithms_test := Exam_Schedule{
			Exam_Schedule_ID: fmt.Sprintf("EXAM%d%10d", rand.Intn(10), rand.Intn(10000000000)+10000000000),
			Subject:          data_structure_and_algorithms,
			Room:             room_b1214,
			Admin:            admin3,
			Exam_Type:        "Midterm",
			Exam_Date:        "21/05/2020",
			Exam_Start_Time:  fmt.Sprintf("%02d:%02d", 12, 00),
			Exam_End_Time:    fmt.Sprintf("%02d:%02d", 14, 00),
		}

		db.Create(&os_final)
		db.Create(&ann_midterm)
		db.Create(&ps_final)
		db.Create(&oot_test)
		db.Create(&computer_vision_test)
		db.Create(&se_test)
		db.Create(&electrical_circuit_1_test)
		db.Create(&matlab_programming_test)
		db.Create(&digital_system_test)
		db.Create(&kdd_test)
		db.Create(&data_structure_and_algorithms_test)

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
			Request_ID:     1,
			Reason:         "อยากเรียน",
			Student:        student2,
			Section:        2,
			Subject:        software_engineering_sec1,
			Class_Schedule: system_analysis_sec1_class,
			Exam_Schedule:  system_analysis_midterm,
			Request_Type:   Request_Type1,
		}
		db.Create(&Request1)

		Request2 := Request{
			Request_ID:     2,
			Reason:         "เวลาเรียนชน",
			Student:        student1,
			Section:        1,
			Subject:        operating_system_sec1,
			Class_Schedule: os_sec1_class,
			Exam_Schedule:  os_final,
			Request_Type:   Request_Type2,
		}
		db.Create(&Request2)
		enroll1 := Enroll{
			Enroll_ID:         "E001",
			Student:           student1,
			Subject:           software_engineering_sec1,
			Class_Schedule:    system_analysis_sec1_class,
			Exam_Schedule:     system_analysis_midterm,
			Enroll_Time_Stamp: time.Now(),
			Section:           1,
		}

		enroll2 := Enroll{
			Enroll_ID:         "E002",
			Student:           student2,
			Subject:           operating_system_sec1,
			Class_Schedule:    os_sec1_class,
			Exam_Schedule:     os_final,
			Enroll_Time_Stamp: time.Now(),
			Section:           1,
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
		Grade3 := Grade{
			Grade_ID:    "B",
			Description: "ดี",
		}
		db.Create(&Grade3)
		Grade4 := Grade{
			Grade_ID:    "C+",
			Description: "ดีพอใช้",
		}
		db.Create(&Grade4)
		Grade5 := Grade{
			Grade_ID:    "C",
			Description: "พอใช้",
		}
		db.Create(&Grade5)
		Grade6 := Grade{
			Grade_ID:    "D+",
			Description: "อ่อน",
		}
		db.Create(&Grade6)
		Grade7 := Grade{
			Grade_ID:    "D",
			Description: "อ่อนมาก",
		}
		db.Create(&Grade7)
		Grade8 := Grade{
			Grade_ID:    "F",
			Description: "ตก",
		}
		db.Create(&Grade8)
		Grade9 := Grade{
			Grade_ID:    "I",
			Description: "การวัดผลยังไม่สมบูรณ์",
		}
		db.Create(&Grade9)
		Grade10 := Grade{
			Grade_ID:    "M",
			Description: "นักศึกษาขาดสอบ",
		}
		db.Create(&Grade10)
		Grade11 := Grade{
			Grade_ID:    "P",
			Description: "การสอนยังไม่สิ้นสุด",
		}
		db.Create(&Grade11)
		Grade12 := Grade{
			Grade_ID:    "S",
			Description: "ผลการประเมินเป็นที่พอใจ",
		}
		db.Create(&Grade12)
		Grade13 := Grade{
			Grade_ID:    "ST",
			Description: "ผลการประเมินเป็นที่พอใจสำหรับรายวิชา",
		}
		db.Create(&Grade13)
		Grade14 := Grade{
			Grade_ID:    "U",
			Description: "ผลการประเมินไม่เป็นที่พอใจ",
		}
		db.Create(&Grade14)
		Grade15 := Grade{
			Grade_ID:    "V",
			Description: "ผู้ร่วมเรียน",
		}
		db.Create(&Grade15)
		Grade16 := Grade{
			Grade_ID:    "W",
			Description: "การถอนรายวิชา",
		}
		db.Create(&Grade16)
		Grade17 := Grade{
			Grade_ID:    "X",
			Description: "ยังไม่ได้รับผลการประเมิน",
		}
		db.Create(&Grade17)

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
			Date_Time:       time.Now(),
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
			Date_Time:       time.Now(),
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
