import { DormitorysInterface } from "./I_Dormitory";
import { Course } from "./I_Course";
import { AdminInterface } from "./I_Admin";




export interface StudentsInterface {

    Student_ID : string,
   
    Student_Name: string;
    Student_Password: string;
   
    Datetime: Date;

    Course_ID: string;
    Course_Name: string;
    Course: Course

    

    Dormitory_ID: string;
    Dormitory_Name: string;
    Dormitory: DormitorysInterface

    
    Admin_ID: string;
    Admin_Email: string;
    Admin: AdminInterface
    

   }