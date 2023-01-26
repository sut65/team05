package main

import (
	// "github.com/B6025212/team05/controller"

	"github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/entity"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token,AdminAuthorization, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	entity.SetupDatabase()
	// entity.OpenDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Initiate route GET
	r.GET("/subjects", controller.ListSubjects)
	r.GET("/prev_subject", controller.GetPreviousSubject)
	r.GET("/subject/:subject_id", controller.GetSubject)
	r.GET("/subject/:subject_id/:section", controller.GetSubjectBySection)

	r.GET("/subject_statuses", controller.ListSubjectStatus)
	r.GET("/subject_categories", controller.ListSubjectCategory)
	r.GET("/class_types", controller.ListClassType)
	r.GET("/courses", controller.ListCourses)

	r.GET("/class_schedules", controller.ListClassSchedule)
	r.GET("/exam_schedules", controller.ListExamSchedule)
	r.GET("/class_schedule/:subject_id", controller.GetClassSchedule)
	r.GET("/exam_schedule/:subject_id", controller.GetExamSchedule)
	r.GET("/class_schedule/:subject_id/:section", controller.GetClassBySubjectID_and_Section)

	r.GET("/enrollsub", controller.ListEnrollSubject)
	r.GET("/enroll", controller.ListEnroll)
	r.GET("/enroll/enroll_id", controller.GetEnroll)
	r.POST("/enroll", controller.CreateEnroll)
	r.DELETE("/deleEnroll/:enroll_id", controller.DeleteEnroll)

	// Initiate route POST
	r.POST("/subjects", controller.CreateSubject)

	// Initiate route PATCH
	r.PATCH("/subjects", controller.UpdateSubjects)

	// Initiate route DELETE
	r.DELETE("/subject/:subject_id/:section", controller.DeleteSubject)

	// // Admin Routes
	// r.GET("/admins", controller.ListAdmins)
	// r.GET("/admin/:id", controller.GetAdmin)
	// r.POST("/admins", controller.CreateAdmin)

	// // Professor Routes
	// r.GET("/professors", controller.ListProfessors)
	// r.GET("/professor/:id", controller.GetProfessor)
	// r.POST("/professors", controller.CreateProfessor)
	// r.PATCH("/professors", controller.UpdateProfessor)
	// r.DELETE("/professors/:id", controller.DeleteProfessor)

	// // Major Routes
	// r.GET("/majors", controller.ListMajors)
	// r.GET("/major/:id", controller.GetMajor)
	// r.POST("/majors", controller.CreateMajor)

	// // Status Routes
	// r.GET("/statuses", controller.ListStatuses)
	// r.GET("/status/:id", controller.GetStatus)
	// r.POST("/statuses", controller.CreateStatus)

	// // Roomtype Routes
	// r.GET("/roomtypes", controller.ListRoomtypes)
	// r.GET("/roomtype/:id", controller.GetRoomtype)
	// r.POST("/roomtypes", controller.CreateRoomtype)

	// // Building Routes
	// r.GET("/buildings", controller.ListBuildings)
	// r.GET("/building/:id", controller.GetBuilding)
	// r.POST("/buildings", controller.CreateBuilding)

	// // Roominform Routes
	// r.GET("/roominforms", controller.ListRoominforms)
	// r.GET("/roominform/:id", controller.GetRoominform)
	// r.POST("/roominforms", controller.CreateRoominform)
	// r.PATCH("/roominforms", controller.UpdateRoominform)
	// r.DELETE("/roominforms/:id", controller.DeleteRoominform)

	// Request
	r.GET("/requests", controller.ListRequest)
	r.GET("/request/:request_id", controller.GetRequest)
	r.GET("/previous_request", controller.GetPreviousRequest)
	r.POST("/requests", controller.CreateRequest)
	r.PATCH("/requests", controller.UpdateRequest)
	r.DELETE("/request/:request_id", controller.DeleteRequest)
	

	// Request_Type
	r.GET("/request_types", controller.ListRequest_Type)
	r.GET("/request_type/:request_type_id", controller.GetRequest_Type)
	r.POST("/request_types", controller.CreateRequest_Type)
	// Run the server
	r.Run()

}
