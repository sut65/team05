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
import { QualificationsInterface } from "../../models/I_Qualification";
import { MajorsInterface } from "../../models/I_Major";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectChangeEvent } from "@mui/material";
import { FormHelperText, MenuItem, Select,} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { AdminInterface } from "../../models/I_Admin";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Swal from "sweetalert2";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function CourseCreate() {

 const [courses, setCourse] = React.useState<Partial<Course>>({});

 const [qualifications, setQualifications] = React.useState<QualificationsInterface[]>([]);

 const [majors, setMajors] = React.useState<MajorsInterface[]>([]);

 const [success, setSuccess] = React.useState(false);

 const [error, setError] = React.useState(false);

 const [message, setAlertMessage] = React.useState("");

 const [datetime, setDatetime] = React.useState<Dayjs | null>(dayjs);





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

   const id = event.target.id as keyof typeof CourseCreate;

   const { value } = event.target;

   setCourse({ ...courses, [id]: value });

 };

 const handleSelectChange = (event: SelectChangeEvent<string>) => {
  const name = event.target.name as keyof typeof courses;
  setCourse({
    ...courses,
    [name]: event.target.value,
  });
};

const getAdminID = async () => {
  let uid = localStorage.getItem("id");

  fetch(`${apiUrl}/admin/${uid}`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              courses.Admin_ID = res.data.Admin_ID

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




  const getQualifications = async () => {
    fetch(`${apiUrl}/qualifications`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setQualifications(res.data);
            } else {
                console.log("else");
            }
        });
      }

   
  const getMajors = async () => {
    fetch(`${apiUrl}/majors`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setMajors(res.data);
            } else {
                console.log("else");
            }
        });
      }

     



 function submit() {

   let data = {

    Course_ID: courses.Course_ID ?? "",

    Admin_ID: courses.Admin_ID ?? "",
    Course_Name: courses.Course_Name ?? "",

    Datetime: datetime,

    Qualification_ID: courses.Qualification_ID ?? "",

    Major_ID: courses.Major_ID ?? "",
    
   };


   const apiUrl = "http://localhost:8080/courses";

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
  getQualifications();
  getMajors();
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
            <Grid item xs={10} color="#115686" 
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:35}}>

            <LibraryAddIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:45, mb:-2 }}/> สร้างข้อมูลหลักสูตร
                          
                            </Grid>
           </Typography>

         
         </Box>

       </Box>

       <Divider />

       <Grid container spacing={3} sx={{ padding: 2 }}>

<Grid item xs={4} color="#FF0606" 
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:27}}>
          <p>รหัสแอดมิน</p>

        <FormControl fullWidth variant="outlined">
        <TextField
                                variant="outlined"
                                id="Admin_ID"
                                type="string"
                                disabled
                                value={courses.Admin_ID }
                                inputProps={{
                                  name: "Admin_ID",
                                }}
                                onChange={handleInputChange}
                            />

        </FormControl>

        </Grid>
   

       <Grid item xs={4} color="#115686" 
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:27}}>
          <p>รหัสหลักสูตร</p>

        <FormControl fullWidth variant="outlined">

          <TextField

            id="Course_ID"

            variant="outlined"

            type="string"

            size="medium"

            value={courses.Course_ID || ""}

            onChange={handleInputChange}

          />

        </FormControl>

        </Grid>


         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:27}}>
          <p>ชื่อหลักสูตร</p>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Course_Name"

               variant="outlined"

               type="string"

               size="medium"

               value={courses.Course_Name || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={4} color="#115686" 
          sx={{  fontFamily : "LilyUPC" ,
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
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:27}}>
            <FormControl fullWidth variant="outlined">
              
              <p>คุณวุฒิ</p>
              <Select
                                variant="outlined"
                                id="Qualification_ID"
                                value={courses.Qualification_ID}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Qualification_ID",
                                    style: {
                                        fontFamily: 'LilyUPC'
                                    }
                                }}

                            >
                                {qualifications.map((item: QualificationsInterface) => (
                                    <MenuItem
                                        value={item.Qualification_ID}
                                        key={item.Qualification_ID}
                                    >
                                        {item.Qualification_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                
            </FormControl>
          </Grid>

          <Grid item xs={6} color="#115686" 
          sx={{  fontFamily : "LilyUPC" ,
           fontWeight : 'bold' ,fontSize:27}}>
            <FormControl fullWidth variant="outlined">
              
              <p>ชื่อสาขา</p>
              <Select
                                variant="outlined"
                                id="Major_ID"
                                value={courses.Major_ID}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Major_ID",
                                    style: {
                                        fontFamily: 'LilyUPC'
                                    }
                                }}

                            >
                                {majors.map((item: MajorsInterface) => (
                                    <MenuItem
                                        value={item.Major_ID}
                                        key={item.Major_ID}
                                    >
                                        {item.Major_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                
            </FormControl>
          </Grid>

        

         <Grid item xs={12}>

           <Button component={RouterLink} to="/course" variant="contained" color="warning">

           <ArrowBackIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:30,}}/>

             ย้อนกลับ

           </Button>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="success"

           >

            <AddIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:30,}}/>

             เพิ่มข้อมูล

           </Button>

         </Grid>

       </Grid>

     </Paper>

   </Container>

 );

}


export default CourseCreate;