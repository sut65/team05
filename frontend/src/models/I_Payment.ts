import { EnrollInterface } from "./I_Enroll"

export interface Payment_Type{
    Payment_Type_ID:   string 
	Payment_Type_Name: string
}
export interface Payment{
    Payment_ID: number 

	Payment_Type_ID: string,
	Payment_Type_Name: string,
	Payment_Type: Payment_Type;
	
	Student_ID: string,
	// Student    Student `gorm:"references:Student_ID"`

	Enroll_ID: string,
	Enroll:    EnrollInterface;

	Admin_ID: string,
	Receipt_number:string,
	Date_Time: string,
	Unit:      number,
	AmountsCal: number
	Amounts:   number,
}