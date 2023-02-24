package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของเหตุผลแล้วต้องเจอ Error
func TestReasonPass(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetRequestValidation()

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	electrical_circuit_1_sec1 := entity.Subject{
		Subject_ID: "529201",
	}
	electrical_circuit_1_sec1_class := entity.Class_Schedule{
		Class_Schedule_ID: "CLS610480279449",
	}
	electrical_circuit_1_test := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM311706343734",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "อยากเรียน",
		Student:        student1,
		Section:        1,
		Subject:        electrical_circuit_1_sec1,
		Class_Schedule: electrical_circuit_1_sec1_class,
		Exam_Schedule:  electrical_circuit_1_test,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของเหตุผลแล้วต้องเจอ Error
func TestReasonNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetRequestValidation()

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	electrical_circuit_1_sec1 := entity.Subject{
		Subject_ID: "529201",
	}
	electrical_circuit_1_sec1_class := entity.Class_Schedule{
		Class_Schedule_ID: "CLS610480279449",
	}
	electrical_circuit_1_test := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM311706343734",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "",
		Student:        student1,
		Section:        1,
		Subject:        electrical_circuit_1_sec1,
		Class_Schedule: electrical_circuit_1_sec1_class,
		Exam_Schedule:  electrical_circuit_1_test,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
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

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	electrical_circuit_1_sec1 := entity.Subject{
		Subject_ID: "529201",
	}
	electrical_circuit_1_sec1_class := entity.Class_Schedule{
		Class_Schedule_ID: "CLS610480279449",
	}
	electrical_circuit_1_test := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM311706343734",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "5555",
		Student:        student1,
		Section:        1,
		Subject:        electrical_circuit_1_sec1,
		Class_Schedule: electrical_circuit_1_sec1_class,
		Exam_Schedule:  electrical_circuit_1_test,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(request)

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

	entity.SetRequestValidation()

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	electrical_circuit_1_sec1 := entity.Subject{
		Subject_ID: "529201",
	}
	electrical_circuit_1_sec1_class := entity.Class_Schedule{
		Class_Schedule_ID: "CLS610480279449",
	}
	electrical_circuit_1_test := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM311706343734",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "กกกกกกกกกกกกกกกกกกกกกกกกกกกกกกก",
		Student:        student1,
		Section:        1,
		Subject:        electrical_circuit_1_sec1,
		Class_Schedule: electrical_circuit_1_sec1_class,
		Exam_Schedule:  electrical_circuit_1_test,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(request)

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

	entity.SetRequestValidation()

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	operating_system_sec1 := entity.Subject{
		Subject_ID: "523354",
	}
	os_sec1_class := entity.Class_Schedule{
		Class_Schedule_ID: "CLS114910584091",
	}
	os_final := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM811087659062",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "อยากเรียน",
		Student:        student1,
		Section:        1,
		Subject:        operating_system_sec1,
		Class_Schedule: os_sec1_class,
		Exam_Schedule:  os_final,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
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

	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	love_yourself := entity.Subject{
		Subject_ID: "523355",
	}
	class_schedule1 := entity.Class_Schedule{
		Day:        "Mon",
		Start_Time: "14:00",
		End_Time:   "15:00",
	}
	final := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM811087659065",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "อยากเรียน",
		Student:        student1,
		Section:        1,
		Subject:        love_yourself,
		Class_Schedule: class_schedule1,
		Exam_Schedule:  final,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateRequestCheckExamAndClass(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Cannot add class schedule. In start time 13:00 is overlapped with some class schedule "))
}

func TestRequestClassDayNotrepeatedlyEnroll(t *testing.T) {
	g := NewGomegaWithT(t)

	subject1 := entity.Subject{
		Subject_ID: "523231",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Exam_Schedule1 := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM112202729479",
	}
	Class_Schedule1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS010888298971",
		Day:               "Wed",
		Start_Time:        "10:00",
		End_Time:          "12:00",
	}
	Request_Type2 := entity.Request_Type{
		Request_Type_ID: "R01",
	}

	request := entity.Request{
		Request_ID:     4,
		Reason:         "อยากเรียน",
		Student:        student1,
		Section:        1,
		Subject:        subject1,
		Class_Schedule: Class_Schedule1,
		Exam_Schedule:  Exam_Schedule1,
		Request_Type:   Request_Type2,
		Date_Time:      time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateCheckExamAndClassEnroll(request)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Class Day cannot be added repeatedly, end time is same."))
}
