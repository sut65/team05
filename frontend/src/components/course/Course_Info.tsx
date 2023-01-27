import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { Course } from "../../models/I_Course";

import { QualificationsInterface } from "../../models/I_Qualification";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import SendIcon from '@mui/icons-material/Send';

import FolderIcon from '@mui/icons-material/Folder';
import { Divider, Grid, Paper, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Users from "./Course_List";

import CreateIcon from '@mui/icons-material/Create';

function CourseInfo() {
    const [course, setCourse] = React.useState<Course>();
    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";
    //update
    const toUpdateCoursePage = () => {
        navigate({ pathname: `/course-handle-update/${course?.Course_ID}` })
        // window.location.reload()
    };



    const getCourses = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
        console.log("ggman");
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/courses/${params.course_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Data remove")
                    window.location.href = "/"
                }
                else {
                    console.log("Something was wrong!!")
                }
            });
    }

    useEffect(() => {
            getCourses()
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
                <Typography variant="h4"> ระบบจัดการข้อมูลหลักสูตร </Typography>
                <Typography> รายละเอียดหลักสูตร </Typography>
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
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> รหัสหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {course?.Course_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ชื่อหลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {course?.Course_Name} </Box>
                        </Grid>
                      

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> คุณวุฒิ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {course?.Qualification_ID}
                            </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> สาขา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {course?.Major_ID} </Box>
                        </Grid>

                        <p></p>

                        <Divider />

                    </Stack>
                </Stack>
                
            </Grid>
            <Stack
                direction="row"
                sx={{ bgcolor: "white", margin: 1, }}>
                <Box sx={{ width: 0.33, margin: 0.5, }}>
                    <Button
                        component={RouterLink}
                        to="/"
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