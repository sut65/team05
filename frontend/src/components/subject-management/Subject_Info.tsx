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

function SubjectInfo() {
    const [subject, setSubject] = React.useState<Subject>();
    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const toUpdateSubjectPage = () => {
        navigate({ pathname: `/subject/handle-update/${subject?.Subject_ID}/${subject?.Section}` })
        // window.location.reload()
    };

    const getSubject = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subject/${params.subject_id}/${params.section}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubject(res.data);
                    console.log(res.data);
                }
            });
    };

    const deleteSubject = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subject/${params.subject_id}/${params.section}`, requestOptions)
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
        getSubject();
    }, []);

    return (
        // Root component with gray background color.
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
                <Typography> รายละเอียดรายวิชา </Typography>
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
                    className="Subject_Root_Info"
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
                        <Typography variant="h5" sx={{ width: "auto" }}> {subject?.Subject_ID}</Typography>
                        <Typography variant="h5" sx={{ width: "auto" }}> {subject?.Subject_TH_Name} ({subject?.Subject_EN_Name})</Typography>
                        <Divider sx={{ margin: 1 }} />
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> กลุ่มที่ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Section} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> อาจารย์ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Professor_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> หลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Course_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> สถานะรายวิชา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Subject_Status_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> ประเภท </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Class_Type_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, }}> หมวด </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, }}> {subject?.Subject_Category_ID} </Box>
                        </Grid>
                        <p></p>
                        <Box sx={{ width: 1, fontSize: 20, }}> ที่นั่ง </Box>
                        <Divider />

                        <Grid container sx={{}}>
                            <Grid container>
                                <Box sx={{ width: 0.3, margin: 0.5 }}>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> เปิด </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> {subject?.Capacity} </Box>
                                    </Grid>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> สำรอง </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> {subject?.Reserved} </Box>
                                    </Grid>
                                </Box>

                                <Box sx={{ width: 0.45, margin: 0.5 }}>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> ลงทะเบียน </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> {subject?.Enroll_Amount} </Box>
                                    </Grid>
                                    <Grid container sx={{}}>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> ลงทะเบียยที่นั่งสำรอง </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, }}> {subject?.Reserved_Enroll} </Box>
                                    </Grid>
                                </Box>
                                <p></p>
                            </Grid>
                        </Grid>
                    </Stack>
                    {/* <Divider orientation="vertical" flexItem sx={{ padding: 1 }} /> */}
                </Stack>
                <Box flexGrow={1} sx={{ padding: 1 }}>
                    <Box flexGrow={1} className="Status_Component"
                        sx={{
                            bgcolor: "#e1e1e1",
                            margin: 1,
                            fontSize: 20,
                            maxWidth: "false",
                        }}>
                        <Typography variant="h5" sx={{ margin: 0.5 }}> หมายเหตุ </Typography>
                        <Stack direction="row" sx={{ margin: 0.5 }}>
                            <Box sx={{ width: 0.5 }}>
                                <Typography variant="h6"> ประเภท </Typography>
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography> C = Lecture</Typography>
                                    <Typography> L = Labs</Typography>
                                    <Typography> P = Project</Typography>
                                    <Typography> R = Meeting</Typography>
                                    <Typography> S = Self Study</Typography>
                                    <Typography> T = Tutoring</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ width: 0.5 }}>
                                <Typography variant="h6"> หมวด </Typography>
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography> B = วิชาเสริมพื้นฐาน</Typography>
                                    <Typography> E = วิชาเลือกเฉพาะสาขา</Typography>
                                    <Typography> F = วิชาเลือกเสรี</Typography>
                                    <Typography> M = วิชาพื้นฐาน</Typography>
                                    <Typography> W = วิชาบังคับ</Typography>
                                    <Typography> X = ยังไม่กำหนด</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
                {/* <Box flexGrow={1} className="Status_Component"
                    sx={{
                        border: 1,
                        bgcolor: "#e1e1e1",
                        margin: 1,
                        fontSize: 20,
                        maxWidth: "false",
                    }}>
                    <Typography variant="h5" sx={{ margin: 0.5 }}> หมายเหตุ </Typography>
                    <Stack direction="row" sx={{ margin: 0.5 }}>
                        <Box sx={{ width: 0.5 }}>
                            <Typography variant="h6"> ประเภท </Typography>
                            <Stack sx={{ margin: 0.5, }}>
                                <Typography> C = Lecture</Typography>
                                <Typography> L = Labs</Typography>
                                <Typography> P = Project</Typography>
                                <Typography> R = Meeting</Typography>
                                <Typography> S = Self Study</Typography>
                                <Typography> T = Tutoring</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ width: 0.5 }}>
                            <Typography variant="h6"> หมวด </Typography>
                            <Stack sx={{ margin: 0.5, }}>
                                <Typography> B = วิชาเสริมพื้นฐาน</Typography>
                                <Typography> E = วิชาเลือกเฉพาะสาขา</Typography>
                                <Typography> F = วิชาเลือกเสรี</Typography>
                                <Typography> M = วิชาพื้นฐาน</Typography>
                                <Typography> W = วิชาบังคับ</Typography>
                                <Typography> X = ยังไม่กำหนด</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box> */}

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
                        onClick={toUpdateSubjectPage}
                        color="warning"
                        sx={{ margin: 0.5, }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ margin: 0.5 }}
                        startIcon={<DeleteIcon />}
                        onClick={deleteSubject}
                    > Delete </Button>
                </Stack>


                {/* <Box
                    sx={{ border: 1, width: 0.3 , margin: 0.5}}>
                    <RouterLink to={{ pathname: `/subject/handle-update/${subject?.Subject_ID}/${subject?.Section}` }}>
                        <Button 
                            sx={{
                                bgcolor:"#F3E186",
                            }}> Edit </Button>
                    </RouterLink>
                    <Button onClick={deleteSubject} variant="outlined" color="error"> Delete </Button>
                </Box> */}
            </Stack>
        </Container >

    );
}
export default SubjectInfo;