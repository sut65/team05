package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Approval_type
func CreateApproval_Type(c *gin.Context) {
	var approval_type entity.Approval_Type

	if err := c.ShouldBindJSON(&approval_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&approval_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": approval_type})

}

// GET /approval_type/:id
func GetApproval_Type(c *gin.Context) {
	var approval_type entity.Approval_Type
	id := c.Param("approval_type_id")
	if err := entity.DB().Raw("SELECT * FROM approval_types WHERE approval_type_id = ?", id).Scan(&approval_type).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": approval_type})
}

// List/approval_type

func ListApproval_Type(c *gin.Context) {
	var approval_type []entity.Approval_Type
	if err := entity.DB().Raw("SELECT * FROM approval_types").Scan(&approval_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": approval_type})
}
