import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid, Breadcrumbs, Link, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Exam_Schedule } from "../../models/I_Schedule";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import Home_Navbar from "../navbars/Home_navbar";

function Exam_Schedule_Info() {
    const [exam_schedule, setExamSchedule] = React.useState<Exam_Schedule>();
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

    const getExamSchedulesBySubjectID = async () => {
        const requestOptionsGet = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/exam_schedule/${params.subject_id}/${params.exam_type}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setExamSchedule(res.data);
                    console.log(res.data)
                }
            });
    };

    const getSubject = async () => {
        fetch(`${apiUrl}/subject/${params.subject_id}/1`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubject(res.data);
                    console.log(res.data);
                }
            });
    };

    const deleteExamSchedule = async () => {
        const requestOptionsDelete = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/exam_schedule/${exam_schedule?.Exam_Schedule_ID}`, requestOptionsDelete)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Data remove")
                    window.location.href = "/exam_schedule"
                }
                else {
                    console.log("Something was wrong!!")
                }
            });
    }


    useEffect(() => {
        getExamSchedulesBySubjectID();
        getSubject();
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
                    <Box sx={{ padding: 2 }}>
                        <AutoStoriesSharpIcon fontSize="large" />
                    </Box>
                    <Box sx={{ padding: 1 }}>
                        <Typography variant="h4" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold", padding: 0.5 }}> ระบบจัดสรรห้องเรียนและห้องสอบ </Typography>

                    </Box>
                </Stack>
                <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
                    <Link underline="hover" href="/exam_schedule" sx={{ fontFamily: "Noto Sans Thai" }}>
                        รายการข้อมูลการใช้ห้องสอบ
                    </Link>
                    <Typography color="text.primary" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold" }}>  รายละเอียดการใช้ห้องเรียนวิชา {exam_schedule?.Subject_ID} </Typography>
                </Breadcrumbs>
            </Paper>

            {/* Body components */}
            <Grid
                container
                item
                sx={{
                    border: 0,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                }}>
                <Stack
                    direction="row"
                    flexGrow={1}
                    sx={{
                        bgcolor: "white",
                        padding: 1,
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
                        <Stack direction="row" spacing={3} sx={{ padding: 1.25 }}>
                            <Typography variant="h5" sx={{ width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_ID} </Typography>
                            <Typography variant="h5" sx={{ width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_EN_Name} </Typography>
                        </Stack>
                        <Divider sx={{ margin: 1 }} />
                        <Box sx={{ padding: 1.5 }}>

                            <Grid container sx={{ padding: 0.25 }}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ID </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {exam_schedule?.Exam_Schedule_ID} </Box>
                            </Grid>
                            <Grid container sx={{ padding: 0.25 }}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> วัน/เดือน/ปี ที่จัดสอบ </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {exam_schedule?.Exam_Date} </Box>
                            </Grid>

                            <Grid container sx={{ padding: 0.25 }}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> รูปแบบการสอบ </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {exam_schedule?.Exam_Type} </Box>
                            </Grid>

                            <Grid container sx={{ padding: 0.25 }}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ห้องสอบ </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {exam_schedule?.Room_ID} </Box>
                            </Grid>

                            <Grid container sx={{ padding: 0.25 }}>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> เวลาสอบ </Box>
                                <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {exam_schedule?.Exam_Start_Time} - {exam_schedule?.Exam_End_Time} </Box>
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
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> อาจารย์ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Professor_Name} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> หลักสูตร </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Course_Name} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> สถานะรายวิชา </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Subject_Status_Description} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> หมวด </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {"ddddd"} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> จำนวนที่เปิดรับ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Capacity} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> ที่นั่งสำรอง </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Reserved} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45, fontFamily: "Noto Sans Thai" }}> หน่วยกิจ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5, fontFamily: "Noto Sans Thai" }}> {subject?.Unit} </Box>
                                </Grid>
                            </Stack>
                        </Box>

                    </Box>
                </Box>
            </Grid>
            <Stack direction="row" sx={{ border: 0, padding: 1, bgcolor:"white", boxShadow:3 }}>
                <Box flex={1} sx={{ border: 0 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate({ pathname: `/exam_schedule` })
                        }}
                        color="primary"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai" }}
                    // startIcon={<CreateIcon />}
                    > Back </Button>
                </Box>
                <Box
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    flex={1} sx={{ border: 0 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate({ pathname: `/exam_schedule/update/${exam_schedule?.Subject_ID}/${exam_schedule?.Exam_Type}` })
                        }}
                        color="warning"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai"}}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        onClick={deleteExamSchedule}
                        color="error"
                        sx={{ margin: 0.5, fontFamily:"Noto Sans Thai" }}
                        startIcon={<DeleteIcon />}
                    > Delete </Button>
                </Box>
            </Stack>
        </Container>
    )

}
export default Exam_Schedule_Info;