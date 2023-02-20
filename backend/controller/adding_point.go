package controller

import (
	"net/http"
	"time"

	"github.com/B6025212/team05/entity"
	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
)



type extendedAdding_point struct {
	entity.Adding_point
	Professor_Name   string
	Professor_ID 		 string
	Student_ID 		 string
	Student_Name	 string
	Subject_ID		 string
	Section			 uint	
	Course_Name     string
	Subject_TH_Name string
	Subject_EN_Name string
	Day             string
	Start_Time      string
	End_Time        string
	Exam_Date       string
	Unit            string
	Exam_Start_Time string
	Exam_End_Time   string
	Qualification_Name string
}



// POST /course
func CreateAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	var enroll entity.Enroll
	var professor entity.Professor
	var grade entity.Grade

	if err := c.ShouldBindJSON(&adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request ด้วย id ของ request ที่รับเข้ามา
	// SELECT * FROM requests` WHERE request_id = <request.Request_ID>
	if tx := entity.DB().Where("Professor_ID = ?", adding_point.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor type not found"})
		return
	}
	// Communication Diagram Step
	// ค้นหา entity student ด้วย id ของ student ที่รับเข้ามา
	// SELECT * FROM `student` WHERE student_id = <student.Student_ID>
	if tx := entity.DB().Where("enroll_id = ?", adding_point.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll status not found"})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity subject ด้วย id ของ subject ที่รับเข้ามา
	// SELECT * FROM `subject` WHERE subject_id = <subject.subject_id>
	if _, err := govalidator.ValidateStruct(adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Communication Diagram Step
	// ค้นหา entity request_type ด้วย id ของ request_type ที่รับเข้ามา
	// SELECT * FROM `request_type` WHERE request_type_id = <request_type.request_type_ID>
	if tx := entity.DB().Where("grade_id = ?", adding_point.Grade_ID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}


	

	new_adding_point := entity.Adding_point{
		Adding_point_ID:  adding_point.Adding_point_ID,
		Professor: professor,
		Enroll_ID: adding_point.Enroll_ID,
		Grade_ID: adding_point.Grade_ID,
		Date :		time.Now(),
		
		
	}

	// บันทึก entity request
	if err := entity.DB().Create(&new_adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": new_adding_point})
}

func ListAddingByEnroll(c *gin.Context) {
	var extendedAdding_point []extendedAdding_point
	query := entity.DB().Raw("SELECT e.*, s.* ,cs.day,cs.start_time,cs.end_time ,ex.* ,p.* FROM enrolls e JOIN subjects s JOIN class_schedules cs JOIN exam_schedules ex JOIN professors p ON e.subject_id = s.subject_id AND e.section = s.section AND e.class_schedule_id = cs.class_schedule_id AND e.exam_schedule_id = ex.exam_schedule_id AND s.professor_id = p.id").Scan(&extendedAdding_point)
	if err := query.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_point})

}

// List /request
func ListAdding_point(c *gin.Context) {
	var  extendedAdding_point []extendedAdding_point
	id := c.Param("professor_id")
	if err := entity.DB().Raw("SELECT a.* , e.*, st.student_name,su.subject_en_name,c.*,Q.*  FROM adding_points a JOIN enrolls e JOIN students st JOIN subjects su JOIN courses c JOIN qualifications Q ON a.enroll_id = e.enroll_id AND e.student_id = st.student_id  AND e.subject_id = su.subject_id AND su.course_id = c.course_id AND c.qualification_id = Q.qualification_id WHERE a.professor_id = ? group by a.adding_point_id",id).Scan(&extendedAdding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extendedAdding_point})
}


// // DELETE /request
func DeleteAdding_point(c *gin.Context) {

	id := c.Param("adding_point_id")

	if tx := entity.DB().Exec("DELETE FROM adding_points WHERE adding_point_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}



func GetAdding_point(c *gin.Context) {

	var adding_point entity.Adding_point

	id := c.Param("adding_point_id")

	if err := entity.DB().Raw(" Select * from adding_points where adding_point_id = ?", id).Find(&adding_point).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": adding_point})

}


// PATCH /professors
func UpdateAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	var enroll entity.Enroll
	var professor entity.Professor
	var grade entity.Grade

	if err := c.ShouldBindJSON(&adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("enroll_id = ?", adding_point.Enroll_ID).First(&enroll); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "enroll not found"})
		return
	}
	if tx := entity.DB().Where("professor_id = ?", adding_point.Professor_ID).First(&professor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "professor not found"})
		return
	}
	// if tx := entity.DB().Where("subject_id = ? AND section = ?", request.Subject_ID, subject.Section).Find(&subject); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "subject with this section not found"})
	// 	return
	// }
	if _, err := govalidator.ValidateStruct(adding_point); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("grade_id = ?", adding_point.Grade_ID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade type not found"})
		return
	}

		updated_adding_point := entity.Adding_point{
		Adding_point_ID:  adding_point.Adding_point_ID,
		Grade_ID: adding_point.Grade_ID,
		Enroll: enroll,
		Professor: professor,
		Date :		time.Now(),
		
	}

	
	if err := entity.DB().Save(&updated_adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updated_adding_point})

}
func GetPreviousAdding_point(c *gin.Context) {
	var adding_point entity.Adding_point
	if err := entity.DB().Last(&adding_point).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": adding_point})
}



//เอาค่ากลุ่มกับรหัสมากรองชื่อทั้งหมด  รับค่าprofessorมากรองรหัสวิชา
func GetSubjectByProfessorandStudenByEnroll(c *gin.Context) {
	var  subject []extendedAdding_point
	professor_id := c.Param("professor_id")
	subject_id := c.Param("subject_id")
	
	if err := entity.DB().Raw("SELECT s.*,e.* FROM subjects s JOIN enrolls e where s.professor_id =? AND e.subject_id = ? GROUP BY e.subject_id", professor_id,subject_id).Scan(&subject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": subject})
}