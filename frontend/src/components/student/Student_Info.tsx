import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { Course } from "../../models/I_Course";

import { QualificationsInterface } from "../../models/I_Qualification";

import { StudentsInterface } from "../../models/I_Student";

import { DormitorysInterface } from "../../models/I_Dormitory";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import SendIcon from '@mui/icons-material/Send';

import FolderIcon from '@mui/icons-material/Folder';
import { Divider, Grid, Paper, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Users from "./Student_List";

import CreateIcon from '@mui/icons-material/Create';

function StudentInfo() {
    const [students, setStudents] = React.useState<Partial<StudentsInterface>>({});
    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const toUpdateStudentPage = () => {
        navigate({ pathname: `/student/update/${students?.Student_ID}` })
        // window.location.reload()
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof StudentInfo;
        const { value } = event.target;
        setStudents({ ...students, [id]: value });
        console.log(event.target.value);
      };



    const getStudents = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
        };
        fetch(`${apiUrl}/students/${params.student_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
      
                if (res.data) {
                    setStudents(res.data);
                    console.log(res.data)
                }
            });
      };
      
    const deleteStudent = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
        };
        fetch(`${apiUrl}/students/${params.student_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Data remove")
                    window.location.href = "/student"
                }
                else {
                    console.log("Something was wrong!!")
                }
            });
    }

    useEffect(() => {
            getStudents()
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

            {/* Header components */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Typography variant="h4"> ระบบจัดการข้อมูลนักศึกษา </Typography>
                <Typography> รายละเอียดนักศึกษา </Typography>
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
                        
                    
                        {/* <TextField
                        disabled
                        id="Student_ID"
                        variant="outlined"
                        type="string"
                        defaultValue={students?.Student_ID}
                        value={students?.Course_ID}
                        onChange={handleInputChange}
                        /> */}
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> รหัสนักศึกษา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Student_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ชื่อหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Student_Name} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> รหัสผ่านนักศึกษา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Student_Password} </Box>
                        </Grid>
                    
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> หลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Course_ID}
                            </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> หอพัก </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Dormitory_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> แอดมินที่เพิ่มข้อมูล </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {students?.Admin_ID} </Box>
                        </Grid>

                        <p></p>

                        <Divider />

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
                        <Typography variant="h5" sx={{ margin: 0.5 }}> **คำเตือน </Typography>
                        <Stack direction="row" sx={{ margin: 0.5 }}>
                            <Box sx={{ width: 0.5 }}>
                
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography>1)ควรมีความรอบครอบที่จะจัดการข้อมูลนักศึกษา</Typography>
                                    <Typography>2)ข้อมูลนักศึกษาที่ลบไปแล้ว ไม่สามารถนำมาแก้ไขได้</Typography>
                                    <Typography>3)สามารถใช้ Search เพื่อช่วยค้นหานักศึกษาที่ต้องการ</Typography>
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
                        to="/student"
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
                        onClick={toUpdateStudentPage}
                        color="warning"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ margin: 0.5 }}
                        startIcon={<DeleteIcon />}
                        onClick={deleteStudent}
                    > Delete </Button>
                </Stack>


            </Stack>
        </Container >

        
    );
}

export default StudentInfo;