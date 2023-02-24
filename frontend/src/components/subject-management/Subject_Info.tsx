import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid, Toolbar, Breadcrumbs, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Home_Navbar from "../navbars/Home_navbar";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import Swal from "sweetalert2";

function SubjectInfo() {
    const [subject, setSubject] = React.useState<Subject>();
    const params = useParams();
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080";

    const toUpdateSubjectPage = () => {
        navigate({ pathname: `/subject/update/${subject?.Subject_ID}/${subject?.Section}` })
        // window.location.reload()
    };

    const getSubject = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
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
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        Swal.fire({
            title: 'Do you want to delete the subject?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${apiUrl}/subject/${params.subject_id}/${params.section}`, requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res)
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Delete!',
                                text: 'ลบข้อมูลรายวิชาสำเร็จ',
                            }).then(() => {
                                window.location.href = "/subject"
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'ไม่สามารถลบข้อมูลรายวิชาได้',
                            })
                        }
                    });
            }
        })

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
            <Home_Navbar />
            <Toolbar />
            {/* Header components */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Stack direction="row">
                    <Box sx={{ padding: 2, border: 0 }}>
                        <AutoStoriesSharpIcon fontSize="large" />
                    </Box>
                    <Box sx={{ padding: 1, border: 0 }}>
                        <Typography variant="h4" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold", padding: 0.5 }}> ระบบจัดการข้อมูลรายวิชา </Typography>

                    </Box>
                </Stack>
                <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
                    <Link underline="hover" href="/subject" sx={{ fontFamily: "Noto Sans Thai" }}>
                        รายการข้อมูลรายวิชา
                    </Link>
                    <Typography color="text.primary" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold" }}>  รายละเอียดรายวิชา {subject?.Subject_ID} กลุ่มที่ {subject?.Section} </Typography>
                </Breadcrumbs>
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
                        <Typography variant="h5" sx={{ width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_ID}</Typography>
                        <Typography variant="h5" sx={{ width: "auto", fontFamily: "Noto Sans Thai" }}> {subject?.Subject_TH_Name} ({subject?.Subject_EN_Name})</Typography>
                        <Divider sx={{ margin: 1 }} />
                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> กลุ่มที่ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Section} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> อาจารย์ </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Professor_Name} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> หลักสูตร </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Course_Name} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> สถานะรายวิชา </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Subject_Status_Description} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ประเภท </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Class_Type_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> หมวด </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Subject_Category_ID} </Box>
                        </Grid>

                        <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 20, fontFamily: "Noto Sans Thai" }}> แก้ไขล่าสุด </Box>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.6, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Latest_Updated.toString()} </Box>
                        </Grid>
                        <p></p>
                        <Box sx={{ width: 1, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ที่นั่ง </Box>
                        <Divider />

                        <Grid container sx={{padding:0.5}}>
                            <Grid container>
                                <Box sx={{ width: 0.3, margin: 0.5 }}>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> เปิด </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Capacity} </Box>
                                    </Grid>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> สำรอง </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Reserved} </Box>
                                    </Grid>
                                </Box>

                                <Box sx={{ width: 0.45, margin: 0.5 }}>
                                    <Grid container>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ลงทะเบียน </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Enroll_Amount} </Box>
                                    </Grid>
                                    <Grid container sx={{}}>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> ลงทะเบียยที่นั่งสำรอง </Box>
                                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.35, fontSize: 20, fontFamily: "Noto Sans Thai" }}> {subject?.Reserved_Enroll} </Box>
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
                        <Typography variant="h5" sx={{ margin: 0.5, fontFamily: "Noto Sans Thai" }}> หมายเหตุ </Typography>
                        <Stack direction="row" sx={{ margin: 0.5 }}>
                            <Box sx={{ width: 0.5 }}>
                                <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}> ประเภท </Typography>
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> C = Lecture</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> L = Labs</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> P = Project</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> R = Meeting</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> S = Self Study</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> T = Tutoring</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ width: 0.5 }}>
                                <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}> หมวด </Typography>
                                <Stack sx={{ margin: 0.5, }}>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> B = วิชาเสริมพื้นฐาน</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> E = วิชาเลือกเฉพาะสาขา</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> F = วิชาเลือกเสรี</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> M = วิชาพื้นฐาน</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> W = วิชาบังคับ</Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}> X = ยังไม่กำหนด</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Grid>
            <Stack
                direction="row"
                sx={{ bgcolor: "white", boxShadow: 3 }}>
                <Box flex={1} sx={{ margin: 0.5, }}>
                    <Button
                        component={RouterLink}
                        to="/subject"
                        variant="contained"
                        color="primary"
                        sx={{ margin: 0.5, fontFamily: "Noto Sans Thai" }}
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
                        sx={{ margin: 0.5, fontFamily: "Noto Sans Thai" }}
                        startIcon={<CreateIcon />}
                    > Edit </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ margin: 0.5, fontFamily: "Noto Sans Thai" }}
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