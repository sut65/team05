package entity

import (
	"testing"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของเหตุผลแล้วต้องเจอ Error
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

// ตรวจสอบตัวอักษรพิเศษและเลขของเหตุผลแล้วต้องเจอ Error
func TestReasonNotSpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetRequestValidation()
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

// ตรวจสอบความยาวของเหตุผลเกิน 30 ตัวแล้วต้องเจอ Error
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

// ตรวจสอบ request id มีใน approval id แล้วต้องเจอ Error
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
	g.Expect(err.Error()).To(Equal("The request cannot be resubmitted because the professor has already responded"))
}

// ตรวจสอบนักศึกษาลงรายวิชาซ้ำแล้วต้องเจอ Error
func TestRequestSubjectNotrepeatedly(t *testing.T) {
	g := NewGomegaWithT(t)

	subject1 := entity.Subject{
		Subject_ID: "523354",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	request := entity.Request{
		Subject: subject1,
		Student: student1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.Validatechecksubject(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Subject cannot be added repeatedly"))
}

// ตรวจสอบตรวจสอบว่า day, start_time และ end_time ของ class_schedule ตรงกับข้อมูลแล้วต้องเจอ Error
func TestRequestClassDayNotrepeatedly(t *testing.T) {
	g := NewGomegaWithT(t)
	class_schedule1 := entity.Class_Schedule{
		Day:        "Mon",
		Start_Time: "14:00",
		End_Time:   "15:00",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	request := entity.Request{
		Student:        student1,
		Class_Schedule: class_schedule1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateRequestCheckExamAndClass(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Cannot add class schedule. In start time 13:00 is overlapped with some class schedule"))
}
