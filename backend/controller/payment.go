package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
)

type extendedPayment struct {
	entity.Payment
	Student_ID        string
	Payment_ID        string
	Payment_Type_ID   string
	Payment_Type_Name string
	Admin_ID          string
	Receipt_number    string
	Unit              string
	Amounts           uint
}

func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var payment_Type entity.Payment_Type
	var student entity.Student
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("payment_type_id = ?", payment.Payment_Type_ID).First(&payment_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment_Type not found"})
		return
	}

	if tx := entity.DB().Where("admin_id = ?", payment.Admin_ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("student_id = ?", payment.Student_ID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id not found"})
		return
	}
	
	new_payment := entity.Payment{
		Payment_ID:      payment.Payment_ID,
		Payment_Type_ID: payment.Payment_Type_ID,
		Student_ID:      payment.Student_ID,
		Admin_ID:        payment.Admin_ID,
		Receipt_number:  payment.Receipt_number,
		Date_Time:       payment.Date_Time,
		Unit:            payment.Unit,
		Amounts:         payment.Amounts,
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_payment})
}

func ListPayment(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for list all records from `subject` table.
		HTTP GET : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	//var enroll []entity.Enroll

	//SELECT e.*, c.* ,cs.* FROM `enrolls` e JOIN `subjects` c  JOIN `class_schedules` cs ON e.subject_id = c.subject_id  AND  e.section = c.section AND e.subject_id = cs.subject_id
	var payment []extendedPayment
	query := entity.DB().Raw("SELECT * FROM payments").Scan(&payment)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func ListPayment_type(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for list all records from `subject` table.
		HTTP GET : /subjects
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	//var enroll []entity.Enroll

	//SELECT e.*, c.* ,cs.* FROM `enrolls` e JOIN `subjects` c  JOIN `class_schedules` cs ON e.subject_id = c.subject_id  AND  e.section = c.section AND e.subject_id = cs.subject_id
	var payment_type []entity.Payment_Type
	query := entity.DB().Raw("SELECT * FROM payment_types").Find(&payment_type)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_type})
}

// GET /subject/:subject_id
func GetPayment(c *gin.Context) {
	/*	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		Function for getting record(s) from `subject` table filtered by `subject_id`.
		HTTP GET : /subject/:subject_id
		++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	*/

	var payment entity.Payment
	payment_id := c.Param("payment_id")
	if tx := entity.DB().Where("payment_id = ?", payment_id).Find(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// PATCH /subjects
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	var payment_Type entity.Payment_Type
	//var student entity.Student
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var update_amount = payment.Amounts
	var update_admin = payment.Admin_ID
	var update_student = payment.Student_ID
	var update_datetime = payment.Date_Time
	var update_unit = payment.Unit
	var update_Receipt_number = payment.Receipt_number

	if tx := entity.DB().Where("payment_type_id = ?", payment.Payment_Type_ID).First(&payment_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment_Type not found"})
		return
	}

	// if tx := entity.DB().Where("student_id = ?", payment.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
	// 	return
	// }

	if tx := entity.DB().Where("admin_id = ?", payment.Admin_ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if tx := entity.DB().Where("payment_id = ?", payment.Payment_ID).Find(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	// if tx := entity.DB().Where("student_id = ?", enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
	// 	return
	// }

	update_payment := entity.Payment{
		Payment_ID:      payment.Payment_ID,
		Payment_Type_ID: payment.Payment_Type_ID,
		Student_ID:      update_student,
		Admin_ID:        update_admin,
		Receipt_number:  update_Receipt_number,
		Date_Time:       update_datetime,
		Unit:            update_unit,
		Amounts:         update_amount,
		//Student:        student,
	}

	// บันทึก entity Subject
	if err := entity.DB().Save(&update_payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": update_payment})
}

// DELETE /subject/:subject_id/:section
func DeletePayment(c *gin.Context) {

	payment_id := c.Param("payment_id")
	//student := c.Param("student_id")

	if tx := entity.DB().Exec("DELETE FROM payments WHERE payment_id = ? ", payment_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment_id})
}

func GetPreviousPayment(c *gin.Context) {
	var payment entity.Payment
	if err := entity.DB().Last(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func GetCall_Payment(c *gin.Context) {
	var unit entity.Payment
	if err := entity.DB().Last(&unit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": unit})
}

