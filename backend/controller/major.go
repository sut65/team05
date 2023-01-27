package controller

import (
	"github.com/B6025212/team05/entity"

	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateMajor(c *gin.Context) {
	var major entity.Major
	if err := c.ShouldBindJSON(&major); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&major).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": major})
}

func GetMajor(c *gin.Context) {
	var major entity.Major
	id := c.Param("major_id")
	if err := entity.DB().Raw("SELECT * FROM majors WHERE major_id = ?", id).Find(&major).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": major})
}

func ListMajors(c *gin.Context) {
	var majors []entity.Major
	if err := entity.DB().Raw("SELECT * FROM majors").Find(&majors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": majors})
}

func DeleteMajor(c *gin.Context) {
	id := c.Param("major_id")

	if tx := entity.DB().Exec("DELETE FROM majors WHERE major_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Major not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

