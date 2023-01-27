import { QualificationsInterface } from "./I_Qualification";
import { MajorsInterface } from "./I_Major";

export interface CoursesInterface {

    Course_ID : string,
   
    Course_Name: string;
   
    Datetime: Date | null;

    Qualification_ID: string;
    Qualification_Name: string;
    Qualification: QualificationsInterface

    

    Major_ID: string;
    Major_Name: string;
    Major: MajorsInterface
    

   }