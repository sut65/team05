import { Course } from "./I_Course";
// import { Professor } from "./I_Professor";
export interface Subject_Status{
    Subject_Status_ID:  string;
    Subject_Status_Description: string;
}

export interface Class_Type{
    Class_Type_ID:  string;
    Class_Type_Name:    string;
}

export interface Subject_Category{
    Subject_Category_ID:  string;
    Subject_Category_Name:    string;
}

export interface Subject{
    ID: number;
    Subject_ID: string;

    Professor_ID:   string;
    Professor_Name:   string;
    // Professor:  Professor;

    Course_ID:  string;
    Course_Name:  string;
    Course: Course;

    Subject_Status_ID:  string;
    Subject_Status: Subject_Status;

    Class_Type_ID:  string;
    Class_Type: Class_Type;

    Subject_Category_ID:    string;
    Subject_Category:   Subject_Category;

    Subject_TH_Name:    string;
    Subject_EN_Name:    string;

    Capacity:   number;
    Enroll_Amount:   number;
    Reserved:   number;
    Reserved_Enroll:  number;
    Unit:   number;
    Section:    number;

    Day:	string,
	Start_Time: string,
	End_Time: string,
	Exam_Date: string,
	Exam_Start_Time: string,
	Exam_End_Time: string,


}
