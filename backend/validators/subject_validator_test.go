package entity

import (
	"strings"
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/B6025212/team05/service"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบว่าหน่วยกิจต้องมากกว่า 0
func TestUnitMoreThanZero(t *testing.T) {
	g := NewGomegaWithT(t)

	subject1 := entity.Subject{
		Unit:    0, // ไม่ถูกต้อง หน่วยกิจต้องมากกว่า 0
		Section: 0, // ไม่ถูกต้อง กลุ่มต้องไม่เป็น 0
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct((subject1))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	splitErrors := strings.Split(err.Error(), ";")
	if len(splitErrors) == 1 {
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Section must greater than 0"))
	} else {
		g.Expect(splitErrors[0]).To(Equal("Section must greater than 0"))
	}

}

func TestSubjectID(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSubjectValidation()

	// Correct Format
	subject1 := entity.Subject{
		Subject_ID: "IST2025022",
		Section:    1,
		Unit:       1,
	}

	ok, err := govalidator.ValidateStruct((subject1))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Wrong Subject ID Format"))

}

func TestSubjectBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSubjectValidation()

	// Correct Format
	subject1 := entity.Subject{
		Subject_ID: "",
		Section:    1,
		Unit:       1,
	}

	ok, err := govalidator.ValidateStruct((subject1))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Subject ID cannot be blank"))

}

func TestDuplicateSubject(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSubjectValidation()

	// Correct Format
	subject1 := entity.Subject{
		Subject_ID: "523331",
		Section:    1,
		Unit:       1,
	}

	ok, err := service.ValidateDuplicateSubject(subject1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("Duplicate Subject! There's subject with subject id 523331 and section 1"))
}

func TestSubjectName(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSubjectValidation()

	// Correct Format
	// system_analysis := entity.Subject{
	// 	Unit:            1,
	// 	Subject_TH_Name: "การวิเคราะห์และออกแบบระบบ",
	// }

	software_engineering := entity.Subject{
		Subject_ID:      "551222",
		Section:         1,
		Unit:            1,
		Subject_EN_Name: "Software Engineering",
		Subject_TH_Name: "วิศวกรรมซอฟต์แวร์a",
	}

	// ok, err := govalidator.ValidateStruct((system_analysis))
	ok, err := govalidator.ValidateStruct((software_engineering))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Incorrect Subject TH Name format!!"))

	// splitErrors := strings.Split(err.Error(), ";")
	// if len(splitErrors) == 1 {
	// 	// err.Error ต้องมี error message แสดงออกมา
	// 	g.Expect(err.Error()).To(Equal("Error!"))
	// } else {
	// 	g.Expect(splitErrors[0]).To(Equal("Error!"))
	// }
}
