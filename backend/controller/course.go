package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// POST /course
func CreateCourse(c *gin.Context) {
	var course entity.Course
	var major entity.Major
	var institute entity.Institute
	var admin entity.Admin
	var qualification entity.Qualification

	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Course ด้วย id ของ Course ที่รับเข้ามา
	// SELECT * FROM `courses` WHERE course_id = <course.Course_ID>
	if tx := entity.DB().Where("course_id = ?", course.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity institute ด้วย id ของ institute ที่รับเข้ามา
	// SELECT * FROM `institute` WHERE status_id = <institute.Institute_ID>
	if tx := entity.DB().Where("institute_id = ?", institute.Institute_ID).First(&institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "institute status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity major ด้วย id ของ major ที่รับเข้ามา
	// SELECT * FROM `major` WHERE major_id = <major.major_id>
	if tx := entity.DB().Where("major_id = ?", major.Major_ID).First(&major); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "major type not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity admin ด้วย id ของ admin ที่รับเข้ามา
	// SELECT * FROM `admin` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("admin_id = ?", admin.Admin_ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity Professor ด้วย id ของ Professor ที่รับเข้ามา
	// SELECT * FROM `professors` WHERE professor_id = <subject.Professor_ID>
	if tx := entity.DB().Where("qualification_id = ?", qualification.Qualification_ID).First(&qualification); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "qualification category not found"})
		return
	}

	new_course := entity.Course{
		Course_ID:   course.Course_ID,
		Course_Name: course.Course_Name,
		Datetime:    course.Datetime,

		Qualification: qualification,
		Admin:         admin,
		Major:         major,
	}

	// บันทึก entity Course
	if err := entity.DB().Create(&new_course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_course})
}

// GET /subjects
func ListCourses(c *gin.Context) {
	var courses []entity.Course
	if err := entity.DB().Raw("SELECT * FROM courses").Scan(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": courses})
}

// DELETE /professors/:id
func DeleteCourse(c *gin.Context) {

	id := c.Param("Course_ID")

	if tx := entity.DB().Exec("DELETE FROM courses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func UpdateCourse(c *gin.Context) {
	var course entity.Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", course.Course_ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})

}
