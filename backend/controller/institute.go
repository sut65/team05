package controller

import (
	"github.com/B6025212/team05/entity"

	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateInstitute(c *gin.Context) {
	var institute entity.Institute
	if err := c.ShouldBindJSON(&institute); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&institute).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": institute})
}

func GetInstitute(c *gin.Context) {
	var institute entity.Institute
	id := c.Param("institute_id")
	if err := entity.DB().Raw("SELECT * FROM institutes WHERE institute_id = ?", id).Find(&institute).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": institute})
}

func ListInstitutes(c *gin.Context) {
	var institutes []entity.Institute
	if err := entity.DB().Raw("SELECT * FROM institutes").Find(&institutes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": institutes})
}

func DeleteInstitutes(c *gin.Context) {
	id := c.Param("institute_id")

	if tx := entity.DB().Exec("DELETE FROM institutes WHERE institute_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
