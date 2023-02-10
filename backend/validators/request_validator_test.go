package entity

import (
	"testing"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestReasonNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	request := entity.Request{
		Reason:     "", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reason cannot be blank"))
}

func TestReasonNotSpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)

	reason := entity.Request{
		Reason:     "1234?$#@", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reason)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reason cannot be special characters or number"))
}

func TestRequestMaxcharectorReason(t *testing.T) {
	g := NewGomegaWithT(t)

	reason := entity.Request{
		Reason: "กกกกกกกกกกกกกกกกกกกกกกกกกกกกกกก", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reason)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("The reason cannot be more than 30 characters"))
}

func TestRequestCannotApprove(t *testing.T) {
	g := NewGomegaWithT(t)

	id := "1"

	// ตรวจสอบด้วย govalidator
	ok, err := controller.Validatecheckapproval(id)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("The reason cannot be more than 30 characters"))
}