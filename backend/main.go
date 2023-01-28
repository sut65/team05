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

	// ++++++++++++++++++ Course Routes +++++++++++++++++++++++++
	r.GET("/courses", controller.ListCourses)
	r.GET("/courses/:course_id", controller.GetCourseSearch)
	r.GET("/course/:course_id", controller.GetCourse)
	r.POST("/courses", controller.CreateCourse)
	r.DELETE("/courses/:course_id", controller.DeleteCourse)
	r.PATCH("/courses", controller.UpdateCourses)

	// ++++++++++++++++++ Student Routes ++++++++++++++++++++++++
	r.GET("/students", controller.ListStudents)
	r.GET("/students/:student_id", controller.GetStudentSearch)
	r.GET("/student/:course_id", controller.GetStudent)
	r.POST("/students", controller.CreateStudent)
	r.DELETE("/students/:student_id", controller.DeleteStudents)
	r.PATCH("/students", controller.UpdateStudents)

	r.GET("/subjects", controller.ListSubjects)
	r.GET("/prev_subject", controller.GetPreviousSubject)
	r.GET("/subject/:subject_id", controller.GetSubject)
	r.GET("/subject/:subject_id/:section", controller.GetSubjectBySection)

	r.GET("/subject_statuses", controller.ListSubjectStatus)
	r.GET("/subject_categories", controller.ListSubjectCategory)
	r.GET("/class_types", controller.ListClassType)

	r.GET("/class_schedules", controller.ListClassSchedule)
	r.GET("/exam_schedules", controller.ListExamSchedule)
	r.GET("/class_schedule/:subject_id", controller.GetClassSchedule)
	r.GET("/exam_schedule/:subject_id", controller.GetExamSchedule)
	r.GET("/class_schedule/:subject_id/:section", controller.GetClassBySubjectID_and_Section)

	// r.GET("/enrollsub", controller.ListEnrollSubject)
	// r.GET("/enroll", controller.ListEnroll)
	// r.GET("/enroll/enroll_id", controller.GetEnroll)
	// r.POST("/enroll", controller.CreateEnroll)
	// r.DELETE("/deleEnroll/:enroll_id", controller.DeleteEnroll)

	//----------------------------------------------------------------------------------
	r.GET("/enrollsub", controller.ListEnrollSubject)
	r.GET("/enroll", controller.ListEnroll)
	r.GET("/enroll/:subject_id", controller.GetEnrollSubject)
	r.PATCH("/updateenroll", controller.UpdateEnroll)
	r.GET("/currentenroll/:enroll_id", controller.GetEnroll)
	// r.GET("/enroll/:enroll_id", controller.GetEnroll)
	r.POST("/enroll", controller.CreateEnroll)
	r.GET("/previousenroll", controller.GetPreviousREnroll)
	r.DELETE("/deleEnroll/:enroll_id", controller.DeleteEnroll)
	r.GET("/enrollsubs/:subject_id", controller.GetEnrollSubject)
	r.GET("/subjectd/:coruse_id", controller.GetSubjectByCourse)

	//----------------------------------------------------------------------------------------------

	// Initiate route POST
	r.POST("/subjects", controller.CreateSubject)

	// Initiate route PATCH
	r.PATCH("/subjects", controller.UpdateSubjects)

	// Initiate route DELETE
	r.DELETE("/subject/:subject_id/:section", controller.DeleteSubject)

	// // Admin Routes
	r.GET("/admins", controller.ListAdmins)
	r.GET("/admin/:id", controller.GetAdmin)
	r.POST("/admins", controller.CreateAdmin)

	// // Professor Routes
	r.GET("/professors", controller.ListProfessors)
	r.GET("/professor/:id", controller.GetProfessor)
	r.POST("/professors", controller.CreateProfessor)
	r.PATCH("/professors", controller.UpdateProfessor)
	r.DELETE("/professors/:id", controller.DeleteProfessor)

	// // Major Routes
	r.GET("/majors", controller.ListMajors)
	r.GET("/major/:id", controller.GetMajor)
	r.POST("/majors", controller.CreateMajor)
	r.DELETE("/majors/:major_id", controller.DeleteMajor)

	// // Status Routes
	r.GET("/statuses", controller.ListStatuses)
	r.GET("/status/:id", controller.GetStatus)
	r.POST("/statuses", controller.CreateStatus)

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

	r.GET("/qualifications", controller.ListQualifications)
	r.GET("/qualification/:qualification_id", controller.GetQualification)
	r.POST("qualifications", controller.CreateQualification)
	r.DELETE("/qualifications/:qualification_id", controller.DeleteQualification)
	r.GET("/qualification", controller.ListQualificationName)

	// Approval
	r.GET("/approvals", controller.ListApproval)
	r.GET("/approval/:approval_id", controller.GetApproval)
	r.GET("/previous_approval", controller.GetPreviousApproval)
	r.POST("/approvals", controller.CreateApproval)
	r.PATCH("/approvals", controller.UpdateApproval)
	r.DELETE("/approval/:approval_id", controller.DeleteApproval)

	// Approval_Type
	r.GET("/approval_types", controller.ListApproval_Type)
	r.GET("/approval_type/:request_type_id", controller.GetApproval_Type)
	r.POST("/approval_types", controller.CreateApproval_Type)
	// Run the server

	//Adding_reducing
	r.GET("/adding_reducingsss", controller.ListAdding_reducingss) //เรียกใช้เพื่อแสดงค่าในตารางของตัวเองทั้งหมด

	r.GET("/subjects/:course_id", controller.GetSubjectByCourse)
	r.GET("/adding_reducings", controller.ListAdding_reducing)
	r.GET("/adding_reducing/:change_id", controller.GetAdding_reducing)
	r.GET("/previous_adding", controller.GetPreviousAdding_reducing)
	r.POST("/adding_reducings", controller.CreateAdding_reducing)
	r.PATCH("/adding_reducings_update", controller.UpdateAdding_reducing)
	r.DELETE("/adding_reducing/:change_id", controller.DeleteAdding_reducing)
	// Run the server

	//Adding_point

	r.GET("/adding_points", controller.ListAdding_point)

	r.GET("/adding_points/:subject/:section", controller.GetStudenByEnroll)
	r.GET("/adding_point/:adding_point_id", controller.GetAdding_point)
	r.GET("/previous_adding_point", controller.GetPreviousAdding_point)
	r.POST("/adding_points", controller.CreateAdding_point)
	r.PATCH("adding_points", controller.UpdateAdding_point)
	r.DELETE("/adding_point/:adding_point_id", controller.DeleteAdding_point)

	// Grade
	r.GET("/grades", controller.ListGrade)
	r.GET("/grade/:grade_id", controller.GetGrade)
	r.POST("/grades", controller.CreateGrade)

	//Dormitory
	r.GET("/dormitorys", controller.ListDormitorys)
	r.GET("/dormitory/:domitory_id", controller.GetDormitory)
	r.POST("dormitorys", controller.CreateDormitory)
	r.DELETE("/dormitorys/:domitory_id", controller.DeleteDormitorys)

	r.Run()

}
