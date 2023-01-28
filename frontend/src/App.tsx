import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/Main_Page";

// Subject 
import SubjectList from "./components/subject-management/Subject_List";
import SubjectInfo from "./components/subject-management/Subject_Info";
import CreateSubject from "./components/subject-management/Subject_Create";
import UpdateSubject from "./components/subject-management/Subject_Update";

// Class Schedule and Exam Schedule
import ScheduleList from "./components/class_and_exam_schedule/Schedule_List";
import Exam_Schedule_Info from "./components/class_and_exam_schedule/Exam_Schedule_Info";
import Class_Schedule_Info from "./components/class_and_exam_schedule/Class_Schedule_Info";
import Class_Schedule_Create from "./components/class_and_exam_schedule/Class_Schedule_Create";
import Exam_Schedule_Create from "./components/class_and_exam_schedule/Exam_Schedule_Create";
import Class_Schedule_Update from "./components/class_and_exam_schedule/Class_Schedule_Update";
import Exam_Schedule_Update from "./components/class_and_exam_schedule/Exam_Schedule_Update";

// Request
import Request from "./components/request/Request";

// Approval
import Approval from "./components/approval/Approval";
import ApprovalCreate from "./components/approval/ApprovalCreate";
import Navbar from "./components/approval/ApprovalNavbar";
import ApprovalUpdate from "./components/approval/ApprovalUpdate";
import Home_Navbar from "./components/navbars/Home_navbar";

// Student 
import Student_Info from "./components/student/Student_Info";
import Student_Create from "./components/student/Student_Create";
import Student_List from "./components/student/Student_List";
import Student_Update from "./components/student/Student_Update";

// Course
import Course_List from "./components/course/Course_List";
import CourseCreate from "./components/course/Course_Create";
import Course_Info from "./components/course/Course_Info";
import Course_Update from "./components/course/Course_Update";
import RequestCreate from "./components/request/RequestCreate";
import RequestUpdate from "./components/request/RequestUpdate";

export default function App() {
    return (
        <Router>
            <div>
                <Home_Navbar />
                <Routes>
                    {/* Course Path */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/course" element={<Course_List />} />
                    <Route path="/course/course_create" element={<CourseCreate />} />
                    <Route path="/course/:course_id" element={<Course_Info />} />
                    <Route path="/course/update/:course_id" element={<Course_Update />} />

                    {/* Student Path */}
                    <Route path="/student" element={<Student_List />} />
                    <Route path="/student/:student_id" element={<Student_Info />} />
                    <Route path="/student/student_create" element={<Student_Create />} />
                    <Route path="/student/update/:student_id" element={<Student_Update />} />
                
                    {/* Subject Path */}
                    <Route path="/subject" element={<SubjectList />} />
                    <Route path="/subject/subject_create" element={<CreateSubject />} />
                    <Route path="/subject/:subject_id/:section" element={<SubjectInfo />} />
                    <Route path="/subject/update/:subject_id/:section" element={<UpdateSubject/>} />

                    {/* Request Path */}
                    <Route path="/request" element={<Request/>} />
                    <Route path="/request/update/:request_id" element={<RequestUpdate/>} />
                    <Route path="/request/request_create" element={<RequestCreate/>} />

                </Routes>
                {/* <Subject_Management_Navbar /> */}

            </div>
        </Router>
    );
}