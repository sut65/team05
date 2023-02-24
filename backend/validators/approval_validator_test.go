package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestApprovalPass(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetApprovalValidation()
	professor1 := entity.Professor{
		Professor_ID: "P4866743",
	}
	Request3 := entity.Request{
		Request_ID: 3,
	}
	Approval_Type1 := entity.Approval_Type{
		Approval_Type_ID: "N01",
	}

	approval := entity.Approval{
		Approval_ID:   3,
		Reason:        "รับแล้วจ้า",
		Professor:     professor1,
		Section:       2,
		Request:       Request3,
		Approval_Type: Approval_Type1,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approval)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestApprovalReasonNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetApprovalValidation()
	professor1 := entity.Professor{
		Professor_ID: "P4866743",
	}
	Request3 := entity.Request{
		Request_ID: 3,
	}
	Approval_Type1 := entity.Approval_Type{
		Approval_Type_ID: "N01",
	}

	approval := entity.Approval{
		Approval_ID:   3,
		Reason:        "",
		Professor:     professor1,
		Section:       2,
		Request:       Request3,
		Approval_Type: Approval_Type1,
		Date_Time:      time.Now(),
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

	entity.SetApprovalValidation()
	professor1 := entity.Professor{
		Professor_ID: "P4866743",
	}
	Request3 := entity.Request{
		Request_ID: 3,
	}
	Approval_Type1 := entity.Approval_Type{
		Approval_Type_ID: "N01",
	}

	approval := entity.Approval{
		Approval_ID:   3,
		Reason:        "55555",
		Professor:     professor1,
		Section:       2,
		Request:       Request3,
		Approval_Type: Approval_Type1,
		Date_Time:      time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approval)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reason cannot be special characters or number"))
}

func TestMaxcharectorReason(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetApprovalValidation()
	professor1 := entity.Professor{
		Professor_ID: "P4866743",
	}
	Request3 := entity.Request{
		Request_ID: 3,
	}
	Approval_Type1 := entity.Approval_Type{
		Approval_Type_ID: "N01",
	}

	approval := entity.Approval{
		Approval_ID:   3,
		Reason:        "กกกกกกกกกกกกกกกกกกกกกกกกกกกกกกก",
		Professor:     professor1,
		Section:       2,
		Request:       Request3,
		Approval_Type: Approval_Type1,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(approval)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("The reason cannot be more than 30 characters"))
}
