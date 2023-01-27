import { Subject } from "./I_Subject";
// import { StudentInterface } from "./I_Student";
import { EnrollInterface } from  "./I_Enroll";
import { Course } from "./I_Course";
import { Class_Schedule } from "./I_Schedule";
export interface SubjectForAddingReduce {
    ID: number;
    Subject_ID: string;
    Professor_ID:   string;
    Professor_Name:   string;
    // Professor:  Professor;
    Course: Course;
    Subject_Status_ID:  string;
    Class_Type_ID:  string;
    Subject_Category_ID:    string;
    Subject_TH_Name:    string;
    Subject_EN_Name:    string;
    Capacity:   number;
    Enroll_Amount:   number;
    Reserved:   number;
    Reserved_Enroll:  number;
    Unit:   number;
    Exam_Schedule_ID: string;
	Exam_Date: string,
	Exam_Start_Time: string,
	Exam_End_Time: string,
    
    Course_ID: string;
    Course_Name: string;
    Datetime: Date | null;
    Admin_ID: string;
    Major_ID: string;

    Class_Schedule_ID: string;
    class_schedule_id: Class_Schedule;
    Section: number;
    Room_ID: string;
    Class_Schedule_Description: string;
    Day: string;
    Start_Time: string;
    End_Time: string;

    Enroll_ID: string,

    Coruse_Name: string,
    coruse: Course;
    subject_id: Subject;
    subject_th_name: Subject;
    subject_en_Nnme: Subject;
    Room_Number: string;  
////สำหรับใช้แสดงค่าในตารางหน้าcreate เรียกใช้ฟังชั่นlist ที่main.go 
}



export interface Adding_reducingInterface {
    Change_ID: number,
    Status: string,

    Subject_ID :string,
    // subject_id: Subject,

    Enroll_ID :string,
    // enroll_id:EnrollInterface,

    // Student_ID :string
    // student_id:StudentInterface,

    Course_Name: string,
    // course_name: Course;

    Subject_EN_Name : string,
    // subject_en_name:Subject,
    Section : number,

    //ใช้บันทึกค่าที่รับจากforntendลงdatabase

}

