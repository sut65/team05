import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subject_Management_Navbar from "./components/subject-management/Subject_Management_navbar";
import Subject_Management_Footer from "./components/subject-management/Subject_Footer";
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

export default function App() {
  return (
    <Router>
      <div>
        <Subject_Management_Navbar />
        <Routes>
          {/* //* List class schedules and exam schedules components */}
          <Route path="/" element={<ScheduleList />} />
          <Route path="/class_schedule" element={<ScheduleList />} />
          <Route path="/exam_schedule" element={<ScheduleList />} />

          {/* //* Class Schedule and Exam Schedule information components  */}
          <Route
            path="/class_schedule/:subject_id/:section"
            element={<Class_Schedule_Info />}
          />
          <Route
            path="/exam_schedule/:subject_id/:exam_type"
            element={<Exam_Schedule_Info />}
          />

          {/* //* Class Schedule Update component */}
          {/* //* Exam Schedule Update component */}

          {/* //* Class Schedule Create component */}
          <Route
            path="/class_schedule/create"
            element={<Class_Schedule_Create />}
          />
          {/* //* Exam Schedule Create component */}
          <Route
            path="/exam_schedule/create"
            element={<Exam_Schedule_Create />}
          />

          {/* //* Class Schedule Update component */}
          <Route
            path="/class_schedule/:subject_id/:section/update"
            element={<Class_Schedule_Update />}
          />
          {/* //* Exam Schedule Update component */}
          <Route
            path="/exam_schedule/:subject_id/:exam_type/update"
            element={<Exam_Schedule_Update />}
          />

          <Route path="/" element={<Course_List />} />

          <Route path="/course_create" element={<Course_Create />} />

          <Route path="/course_info/:course_id" element={<Course_Info />} /> 

          <Route path="/course/handle-update/:course_id" element={<Course_Update />} />

          <Route path="/" element={<Users />} />

          <Route path="/create" element={<UserCreate />} />

          <Route path="/update/:request_id" element={<UserUpdate />} />
        </Routes>

        <Subject_Management_Footer />
      </div>
    </Router>
  );
}