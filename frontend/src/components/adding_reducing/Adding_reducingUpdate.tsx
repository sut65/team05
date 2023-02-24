import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Subject } from "../../models/I_Subject";

import {Button, IconButton,TableFooter,TablePagination, Toolbar,} from "@mui/material";

import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import Home_Navbar from "../navbars/Home_navbar";
import { styled } from "@mui/material/styles";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adding_reducingUpdate() {
  const navigate = useNavigate();
  const params = useParams();
  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});
  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
  const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

 
  const getcerantEnroll = async () => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/currentenroll/${params.enroll_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                setEnrolls(res.data);
                getSubjectBySubjectID(res.data.Subject_ID, res.data.Enroll_ID);
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



//เรียกใช้เพื่อดึงค่าenroll idมาใช้ในการอัพเดตค่าในตารางenroll
  const getEnrollID = async () => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/currentenroll/${params.enroll_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                setEnroll(res.data);
                // console.log(res.data);
            }

        });
};


//เรียกใช้หังชั่นCreateAdding_reducingonlyเพราะเปลี่ยนกลุ่มในenrollแต่ต้องเก็บประวัติลงในตารางตัวเอง

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };

 


  //ใช้ค้นหารหัสวิชาจากที่เลือกมาใช้
  const getSubjectBySubjectID = async (subject_id: any,enroll_id: any) => {
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
          setSubjects(res.data);
          enroll.Enroll_ID = enroll_id
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
    
    getcerantEnroll();
    getStudent();
    getEnrollID();
    getPrevadding_reducing();
      
   
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
      History_Type_ID: adding_reducing.History_Type_ID = "HT3",//fixค่าไว้ว่าเมื่อกดเพิ่มจะให้ค่าในตารางเป้นประวัติเพิ่ม
    };
    console.log(data)
   
    //อัพเดตข้อมูลตารางenrollโดยใช้ฟังชั่นUpdateEnrollforadding
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "PATCH",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/adding_reducings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });

//เรียกใช้หังชั่นCreateAdding_reducingonlyเพราะเปลี่ยนกลุ่มในenrollแต่ต้องเก็บประวัติลงในตารางตัวเอง
//สร้างตารางใหม่ของaddingตารางเดียว
      const apiUrl1 = "http://localhost:8080";
      const requestOptionsGet = {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
  
      fetch(`${apiUrl1}/adding_reducingsonly`, requestOptionsGet)
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
          
        
        </Alert>
      </Snackbar>
      <div>
        <Paper>
          <Box display={"flex"} sx={{ marginTop: 1 }}>
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="h6" color="parmary" gutterBottom>
                เปลี่ยนกลุ่มลงทะเบียนรายวิชา
              </Typography>
            </Box>
          </Box>
          
          <Grid
            sx={{
              marginTop: "20px",
              display: "flex",
              marginLeft: 1,
              paddingBlockEnd: 10,
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
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
                        5,
                        10,
                        15,
                        20,
                        25,
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
          <Box flexGrow={1}>
                    </Box>
                    <Grid sx={{padding:2}}>
                        <Button
                            component={RouterLink}
                            variant="outlined"
                            to="/adding_reducing"
                        >
                            
                            กลับ
                        </Button>
                    </Grid>
          
        </Paper>
      </div>
    </Container>
  );
}

export default Adding_reducingUpdate;
