import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

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

import {IconButton,MenuItem,SvgIcon,TableFooter,TablePagination, Toolbar,} from "@mui/material";

import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import Home_Navbar from "../navbars/Home_navbar";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateEnroll() {
  const navigate = useNavigate();
  const params = useParams();

  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});

  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});

  const [subjects, setSubjects] = React.useState<Subject[]>([]);

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

    setSearchSubjectID(searchSubjectID);//เซ้ตค่าตัวแปรsearchSubjectID
    getSubjectBySubjectID(searchSubjectID);//เรียกใช้ฟังชั่นโดยนำค่าจากตัวแปรมาใช้

  };

 

//table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#44484D",
      color: theme.palette.common.white,
      fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.common.black,
      fontFamily: "Noto Sans Thai",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
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


//ใช้ในการค้นหาว่านศคนไหนเพิ่มจากรหัสที่login เข้ามา
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
    Swal.fire({
      title: "คุณต้องการลงทะเบียนรายวิชา" + 
      enroll.Subject_ID+"นี้หรือไม่",
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ลงทะเบียน',
      denyButtonText: `ยกเลิก`,
  }).then((data) => {
      if (data.isConfirmed) {
          fetch(apiUrl, requestOptions)
              .then((response) => response.json())
              .then((res) => {
                  console.log(res)
                  if (res.data) {
                      console.log(res.data)
                      Swal.fire({
                          showConfirmButton: false,
                          icon: 'success',
                          title: 'คุณได้เพิ่มรายวิชา'+enroll.Subject_ID+"นี้แล้ว",
                          text: 'Success',
                      })
                  } else {
                      Swal.fire({
                          
                          icon: 'error',
                          title: 'เกิดข้อมูลผิดพลาด !',
                          text: res.error,
                        
                          
                      }).then(()=>{
                        window.location.href = "/adding_reducing/create";

                      })
                  }
                  
              });
      }
  })
   
    
  }

  return (
    
    <Container maxWidth="xl"
    sx ={{bgcolor:"white"}}>
      <Home_Navbar></Home_Navbar>
        <Toolbar></Toolbar>
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
                <Select native
                  sx={{ ml: 10, mt: 1, width: "50ch" }}
                  id="Course_ID"
                  value={enroll.Course_ID}
                  
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "Coures_ID",
                  }}
                ><option aria-label="Noun" value="">  กรุณาเลือกหลักสูตร</option>
                  {course.map((item: Course) => (
                    <option value={item.Course_ID} key={item.Course_ID}>
                      {item.Course_Name}
                    </option>
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
                    <StyledTableCell align="left">รหัสวิชา</StyledTableCell>
                    <StyledTableCell align="left">ชื่อวิชา</StyledTableCell>
                    <StyledTableCell align="left">Subject name</StyledTableCell>
                    <StyledTableCell align="left">วันเรียน</StyledTableCell>
                    <StyledTableCell align="left">เริ่มเรียน</StyledTableCell>
                    <StyledTableCell align="left">เลิกเรียน</StyledTableCell>
                    <StyledTableCell align="left">วันสอบ</StyledTableCell>
                    <StyledTableCell align="left">เริ่มสอบ</StyledTableCell>
                    <StyledTableCell align="left">เลิกสอบ</StyledTableCell>
                    <StyledTableCell align="left">หน่วยกิต</StyledTableCell>
                    <StyledTableCell align="left">กลุ่ม</StyledTableCell>
                    <StyledTableCell align="center">เลือก</StyledTableCell>
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
                    <StyledTableRow
                      key={row.ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="left">{row.Subject_ID}</StyledTableCell>
                      
                      <StyledTableCell align="left">{row.Subject_TH_Name}</StyledTableCell>
                      <StyledTableCell align="left">{row.Subject_EN_Name}</StyledTableCell>
                      <StyledTableCell align="left">{row.Day}</StyledTableCell>
                      <StyledTableCell align="left">{row.Start_Time}</StyledTableCell>
                      <StyledTableCell align="left">{row.End_Time}</StyledTableCell>
                      <StyledTableCell align="left">{row.Exam_Date}</StyledTableCell>
                      <StyledTableCell align="left">{row.Exam_Start_Time}</StyledTableCell>
                      <StyledTableCell align="left">{row.Exam_End_Time}</StyledTableCell>
                      <StyledTableCell align="left">{row.Unit}</StyledTableCell>
                      <StyledTableCell align="left">{row.Section}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
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
                      </StyledTableCell>
                    </StyledTableRow>
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
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#FFD3BD" }} >
            <Typography sx={{ paddingLeft: 8, fontFamily: "Noto Sans Thai", fontSize: 18, fontWeight: 'bold', color: "red" }}>
                                            คำเตือนการลงทะเบียน
            </Typography>
                  <Typography
                      sx={{
                        fontSize: 16,
                        fontFamily: "Noto Sans Thai",
                        boxShadow: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      1:ไม่สามารถลงทะเบียนรหัสวิชาเดิมได้
                      &nbsp;&nbsp;2:ไม่สามารถลงทะเบียนรายวิชาที่มีวันเรียนซ้ำกันได้
                      &nbsp;&nbsp; 3.ไม่สามารถลงทะเบียนรายวิชาที่มีเวลาเรียนซ้ำกันได้
                      
                      &nbsp;&nbsp;4:กดเชคผลการลงทะเบียนเพื่อยืนยันว่าการลงทะเบียนได้รับการอนุมัติแล้ว
                      </Typography>
                      </Paper>
            </TableContainer>
          </Grid>
       
        </Paper>
      </div>
    </Container>
  );
}

export default CreateEnroll;
