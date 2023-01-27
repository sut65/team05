import Approval from "../components/approval/Approval";
import { RequestInterface } from "./IRequest";
import { Approval_TypeInterface } from "./I_Approval_Type";
import { Course } from "./I_Course";
import { Subject } from "./I_Subject";

export interface ApprovalInterface {
    Approval_ID: number;
    Reason: string;

    Request_ID: number;
    Request: RequestInterface;

    Student_ID: string;
 //Student: StudentInterface
    
    Subject_ID: string
    Subject: Request;
    Subject_EN_Name: string;
    subject_en_name: Request;

    Unit: number;
    unit: Request;

    // Course_ID: string;
    // Course: Subject;

    Course_Name: String;
    

    Section: number;

    Professor_ID:   string;
    Professor_Name: string;
    
    Approval_Type_ID: string;
    Approval_Type: Approval_TypeInterface;
    
    Approval_Type_Name: string;
    Approval_rype_name: Approval_TypeInterface;
}

