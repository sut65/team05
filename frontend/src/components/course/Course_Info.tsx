import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { Course } from "../../models/I_Course";

import { QualificationsInterface } from "../../models/I_Qualification";

import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import SendIcon from '@mui/icons-material/Send';

import FolderIcon from '@mui/icons-material/Folder';
import { Divider, Grid, Paper, Stack, TableCell, TableRow, Toolbar, styled, tableCellClasses } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Users from "./Course_List";

import CreateIcon from '@mui/icons-material/Create';
import Swal from "sweetalert2";
import Home_Navbar from "../navbars/Home_navbar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#44484D",
      color: "white",
      fontFamily: "Noto Sans Thai",
      fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
      color: "black",
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


function CourseInfo() {
    const [course, setCourse] = React.useState<Course>();
    const params = useParams();
    const navigate = useNavigate();


    const apiUrl = "http://localhost:8080";
    //update
    const toUpdateCoursePage = () => {
        navigate({ pathname: `/course/update/${course?.Course_ID}` })
        // window.location.reload()
    };



    const getCourses = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
        };
        fetch(`${apiUrl}/course/${params.course_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
      
                if (res.data) {
                    setCourse(res.data);
                    console.log(res.data)
                }
            });
      };
      
    const deleteCourse = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
        };
        Swal.fire({
            title: 'คุณต้องการที่จะลบหรือไม่?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'ลบ',
            denyButtonText: `ไม่ลบ`,
          }).then((data) => {
            if (data.isConfirmed) {
                fetch(`${apiUrl}/courses/${params.course_id}`, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res.data)
                    if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ลบเรียบร้อย',
                            text: 'Success',
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ลบไม่สำเร็จ !',
                            text: res.error,
                        })
                    }
                });
            } 
        })
    }

    useEffect(() => {
            getCourses()
            // console.log(course)
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}>
            <Home_Navbar></Home_Navbar>
            <Toolbar></Toolbar>

            {/* Header components */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 ,fontFamily: "Noto Sans Thai", }}>
                <Typography variant="h4" sx={{fontFamily: "Noto Sans Thai",}}> ระบบจัดการข้อมูลหลักสูตร </Typography>
                <Typography sx={{fontFamily: "Noto Sans Thai",}}> รายละเอียดหลักสูตร </Typography>
            </Paper>

            {/* Body components */}
            <Grid
                container
                item
                sx={{
                    // border: 1,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                }}>

                <Stack
                    className="Course_Root_Info"
                    direction="row"
                    flexGrow={1}
                    sx={{
                        bgcolor: "white",
                        padding: 1,
                        width: 0.65,
                        height: "auto",
                        display: "flex",
                    }}>
                    <Stack className="Information"
                        sx={{
                            bgcolor: "#e1e1e1",
                            display: "flex",
                            width: 1,
                            padding: 1,
                            margin: 1,
                        }}>
                        
                    
                       
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> รหัสหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Course_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> ชื่อหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Course_Name} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> วันที่เพิ่ม </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Datetime.toString()}
                            </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> ปีอายุหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Year}
                            </Box>
                        </Grid>
                      

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> คุณวุฒิ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Qualification_Name}
                            </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> สาขา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Major_Name} </Box>
                        </Grid>
                        
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20,fontFamily: "Noto Sans Thai", }}> อีเมลล์แอดมินที่เพิ่ม </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20,fontFamily: "Noto Sans Thai", }}> {course?.Admin_Email} </Box>
                        </Grid>

                    </Stack>
                </Stack>

                <Box flexGrow={1} sx={{ padding: 1 }}>
                    <Box flexGrow={1} className="Status_Component"
                        sx={{
                            bgcolor: "#F58D88",
                            margin: 1,
                            fontSize: 20,
                            maxWidth: "false",
                        }}>
                        <Typography variant="h5" sx={{ margin: 0.5,fontFamily: "Noto Sans Thai", }}> **คำเตือน </Typography>
                        <Stack direction="row" sx={{ margin: 0.5 }}>
                            <Box sx={{ width: 0.5 }}>
                
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography sx={{fontFamily: "Noto Sans Thai",}}>1)ควรมีความรอบครอบที่จะจัดการข้อมูลหลักสูตร</Typography>
                                    <Typography sx={{fontFamily: "Noto Sans Thai",}}>2)ข้อมูลหลักสูตรที่ลบไปแล้ว ไม่สามารถนำมาแก้ไขได้</Typography>
                                    <Typography sx={{fontFamily: "Noto Sans Thai",}}>3)สามารถใช้ Search เพื่อช่วยค้นหาหลักสูตรที่ต้องการ</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ width: 0.5 }}>
                             
                              
                            </Box>
                        </Stack>
                        
                    </Box>
                </Box>
                
            </Grid>
            
            <Stack
                direction="row"
                sx={{ bgcolor: "white", margin: 1, }}>
                <Box sx={{ width: 0.33, margin: 0.5, }}>
                    <Button
                        component={RouterLink}
                        to="/course"
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5 }}
                    > Back </Button>
                </Box>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ width: 0.30, margin: 0.5 }}>
                    <Button
                        variant="contained"
                        onClick={toUpdateCoursePage}
                        color="warning"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ margin: 0.5 }}
                        startIcon={<DeleteIcon />}
                        onClick={deleteCourse}
                    > Delete </Button>
                </Stack>


            </Stack>
        </Container >

        
    );
}

export default CourseInfo;