package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบว่าหน่วยกิจต้องมากกว่า 0
func TestUnitMoreThanZero(t *testing.T) {
	g := NewGomegaWithT(t)

	subject1 := entity.Subject{
		Unit: 0, // ไม่ถูกต้อง หน่วยกิจต้องมากกว่า 0
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct((subject1))
	// ok := govalidator.IsPositive(float64(subject1.Unit))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("หน่วยกิจต้องมากกว่า 0"))
}

func TestSubjectID(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSubjectValidation()

	// Correct Format
	subject1 := entity.Subject{
		Subject_ID: "IST202502",
		Unit:       1,
	}

	ok, err := govalidator.ValidateStruct((subject1))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Error จ้า"))
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
		Unit:            1,
		Subject_EN_Name: "Software Engineering",
		Subject_TH_Name: "วิศวกรรมซอฟต์แวร์",
	}

	// ok, err := govalidator.ValidateStruct((system_analysis))
	ok, err := govalidator.ValidateStruct((software_engineering))

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Error จ้า"))
}
