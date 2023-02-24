package entity

import (
	"testing"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestSuccess(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 123,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         123, // ผิด
		Unit:            8,
		Payable:         1000,
		Receipt_number:  "31s2df",
		Date_Time:       time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	//g.Expect(err.Error()).To(Equal("Amounts cannot be blank"))
}

func TestAmountsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 1234,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         0, // ผิด
		Unit:            8,
		Payable:         1000,
		Receipt_number:  "31s2df",
		Date_Time:       time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Amounts cannot be blank"))
}


func TestReciept_number_not_thai_Character(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 1234,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         1000, 
		Unit:            8,
		Payable:         1000,
		Receipt_number:  "สวัสดีครับท่านสมาชิก",// ผิด
		Date_Time:       time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("receipt number cannot be thai character"))
}

func TestReciept_number_cannot_be_special_Character(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 1234,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         1000, 
		Unit:            8,
		Payable:         1000,
		Receipt_number:  "#$%#@",// ผิด
		Date_Time:       time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("receipt number cannot be special character"))
}

func TestUnit_cannot_be_Blank(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 1234,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         1000, 
		Unit:            0,// ผิด
		Payable:         1000,
		Receipt_number:  "135dfs52",
		Date_Time:       time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Unit cannot be blank"))
}

func TestDate_Time_cannot_be_futuer(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetReceipt_numberValidation()
	entity.SetPaymentDatetimeValidation()
	Payment_Type_ID1 := entity.Payment_Type{
		Payment_Type_ID: "P01",
	}
	Student1 := entity.Student{
		Student_ID: "B6311111",
	}
	Admin1 := entity.Admin{
		Admin_ID: "AD1234567",
	}

	Payment1 := entity.Payment{
		Payment_ID: 1234,
		Payment_Type_ID: &Payment_Type_ID1.Payment_Type_ID,
		Student_ID:      &Student1.Student_ID,
		Admin_ID:        &Admin1.Admin_ID,
		Amounts:         1000, 
		Unit:            8,
		Payable:         1000,
		Receipt_number:  "135dfs52",// ผิด
		Date_Time:       time.Now().AddDate(2024,2,3),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment1)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())
	
	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Date_Time cannot be future"))
}

