import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Stack, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Class_Schedule } from "../../models/I_Schedule";
import { Subject } from "../../models/I_Subject";
import { padding } from "@mui/system/spacing";

function Class_Schedule_Info() {
    const [class_schedule, setClassSchedule] = React.useState<Class_Schedule>();
    const [subject, setSubject] = React.useState<Subject>();

    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const requestOptionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const getClassSchedulesBySubjectID = async () => {
        fetch(`${apiUrl}/class_schedule/${params.subject_id}/${params.section}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                    console.log(res.data)
                }
            });
    };

    const getSubject = async () => {
        fetch(`${apiUrl}/subject/${params.subject_id}/${params.section}`, requestOptionsGet)
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
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/class_schedule/${class_schedule?.Class_Schedule_ID}`, requestOptionsDelete)
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
        getClassSchedulesBySubjectID();
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
                        <Typography variant="h5" sx={{ border:1, width: "auto" }}> {subject?.Subject_ID} {subject?.Subject_EN_Name} </Typography>
                        <Divider sx={{ margin: 1 }} />
                        
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ID </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {class_schedule?.Class_Schedule_ID} </Box>
                        </Grid>
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> กลุ่มที่ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {class_schedule?.Section} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> เวลาเรียน </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {class_schedule?.Day} {class_schedule?.Start_Time} - {class_schedule?.End_Time} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ห้องเรียน </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {class_schedule?.Room_ID} </Box>
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
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width:0.45 }}> อาจารย์ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Professor_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width:0.45}}> หลักสูตร </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Course_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> สถานะรายวิชา </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Subject_Status_ID} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> จำนวนที่เปิดรับ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Capacity} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> ที่นั่งสำรอง </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Reserved} </Box>
                                </Grid>

                                <Grid container sx={{}}>
                                    <Box flexGrow={1} sx={{ wordWrap: "break-word", fontSize: 20, width: 0.45 }}> หน่วยกิจ </Box>
                                    <Box flexGrow={1}
                                        sx={{ wordWrap: "break-word", fontSize: 20, width: 0.5 }}> {subject?.Unit} </Box>
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
                        // onClick={toUpdateSubjectPage}
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
                            navigate({ pathname: `/class_schedule/${class_schedule?.Subject_ID}/${class_schedule?.Section}/update` })
                        }}
                        color="warning"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        onClick={deleteClassSchedule}
                        color="error"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
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