package controller

import (
	"fmt"
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

type extendedPayment struct {
	entity.Payment
	Student_ID        string
	Payment_ID string
	Payment_Type_ID string
	Payment_Type_Name string
	Admin_ID string
	Receipt_number string
	Unit    string
	Amounts uint
}

func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var payment_Type entity.Payment_Type
	//var student entity.Student
	var admin entity.Admin


	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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

	// if tx := entity.DB().Where("student_id = ?", enroll.Student_ID).First(&student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
	// 	return
	// }

	new_payment := entity.Payment{
		Payment_ID: payment.Payment_ID,
		Payment_Type_ID: payment.Payment_Type_ID,
		Student_ID: payment.Student_ID,
		Admin_ID: payment.Admin_ID,
		Receipt_number: payment.Receipt_number,
		Date_Time: payment.Date_Time,
		Unit: payment.Unit,
		Amounts: payment.Amounts,
		//Student:        student,
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
	if tx := entity.DB().Where("enroll_id = ?", payment_id).Find(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// PATCH /subjects
func UpdatePayment(c *gin.Context) {
	var enroll entity.Enroll
	var payment entity.Payment
	

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//var updated_th_name = enroll.Subject_TH_Name
	var updated_exam_schedule_id = enroll.Exam_Schedule_ID
	var update_class_schedule_id = enroll.Class_Schedule_ID
	var update_subject_id = enroll.Subject_ID
	var update_Section = enroll.Section

	fmt.Println(update_Section)
	//var section = entity.Subject_ID
	//var updated_capacity = enroll.Capacity
	//var updated_enroll = enroll.Enroll
	//var updated_reserved = enroll.Reserved
	//var updated_reserved_enroll = subject.Reserved_Enroll
	//var updated_unit = subject.Unit

	if tx := entity.DB().Where("enroll_id = ?", enroll.Enroll_ID).Find(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	updated_enroll := entity.Enroll{
		Enroll_ID:         enroll.Enroll_ID,
		Subject_ID:        update_subject_id,
		Exam_Schedule_ID:  updated_exam_schedule_id,
		Class_Schedule_ID: update_class_schedule_id,
		Section:           update_Section,
	}

	if err := entity.DB().Save(&updated_enroll).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": updated_enroll})
}

// DELETE /subject/:subject_id/:section
func DeletePayment(c *gin.Context) {

	enroll_id := c.Param("enroll_id")
	//student := c.Param("student_id")

	if tx := entity.DB().Exec("DELETE FROM enrolls WHERE enroll_id = ? ", enroll_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": enroll_id})
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