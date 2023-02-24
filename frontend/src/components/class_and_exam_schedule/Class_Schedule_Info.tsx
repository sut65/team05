import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Stack, Divider, Grid, Link, Breadcrumbs, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Class_Schedule } from "../../models/I_Schedule";
import { Subject } from "../../models/I_Subject";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import Home_Navbar from "../navbars/Home_navbar";
import { Link as RouterLink } from "react-router-dom";

function Class_Schedule_Info() {
    const [class_schedule, setClassSchedule] = React.useState<Class_Schedule>();
    const [subject, setSubject] = React.useState<Subject>();

    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    const getClassSchedulesBySubjectID = async () => {
        fetch(`${apiUrl}/class_schedule_by_id/${params.class_schedule_id}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                    getSubject(res.data.Subject_ID, res.data.Section)
                }
            });
    };

    const getSubject = async (subject_id: any, section: any) => {
        fetch(`${apiUrl}/subject/${subject_id}/${section}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubject(res.data);
                    console.log(res.data);
                }
            });
    };

    const deleteClassSchedule = async () => {
        const requestOptionsDelete = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/class_schedule/${class_schedule?.Class_Schedule_ID}`, requestOptionsDelete)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Data remove")
                    window.location.href = "/class_schedule"
                }
                else {
                    console.log("Something was wrong!!")
                }
            });
    }

    useEffect(() => {
        getClassSchedulesBySubjectID();
        // getSubject();
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
            <Home_Navbar/>
            <Toolbar/>
            {/* Header components */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Stack direction="row">
                    <Box sx={{ padding: 2}}>
                        <AutoStoriesSharpIcon fontSize="large" />
                    </Box>
                    <Box sx={{ padding: 1}}>
                        <Typography variant="h4" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold", padding: 0.5 }}> ระบบจัดสรรห้องเรียนและห้องสอบ </Typography>

                    </Box>
                </Stack>
                <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
                    <Link underline="hover" href="/class_schedule" sx={{ fontFamily: "Noto Sans Thai" }}>
                        รายการข้อมูลการใช้ห้องเรียน
                    </Link>
                    <Typography color="text.primary" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold" }}>  รายละเอียดการใช้ห้องเรียนวิชา {class_schedule?.Subject_ID} กลุ่มที่ {class_schedule?.Section} </Typography>
                </Breadcrumbs>
            </Paper>

            {/* Body components */}
            <Grid
                container
                item
                sx={{
                    bgcolor: "white",
                    width: "auto",
                    height:"auto",
                    boxShadow: 3,
                }}>
                <Stack
                    direction="row"
                    flexGrow={1}
                    sx={{
                        bgcolor: "white",
                        padding: 1.5,
                        // width: 0.5,
                        height: "auto",
                        display: "flex",
                    }}>
                    <Stack
                        sx={{
                            bgcolor: "#e1e1e1",
                            display: "flex",
                            width: 1,
                            padding: 1,
                            margin: 1,
                        }}>
                        <Stack direction="row" spacing={3} sx={{padding:1.25}}>
                            <Typography variant="h5" sx={{ width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_ID} </Typography>
                            <Typography variant="h5" sx={{width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_EN_Name} </Typography>
                        </Stack>
                        <Divider sx={{ margin: 1 }} />
                        <Box sx={{padding:1.5}}>
                            <Grid container sx={{padding:0.25}}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily:"Noto Sans Thai"}}> ID </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily:"Noto Sans Thai"}}> {class_schedule?.Class_Schedule_ID} </Box>
                            </Grid>
                            <Grid container sx={{padding:0.25}}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily:"Noto Sans Thai"}}> กลุ่มที่ </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily:"Noto Sans Thai"}}> {class_schedule?.Section} </Box>
                            </Grid>

                            <Grid container sx={{padding:0.25}}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily:"Noto Sans Thai"}}> เวลาเรียน </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily:"Noto Sans Thai"}}> {class_schedule?.Day} {class_schedule?.Start_Time} - {class_schedule?.End_Time} </Box>
                            </Grid>

                            <Grid container sx={{padding:0.25}}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily:"Noto Sans Thai"}}> ห้องเรียน </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily:"Noto Sans Thai"}}> {class_schedule?.Room_ID} </Box>
                            </Grid>

                            <Grid container sx={{padding:0.25}}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily:"Noto Sans Thai"}}> แก้ไขล่าสุด </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily:"Noto Sans Thai"}}> {class_schedule?.Latest_Updated.toString()} </Box>
                            </Grid>
                        </Box>
                    </Stack>
                </Stack>
                <Box flexGrow={1} sx={{ padding: 1, width: "auto" }}>
                    <Box flexGrow={1}
                        sx={{
                            bgcolor: "#e1e1e1",
                            margin: 1,
                            fontSize: 20,
                            maxWidth: "false",
                        }}>
                        <Box flexGrow={1} sx={{ width: "auto" }}>
                            <Stack sx={{ margin: 0.5, padding: 2 }}>
                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> อาจารย์ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 , fontFamily:"Noto Sans Thai"}}> {subject?.Professor_Name} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> หลักสูตร </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {subject?.Course_Name} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> สถานะรายวิชา </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {subject?.Subject_Status_Description} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> หมวด </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {"ddddd"} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> จำนวนที่เปิดรับ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {subject?.Capacity} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> ที่นั่งสำรอง </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {subject?.Reserved} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily:"Noto Sans Thai" }}> หน่วยกิจ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily:"Noto Sans Thai" }}> {subject?.Unit} </Box>
                                </Grid>
                            </Stack>
                        </Box>

                    </Box>
                </Box>
            </Grid>
            <Stack direction="row" sx={{ padding: 1, bgcolor:'white' , boxShadow:3}}>
                <Box flex={1} sx={{  }}>
                    <Button
                        component={RouterLink}
                        to="/class_schedule"
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai"}}
                    // startIcon={<CreateIcon />}
                    > Back </Button>
                </Box>
                <Box
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    flex={1}
                    >
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate({ pathname: `/class_schedule/update/${class_schedule?.Class_Schedule_ID}` })
                        }}
                        color="warning"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai" }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        onClick={deleteClassSchedule}
                        color="error"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai" }}
                        startIcon={<DeleteIcon />}
                    > Delete </Button>
                </Box>

            </Stack>


            {/* <Stack
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
                </Stack> */}


        </Container>
    )
}
export default Class_Schedule_Info;