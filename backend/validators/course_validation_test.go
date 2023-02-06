package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCourseNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	coursename1 := entity.Course{
		Course_Name: "", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(coursename1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course Name cannot be blank"))
}

func TestCourseIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetCourseIDValidation()

	courseid := entity.Course{
		Course_ID: "CPE2555", // ถูก
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(courseid)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Wrong Course ID Format"))
}
