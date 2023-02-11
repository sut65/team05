package entity

import (
	"testing"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"
	//"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"

)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestSubjectNotrepeated(t *testing.T) {
	g := NewGomegaWithT(t)
	subject1 := entity.Subject{
		Subject_ID: "523332",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	enroll1 := entity.Enroll{
		Subject: subject1,
		Student: student1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateAdding_reducingChecksubject(enroll1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Subject cannot be duplicate"))
}

func TestAdding_reducingClassDayNotrepeatedly(t *testing.T) {
	g := NewGomegaWithT(t)
	class_schedule1 := entity.Class_Schedule{
		Day:        "Mon",
		Start_Time: "14:00",
		End_Time:   "15:00",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	enroll1 := entity.Enroll{
		Student:        student1,
		Class_Schedule: class_schedule1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateAdding_reducingExamAndClass(enroll1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Class Day cannot be duplicate"))
}


