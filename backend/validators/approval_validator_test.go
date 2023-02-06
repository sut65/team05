package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestApprovalReasonNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	approval := entity.Approval{
		Reason:     "", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approval)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reason cannot be blank"))
}

func TestApprovalReasonNotSpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)

	reason2 := entity.Approval{
		Reason:     "1234?$#@", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reason2)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reason cannot be special characters or number"))
}

func TestMaxcharectorReason(t *testing.T) {
	g := NewGomegaWithT(t)

	reason2 := entity.Approval{
		Reason: "กกกกกกกกกกกกกกกกกกกกกกกกกกกกกกก", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reason2)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("The reason cannot be more than 30 characters"))
}
