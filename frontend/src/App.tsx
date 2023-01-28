import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subject_Management_Navbar from "./components/subject-management/Subject_Management_navbar";
// import Subject_Management_Footer from "./components/subject-management/Subject_Footer";
import SubjectList from "./components/subject-management/Subject_List";
import SubjectInfo from "./components/subject-management/Subject_Info";
import CreateSubject from "./components/subject-management/Subject_Create";
import UpdateSubject from "./components/subject-management/Subject_Update";
import ScheduleList from "./components/class_and_exam_schedule/Schedule_List";
import Exam_Schedule_Info from "./components/class_and_exam_schedule/Exam_Schedule_Info";
import Class_Schedule_Info from "./components/class_and_exam_schedule/Class_Schedule_Info";
import Class_Schedule_Create from "./components/class_and_exam_schedule/Class_Schedule_Create";
import Exam_Schedule_Create from "./components/class_and_exam_schedule/Exam_Schedule_Create";
import Class_Schedule_Update from "./components/class_and_exam_schedule/Class_Schedule_Update";
import Exam_Schedule_Update from "./components/class_and_exam_schedule/Exam_Schedule_Update";
import Course_Info from "./components/course/Course_Info";
import Course_Create from "./components/course/Course_Create";
import Course_List from "./components/course/Course_List";
import Course_Update from "./components/course/Course_Update";
import Users from "./components/request/Request";
import UserCreate from "./components/request/RequestCreate";
import UserUpdate from "./components/request/RequestUpdate";
import Approval from "./components/approval/Approval";
import ApprovalCreate from "./components/approval/ApprovalCreate";
import Navbar from "./components/approval/ApprovalNavbar";
import ApprovalUpdate from "./components/approval/ApprovalUpdate";
import Student_Info from "./components/student/Student_Info";
import Student_Create from "./components/student/Student_Create";
import Student_List from "./components/student/Student_List";
import Student_Update from "./components/student/Student_Update";
import Home_Navbar from "./components/navbars/Home_navbar";
import MainPage from "./components/pages/Main_Page";

export default function App() {
    return (
        <Router>
            <div>
                <Home_Navbar/>
                <Route path="/" element={<MainPage/>} />
                {/* <Route path="/" element={<MainPage/>} /> */}
                {/* <Subject_Management_Navbar /> */}
          
            </div>
        </Router>
    );
}