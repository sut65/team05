export interface Major{
    Major_ID: string;
    Major_Name: string;
    Institute_ID: string;
}

export interface Course{
    Course_ID: string;
    Course_Name: string;
    Datetime: Date | null;
    Admin_ID: string;
    Major_ID: string;
    Major: Major;
}