import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { Button, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Course } from "../../models/I_Course";
import { QualificationsInterface } from "../../models/I_Qualification";
import { MajorsInterface } from "../../models/I_Major";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormHelperText} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link as RouterLink } from "react-router-dom";
import { AdminInterface } from "../../models/I_Admin";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Class_Schedule_Update() {
    const params = useParams()

    let [course, setCourse] = React.useState<Partial<Course>>({});
    const [major, setMajor] = React.useState<MajorsInterface[]>([]);
    const [qualification, setQualification] = React.useState<QualificationsInterface[]>([]);
    const [admins, setAdmins] = React.useState<AdminInterface[]>([]);
    const [datetime, setDatetime] = React.useState<Dayjs | null>(dayjs);


    const [course_id, setCourseID] = React.useState<string>();
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");

    const [searchedCourse, setSearchCourse] = React.useState<string>();
    const apiUrl = "http://localhost:8080";

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

    const requestOptionsGet = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const id = event.target.id as keyof typeof course;
        setCourse({
            ...course,
            [id]: event.target.value,
        });
        setSearchCourse(course.Course_ID)
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof course;
        setCourse({
            ...course,
            [name]: event.target.value,
        });

    };

    const getAdminID = async () => {
      let uid = localStorage.getItem("id");
    
      fetch(`${apiUrl}/admin/${uid}`, requestOptionsGet)
          .then((response) => response.json())
          .then((res) => {
              if (res.data) {
                  course.Admin_ID = res.data.Admin_ID
    
              } else {
                  console.log("else");
              }
          });
    };
    

    const getCourse = async () => {
        fetch(`${apiUrl}/course/${course.Course_ID}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCourse(res.data);
                }
            });
    };

    const getMajor = async () => {
        fetch(`${apiUrl}/majors`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setMajor(res.data);
                }
            });
    };
    const getQualifications = async () => {
        fetch(`${apiUrl}/qualifications`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setQualification(res.data);
                }
            });
    };

    const getSendedCourse = async () => {
        fetch(`${apiUrl}/course/${params.course_id}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCourse(res.data);
                    console.log(res.data)
                }
            });
    };

    useEffect(() => {
      getMajor();
      getQualifications();
      getAdminID();
      getSendedCourse();
  }, []);


    function submit() {
        let data = {

            Admin_ID: course.Admin_ID ?? "",
          
            Course_ID: course.Course_ID ?? "",

            Course_Name: course.Course_Name ?? "",

            Datetime: datetime,

            Qualification_ID: course.Qualification_ID ?? "",

            Major_ID: course.Major_ID ?? "",
        }
        const requestOptionsPatch = {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data));

        fetch(`${apiUrl}/courses`, requestOptionsPatch)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.data) {
                  setSuccess(true);
              } else {
                  setAlertMessage(res.error);
                  setError(true);
              }
            });

    }

    

    return (
        <Container maxWidth="md">

        <Snackbar
   
          open={success}
   
          autoHideDuration={6000}
   
          onClose={handleClose}
   
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
   
        >
   
          <Alert onClose={handleClose} severity="success">
   
            แก้ไขข้อมูลสำเร็จ
   
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
               <Grid item xs={3} color="#115686" 
             sx={{  fontFamily : "LilyUPC" ,
              fontWeight : 'bold' ,fontSize:35}}>
   
               <LibraryAddIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:45, mb:-2}}/> สร้างข้อมูลหลักสูตร
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
                                value={course.Admin_ID }
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
   
               value={course.Course_ID || ""}
   
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
   
                  value={course.Course_Name || ""}
   
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
                                   variant="standard"
                                   id="Qualification_ID"
                                   value={course.Qualification_ID+""}
                                   onChange={handleSelectChange}
                                   inputProps={{
                                       name: "Qualification_ID",
                                       style: {
                                           fontFamily: 'LilyUPC'
                                       }
                                   }}
   
                               >
                                   {qualification.map((item: QualificationsInterface) => (
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
                                   variant="standard"
                                   id="Major_ID"
                                   value={course.Major_ID+""}
                                   onChange={handleSelectChange}
                                   inputProps={{
                                       name: "Major_ID",
                                       style: {
                                           fontFamily: 'LilyUPC'
                                       }
                                   }}
   
                               >
                                   {major.map((item: MajorsInterface) => (
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
                            onClick={submit}
                            variant="contained"
                            sx={{borderRadius: 0}}
                        > แก้ไขข้อมูล </Button>
   
            </Grid>
   
          </Grid>
   
        </Paper>
   
      </Container>
    )
}
export default Class_Schedule_Update;