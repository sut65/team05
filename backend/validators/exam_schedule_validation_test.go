package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	. "github.com/B6025212/team05/service"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestExamScheduleIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	exam_schedule_1 := entity.Exam_Schedule{
		Exam_Schedule_ID: "",
	}

	ok, err := govalidator.ValidateStruct(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamScheduleAlreadyExist(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "15:00",
		Exam_End_Time:   "17:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamScheduleStartTimeAlreadyOccupied(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "15:00",
		Exam_End_Time:   "18:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamScheduleEndTimeAlreadyOccupied(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "16:00",
		Exam_End_Time:   "17:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamScheduleStartTimeOverlapped(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "16:00",
		Exam_End_Time:   "18:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamScheduleEndTimeOverlapped(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "14:00",
		Exam_End_Time:   "16:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamSchedule_NoError_NotSameRoom(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b1120 := entity.Room{
		Room_ID: "B1120",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b1120,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "15:00",
		Exam_End_Time:   "17:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamSchedule_NoError_NotSameDate(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "19/05/2020",
		Exam_Start_Time: "15:00",
		Exam_End_Time:   "17:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestExamSchedule_NoError_NotSameTime(t *testing.T) {
	g := NewGomegaWithT(t)

	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}

	subject1 := entity.Subject{
		Subject_ID: "523332",
	}

	exam_schedule_1 := entity.Exam_Schedule{
		Subject:         subject1,
		Exam_Type:       "Midterm",
		Room:            room_b2101,
		Exam_Date:       "18/05/2020",
		Exam_Start_Time: "17:00",
		Exam_End_Time:   "19:00",
	}

	ok, err := ValidateExamScheduleUnique(exam_schedule_1)
	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}
