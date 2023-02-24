package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	// "golang.org/x/text/number"
)


func TestGradeIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	

	professor1 := entity.Professor{
		Professor_ID: "P4866743",
	}
	enroll1 := entity.Enroll{
		Enroll_ID: "1325468",
	}

	grade1 := entity.Grade{		
		Grade_ID: "", // ผิด
	}

	adding_point1 := entity.Adding_point{
		Adding_point_ID: 1,
		Professor:professor1,
		Enroll:enroll1,
		Grade:grade1,
		Date:time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(adding_point1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade cannot be blank"))
}


func TestGradeID_not_lowwerAlphabet(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()
	


	professor2 := entity.Professor{
		Professor_ID: "P4866743",
	}
	enroll2 := entity.Enroll{
		Enroll_ID: "134567",
	}

	grade2 := entity.Grade {
		Grade_ID: "a",
	}

	adding_point2 := entity.Adding_point{
		Adding_point_ID: 2,
		Date:time.Now(),
		Professor_ID:&professor2.Professor_ID,
		Enroll_ID:&enroll2.Enroll_ID,
		Grade_ID:grade2.Grade_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(adding_point2)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please use uppercase letters"))
}

func TestGradeID_not_ThaiAlphabet(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()

	professor3 := entity.Professor{
		Professor_ID: "P486674",
	}
	enroll3 := entity.Enroll{
		Enroll_ID: "13456",
	}

	grade3 := entity.Grade{		
		Grade_ID: "ฟฟ", // ผิด
	}

	adding_point3 := entity.Adding_point{
		Adding_point_ID: 3,
		Date:time.Now(),
		Professor_ID:&professor3.Professor_ID,
		Enroll_ID:&enroll3.Enroll_ID,
		Grade_ID:grade3.Grade_ID,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(adding_point3)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Don't use ThaiAlphabet"))
}
func TestGradeIDsuccess(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetGradeIDValidation()

	professor4 := entity.Professor{
		Professor_ID: "P48667456",
	}
	enroll4 := entity.Enroll{
		Enroll_ID: "134569",
	}

	grade4 := entity.Grade{		
		Grade_ID: "A", // ผิด
	}

	adding_point4 := entity.Adding_point{
		Adding_point_ID: 4,
		Date:time.Now(),
		Professor_ID:&professor4.Professor_ID,
		Enroll_ID:&enroll4.Enroll_ID,
		Grade_ID:grade4.Grade_ID,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(adding_point4)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}


