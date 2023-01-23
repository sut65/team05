package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /roominforms
func CreateRoominform(c *gin.Context) {
	var roominform entity.Room
	if err := c.ShouldBindJSON(&roominform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&roominform).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roominform})

}

// GET /roominform/:id
func GetRoominform(c *gin.Context) {
	var roominform entity.Room
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM roominforms WHERE id = ?", id).Scan(&roominform).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": roominform})
}

// GET /roominforms
func ListRoominforms(c *gin.Context) {
	var roominforms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM roominforms").Scan(&roominforms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roominforms})
}

// DELETE /roominforms/:id
func DeleteRoominform(c *gin.Context) {

	id := c.Param("Room_number")

	if tx := entity.DB().Exec("DELETE FROM roominforms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /roominforms
func UpdateRoominform(c *gin.Context) {
	var roominform entity.Room
	if err := c.ShouldBindJSON(&roominform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", roominform.Room_ID).First(&roominform); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&roominform).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roominform})

}
