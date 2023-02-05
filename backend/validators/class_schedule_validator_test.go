package entity

import (
	"testing"

	. "github.com/B6025212/team05/custom_validate_function"
	"github.com/B6025212/team05/entity"

	// "github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบว่าหน่วยกิจต้องมากกว่า 0
func TestClassSchedule_EndTimeAlreadyExist(t *testing.T) {

	g := NewGomegaWithT(t)
	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}
	class_schedule_1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS523332-1-B2101-Mon-1400-1500",
		Room:              room_b2101,
		Day:               "Mon",
		Start_Time:        "14:00",
		End_Time:          "15:00",
	}

	ok, err := ClassScheduleValidate(class_schedule_1.Day, class_schedule_1.Room, class_schedule_1.Start_Time, class_schedule_1.End_Time)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestClassSchedule_StartTimeAlreadyExist(t *testing.T) {

	g := NewGomegaWithT(t)
	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}
	class_schedule_1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS523332-1-B2101-Mon-1300-1600",
		Room:              room_b2101,
		Day:               "Mon",
		Start_Time:        "13:00",
		End_Time:          "16:00",
	}

	ok, err := ClassScheduleValidate(class_schedule_1.Day, class_schedule_1.Room, class_schedule_1.Start_Time, class_schedule_1.End_Time)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestClassSchedule_StartTimeOverlap(t *testing.T) {

	g := NewGomegaWithT(t)
	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}
	class_schedule_1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS523332-1-B2101-Mon-1400-1600",
		Room:              room_b2101,
		Day:               "Mon",
		Start_Time:        "14:00",
		End_Time:          "16:00",
	}

	ok, err := ClassScheduleValidate(class_schedule_1.Day, class_schedule_1.Room, class_schedule_1.Start_Time, class_schedule_1.End_Time)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestClassSchedule_EndTimeOverlap(t *testing.T) {

	g := NewGomegaWithT(t)
	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}
	class_schedule_1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS523332-1-B2101-Mon-1200-1400",
		Room:              room_b2101,
		Day:               "Mon",
		Start_Time:        "12:00",
		End_Time:          "14:00",
	}

	ok, err := ClassScheduleValidate(class_schedule_1.Day, class_schedule_1.Room, class_schedule_1.Start_Time, class_schedule_1.End_Time)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}

func TestClassSchedule_NoError(t *testing.T) {

	g := NewGomegaWithT(t)
	room_b2101 := entity.Room{
		Room_ID: "B2101",
	}
	class_schedule_1 := entity.Class_Schedule{
		Class_Schedule_ID: "CLS523332-1-B2101-Sat-1400-1600",
		Room:              room_b2101,
		Day:               "Sat",
		Start_Time:        "14:00",
		End_Time:          "16:00",
	}

	ok, err := ClassScheduleValidate(class_schedule_1.Day, class_schedule_1.Room, class_schedule_1.Start_Time, class_schedule_1.End_Time)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เออเร่อ!!!"))
}