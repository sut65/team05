package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"

	//"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ลงทะเบียนสำเร็จ
func TestAddingEnrollSuccess(t *testing.T) {
	g := NewGomegaWithT(t)
	subject1 := entity.Subject{
		Subject_ID: "523354",
	}
	student1 := entity.Student{
		Student_ID: "B6310211",
	}
	Exam_Schedule1 := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM811087659062",
	}
	Class_Schedule1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS114910584091",
		Day:               "Tue",
		Start_Time:        "15:00",
		End_Time:          "17:00",
	}
	enroll1 := entity.Enroll{
		Enroll_ID:         "1325468",
		Student:           student1,
		Subject:           subject1,
		Exam_Schedule_ID:  &Exam_Schedule1.Exam_Schedule_ID,
		Class_Schedule_ID: &Class_Schedule1.Class_Schedule_ID,
		Enroll_Time_Stamp: time.Now(),
		Section:           1,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateChecksubject(enroll1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

// ลงทะเบียน วันเรียน เวลาเรียนตรงกัน
func TestSameTimeAndDay(t *testing.T) {
	g := NewGomegaWithT(t)
	subject1 := entity.Subject{
		Subject_ID: "523203",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Exam_Schedule1 := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM716591569721",
	}
	Class_Schedule1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS215414458836",
		Day:               "Mon",
		Start_Time:        "13:00",
		End_Time:          "16:00",
	}

	enroll2 := entity.Enroll{
		Enroll_ID:         "1325468",
		Student:           student1,
		Subject:           subject1,
		Exam_Schedule_ID:  &Exam_Schedule1.Exam_Schedule_ID,
		Class_Schedule:    Class_Schedule1,
		Enroll_Time_Stamp: time.Now(),
		Section:           1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateChecksubject(enroll2)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Subject cannot be added repeatedly."))
}

// เริ่มเท่า เลิกไม่เท่า start time is same
func TestSameStartTime(t *testing.T) {
	g := NewGomegaWithT(t)
	subject1 := entity.Subject{
		Subject_ID: "523331",
	}
	student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Exam_Schedule1 := entity.Exam_Schedule{
		Exam_Schedule_ID: "EXAM310120281907",
	}
	Class_Schedule1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS114549167320",
		Day:               "Mon",
		Start_Time:        "13:00",
		End_Time:          "15:00",
	}

	enroll3 := entity.Enroll{
		Enroll_ID:         "1325468",
		Student:           student1,
		Subject:           subject1,
		Exam_Schedule_ID:  &Exam_Schedule1.Exam_Schedule_ID,
		Class_Schedule:    Class_Schedule1,
		Enroll_Time_Stamp: time.Now(),
		Section:           2,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateCheckExamAndClass(enroll3)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Class Day cannot be added repeatedly, start time is same."))
}

// เริ่มไม่เท่า เลิกเท่า start time is same
func TestSameEndTime(t *testing.T) {
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

	enroll3 := entity.Enroll{
		Enroll_ID:         "12354",
		Student:           student1,
		Subject:           subject1,
		Exam_Schedule_ID:  &Exam_Schedule1.Exam_Schedule_ID,
		Class_Schedule:    Class_Schedule1,
		Enroll_Time_Stamp: time.Now(),
		Section:           1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := controller.ValidateCheckExamAndClass(enroll3)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Class Day cannot be added repeatedly, end time is same."))
}
