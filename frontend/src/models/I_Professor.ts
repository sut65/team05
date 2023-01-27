import { AdminInterface } from "./I_Admin"
import { MajorsInterface } from "./I_Major"
import { QualificationsInterface } from "./I_Qualification"
import { StatusInterface } from "./I_Status"

export interface ProfessorInterface{
    ID: number,
    Professor_ID: string,
    Professor_name:  string,
    Professor_address: string,
    Professor_email: string,
    Professor_tel:   string,
    Professor_password: string,

    AdminID:    string,
    Adminname: string,
    Admin:  AdminInterface,
    StatusID:   string,
    Status_Name: string,
    Status: StatusInterface,
    QualificationID:    string,
    Qualification_Name: string,
    Qualification:  QualificationsInterface,
    MajorID:    string,
    Major:  MajorsInterface,
   

}