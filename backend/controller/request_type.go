package controller

import (
	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /request_type
func CreateRequest_Type(c *gin.Context) {
	var request_type entity.Request_Type

	if err := c.ShouldBindJSON(&request_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// request_type := entity.Request{
	// 	Request_Type_ID:       Request.Request_Type_ID,
	// 	Request_Type_Name:       Request.Request_Type_Name,
	// }

	if err := entity.DB().Create(&request_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request_type})

}

// GET /request_type/:id
func GetRequest_Type(c *gin.Context) {
	var request_type entity.Request_Type
	id := c.Param("request_type_id")
	if err := entity.DB().Raw("SELECT * FROM request_types WHERE request_type_id = ?", id).Scan(&request_type).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": request_type})
}

// List/request_type

func ListRequest_Type(c *gin.Context) {
	var request_type []entity.Request_Type
	if err := entity.DB().Raw("SELECT * FROM request_types").Scan(&request_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request_type})
}
