package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /buildings
func CreateBuilding(c *gin.Context) {
	var building entity.Building
	if err := c.ShouldBindJSON(&building); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&building).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": building})

}

// GET /building/:id
func GetBuilding(c *gin.Context) {
	var building entity.Building
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM buildings WHERE id = ?", id).Scan(&building).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": building})
}

// GET /buildings

func ListBuildings(c *gin.Context) {
	var buildings []entity.Building
	if err := entity.DB().Raw("SELECT * FROM buildings").Scan(&buildings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": buildings})
}
