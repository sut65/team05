import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {  Exam_Schedule } from "../../models/I_Schedule";

function Exam_Schedule_Info() {
    const [exam_schedule, setExamSchedule] = React.useState<Exam_Schedule>();
    const [subject, setSubject] = React.useState<Subject>();

    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const requestOptionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const getExamSchedulesBySubjectID = async () => {
        const requestOptionsGet = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
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

            {/* Header components */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Typography variant="h4"> ระบบจัดการรายวิชา </Typography>
            </Paper>

            {/* Body components */}
            <Grid
                container
                item
                sx={{
                    border: 1,
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
                        <Typography variant="h5" sx={{ border: 1, width: "auto" }}> {subject?.Subject_ID} {subject?.Subject_EN_Name} </Typography>
                        <Divider sx={{ margin: 1 }} />

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ID </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {exam_schedule?.Exam_Schedule_ID} </Box>
                        </Grid>
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> วัน/เดือน/ปี ที่จัดสอบ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {exam_schedule?.Exam_Date} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> รูปแบบการสอบ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {exam_schedule?.Exam_Type} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ห้องสอบ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {exam_schedule?.Room_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> เวลาสอบ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {exam_schedule?.Exam_Start_Time} - {exam_schedule?.Exam_End_Time} </Box>
                        </Grid>

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
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> อาจารย์ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Professor_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> หลักสูตร </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Course_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> สถานะรายวิชา </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Subject_Status_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> จำนวนที่เปิดรับ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Capacity} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> ที่นั่งสำรอง </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Reserved} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> หน่วยกิจ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> {subject?.Unit} </Box>
                                </Grid>
                            </Stack>
                        </Box>

                    </Box>
                </Box>
            </Grid>
            <Stack direction="row" sx={{ border: 1, padding: 1 }}>
                <Box flex={1} sx={{ border: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate({ pathname: `/exam_schedule` })
                        }}
                        color="primary"
                        sx={{ margin: 0.5, }}
                    // startIcon={<CreateIcon />}
                    > Back </Button>
                </Box>
                <Box
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    flex={1} sx={{ border: 1 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate({ pathname: `/exam_schedule/update/${exam_schedule?.Subject_ID}/${exam_schedule?.Exam_Type}` })
                        }}
                        color="warning"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        onClick={deleteExamSchedule}
                        color="error"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Delete </Button>
                </Box>
            </Stack>
        </Container>
    )

}
export default Exam_Schedule_Info;