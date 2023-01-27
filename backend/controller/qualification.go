package controller

import (
	"github.com/B6025212/team05/entity"

	"net/http"

	"github.com/gin-gonic/gin"
)

type extendedQualification struct {
	entity.Qualification
	Qualification_Name string
}

func CreateQualification(c *gin.Context) {
	var qualification entity.Qualification
	if err := c.ShouldBindJSON(&qualification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&qualification).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": qualification})
}

func GetQualification(c *gin.Context) {
	var qualification entity.Qualification
	id := c.Param("qualification_id")
	if err := entity.DB().Raw("SELECT * FROM qualifications WHERE qualification_id = ?", id).Find(&qualification).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": qualification})
}

func ListQualifications(c *gin.Context) {
	var qualifications []entity.Qualification
	if err := entity.DB().Raw("SELECT * FROM qualifications").Find(&qualifications).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": qualifications})
}

func DeleteQualification(c *gin.Context) {
	id := c.Param("qualification_id")

	if tx := entity.DB().Exec("DELETE FROM qualifications WHERE qualification_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "qualification not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

func ListQualificationName(c *gin.Context) {

	var qualifications []entity.Qualification

	query := entity.DB().Raw("SELECT q.name FROM qualifications q JOIN courses c ON q.qualification_ID = c.qualification_ID").Scan(&qualifications)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": qualifications})

}

