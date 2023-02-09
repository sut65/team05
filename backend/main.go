package main

import (
	// "github.com/B6025212/team05/controller"
	"github.com/B6025212/team05/middlewares"

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
	entity.SetCourseIDValidation()
	entity.SetCourseNameValidation()
	entity.SetCourseDatetimeValidation()
	entity.SetSubjectValidation()
	entity.SetRequestValidation()
	entity.SetReceipt_numberValidation()
	entity.SetApprovalValidation()
	entity.SetReceipt_numberValidation()
	entity.SetDate_TimeValidation()
	entity.SetGradeIDValidation()
	r.POST("/login", controller.Login)

	router := r.Group("")
	{
		api := router.Use(middlewares.Authorizes())
		{
			api.GET("/majors", controller.ListMajors)
			api.GET("/major/:id", controller.GetMajor)
			api.POST("/majors", controller.CreateMajor)
			api.DELETE("/majors/:major_id", controller.DeleteMajor)

			api.GET("/qualifications", controller.ListQualifications)
			api.GET("/qualification/:qualification_id", controller.GetQualification)
			api.POST("qualifications", controller.CreateQualification)
			api.DELETE("/qualifications/:qualification_id", controller.DeleteQualification)
			api.GET("/qualification", controller.ListQualificationName)

			api.GET("/coursesadmin/:course_id", controller.ListCoursesAdmin)
			api.GET("/courses", controller.ListCourses)
			api.GET("/courses/:course_id", controller.GetCourseSearch)
			api.GET("/course/:course_id", controller.GetCourse)
			api.POST("/courses", controller.CreateCourse)
			api.DELETE("/courses/:course_id", controller.DeleteCourse)
			api.PATCH("/courses", controller.UpdateCourses)

			// ++++++++++++++++++ Student Routes ++++++++++++++++++++++++
			api.GET("/students", controller.ListStudents)
			api.GET("/students/:student_id", controller.GetStudentSearch)
			api.GET("/student/:student_id", controller.GetStudent)
			api.GET("/studentadmin/:student_id", controller.ListStudentAdmin)
			api.POST("/students", controller.CreateStudent)
			api.DELETE("/students/:student_id", controller.DeleteStudents)
			api.PATCH("/students", controller.UpdateStudents)

			// ++++++++++++++++++ Subject Routes ++++++++++++++++++++++++
			api.GET("/subjects", controller.ListSubjects)
			api.GET("/prev_subject", controller.GetPreviousSubject)
			api.GET("/subject/:subject_id", controller.GetSubject)
			api.GET("/subject/:subject_id/:section", controller.GetSubjectBySection)
			api.POST("/subjects", controller.CreateSubject)
			api.PATCH("/subjects", controller.UpdateSubjects)
			api.DELETE("/subject/:subject_id/:section", controller.DeleteSubject)
			api.GET("/subject_statuses", controller.ListSubjectStatus)
			api.GET("/subject_categories", controller.ListSubjectCategory)
			api.GET("/class_types", controller.ListClassType)

			// ++++++++++++++++++ Class Schedule  Routes ++++++++++++++++++++++++
			api.GET("/class_schedules", controller.ListClassSchedule)
			api.GET("/class_schedule/:subject_id", controller.GetClassSchedule)
			api.GET("/class_schedule_by_id/:class_schedule_id", controller.GetClassScheduleByID)
			api.POST("/class_schedules", controller.CreateClassSchedule)
			api.PATCH("/class_schedules", controller.UpdateClassSchedule)
			api.DELETE("/class_schedule/:class_schedule_id", controller.DeleteClassSchedule)

			// ++++++++++++++++++ Exam Schedule Routes ++++++++++++++++++++++++
			api.GET("/exam_schedules", controller.ListExamSchedule)
			api.GET("/exam_schedule/:subject_id/:exam_type", controller.GetExamScheduleByType)
			api.POST("/exam_schedules", controller.CreateExamSchedule)
			api.PATCH("/exam_schedules", controller.UpdateExamSchedule)
			api.DELETE("/exam_schedule/:exam_schedule_id", controller.DeleteExamSchedule)

			// ++++++++++++++++++ Room Routes ++++++++++++++++++++++++
			api.GET("/rooms", controller.ListRoominforms)
			api.GET("/room/:room_id", controller.GetRoominform)
			api.POST("/rooms", controller.CreateRoominform)
			api.PATCH("/rooms", controller.UpdateRoominform)
			api.DELETE("/rooms/:room_id", controller.DeleteRoominform)
			// ++++++++++++++++++ Request Routes ++++++++++++++++++++++++
			api.GET("/requests", controller.ListRequest)
			api.GET("/request/:request_id", controller.GetRequest)
			api.GET("/previous_request", controller.GetPreviousRequest)
			api.POST("/requests", controller.CreateRequest)
			api.PATCH("/requests", controller.UpdateRequest)
			api.DELETE("/request/:request_id", controller.DeleteRequest)
			r.GET("/requests/:subject_id", controller.GetRequestBySubjectID)
			api.GET("/requeststudent/:request_id", controller.ListRequestStudent)
			api.GET("/requestupdate/:request_id", controller.ListRequestForUpdate)
			// Request_Type
			api.GET("/request_types", controller.ListRequest_Type)
			api.GET("/request_type/:request_type_id", controller.GetRequest_Type)
			api.POST("/request_types", controller.CreateRequest_Type)
			// ++++++++++++++++++ Approval Routes ++++++++++++++++++++++++
			// Approval
			api.GET("/approvals", controller.ListApproval)
			api.GET("/approval/:approval_id", controller.GetApproval)
			api.GET("/previous_approval", controller.GetPreviousApproval)
			api.POST("/approvals", controller.CreateApproval)
			api.PATCH("/approvals", controller.UpdateApproval)
			api.DELETE("/approval/:approval_id", controller.DeleteApproval)
			api.GET("/approvalprofessor/:approval_id", controller.ListApprovalProfessor)
			api.GET("/approvalupdate/:approval_id", controller.ListApprovalForUpdate)
			api.GET("/approvalstudent/:student_id", controller.ListApprovalStudent)
			// Approval_Type
			api.GET("/approval_types", controller.ListApproval_Type)
			api.GET("/approval_type/:approval_type_id", controller.GetApproval_Type)
			api.POST("/approval_types", controller.CreateApproval_Type)
			// // Admin Routes
			api.GET("/admins", controller.ListAdmins)
			api.GET("/admin/:admin_id", controller.GetAdmin)
			api.POST("/admins", controller.CreateAdmin)
			// // Professor Routes
			api.GET("/professors", controller.ListProfessors)
			api.GET("/professor/:id", controller.GetProfessor)
			api.POST("/professors", controller.CreateProfessor)
			api.PATCH("/professors", controller.UpdateProfessor)
			api.DELETE("/professors/:id", controller.DeleteProfessor)

			// Grade
			api.GET("/grades", controller.ListGrade)
			api.GET("/grade/:grade_id", controller.GetGrade)
			api.POST("/grades", controller.CreateGrade)

			//Dormitory
			api.GET("/dormitorys", controller.ListDormitorys)
			api.GET("/dormitory/:domitory_id", controller.GetDormitory)
			api.POST("dormitorys", controller.CreateDormitory)
			api.DELETE("/dormitorys/:domitory_id", controller.DeleteDormitorys)

			// Status Routes
			api.GET("/statuses", controller.ListStatuses)
			api.GET("/status/:id", controller.GetStatus)
			api.POST("/statuses", controller.CreateStatus)

			//Payment
			r.GET("/payment/:payment_id", controller.GetPayment)
			api.GET("/payment", controller.ListPayment)
			api.POST("/payment", controller.CreatePayment)
			api.GET("/payment_type", controller.ListPayment_type)
			api.GET("/previousenpayment", controller.GetPreviousPayment)
			r.PATCH("/updatepayment", controller.UpdatePayment)
			r.DELETE("/delepayment/:payment_id", controller.DeletePayment)
			r.GET("/enrolls/:student_id", controller.GetEnrollByStudentID)
			//Enroll
			r.GET("/subjectbysubjectid/:course_id/:subject_id", controller.GetSubjectBySubject_ID)
			r.GET("/subjects/:course_id", controller.GetSubjectByCourse)
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
			//---------------------adding_reducings----------------------
			api.GET("/adding_reducings", controller.ListAdding_reducing)
			api.GET("/previous_adding", controller.GetPreviousAdding_reducing)
			api.POST("/adding_reducings", controller.CreateAdding_reducing)
			api.PATCH("/adding_reducings", controller.UpdateEnrollforadding)
			api.POST("/adding_reducingsonly", controller.CreateAdding_reducingonly)
			//---------------------Adding_point--------------------------
			api.GET("/adding_points/:subject_id", controller.GetSubjectByAdding)
			api.GET("/adding_points", controller.ListAdding_point)
			api.GET("/adding_point", controller.ListAddingByEnroll)
			api.GET("/adding_point/:adding_point_id", controller.GetAdding_point)
			api.GET("/previous_adding_point", controller.GetPreviousAdding_point)
			api.POST("/adding_points", controller.CreateAdding_point)
			api.PATCH("/adding_points", controller.UpdateAdding_point)
			api.DELETE("/adding_points/:adding_point_id", controller.DeleteAdding_point)
		}

	}

	// //----------------------------------------------------------------------------------------------

	r.Run()

}
