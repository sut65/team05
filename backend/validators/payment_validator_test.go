package entity

import (
	"testing"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestAmountsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	Payment1 := entity.Payment{
		Amounts: 0, // ผิด
		Unit: 0,
		Date_Time: "",
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

// func TestAmountsCharacters(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	reason := entity.Request{
// 		Reason: "1234?$#@", // ผิด
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(reason)

// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error ต้องมี error message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("Reason cannot be special characters or number"))
// }

// func TestReasonNotNumber(t *testing.T) {
// 	g := NewGomegaWithT(t)
// 	entity.SetRequestValidation()

// 	reason := entity.Request{
// 		Reason:     "fuck", // ผิด
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(reason)

// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error ต้องมี error message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("The reason can't use profanity"))
// }

// func SetRequest() {
// 	// Define a slice of prohibited words
// 	prohibitedWords := []string{"fuck", "badword2", "badword3"}

// 	// Function to validate the input
// 	isValid := func(input string) bool {
// 		for _, word := range prohibitedWords {
// 			if govalidator.Contains(input, word) {
// 				return false
// 			}
// 		}
// 		return true
// 	}

// 	// Test the validation
// 	input := "This is an example input with a fuck."
// 	if isValid(input) {
// 		fmt.Println("The input is valid.")
// 	} else {
// 		fmt.Println("The input is not valid.")
// 	}
// }
