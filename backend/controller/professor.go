package controller

import (
	"github.com/B6025212/team05/entity"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /professors
func CreateProfessor(c *gin.Context) {
	var professor entity.Professor
	var qualification entity.Qualification
	var professor_status entity.Status
	var admin entity.Admin
	var major entity.Major

	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// fmt.Println(qualification.Qualification_ID)

	if tx := entity.DB().Where("qualification_id = ?", professor.Qualification_ID).First(&qualification); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "qualification not found"})
		return
	}

	if tx := entity.DB().Where("status_id = ?", professor.StatusID).First(&professor_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor status not found"})
		return
	}

	if tx := entity.DB().Where("admin_id = ?", professor.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if tx := entity.DB().Where("major_id = ?", professor.MajorID).First(&major); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "major not found"})
		return
	}

	new_professor := entity.Professor{
		Model:              gorm.Model{ID: professor.ID},
		Professor_ID:       professor.Professor_ID,
		Professor_name:     professor.Professor_name,
		Professor_address:  professor.Professor_address,
		Professor_email:    professor.Professor_email,
		Professor_tel:      professor.Professor_tel,
		Qualification:      qualification,
		Status:             professor_status,
		Admin:              admin,
		Major:              major,
		Professor_password: professor.Professor_password,
	}
	if err := entity.DB().Create(&new_professor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": new_professor})

}

// GET /professor/:id
func GetProfessor(c *gin.Context) {
	var professor entity.Professor
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM professors WHERE professor_id = ?", id).Scan(&professor).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": professor})
}

// GET /professors
func ListProfessors(c *gin.Context) {
	var professors []entity.Professor
	if err := entity.DB().Raw("SELECT * FROM professors").Scan(&professors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": professors})
}

// DELETE /professors/:id
func DeleteProfessor(c *gin.Context) {

	id := c.Param("Professor_ID")

	if tx := entity.DB().Exec("DELETE FROM professors WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /professors
func UpdateProfessor(c *gin.Context) {
	var professor entity.Professor
	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", professor.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&professor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": professor})

}
