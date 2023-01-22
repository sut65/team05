package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /professors
func Createb(c *gin.Context) {
	var professor entity.Professor
	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&professor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": professor})

}

// GET /professor/:id
func Getb(c *gin.Context) {
	var professor entity.Professor
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM professoes WHERE id = ?", id).Scan(&professor).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": professor})
}

// GET /professors
func Listb(c *gin.Context) {
	var professors []entity.Professor
	if err := entity.DB().Raw("SELECT * FROM professors").Scan(&professors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": professors})
}

// DELETE /professors/:id
func Deleteb(c *gin.Context) {

	id := c.Param("ID_card")

	if tx := entity.DB().Exec("DELETE FROM professors WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func Updateb(c *gin.Context) {
	var professor entity.Professor
	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", professor.ID_card).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&professor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": professor})

}
