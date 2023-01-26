import { Request_TypeInterface } from "./IRequest_Type";
import { Subject } from "./I_Subject";
export interface RequestInterface {
    Request_ID: number;
    Reason: string;

    // Student_ID: string;
    //Student: StudentInterface

    Subject_ID: string;
    Subject: Subject;

    Subject_EN_Name: string;
    subject_en_name: Subject;

    Unit: number;
    unit: Subject;

    // Course_ID: string;
    // Course: Subject;

    Section: number;

    Professor_ID:   string;
    Professor_Name: string;
    
    Request_Type_ID: string;
    Request_Type: Request_TypeInterface;
    
    Request_Type_Name: string;
    request_rype_name: Request_TypeInterface;
}

