package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestStudentPass(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
}
func TestStudentIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student ID cannot be null"))
}
func TestStudentIDCheckCharacter(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B63108511",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student ID Should be 8 characters"))
}

func TestStudentNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Name cannot be null"))
}

func TestStudentNameCheckEnglishLanguage(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "test",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Name cannot be English Language"))
}

func TestStudentNameMinString(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "เทส",
		Student_Password: "abcd4321",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Name cannot be less than 10 characters"))
}

func TestStudentPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Password cannot be null"))
}

func TestStudentPasswordCheckThaiLanguage(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "พิมพ์ไทยนะ",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Password cannot be Thai Language"))
}

func TestStudentPasswordMinString(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}
	student := entity.Student{
		Student_ID:       "B6310851",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "abc123",
		Student_Age:      21,
		Datetime:         time.Now(),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Password can not less than 8 character"))
}

func TestDateTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()
	entity.SetStudentDatetimeValidation()

	admin1 := entity.Admin{
		Admin_ID: "AD5402245",
	}
	course1 := entity.Course{
		Course_ID: "CPE2564",
	}
	dormitory1 := entity.Dormitory{
		Dormitory_ID: "DT05",
	}

	student := entity.Student{
		Student_ID:       "B6200001",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",
		Student_Password: "abcd1234",
		Student_Age:      21,
		Datetime:         time.Now().Add(time.Second * 1000),
		Admin_ID:         &admin1.Admin_ID,
		Course_ID:        &course1.Course_ID,
		Dormitory_ID:     &dormitory1.Dormitory_ID,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Datetime cannot be future"))
}
