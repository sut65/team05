package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /grade
func CreateGrade(c *gin.Context) {
	var grade entity.Grade

	if err := c.ShouldBindJSON(&grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": grade})

}

// GET /grade/:id
func GetGrade(c *gin.Context) {
	var grade entity.Grade
	id := c.Param("grade_id")
	if err := entity.DB().Raw("SELECT * FROM grades WHERE grade_id = ?", id).Scan(&grade).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": grade})
}

// List/grade

func ListGrade(c *gin.Context) {
	var grade []entity.Grade
	if err := entity.DB().Raw("SELECT * FROM grades").Scan(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": grade})
}
