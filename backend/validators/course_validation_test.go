package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCoursePass(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}
	course := entity.Course{
		Course_ID:        "CPE2560",         
		Course_Name:      "นายสมพงณ์ สงบดี",
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}
func TestCourseIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}
	course := entity.Course{
		Course_ID:        "",                
		Course_Name:      "นายสมพงณ์ สงบดี", 
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course ID cannot be null"))
}

func TestCourseIDCheckLowerCase(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "awadawdawd",      
		Course_Name:      "นายสมพงณ์ สงบดี", 
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course ID cannot be lowercase"))
}

func TestCourseIDCheckThaiLanguage(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "พิมพ์ไทย",        
		Course_Name:      "นายสมพงณ์ สงบดี", 
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course ID cannot be Thai Language"))
}

func TestCourseNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseIDValidation()
	entity.SetCourseNameValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "CPE2560", // ผิด
		Course_Name:      "",        //ถูก
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course Name cannot be null"))
}

func TestCourseNameCheckEnglishLanguage(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "CPE2560", // ผิด
		Course_Name:      "test",    //ถูก
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course Name cannot be English Language"))
}

func TestCourseNameMaxString(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()

	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "CPE2560",                                                     
		Course_Name:      "ทดสอบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบ", 
		Datetime:         time.Now(),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course Name can not greater than 35 character"))
}

func TestCourseDatetimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()
	entity.SetCourseDatetimeValidation()
	qualification1 := entity.Qualification{
		Qualification_ID: "QT01",
	}
	admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}
	major1 := entity.Major{
		Major_ID: "CPE",
	}

	course := entity.Course{
		Course_ID:        "CPE2565",  
		Course_Name:      "ทดสอบบบบ", 
		Datetime:         time.Now().Add(time.Second * 1000),
		Year:             4,
		Qualification_ID: &qualification1.Qualification_ID,
		Admin_ID:         &admin1.Admin_ID,
		Major_ID:         &major1.Major_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Datetime cannot be future"))
}
