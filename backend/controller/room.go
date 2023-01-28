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
	room_id := c.Param("room_id")
	if err := entity.DB().Raw("SELECT * FROM rooms WHERE room_id = ?", room_id).Scan(&roominform).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": roominform})
}

// GET /roominforms
func ListRoominforms(c *gin.Context) {
	var roominforms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&roominforms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roominforms})
}

// DELETE /roominforms/:id
func DeleteRoominform(c *gin.Context) {

	room_id := c.Param("room_id")

	if tx := entity.DB().Exec("DELETE FROM rooms WHERE room_id = ?", room_id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_id})
}

// PATCH /roominforms
func UpdateRoominform(c *gin.Context) {
	var roominform entity.Room
	if err := c.ShouldBindJSON(&roominform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("room_id = ?", roominform.Room_ID).First(&roominform); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&roominform).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roominform})

}
