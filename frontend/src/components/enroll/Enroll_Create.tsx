import React, { useEffect  } from "react";

import { Link as RouterLink ,useNavigate} from "react-router-dom";

import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

//import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { EnrollInterface } from "../../models/enrollInterface";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SearchIcon from '@mui/icons-material/Search';

import SaveIcon from '@mui/icons-material/Save';

import { DataGrid } from "@mui/x-data-grid";

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { SubjectInterface } from "../models/Subject";
import { CourseInterface } from "../models/Course";
import { MenuItem } from "@mui/material";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

  props,

  ref

) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});



function CreateEnroll() {

  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = React.useState<Date | null>(null);

  let [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});

  const [subject, setSubject] = React.useState<SubjectInterface[]>([]);

  const [success, setSuccess] = React.useState(false);

  const [course, setCourse] = React.useState<CourseInterface[]>([]);

  const [error, setError] = React.useState(false);

  const [searchSubjectID, setSearchSubjectID] = React.useState("");


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

  const columns = [
    { field: 'id', headerName: 'รหัสวิชา', width: 70 },
    { field: 'jubject_name_th', headerName: 'ชื่อวิชา', width: 130 },
    { field: 'jubject_name_eng', headerName: 'subject Name', width: 130 },
    { field: 'unit', headerName: 'หน่วยกิต', width: 70 },
    { field: 'Day', headerName: 'เวลาเรียน', width: 150 },
    { field: 'Exam_day', headerName: 'เวลาสอบ', width: 150 },
    { field: 'subject_amount', headerName: 'เปิดรับ', width: 70 },
    { field: 'Enroll_amount', headerName: 'ลงทะเบียน', width: 70 },
    /*  valueGetter: (params) =>`${params.row.firstName || ''} ${params.row.lastName || ''}`, */
  ];

  const rows = [
    { id: 523332, jubject_name_th: 'วิศวกรรมซอฟต์แวร์', jubject_name_eng: 'SoftwareEngineering', unit: 4, Study_day: 'วันจันทร์ 13:00-15:00', Exam_day: 'MID-1805-1300-1500', subject_amount: 60, Enroll_amount: 40 },
    { id: 523332, jubject_name_th: 'วิศวกรรมซอฟต์แวร์', jubject_name_eng: 'SoftwareEngineering', unit: 4, Study_day: 'วันอังคาร 10:00-12:00', Exam_day: 'MID-1805-1300-1500', subject_amount: 60, Enroll_amount: 35 },
    { id: 523332, jubject_name_th: 'วิศวกรรมซอฟต์แวร์', jubject_name_eng: 'SoftwareEngineering', unit: 4, Study_day: 'วันอังคาร 13:00-15:00', Exam_day: 'MID-1805-1300-1500', subject_amount: 60, Enroll_amount: 25 },
    { id: 523332, jubject_name_th: 'วิศวกรรมซอฟต์แวร์', jubject_name_eng: 'SoftwareEngineering', unit: 4, Study_day: 'วันจันทร์ 10:00-12:00', Exam_day: 'MID-1805-1300-1500', subject_amount: 60, Enroll_amount: 60 },
  ];

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CreateEnroll;
    const { value } = event.target;

    setEnroll({ ...enroll, [id]: value });

  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof enroll;
    setEnroll({
      ...enroll,
      [name]: event.target.value,
    });
  };

  const sendSearchedSubjectID = () => {
    navigate({ pathname: `/subject/${searchSubjectID}` })
    window.location.reload()
};
  // Declaring a HTTP Port of 8080.
  const apiUrl = "http://localhost:8080";

  // Declaring a HTTP request for requesting GET method
  const requestOptionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  };

  // Fetch income type from API 
  const getCourse = async () => {
    fetch(`${apiUrl}/course`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCourse(res.data);
        } else {
          console.log("else");
        }
      });

  };

  const getSubject= async () => {
    fetch(`${apiUrl}/subject`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {

          setCourse(res.data);
        } else {
          console.log("else");
        }
      });
    };

    const getSubjectBySubjectID = async (subject_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subject/${subject_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {

                if (res.data) {
                    setSearchSubjectID(subject_id);
                    setSubject(res.data);
                }
            });
    };

  
  useEffect(() => {
    getCourse();
    if (params.subject_id == undefined) {
      getSubject()
  }

    else {
      getSubjectBySubjectID(params.subject_id)
  }
  }, []);

  function submit() {
    let data = {
      id: enroll.Enroll_ID ?? "",
      course_ID: typeof enroll.Course_ID === "string" ? parseInt(enroll.Course_ID) : enroll.Course_ID,
      jubject_name_th: typeof enroll.Subject_TH_Name === "string" ? parseInt(enroll.Subject_TH_Name) : enroll.Subject_TH_Name,
      subject_name_eng: typeof enroll.Subject_EN_Name === "string" ? parseInt(enroll.Subject_EN_Name) : enroll.Subject_EN_Name,
      unit: typeof enroll.Unit === "string" ? parseInt(enroll.Unit) : enroll.Unit,
      Day: enroll.Day,
      Start_Time: enroll.Start_Time,
      End_Time: enroll.End_Time,
      Room_Number: enroll.Room_Number,
      Exam_Schedule_ID: enroll.Exam_Schedule_ID,
      Section: enroll.Section,
      // Age: typeof enroll.Age === "string" ? parseInt(user.Age) : 0,
      BirthDay: date,
    };


    const apiUrl = "http://localhost:8080/users";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };


    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  return (

    <Container maxWidth="md" >

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

          บันทึกข้อมูลไม่สำเร็จ

        </Alert>

      </Snackbar>
      <div>
        <Paper >
          <Box display={"flex"}
            sx={{ marginTop: 1, }}>

            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                variant="h6"
                color="parmary"
                gutterBottom>
                ลงทะเบียนรายวิชา
              </Typography>
            </Box>
          </Box>
          {/* -------------------------------------------------------------------------------------- */}
          <Grid container sx={{ marginTop: '3px', marginLeft: 5, }}>
            <Grid >
              <p style={{ paddingLeft: 15, }}>กรุณาเลือกหลักสูตร</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '45ch' }, marginTop: -2, }}>
                <Select sx={{ml:1,mt : 2, width: '45ch'}}
                  id="Course_ID"
                  value={enroll.Course_ID}
                  label="เลือกหลักสูตร"
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "Coures_ID",
                  }}
                  
                >
                  {course.map((item: CourseInterface) => (
                    <MenuItem
                      value={item.Course_ID}
                      key={item.Course_ID}
                    >
                      {item.Course_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
            <Grid >
              <p style={{ paddingLeft: 15, }}>กรอกรหัสวิชา</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, marginTop: -2, }}>
                <TextField 
                id="Search_subject" 
                label="กรอกรหัสวิชา" 
                variant="outlined" 
                onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid sx={{ marginTop: '55px', marginLeft: 1, }}>
              <Button 
              size="medium" 
              variant="contained" 
              onClick={sendSearchedSubjectID}
              endIcon={<SearchIcon />}>ค้นหารายวิชา</Button>
            </Grid>
          </Grid>

          {/* -------------------------------------------------------------------------------------- */}
          <Grid sx={{ marginTop: '20px', display: 'flex', marginLeft: 1 }}>
            <div style={{ height: 300, width: '100%' }}>
              
            </div>
          </Grid>
          <Grid container sx={{ marginTop: '5px', marginLeft: 5, paddingBlockEnd: 5, }}>
            <Grid >
              <p style={{ paddingLeft: 15, }}>เลือกกลุ่มเรียน</p>
              <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, marginTop: -2, }}>
                <Select sx={{ml:1,mt : 2, width: '30ch'}}
                  id="section"
                  value={enroll.Subject_ID}
                  label="เลือกกลุ่มเรียน"
                  variant="outlined" 
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "section",
                  }}
                  >
                  {subject.map((item: SubjectInterface) => (
                    <MenuItem
                      value={item.Subject_ID}
                      key={item.Subject_ID}
                    >
                      {item.Section}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

            </Grid>
            <Grid sx={{ marginTop: '55px', marginLeft: 2, }}>
              <Button size="medium" variant="contained" endIcon={<SaveIcon />}>บันทึกรายวิชา</Button>
            </Grid>

          </Grid>
          {/* <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },
        }}>  
      <div><Box sx={{paddingLeft:1,}}>
        กรอกรหัสวิชา
    </Box>
        </div>
    </Box> 
        <div>
            <Box 
            display={"flex"}
        sx={{
            marginTop: 5,
            width: 1000,
            height: 70,
            }}>
            <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },
            }}>
            <div> 
            <TextField id="outlined-basic" label="รหัสวิชา" variant="outlined" />
            </div>
            </Box>
            </Box>
        </div> */}

        </Paper>
      </div>

    </Container>

  );

}


export default CreateEnroll;