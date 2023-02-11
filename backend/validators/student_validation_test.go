package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestStudentIDNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()

	student := entity.Student{
		Student_ID:       "",
		Student_Name:     "สมพงษ์ วิ่งวุฒิ", // ถูก
		Student_Password: "abcd4321",        //ถูก
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

	student := entity.Student{
		Student_ID:       "B62000015",       //ผิด
		Student_Name:     "สมพงษ์ วิ่งวุฒิ", // ถูก
		Student_Password: "abcd4321",        //ถูก
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

	student := entity.Student{
		Student_ID:       "B6200001", //ถูก
		Student_Name:     "",         // ผิด
		Student_Password: "abcd4321", //ถูก
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

	student := entity.Student{
		Student_ID:       "B6200001", //ถูก
		Student_Name:     "test",     // ผิด
		Student_Password: "abcd4321", //ถูก
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

func TestStudentNameMaxString(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentPasswordValidation()

	student := entity.Student{
		Student_ID:       "B6200001",                                                                    //ถูก
		Student_Name:     "เอ็มมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมมม", // ผิด
		Student_Password: "abcd4321",                                                                    //ถูก
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student Name can not greater than 25 character"))
}

func TestStudentPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	entity.SetStudentIDValidation()
	entity.SetStudentNameValidation()
	entity.SetStudentPasswordValidation()

	student := entity.Student{
		Student_ID:       "B6200001",        //ถูก
		Student_Name:     "สมพงษ์ วิ่งวุฒิ", // ถูก
		Student_Password: "",                //ผิด
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

	student := entity.Student{
		Student_ID:       "B6200001",        //ถูก
		Student_Name:     "สมพงษ์ วิ่งวุฒิ", // ถูก
		Student_Password: "ไทย",             //ผิด
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

	student := entity.Student{
		Student_ID:       "B6200001",        //ถูก
		Student_Name:     "สมพงษ์ วิ่งวุฒิ", // ถูก
		Student_Password: "111",             //ผิด
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

	student := entity.Student{
		Student_ID:       "B6200001",                         //ถูก
		Student_Name:     "สมพงษ์ วิ่งวุฒิ",                  // ถูก
		Student_Password: "abcd1234",                         //ถูก
		Datetime:         time.Now().Add(time.Second * 1000), // ผิด
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
