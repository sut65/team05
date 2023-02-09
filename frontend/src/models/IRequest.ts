import { Request_TypeInterface } from "./IRequest_Type";
import { Subject } from "./I_Subject";
import { Course } from "./I_Course";

export interface RequestInterface {
    Request_ID: number;
    Reason: string;

    Student_ID: string;
    Student: string;

    Subject_ID: string;
    Subject: Subject;

    Subject_EN_Name: string;
    subject_en_name: Subject;

    Unit: number;
    unit: Subject;

    // Course_ID: string;
    // Course: Subject;
    Course_Name: string;
    Course: Course;
    Day: string;
   
    Start_Time: string;
   
    End_Time: string;
   
    Exam_Schedule_ID: string;

    Exam_Date: string
    Exam_Start_Time: string
	Exam_End_Time: string
    Class_Schedule_ID: string;
    
    Section: number;

    Professor_ID:   string;
    Professor_Name: string;
    
    Request_Type_ID: string;
    Request_Type: Request_TypeInterface;
    
    Request_Type_Name: string;
    request_type_name: Request_TypeInterface;
}

