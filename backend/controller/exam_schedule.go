package controller

import (
	"net/http"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

// GET /exam_schedules
func ListExamSchedule(c *gin.Context) {

	var exam_Schedules []entity.Exam_Schedule

	if err := entity.DB().Raw("SELECT * FROM exam_schedules").Scan(&exam_Schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exam_Schedules})

}

// GET /exam_schedule/:subject_id
func GetExamSchedule(c *gin.Context) {

	var exam_schedule entity.Exam_Schedule

	subject_id := c.Param("subject_id")

	if tx := entity.DB().Where("subject_id = ?", subject_id).First(&exam_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": exam_schedule})
}

// DELETE /exam_schedule/:subject_id
func DeleteExamSchedule(c *gin.Context) {
	subject_id := c.Param("subject_id")

	if tx := entity.DB().Exec("DELETE FROM exam_schedules WHERE subject_id = ? AND section = ?", subject_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exam schedule not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": subject_id})
}
