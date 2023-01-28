import { DormitorysInterface } from "./I_Dormitory";
import { Course } from "./I_Course";



export interface StudentsInterface {

    Student_ID : string,
   
    Student_Name: string;
    Student_Password: string;
   
    Datetime: string;

    Course_ID: string;
    Course_Name: string;
    Course: Course

    

    Dormitory_ID: string;
    Dormitory_Name: string;
    Dormitory: DormitorysInterface
    

   }