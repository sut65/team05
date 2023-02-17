import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Home_Navbar from "../navbars/Home_navbar";
import { EnrollInterface } from "../../models/I_Enroll";
import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
//import { StudentInterface } from "../models/studentInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Paper, SelectChangeEvent, TableFooter, TablePagination } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { id } from "date-fns/locale";
import FactCheckIcon from '@mui/icons-material/FactCheck';
function ListEnroll() {
  const params = useParams();
  const [enrolls, setEnrolls] = React.useState<EnrollInterface>();
  const navigate = useNavigate();
  const [enroll, setEnroll] = React.useState<EnrollInterface[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //const [subject, setSubject] = React.useState<SubjectInterface[]>([]);



  const apiUrl = "http://localhost:8080";

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


  // const getEnroll = async () => {
  //   const apiUrl = "http://localhost:8080/enroll";
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };


  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data) {
  //         setEnroll(res.data);
  //       }
  //     });
  // };

  const getEnroll = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
    };
    fetch(`${apiUrl}/enrolls/${localStorage.getItem("id")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEnroll(res.data);
          //console.log(course_id);
          //getSubjectBySubjectID(course_id);
        }
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };




  const deleteEnroll = async (enroll_id: string) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${apiUrl}/deleEnroll/${enroll_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("Data remove");
          window.location.href = "/enroll";
        } else {
          console.log("Something was wrong!!");
        }
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - enroll.length) : 0;


  useEffect(() => {
    getEnroll();

  }, []);


  return (
    <div>
      <Home_Navbar></Home_Navbar>
      <Container maxWidth={false}
        sx={{
          width: "auto",
          height: "auto",
          p: 2,
          bgcolor: '#93BFCF'
        }}>
        <Container maxWidth="lg" style={{ height: "100vh" }} sx={{ p: 2, bgcolor: '#BEF0CB', mt: 6 }}>
          <Paper sx={{
            height: 50,
            bgcolor: '#FFFAF0',
          }}>

            <Box

              display="flex"

              sx={{

              }}

            ><FactCheckIcon sx={{ fontSize: 40, mt: 0.6, paddingRight: 0,paddingLeft:1, color: "#388e3c" }} />
              <Box flexGrow={1}>
                <Typography
                  sx={{ paddingLeft: 1, mt: 1 }}
                  variant="h5"
                  color="primary"
                  gutterBottom
                >
                  รายการที่ลงทะเบียน
                </Typography>

              </Box>


              <Box sx={{ paddingRight: 2 }}>
                <Button

                  sx={{ mt: 1 }}
                  component={RouterLink}

                  to="/enroll/create_enroll"

                  variant="contained"

                  color="primary"

                >
                  ลงทะเบียน
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Paper sx={{ mt: 2, bgcolor: '#FFFAF0' }}>
              <Typography sx={{ padding: 2 }}
                variant="subtitle2"
                color="back"
                gutterBottom>
                ในระบบย่อยลงทะเบียนรายวิชา 
                จะช่วยให้นักศึกษาสามารถเลือกลงทะเบียนเรียนในรายวิชาที่ตนต้องการเมื่อถึงเวลาที่กำหนด 
                โดยนักศึกษาสามารถเลือกหลักสูตร 
                และกลุ่มที่ตนต้องการจะเรียน นักศึกษาสามารถแก้ไข 
                หรือลบรายวิชาที่ลงทะเบียนผิดพลาดได้ เมื่อลงทะเบียนเสร็จสิ้นระบบสามารถแสดงสรุป
                รายการที่นักศึกษาลงทะเบียน เพื่อยืนยันว่านักศึกษาลงทะเบียน
              </Typography>
            </Paper>
          </Paper>
          <Grid sx={{ mt: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <StyledTableCell align="center">ลบ</StyledTableCell>
                    <StyledTableCell align="center">แก้ไข</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? enroll.slice(page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ) : enroll

                  ).map((row) => (
                    <StyledTableRow
                      key={row.Enroll_ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                          aria-label="delete"
                          onClick={() => deleteEnroll(row.Enroll_ID)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          ///${row.Subject_ID}/${row.Section}
                          onClick={() => {
                            navigate({ pathname: `/enroll/updateenroll/${row.Enroll_ID}` })
                          }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                  colSpan={enroll.length}
                  count={enroll.length}
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

          </Grid>
        </Container>
      </Container>

    </div >

  );

}


export default ListEnroll;