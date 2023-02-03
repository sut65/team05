import { QualificationsInterface } from "./I_Qualification";
import { MajorsInterface } from "./I_Major";
import { AdminInterface } from "./I_Admin";


export interface Course {

    Course_ID : string,
   
    Course_Name: string;
   
    Datetime: string;

    Qualification_ID: string;
    Qualification_Name: string;
    Qualification: QualificationsInterface

    

    Major_ID: string;
    Major_Name: string;
    Major: MajorsInterface


    Admin_ID: string;
    Admin: AdminInterface
    

   }