import { Subject } from "./I_Subject";
import { StudentsInterface } from "./I_Student";
import { EnrollInterface } from  "./I_Enroll";
import { Course } from "./I_Course";
import { Class_Schedule } from "./I_Schedule";


export interface Adding_reducingInterface {
    Change_ID: number,
    
    History_Type_ID: string,
    Type_Name :string,

    Enroll_ID :string,
    Class_Schedule_ID: string,
    Unit    : number,
    Student_ID :string
    Capacity    : number,
    Section : number,
    Enroll_Amount   : number,
    Course_Name: string
    
    Subject_ID: string;
  
    Subject_EN_Name:    string;

    

    //ใช้บันทึกค่าที่รับจากforntendลงdatabase

}

