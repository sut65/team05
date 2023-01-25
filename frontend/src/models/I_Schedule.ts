

export interface Class_Schedule {
    Class_Schedule_ID: string;
    Subject_ID: string;
    Section: number;

    Admin_ID: string;
    Room_ID: string;
    Class_Schedule_Description: string;
    Day: string;
    Start_Time: string;
    End_Time: string;

}

export interface Exam_Schedule {
    Exam_Schedule_ID: string;
    Subject_ID: string;
    Admin_ID: string;
    Room_ID: string;
    Exam_Type: string;
    Exam_Date: string;
    Exam_Start_Time: string;
    Exam_End_Time: string;
}