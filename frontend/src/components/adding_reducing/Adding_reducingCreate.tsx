import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

//import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { EnrollInterface } from "../../models/I_Enroll";

import SearchIcon from "@mui/icons-material/Search";

import FactCheckIcon from "@mui/icons-material/FactCheck";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
import {IconButton,MenuItem,SvgIcon,TableFooter,TablePagination,} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import { StudentsInterface } from "../../models/I_Student";
import { blue, pink } from "@mui/material/colors";
import Home_Navbar from "../navbars/Home_navbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateEnroll() {
  const navigate = useNavigate();
  const params = useParams();
  // const [date, setDate] = React.useState<Date | null>(null);
  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});
  // const [adding_reducings, setAdding_reducings] = React.useState<Adding_reducingInterface[]>([]);
  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
  // const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [student, setStudent] = React.useState<StudentsInterface[]>([]);
  const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
  
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [course, setCourse] = React.useState<Course[]>([]);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CreateEnroll;
    setSearchSubjectID(event.target.value);
    
    console.log(searchSubjectID)
    
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof enroll;
    const searched_course_id = event.target.value;
    // const sendSearchedCourseID = () => {
    //      setSubjectByCourse(searched_course_id);
    // };
    console.log(searched_course_id)
    getSubjectByCourseID(searched_course_id)
    setEnroll({
        ...enroll,
        [name]: event.target.value,
    });
};

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

  const sendSearchedSubjectID = () => {
    //navigate({ pathname: `/subject/${searchSubjectID}` });
    setSearchSubjectID(searchSubjectID);//เซ้ตค่าตัวแปรsearchSubjectID
    getSubjectBySubjectID(searchSubjectID);//เรียกใช้ฟังชั่นโดยนำค่าจากตัวแปรมาใช้
    //window.location.reload();
    //console.log(searchSubjectID);
  };

 


  

  ///setSearchCourseID(searchCourseID);
  ////  getSubjectByCourseID(searchCourseID);
  // Declaring a HTTP request for requesting GET method

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5B98B9",
      color: theme.palette.common.white,
      fontSize: 17,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 1,
    },
  }));

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };

  // Fetch income type from API เรียกใช้listcourse เพื่อนำค่ามาใช้ในcombobox โดยใช้ชื่อcourse name
  const getCourse = async () => {
    fetch(`${apiUrl}/courses`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setCourse(res.data);
        } else {
          console.log("else");
        }
      });
  };
  //ListEnrollSubject เพื่อแสดงค่าจากตารางsubject
  const getSubjects = async () => {
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/enrollsub`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSubjects(res.data);
          console.log(res.data);
        }
      });
  };
// //รับค่าเพื่อแสดงในตารางเวลาsearchด้วยsubjectID
const getSubjectByCourseID = async (course_id: any) => {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      },
  };
  fetch(`${apiUrl}/subjects/${course_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          console.log(res.data);
          if (res.data) {
              setSubjects(res.data);
          }else {
              console.log("else");
          }
          
      });
};  



  const getStudent = async () => {
    let uid = localStorage.getItem("id");
    fetch(`${apiUrl}/student/${uid}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                adding_reducing.Student_ID = res.data.Student_ID;
            }
            else {
                console.log("else");
            }
        });
};


  //ใช้ค้นหารหัสวิชาจากที่เลือกมาใช้
  const getSubjectBySubjectID = async (subject_id: any) => {
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/enroll/${subject_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setSearchSubjectID(subject_id);
          setSubjects(res.data);
        }
      });
  };
///เพิ่มค่าid enrollทีละ1
  const getPrevEnroll = async () => {
    fetch(`${apiUrl}/previousenroll`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          enroll.Enroll_ID = res.data.Enroll_ID + 1;
        } else {
          enroll.Enroll_ID = res.data = "1";
          //console.log("else");
        }
      });
  };


  //เพิ่มค่าid addingทีละ1
  const getPrevadding_reducing = async () => {
    fetch(`${apiUrl}/previous_adding`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          adding_reducing.Change_ID = res.data.Change_ID + 1;
        } else {
          adding_reducing.Change_ID = res.data = 1;
          //console.log("else");
        }
      });
  };

  useEffect(() => {
    getCourse();
    getPrevEnroll();
    getPrevadding_reducing();
    getStudent();
    if (searchSubjectID == "") {
      getSubjects();
      
    } else {
      getSubjectBySubjectID(searchSubjectID);
      
    }
    console.log(searchSubjectID);   
   
  }, []);

  function submit() {
    let data = {
      Enroll_ID: enroll.Enroll_ID ?? "",
      Student_ID: adding_reducing.Student_ID ?? "",
      Subject_ID: enroll.Subject_ID ?? "",
      Exam_Schedule_ID: enroll.Exam_Schedule_ID ?? "",
      Class_Schedule_ID: enroll.Class_Schedule_ID ?? "",
      Section: enroll.Section,
      Change_ID: typeof adding_reducing.Change_ID === "string"? parseInt(adding_reducing.Change_ID) : adding_reducing.Change_ID,
      History_Type_ID: adding_reducing.History_Type_ID = "HT1",//fixค่าไว้ว่าเมื่อกดเพิ่มจะให้ค่าในตารางเป้นประวัติเพิ่ม
    };

    console.log(data)
   
    //สร้างข้อมูลตารางadding
    const apiUrl = "http://localhost:8080/adding_reducings";
    const requestOptions = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
        });
    
  }

  return (
    
    <Container maxWidth="xl"
    sx ={{bgcolor:"black"}}>
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
      <div>
        <Paper >
          <Box display={"flex"} sx={{ marginTop: 1 }}>
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="h6" color="parmary" gutterBottom>
                ลงทะเบียนรายวิชา
              </Typography>
            </Box>
          </Box>
          {/* -------------------------------------------------------------------------------------- */}
          <Grid container sx={{ marginTop: "3px", marginLeft: 5 }}>
          <p style={{ paddingLeft: 15 }}>กรุณาเลือกหลักสูตร</p>
            <Grid>
             
              <Box component="form" sx={{ m: -4, width: "40ch", marginTop: -2 }}>
                <Select
                  sx={{ ml: 10, mt: 1, width: "50ch" }}
                  id="Course_ID"
                  value={enroll.Course_ID}
                  label="เลือกหลักสูตร"
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "Coures_ID",
                  }}
                >
                  {course.map((item: Course) => (
                    <MenuItem value={item.Course_ID} key={item.Course_ID}>
                      {item.Course_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "5px", marginLeft: 5 }}>
           
              <p style={{ paddingLeft: 17 }}>รหัสวิชา</p>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "30ch" },
                  marginTop: -1,
                  paddingLeft: 14,
                }}
              >
                <TextField
                  id="Subject_ID"
                  variant="outlined"
                  type="string"
                  // value={adding_reducing.Subject_ID}
                  onChange={handleInputChangeSearch}
                />
              </Box>
           
              <Button
                sx={{ marginBottom: "20px",marginLeft: "10px",width: "21ch" }}
                size="small"
                variant="contained"
                onClick={sendSearchedSubjectID}//เรียกใช้ฟังชั่น
                
              >
                ค้นหารายวิชา
                <SvgIcon
                  sx={{ marginLeft: "5px", }}
                  component={SearchIcon}
                  inheritViewBox
                />
              </Button>
              {/* <Grid sx={{ marginTop: "63px", marginLeft: 3 }}> */}
                <Button
                  sx={{ marginBottom: "20px",marginLeft: "10px",width: "21ch" }}
                  size="small"
                  component={RouterLink}
                  to="/adding_reducing"
                  variant="contained"
                  onClick={sendSearchedSubjectID}
                  endIcon={<FactCheckIcon />}
                >
                  ผลการลงทะเบียน
                </Button>
              </Grid>
           

          {/* -------------------------------------------------------------------------------------- */}
          <Grid
            sx={{
              marginTop: "20px",
              display: "flex",
              marginLeft: 1,
              paddingBlockEnd: 10,
              
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">รหัสวิชา</TableCell>
                    <TableCell align="left">ชื่อวิชา</TableCell>
                    <TableCell align="left">Subject name</TableCell>
                    <TableCell align="left">วันเรียน</TableCell>
                    <TableCell align="left">เริ่มเรียน</TableCell>
                    <TableCell align="left">เลิกเรียน</TableCell>
                    <TableCell align="left">วันสอบ</TableCell>
                    <TableCell align="left">เริ่มสอบ</TableCell>
                    <TableCell align="left">เลิกสอบ</TableCell>
                    <TableCell align="left">หน่วยกิต</TableCell>
                    <TableCell align="left">กลุ่ม</TableCell>
                    <TableCell align="center">เลือก</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? subjects.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : subjects
                  ).map((row) => (
                    <TableRow
                      key={row.ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.Subject_ID}</TableCell>
                      
                      <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                      <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                      <TableCell align="left">{row.Day}</TableCell>
                      <TableCell align="left">{row.Start_Time}</TableCell>
                      <TableCell align="left">{row.End_Time}</TableCell>
                      <TableCell align="left">{row.Exam_Date}</TableCell>
                      <TableCell align="left">{row.Exam_Start_Time}</TableCell>
                      <TableCell align="left">{row.Exam_End_Time}</TableCell>
                      <TableCell align="left">{row.Unit}</TableCell>
                      <TableCell align="left">{row.Section}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          // id="Subject_ID"
                          onClick={() => {
                            enroll.Subject_ID = row.Subject_ID;
                            enroll.Exam_Schedule_ID = row.Exam_Schedule_ID;
                            enroll.Class_Schedule_ID = row.Class_Schedule_ID;
                            enroll.Section = row.Section;

                            console.log(enroll.Subject_ID);
                            console.log(enroll.Section);
                            console.log(enroll.Exam_Schedule_ID);
                            console.log(enroll.Class_Schedule_ID);
                            submit();
                          }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={1} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,10,15,20,25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={subjects.length}
                      count={subjects.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
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
