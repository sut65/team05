package main

import (
	"github.com/B6025212/team05/controller"

	"github.com/B6025212/team05/entity"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()

	// Admin Routes
	r.GET("/admins", controller.ListAdmins)
	r.GET("/admin/:id", controller.GetAdmin)
	r.POST("/admins", controller.CreateAdmin)

	// Professor Routes
	r.GET("/professors", controller.ListProfessors)
	r.GET("/professor/:id", controller.GetProfessor)
	r.POST("/professors", controller.CreateProfessor)
	r.PATCH("/professors", controller.UpdateProfessor)
	r.DELETE("/professors/:id", controller.DeleteProfessor)

	// Major Routes
	r.GET("/majors", controller.ListMajors)
	r.GET("/major/:id", controller.GetMajor)
	r.POST("/majors", controller.CreateMajor)

	// Status Routes
	r.GET("/statuses", controller.ListStatuses)
	r.GET("/status/:id", controller.GetStatus)
	r.POST("/statuses", controller.CreateStatus)

	// Roomtype Routes
	r.GET("/roomtypes", controller.ListRoomtypes)
	r.GET("/roomtype/:id", controller.GetRoomtype)
	r.POST("/roomtypes", controller.CreateRoomtype)

	// Building Routes
	r.GET("/buildings", controller.ListBuildings)
	r.GET("/building/:id", controller.GetBuilding)
	r.POST("/buildings", controller.CreateBuilding)

	// Roominform Routes
	r.GET("/roominforms", controller.ListRoominforms)
	r.GET("/roominform/:id", controller.GetRoominform)
	r.POST("/roominforms", controller.CreateRoominform)
	r.PATCH("/roominforms", controller.UpdateRoominform)
	r.DELETE("/roominforms/:id", controller.DeleteRoominform)

	// Run the server

	r.Run()

}
