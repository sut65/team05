import { Request_TypeInterface } from "./IRequest_Type";
import { Subject } from "./I_Subject";
export interface RequestInterface {
    Request_ID: string,
    Reason: string;

    Request_Type_ID: string;
    Request_Type: Request_TypeInterface

    Student_ID: string;
    //Student: StudentInterface

    Subject_ID: string;
    Subject: Subject

    Section: number;
}
