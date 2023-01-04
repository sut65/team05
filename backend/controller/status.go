package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /statuses
func CreateStatus(c *gin.Context) {
	var status entity.Status
	if err := c.ShouldBindJSON(&status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})

}

// GET /status/:id
func GetStatus(c *gin.Context) {
	var status entity.Status
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = ?", id).Scan(&status).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

// GET /statuses

func ListStatuses(c *gin.Context) {
	var statuses []entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses").Scan(&statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statuses})
}
