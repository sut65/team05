import { Course } from "./I_Course"
import { Subject } from "./I_Subject";
export interface EnrollInterface {

    Enroll_ID: string,

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

    Section: number;

    Unit: number;

   }