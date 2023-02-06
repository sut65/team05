package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	// "golang.org/x/text/number"
)


func TestGradeIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()

	gradeid := entity.Adding_point{
		Grade_ID: "", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(gradeid)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_ID cannot be blank"))
}


func TestGradeID_not_lowwerAlphabet(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()

	gradeid := entity.Adding_point{
		Grade_ID: "1234", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(gradeid)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("You can use uppercase letters"))
}

func TestGradeID_not_ThaiAlphabet(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()

	gradeid := entity.Adding_point{
		Grade_ID: "ฟหกฟดหกฟเ", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(gradeid)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Don't use ThaiAlphabet"))
}


