package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// GET /subjects
func ListClassSchedule(c *gin.Context) {

	var class_Schedules []entity.Class_Schedule

	if err := entity.DB().Raw("SELECT * FROM class_schedules").Scan(&class_Schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_Schedules})

}

func GetClassBySubjectID_and_Section(c *gin.Context) {
	/* Query class record(s) by subject_id and section */
	// GET : /class_schedule/:subject_id/:section

	var class_schedules entity.Class_Schedule

	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Where("subject_id = ? AND section = ?", subject_id, section).First(&class_schedules); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": class_schedules})
}

// GET /class_schedule/:subject_id
func GetClassSchedule(c *gin.Context) {

	var class_Schedules []entity.Class_Schedule

	subject_id := c.Param("subject_id")

	if tx := entity.DB().Where("subject_id = ?", subject_id).First(&class_Schedules); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class_Schedules})
}

// DELETE /class_schedule/:subject_id/:section
func DeleteClassSchedule(c *gin.Context) {
	subject_id := c.Param("subject_id")
	section := c.Param("section")

	if tx := entity.DB().Exec("DELETE FROM class_schedules WHERE subject_id = ? AND section = ?", subject_id, section); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class sc not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject_id})
}
