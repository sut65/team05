import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/Main_Page";

// Subject 
import SubjectList from "./components/subject-management/Subject_List";
import SubjectInfo from "./components/subject-management/Subject_Info";
import CreateSubject from "./components/subject-management/Subject_Create";
import UpdateSubject from "./components/subject-management/Subject_Update";

// Class Schedule and Exam Schedule
import ScheduleList, { Class_Schedules_List, Exam_Schedules_List } from "./components/class_and_exam_schedule/Schedule_List";
import Exam_Schedule_Info from "./components/class_and_exam_schedule/Exam_Schedule_Info";
import Class_Schedule_Info from "./components/class_and_exam_schedule/Class_Schedule_Info";
import Class_Schedule_Create from "./components/class_and_exam_schedule/Class_Schedule_Create";
import Exam_Schedule_Create from "./components/class_and_exam_schedule/Exam_Schedule_Create";
import Class_Schedule_Update from "./components/class_and_exam_schedule/Class_Schedule_Update";
import Exam_Schedule_Update from "./components/class_and_exam_schedule/Exam_Schedule_Update";

// Request
import Request from "./components/request/Request";
import RequestCreate from "./components/request/RequestCreate";
import RequestUpdate from "./components/request/RequestUpdate";

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

// Footer
import Footer from "./components/pages/Home_Footer";
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

                    {/* Class Schedule and Exam Schedule */}
                    <Route path="/schedule" element={<ScheduleList />} />
                    <Route path="/class_schedule" element={<ScheduleList />} />
                    <Route path="/class_schedule/:subject_id/:section" element={<Class_Schedule_Info />} />
                    <Route path="/class_schedule/update/:subject_id/:section" element={<Class_Schedule_Update />} />
                    
                    <Route path="/exam_schedule" element={<ScheduleList />} />
                    <Route path="/exam_schedule/exam_schedule_create" element={<Exam_Schedule_Create />} />
                    <Route path="/exam_schedule/:subject_id/:exam_type" element={<Exam_Schedule_Info/>} />
                    <Route path="/exam_schedule/update/:subject_id/:exam_type" element={<Exam_Schedule_Update/>} />


                    {/* Request Path */}
                    <Route path="/request" element={<Request/>} />
                    <Route path="/request/update/:request_id" element={<RequestUpdate/>} />
                    <Route path="/request/request_create" element={<RequestCreate/>} />

                    {/* Approval Path */}
                    <Route path="/approval" element={<Approval/>} />
                    <Route path="/approval/approval_create" element={<ApprovalCreate/>} />
                    <Route path="/approval/update/:approval_id" element={<ApprovalUpdate/>} />

                </Routes>
                <Footer />
                {/* <Subject_Management_Navbar /> */}

            </div>
        </Router>
    );
}