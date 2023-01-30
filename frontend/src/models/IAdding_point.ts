import { GradeInterface } from "./IGrade";

export interface Adding_pointInterface {
    Adding_point_ID: number;
   Professor_ID: string;
   Enroll_ID :string;

    Subject_ID: string;
    Section: number;
    
    Student_Name: string;
    Student_ID: string;

    Grade_ID:string;
    grade_id: GradeInterface; 
    Description: string;
    description:GradeInterface;

}