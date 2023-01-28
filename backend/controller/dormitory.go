package controller

import (
	"github.com/B6025212/team05/entity"

	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateDormitory(c *gin.Context) {
	var dormitory entity.Dormitory
	if err := c.ShouldBindJSON(&dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&dormitory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormitory})
}

func GetDormitory(c *gin.Context) {
	var dormitory entity.Dormitory
	domitory_id := c.Param("dormitory_id")
	if err := entity.DB().Raw("SELECT * FROM dormitories WHERE dormitory_id = ?", domitory_id).Find(&dormitory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormitory})
}

func ListDormitorys(c *gin.Context) {
	var dormitorys []entity.Dormitory
	if err := entity.DB().Raw("SELECT * FROM dormitories").Find(&dormitorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormitorys})
}

func DeleteDormitorys(c *gin.Context) {
	domitory_id := c.Param("domitory_id")

	if tx := entity.DB().Exec("DELETE FROM dormitories WHERE dormitory_id = ?", domitory_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormitories not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": domitory_id})
}
