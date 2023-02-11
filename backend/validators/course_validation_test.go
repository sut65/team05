package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCourseIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseNameValidation()
	entity.SetCourseIDValidation()

	course := entity.Course{
		Course_ID:   "",                // ผิด
		Course_Name: "นายสมพงณ์ สงบดี", //ถูก
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

	course := entity.Course{
		Course_ID:   "awadawdawd",      // ผิด
		Course_Name: "นายสมพงณ์ สงบดี", //ถูก
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

	course := entity.Course{
		Course_ID:   "พิมพ์ไทย",        // ผิด
		Course_Name: "นายสมพงณ์ สงบดี", //ถูก
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

	course := entity.Course{
		Course_ID:   "CPE2565", //ถูก
		Course_Name: "",     // ผิด
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

	course := entity.Course{
		Course_ID:   "CPE2565", //ถูก
		Course_Name: "test",    // ผิด
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

	course := entity.Course{
		Course_ID:   "CPE2565",                                                                                       //ถูก
		Course_Name: "ทดสอบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบบ", // ผิด
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

	course := entity.Course{
		Course_ID:   "CPE2565",  //ถูก
		Course_Name: "ทดสอบบบบ", // ถูก
		Datetime:    time.Now().Add(time.Second * 1000),
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
