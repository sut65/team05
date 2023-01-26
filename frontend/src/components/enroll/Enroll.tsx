import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { EnrollInterface } from "../../models/I_Enroll";
import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
//import { StudentInterface } from "../models/studentInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Paper } from "@mui/material";
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
function Users() {

  const [enroll, setEnroll] = React.useState<EnrollInterface[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //const [subject, setSubject] = React.useState<SubjectInterface[]>([]);
  
  const apiUrl = "http://localhost:8080";
  const getEnroll = async () => {
    const apiUrl = "http://localhost:8080/enroll";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };


    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEnroll(res.data);
        }
      });
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
          window.location.href = "/";
        } else {
          console.log("Something was wrong!!");
        }
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - enroll.length) : 0;

  function createData(
    Enroll_ID: string,
    Subject_ID: string,
    Course_ID: string,
    Subject_TH_Name: string,
    Subject_EN_Name: string,
    Day: string,
    Start_Time: string,
    End_Time: string,
    Exam_Schedule_ID: string,
    Exam_Start_Time: string,
    Exam_End_Time: string,
    Section: number,
    Unit: number,
  ) {
    return { Enroll_ID, Start_Time, End_Time, Exam_Start_Time, Exam_End_Time, Subject_ID, Subject_TH_Name, Subject_EN_Name, Course_ID, Day, Exam_Schedule_ID, Section, Unit };
  }
  useEffect(() => {
    getEnroll();

  }, []);
  // const rows = [
  //   createData('EN01','523332', 'วิศวกรรมซอฟต์แวร์', 'SoftwareEngineering','', 'วันจันทร์ 13:00-15:00', 'MID-1805-1300-1500', 4, 1),
  //   createData('EN02','523332', 'วิศวกรรมซอฟต์แวร์', 'SoftwareEngineering','','วันจันทร์ 13:00-15:00', 'MID-1805-1300-1500', 4, 1),
  // ];

  return (

    <div>

      <Container maxWidth="xl" sx={{ p: 2 }}>

        <Box

          display="flex"

          sx={{

            marginTop: 2,

          }}

        >

          <Box flexGrow={1}>

            <Typography

              component="h2"

              variant="h6"

              color="primary"

              gutterBottom

            >

              รายการที่ลงทะเบียน

            </Typography>

          </Box>

          <Box>

            <Button

              component={RouterLink}

              to="/create"

              variant="contained"

              color="primary"

            >
              ลงทะเบียน
            </Button>
          </Box>
        </Box>
        <Grid sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                
                  <TableCell align="left">รหัสวิชา</TableCell>
                  <TableCell align="left">ชื่อวิชา</TableCell>
                  <TableCell align="left">Subject name</TableCell>
                  <TableCell align="left">วันเรียน</TableCell>
                  <TableCell align="left">เริ่มเรียน</TableCell>
                  <TableCell align="left">เลิกเรียน</TableCell>
                  <TableCell align="left">วันสอบ</TableCell>
                  {/* <TableCell align="left">เริ่มสอบ</TableCell>
                  <TableCell align="left">เลิกสอบ</TableCell> */}
                  <TableCell align="left">หน่วยกิต</TableCell>
                  <TableCell align="left">กลุ่ม</TableCell>
                  <TableCell align="center">แก้ไข</TableCell>
                  <TableCell align="center">ลบ</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? enroll.slice(page * rowsPerPage, 
                    page * rowsPerPage + rowsPerPage
                    ): enroll

                ).map((row) => (
                  <TableRow
                    key={row.Enroll_ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    
                    <TableCell align="left">{row.Subject_ID}</TableCell>
                    <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                    <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                    <TableCell align="left">{row.Day}</TableCell>
                    <TableCell align="left">{row.Start_Time}</TableCell>
                    <TableCell align="left">{row.End_Time}</TableCell>
                    <TableCell align="left">{row.Exam_Schedule_ID}</TableCell>
                    {/* <TableCell align="left">{row.Exa}</TableCell>
                    <TableCell align="left">{row.Exam_End_Time}</TableCell> */}
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
                    <TableCell align="center"><IconButton aria-label="delete">
                      <ModeEditIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
      </Container>

    </div>

  );

}


export default Users;