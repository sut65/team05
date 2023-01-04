package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /majors
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

// GET /major/:id
func GetMajor(c *gin.Context) {
	var major entity.Major
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM majors WHERE id = ?", id).Scan(&major).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": major})
}

// GET /majors

func ListMajors(c *gin.Context) {
	var majors []entity.Major
	if err := entity.DB().Raw("SELECT * FROM majors").Scan(&majors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": majors})
}
