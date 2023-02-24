package controller

import (
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/B6025212/team05/service"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

type extendedSubject struct {
	entity.Subject
	Course_Name                string
	Professor_Name             string
	Subject_Status_Description string
	Class_Type_Name            string
	Subject_Category_Name      string
}

type extendedEnrollSubject struct {
	Subject_ID string
	Section    uint
	entity.Subject
	entity.Exam_Schedule
	entity.Class_Schedule
	Course_Name    string
	Professor_Name string
}

// POST /subjects
func CreateSubject(c *gin.Context) {
	var professor entity.Professor
	var course entity.Course
	var subject_status entity.Subject_Status
	var subject_category entity.Subject_Category
	var class_type entity.Class_Type
	var subject entity.Subject

	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Course ด้วย id ของ Course ที่รับเข้ามา
	// SELECT * FROM `courses` WHERE course_id = <subject.Course_ID>
	if tx := entity.DB().Where("course_id = ?", subject.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Status ด้วย id ของ Status ที่รับเข้ามา
	// SELECT * FROM `subject_statuses` WHERE status_id = <subject.Subject_Status_ID>
	if tx := entity.DB().Where("subject_status_id = ?", subject.Subject_Status_ID).First(&subject_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Class_Type ด้วย id ของ Class_Type ที่รับเข้ามา
	// SELECT * FROM `class_types` WHERE class_type_id = <subject.Class_Type_ID>
	if tx := entity.DB().Where("class_type_id = ?", subject.Class_Type_ID).First(&class_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Professor ด้วย id ของ Professor ที่รับเข้ามา
	// SELECT * FROM `professors` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("professor_id = ?", subject.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Professor ด้วย id ของ Professor ที่รับเข้ามา
	// SELECT * FROM `professors` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("subject_category_id = ?", subject.Subject_Category_ID).First(&subject_category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject category not found"})
		return
	}

	/*	Communication Diagram Step

		สร้างข้อมูล entity Subject โดย
		- โยง entity Course
		- โยง entity Status
		- โยง entity Class_Type
		- โยง entity Professor // ไปแก้ในรายงานด้วยนะ
		- เซ็ตจำนวนคนที่เปิดรับ
		- เซ็ตจำนวนคนที่นั่งสำรอง
		- เซ็ตจำนวนหน่วยกิจ
		- และเซ็ตกลุ่มเรียน
	*/
	new_subject := entity.Subject{
		ID:               subject.ID,
		Subject_ID:       subject.Subject_ID,
		Course:           course,
		Subject_Status:   subject_status,
		Class_Type:       class_type,
		Professor:        professor,
		Subject_Category: subject_category,
		Subject_TH_Name:  subject.Subject_TH_Name,
		Subject_EN_Name:  subject.Subject_EN_Name,
		Capacity:         subject.Capacity,
		Enroll:           subject.Enroll,
		Latest_Updated:   time.Now(),
		Reserved:         subject.Reserved,
		Reserved_Enroll:  subject.Reserved_Enroll,
		Unit:             subject.Unit,
		Section:          subject.Section,
	}

	_, err := govalidator.ValidateStruct(new_subject)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := service.ValidateDuplicateSubject(new_subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก entity Subject
	if err := entity.DB().Create(&new_subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_subject})
}

// GET /subjects
func ListSubjects(c *gin.Context) {

	var extendedSubjects []extendedSubject

	// ======================== Normal select ========================
	// var subjects []entity.Subject
	// if err := entity.DB().Raw("SELECT * FROM subjects").Scan(&subjects).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// ======================== Join select ========================
	// Subject Join with Courses and with Professors
	/*
		SELECT s.*,  c.Course_Name, p.professor_name
		FROM `subjects` s
		JOIN `courses` c
		JOIN `professors` p
		ON s.Course_ID = c.course_id AND s.professor_id = p.id;
	*/
	query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id").Scan(&extendedSubjects)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})

}

// SELECT e.*,cs.*,ex.* FROM `subjects` e JOIN `class_schedules` cs JOIN `exam_schedules` ex ON e.subject_id = cs.subject_id AND e.subject_id
// SELECT e.*,cs.*,ex.* FROM `subjects` e INNER JOIN `class_schedules` cs INNER JOIN `exam_schedules` ex ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id GROUP BY e.id
func ListEnrollSubject(c *gin.Context) {

	var extendedEnrollSubject []extendedEnrollSubject

	query := entity.DB().Raw("SELECT e.*,cs.*,ex.*,c.Course_Name, p.professor_name FROM subjects e INNER JOIN class_schedules cs INNER JOIN exam_schedules ex INNER JOIN courses c INNER JOIN professors p ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id AND e.professor_id = p.professor_id AND e.section = cs.section GROUP BY e.id").Scan(&extendedEnrollSubject)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": extendedEnrollSubject})

}

func GetEnrollSubject(c *gin.Context) {

	var extendedEnrollSubjects []extendedEnrollSubject

	subject_id := c.Param("subject_id")

	query := entity.DB().Raw("SELECT e.*,cs.*,ex.*,c.Course_Name, p.professor_name FROM subjects e INNER JOIN class_schedules cs INNER JOIN exam_schedules ex  INNER JOIN courses c INNER JOIN professors p ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id  AND e.professor_id = p.professor_id WHERE e.subject_id = ? GROUP BY e.id", subject_id).Scan(&extendedEnrollSubjects)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedEnrollSubjects})
}

// GET /subject/:subject_key
func GetSubject(c *gin.Context) {
	/* ค้นหาข้อมูลรายวิชาตามตัวกรองที่ได้รับมา

	1. ค้นหาวิชาที่มีรหัสขึ้นต้นด้วย102 ป้อน 102* ลงในช่องรหัสวิชา -  //* check
	2. ค้นหาวิชาที่มีรหัสลงท้ายต้นด้วย102 ป้อน *102 ลงในช่องรหัสวิชา -  //* check
	3. ค้นหาวิชาที่มีคำว่า world เป็นส่วนหนึ่งของชื่อวิชา ป้อน *world* ลงในช่องชื่อวิชา //* check
	4. ค้นหาวิชาที่มีชื่อวิชาลงท้ายด้วย finance ป้อน *finance ลงในช่องชื่อวิชา //* check
	4. ค้นหาวิชาที่มีชื่อวิชาขึ้นต้นด้วย finance ป้อน finance* ลงในช่องชื่อวิชา //* check
	*/

	var extendedSubjects []extendedSubject

	subject_key := c.Param("subject_key")

	// ถ้าต้องการค้นหารายวิชาที่อักษรเป็ยส่วนหนึ่ง เช่น %Eng% --> ต้องการค้นหารายวิชาที่ชื่อมีคำว่า Eng เป็นส่วนหนึ่ง
	if subject_key[0] == '*' && subject_key[len(subject_key)-1] == '*' {
		parts := strings.Split(subject_key, "*")
		fmt.Println(parts)
		if len(parts) > 2 {
			// เก็บสตริงที่ได้จากการแยกออกมา
			key := parts[1]

			// กำหนดค่าในการนำไปค้นหาใน database จะได้รูปแบบ %key%
			search_key := "%" + key + "%"

			match, _ := regexp.MatchString(`[a-zA-Z\s]+$`, key)
			if match {
				query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE s.subject_en_name LIKE ?", search_key).Scan(&extendedSubjects)
				if err := query.Error; err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					return
				}
				c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
			}
		}
		// ถ้าอักษรตัวสุดท้ายเป็น '*'
	} else if subject_key[len(subject_key)-1] == '*' {

		// Regex : [0-9]+$
		// Regex กรณีค้นหาข้อมูลรายวิชาด้วยคำที่ขึ้นต้นด้วยเลขรหัสวิชาที่ต้องการ เช่น 532*
		// ถ้าตัวค้นหาเป็น "523*" แสดงว่ากำลังค้นหารายวิชาที่รหัสวิชาขึ้นต้นด้วย 523
		// ใช้คำสั่ง SELECT * FROM subjects WHERE subject_id LIKE '532%'

		// เอาทุกตัวอักษรยกเว้นตัวสุดท้าย เช่น 523* ---> 523
		key := subject_key[:len(subject_key)-1]
		search_key := key + "%"
		match, _ := regexp.MatchString(`[0-9]+$`, key)
		if match {
			query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE subject_id LIKE ?", search_key).Scan(&extendedSubjects)

			if err := query.Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
		}

		// Regex : [a-zA-Z\s]+$
		// ถ้าตัวค้นหาเป็น "software*" แสดงว่ากำลังค้นหารายวิชาที่รหัสวิชาขึ้นต้นด้วย software
		// ใช้คำสั่ง SELECT * FROM subjects WHERE subject_en_name LIKE 'software%'
		match_2, _ := regexp.MatchString(`[a-zA-Z\s]+$`, key)

		if match_2 {
			query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE s.subject_en_name LIKE ?", search_key).Scan(&extendedSubjects)
			if err := query.Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
		}

		// ถ้าอักษรตัวแรกเป็น '*'
	} else if subject_key[0] == '*' {
		// เอาทุกตัวอักษรยกเว้นตัวแรก เช่น *332 ---> 332
		key := subject_key[1:]
		fmt.Println(key)
		search_key := "%" + key
		match, _ := regexp.MatchString(`[0-9]+$`, key)
		if match {
			query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE s.subject_id LIKE ?", search_key).Scan(&extendedSubjects)
			if err := query.Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
		}

		match_2, _ := regexp.MatchString(`[a-zA-Z\s]+$`, key)
		if match_2 {
			query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE s.subject_en_name LIKE ?", search_key).Scan(&extendedSubjects)
			if err := query.Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
		}

	} else {
		query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE subject_id = ?", subject_key).Scan(&extendedSubjects)
		if err := query.Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": extendedSubjects})
	}
}

// Maybe
// GET /subject/:subject_id/:section
func GetSubjectBySection(c *gin.Context) {
	/* Query subject record by subject_id and section */

	var subject extendedSubject
	subject_id := c.Param("subject_id")
	section := c.Param("section")

	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	query := entity.DB().Raw("SELECT s.*, c.Course_Name, p.professor_name, class_types.class_type_name, subject_categories.subject_category_name, subject_status_description FROM subjects s JOIN courses c JOIN professors p JOIN subject_categories JOIN subject_statuses JOIN class_types ON s.Course_ID = c.course_id AND s.professor_id = p.professor_id AND s.class_type_id = class_types.class_type_id AND s.subject_category_id = subject_categories.subject_category_id AND s.subject_status_id = subject_statuses.subject_status_id WHERE subject_id = ? AND section = ?", subject_id, section).Scan(&subject)

	if query.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

func GetSubjectByCourse(c *gin.Context) {
	/* Query subject record by subject_id and section */

	var subject []extendedEnrollSubject
	course := c.Param("course_id")
	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	query := entity.DB().Raw("SELECT e.*,cs.*,ex.* FROM `subjects` e INNER JOIN `class_schedules` cs INNER JOIN `exam_schedules` ex ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id AND e.section = cs.section WHERE e.course_id = ? GROUP BY e.id", course).Scan(&subject)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

func GetSubjectBySubject_ID(c *gin.Context) {
	/* Query subject record by subject_id and section */

	var subject []extendedEnrollSubject
	subject_id := c.Param("subject_id")
	course := c.Param("course_id")
	//* SQL command : SELECT * FROM `subjects` WHERE subject_id = ? AND section = ?;
	query := entity.DB().Raw("SELECT e.*,cs.*,ex.* FROM `subjects` e INNER JOIN `class_schedules` cs INNER JOIN `exam_schedules` ex ON e.subject_id = cs.subject_id AND e.subject_id = ex.subject_id AND e.section = cs.section WHERE e.course_id = ? AND e.subject_id = ? GROUP BY e.id", course, subject_id).Scan(&subject)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

func GetPreviousSubject(c *gin.Context) {
	var subject entity.Subject
	if tx := entity.DB().Last(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}

// ################################################################################################
// PATCH /subjects
func UpdateSubjects(c *gin.Context) {
	var subject entity.Subject
	var course entity.Course
	var subject_status entity.Subject_Status
	var subject_category entity.Subject_Category
	var class_type entity.Class_Type
	var professor entity.Professor
	if err := c.ShouldBindJSON(&subject); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var updated_th_name = subject.Subject_TH_Name
	var updated_en_name = subject.Subject_EN_Name
	var updated_capacity = subject.Capacity
	var updated_enroll = subject.Enroll
	var updated_reserved = subject.Reserved
	var updated_reserved_enroll = subject.Reserved_Enroll
	var updated_unit = subject.Unit

	if tx := entity.DB().Where("course_id = ?", subject.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	if tx := entity.DB().Where("subject_status_id = ?", subject.Subject_Status_ID).First(&subject_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject status not found"})
		return
	}

	if tx := entity.DB().Where("class_type_id = ?", subject.Class_Type_ID).First(&class_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class type not found"})
		return
	}

	if tx := entity.DB().Where("professor_id = ?", subject.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}

	if tx := entity.DB().Where("subject_category_id = ?", subject.Subject_Category_ID).First(&subject_category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject category not found"})
		return
	}

	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject.Subject_ID, subject.Section).Find(&subject); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	updated_subject := entity.Subject{
		ID:               subject.ID,
		Subject_ID:       subject.Subject_ID,
		Course:           course,
		Subject_Status:   subject_status,
		Class_Type:       class_type,
		Professor:        professor,
		Subject_Category: subject_category,
		Subject_TH_Name:  updated_th_name,
		Subject_EN_Name:  updated_en_name,
		Capacity:         updated_capacity,
		Enroll:           updated_enroll,
		Latest_Updated:   time.Now(),
		Reserved:         updated_reserved,
		Reserved_Enroll:  updated_reserved_enroll,
		Unit:             updated_unit,
		Section:          subject.Section,
	}

	_, err := govalidator.ValidateStruct(updated_subject)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&updated_subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject})
}

//################################################################################################

// DELETE /subject/:subject_id/:section
func DeleteSubject(c *gin.Context) {
	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Exec("DELETE FROM subjects WHERE subject_id = ? AND section = ?", subject_id, section); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject_id})
}

// //------------------------------------------------------------------------------------
// GET /class_types
func ListClassType(c *gin.Context) {
	var class_types []entity.Class_Type
	if err := entity.DB().Raw("SELECT * FROM class_types").Scan(&class_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_types})

}

// //------------------------------------------------------------------------------------
// GET /subject_statuses
func ListSubjectStatus(c *gin.Context) {
	var subject_statuses []entity.Subject_Status
	if err := entity.DB().Raw("SELECT * FROM subject_statuses").Scan(&subject_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject_statuses})

}

// //------------------------------------------------------------------------------------
// GET /subject_statuses
func ListSubjectCategory(c *gin.Context) {
	var subject_categories []entity.Subject_Category
	if err := entity.DB().Raw("SELECT * FROM subject_categories").Scan(&subject_categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject_categories})

}
