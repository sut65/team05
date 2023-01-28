import { Course } from "./I_Course"
import { Subject } from "./I_Subject";
export interface EnrollInterface {

    Enroll_ID: string,

    Coruse_Name: string,
    coruse: Course;

    Subject_ID: string,
    subject_id: Subject;

    Subject_TH_Name: string,
    subject_th_name: Subject;

    Subject_EN_Name: string,
    subject_en_Nnme: Subject;
//asdfsdfasdfsdfd
    Course_ID: string,
    Course: Subject;
    

    Room_Number: string;
   
    Day: string;
   
    Start_Time: string;
   
    End_Time: string;
   
    Exam_Schedule_ID: string;

    Class_Schedule_ID: string;

    Section: number;


    Unit: number;

   }

export interface extendedEnrollSubjectInterface {
    Enroll_ID: string,
    ID: number
    Subject_ID: string
	Section: number
    Capacity:      number
    Enroll_Amount: number
    Reserved:        number
    Reserved_Enroll: number
    Subject_TH_Name: string
	Subject_EN_Name: string
    Unit: string

    Exam_Schedule_ID: string
    Exam_Type: string
    Exam_Date: string
    Start_Time: string
	End_Time: string

    Class_Schedule_ID: string
    Day: string
    Class_Schedule_Description: string
	
	Exam_Start_Time: string
	Exam_End_Time: string
    

}