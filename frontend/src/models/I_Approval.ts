import Approval from "../components/approval/Approval";
import { RequestInterface } from "./IRequest";
import { Approval_TypeInterface } from "./I_Approval_Type";
import { Course } from "./I_Course";
import { Subject } from "./I_Subject";

// export interface ApprovalShowInterface{
//     Approval_ID: number;
//     Reason: string;
//     Professor_ID:   string;
//     Professor_Name: string;
//     Section: number;
//     Request_ID: number;
//     Approval_Type_ID: string;
//     Subject_ID: string;
//     Course_Name: string;
// 	Subject_TH_Name: string
// 	Subject_EN_Name: string;
//     Approval_Type_Name: string;
//     Unit: string;
// }
export interface ApprovalInterface {
    Approval_ID: number;
    Reason: string;

    // Student_ID: string;
    //Student: StudentInterface

    Request_ID: number;
    Request: RequestInterface;

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

