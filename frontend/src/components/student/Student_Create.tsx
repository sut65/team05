import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { Course } from "../../models/I_Course";

import { StudentsInterface } from "../../models/I_Student";

import { QualificationsInterface } from "../../models/I_Qualification";

import { DormitorysInterface } from "../../models/I_Dormitory";


import { MajorsInterface } from "../../models/I_Major";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { SelectChangeEvent, Toolbar } from "@mui/material";

import { FormHelperText, MenuItem, Select,} from "@mui/material";

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddIcon from '@mui/icons-material/Add';

import { AdminInterface } from "../../models/I_Admin";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import Home_Navbar from "../navbars/Home_navbar";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function StudentCreate() {

 const [students, setStudents] = React.useState<Partial<StudentsInterface>>({});

 const [courses, setCourses] = React.useState<Course[]>([]);

 const [dormitorys, setDormitorys] = React.useState<DormitorysInterface[]>([]);

 const [success, setSuccess] = React.useState(false);

 const [error, setError] = React.useState(false);

 const [datetime, setDatetime] = React.useState<Dayjs | null>(dayjs);

 const [message, setAlertMessage] = React.useState("");




 const handleClose = (

   event?: React.SyntheticEvent | Event,

   reason?: string

 ) => {

   if (reason === "clickaway") {

     return;

   }

   setSuccess(false);

   setError(false);

 };


 const handleInputChange = (

   event: React.ChangeEvent<{ id?: string; value: any }>

 ) => {

   const id = event.target.id as keyof typeof StudentCreate;

   const { value } = event.target;

   setStudents({ ...students, [id]: value });

 };

 const handleSelectChange = (event: SelectChangeEvent<string>) => {
  const name = event.target.name as keyof typeof students;
  setStudents({
    ...students,
    [name]: event.target.value,
  });
};
const getAdminID = async () => {
  let uid = localStorage.getItem("id");

  fetch(`${apiUrl}/admin/${uid}`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              students.Admin_ID = res.data.Admin_ID

          } else {
              console.log("else");
          }
      });
};

const apiUrl = "http://localhost:8080";
const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};




  const getCourses = async () => {
    fetch(`${apiUrl}/courses`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setCourses(res.data);
            } else {
                console.log("else");
            }
        });
      }

   
  const getDormitorys = async () => {
    fetch(`${apiUrl}/dormitorys`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setDormitorys(res.data);
            } else {
                console.log("else");
            }
        });
      }




 function submit() {

   let data = {

    Student_ID: students.Student_ID ?? "",

    Admin_ID: students.Admin_ID ?? "",

    Student_Name: students.Student_Name ?? "",

    Student_Password: students.Student_Password ?? "",

    Student_Age:
    typeof students.Student_Age === "string"
      ? parseInt(students.Student_Age)
      : students.Student_Age,

    Datetime: datetime,

    Course_ID: students.Course_ID ?? "",

    Dormitory_ID: students.Dormitory_ID ?? "",
    
   };


   const apiUrl = "http://localhost:8080/students";

   const requestOptions = {

     method: "POST",

     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },

     body: JSON.stringify(data),

   };
   


   Swal.fire({
    title: 'คุณต้องการที่จะบันทึกหรือไม่?',
    icon: 'warning',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'บันทึก',
    denyButtonText: `ไม่บันทึก`,
  }).then((data) => {
    if (data.isConfirmed) {
        fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกเรียบร้อย !',
                    text: 'Success',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อมูลผิดพลาด !',
                    text: res.error,
                })
            }
        });
    } 
})

 }
 useEffect(() => {
  getCourses();
  getDormitorys();
  getAdminID();
      }, []);


 return (

   <Container maxWidth="md">

     <Snackbar

       open={success}

       autoHideDuration={6000}

       onClose={handleClose}

       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

     >

       <Alert onClose={handleClose} severity="success">

         บันทึกข้อมูลสำเร็จ

       </Alert>

     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

       <Alert onClose={handleClose} severity="error">

       {message}

       </Alert>

     </Snackbar>

     <Paper>

       <Box

         display="flex"

         sx={{

           marginTop: 2,

         }}

       >

         <Box sx={{ paddingX: 2, paddingY: 1 }}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >
            <Home_Navbar></Home_Navbar>
            <Toolbar></Toolbar>
            <Grid item xs={3} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:35}}>

            <LibraryAddIcon sx={{ fontFamily: "Noto Sans Thai",fontSize:45, mb:-2}}/> สร้างข้อมูลนักศึกษา
             </Grid>

           </Typography>

         </Box>

       </Box>

       <Divider />

       <Grid container spacing={3} sx={{ padding: 2 }}>

       <Grid item xs={4} color="#FF0606" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <p>รหัสแอดมิน</p>

        <FormControl fullWidth variant="outlined">
        <TextField
                                variant="outlined"
                                id="Admin_ID"
                                type="string"
                                disabled
                                value={students.Admin_ID}
                                inputProps={{
                                  name: "Admin_ID",
                                }}
                                onChange={handleInputChange}
                            />

        </FormControl>

        </Grid>

       <Grid item xs={4} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <p>รหัสนักศึกษา</p>

        <FormControl fullWidth variant="outlined">

          <TextField

            id="Student_ID"

            variant="outlined"

            type="string"

            size="medium"

            value={students.Student_ID || ""}

            onChange={handleInputChange}

          />

        </FormControl>

        </Grid>

         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <p>ชื่อนักศึกษา</p>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Student_Name"

               variant="outlined"

               type="string"

               size="medium"

               value={students.Student_Name || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <p>รหัสผ่านนักศึกษา</p>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Student_Password"

               variant="outlined"

               type="string"

               size="medium"

               value={students.Student_Password || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <p>อายุ</p>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Student_Age"

               variant="outlined"

               type="number"

               size="medium"

               value={students.Student_Age}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>


         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
          <FormControl fullWidth variant="outlined">

<p>วันเวลาที่จัดการ</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
     renderInput={(params) => <TextField {...params} />}
     value={datetime}
     onChange={(newValue: Dayjs | null) => {
       setDatetime(newValue);
       console.log(newValue)
     }}
   />
               </LocalizationProvider>
</FormControl>

          
         </Grid>

         <Grid item xs={6} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
            <FormControl fullWidth variant="outlined" sx={{mt:-0.5}}>
              
              <p>หลักสูตร</p>
              <Select native 
                                variant="outlined"
                                id="Course_ID"
                                value={students.Course_ID+""}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Course_ID",
                                    
                                }}

                            >
                              <option aria-label="Noun" value="">  กรุณาเลือกหลักสูตร</option>

                                {courses.map((item: Course) => (
                                    <option
                                        value={item.Course_ID}
                                        key={item.Course_ID}
                                    >
                                        {item.Course_Name}
                                    </option>
                                ))}
                            </Select>
                
            </FormControl>
          </Grid>

          <Grid item xs={6} color="#115686" 
          sx={{  fontFamily: "Noto Sans Thai",
           fontWeight : 'bold' ,fontSize:27}}>
            <FormControl fullWidth variant="outlined" sx={{mt:-0.5}}>
              
              <p>หอพัก</p>
              <Select  native
                                variant="outlined"
                                id="Dormitory_ID"
                                value={students.Dormitory_ID+""}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Dormitory_ID",
                                    
                                }}

                            >
                                <option aria-label="Noun" value="">  กรุณาเลือกหอพัก</option>

                                {dormitorys.map((item: DormitorysInterface) => (
                                    <option
                                        value={item.Dormitory_ID}
                                        key={item.Dormitory_ID}
                                    >
                                        {item.Dormitory_Name}
                                    </option>
                                ))}
                            </Select>
                
            </FormControl>
          </Grid>

        

         <Grid item xs={12}>

           <Button component={RouterLink} to="/student" variant="contained" color="warning">

           <ArrowBackIcon sx={{  fontFamily: "Noto Sans Thai",fontSize:30,}}/>

             ย้อนกลับ

           </Button>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="success"

           >

            <AddIcon sx={{  fontFamily: "Noto Sans Thai",fontSize:30,}}/>

             เพิ่มข้อมูล

           </Button>

         </Grid>

       </Grid>

     </Paper>

   </Container>

 );

}


export default StudentCreate;