import { GradeInterface } from "./IGrade";
import { QualificationsInterface } from "./I_Qualification";
import { Subject } from "./I_Subject";

export interface Adding_pointInterface {
    Adding_point_ID: number;
   Professor_ID: string;
   Enroll_ID :string;
    Section: number;
    
    Student_Name: string;
    Student_ID: string;

    Grade_ID:string;
    grade_id: GradeInterface; 
    Description: string;
    description: GradeInterface;
    
    Course_Name: string,

    Subject_ID: string,
    subject_id: Subject;

    Subject_TH_Name: string,
    subject_th_name: Subject;

    Subject_EN_Name: string,
    subject_en_Nnme: Subject;

    Course_ID: string,
    Course: Subject;
   
    Unit: number;
    Qualification_Name: string,
    qualification_name: QualificationsInterface,
}