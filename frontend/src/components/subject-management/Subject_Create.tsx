import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Subject, Subject_Category, Subject_Status, Class_Type } from "../../models/I_Subject";
import { useEffect } from "react";
import { Breadcrumbs, FormHelperText, Link, MenuItem, Select, SelectChangeEvent, Stack, Toolbar } from "@mui/material";
import { Course } from "../../models/I_Course";
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2'
import Home_Navbar from "../navbars/Home_navbar";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';

function CreateSubject() {

    let [subject, setSubject] = React.useState<Partial<Subject>>({});

    const [courses, setCourses] = React.useState<Course[]>([]);
    const [subject_status, setSubjectStatus] = React.useState<Subject_Status[]>([]);
    const [subject_category, setSubjectCategory] = React.useState<Subject_Category[]>([]);
    const [class_types, setClassTypes] = React.useState<Class_Type[]>([]);

    const apiUrl = "http://localhost:8080";

    // const handleClose = (
    //     event?: React.SyntheticEvent | Event,
    //     reason?: string
    // ) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setSuccess(false);
    //     setError(false);
    // };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const id = event.target.id as keyof typeof subject;
        setSubject({
            ...subject,
            [id]: event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof subject;
        setSubject({
            ...subject,
            [name]: event.target.value,
        });
        // console.log(event.target)

    };

    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    // fetch previous subject record
    const getPrevSubject = async () => {
        fetch(`${apiUrl}/prev_subject`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    subject.ID = res.data.ID + 1;
                } else {
                    console.log("else");
                }
            });
    };

    const getCourses = async () => {
        fetch(`${apiUrl}/courses`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCourses(res.data)
                    // console.log(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    const getSubjectStatus = async () => {
        fetch(`${apiUrl}/subject_statuses`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubjectStatus(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    const getSubjectCategories = async () => {
        fetch(`${apiUrl}/subject_categories`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubjectCategory(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    const getClassTypes = async () => {
        fetch(`${apiUrl}/class_types`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassTypes(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getPrevSubject();
        getCourses();
        getSubjectStatus();
        getSubjectCategories();
        getClassTypes();
    }, []);


    function submit() {
        let data = {
            ID: typeof subject.ID === "string" ? parseInt(subject.ID) : subject.ID,
            Subject_ID: subject.Subject_ID ?? "",
            Professor_ID: subject.Professor_ID ?? "",
            Course_ID: subject.Course_ID ?? "",
            Subject_Status_ID: subject.Subject_Status_ID ?? "",
            Class_Type_ID: subject.Class_Type_ID ?? "",
            Subject_Category_ID: subject.Subject_Category_ID ?? "",
            Subject_TH_Name: subject.Subject_TH_Name ?? "",
            Subject_EN_Name: subject.Subject_EN_Name ?? "",
            Capacity: typeof subject.Capacity === "string" ? parseInt(subject.Capacity) : subject.Capacity,
            Enroll: typeof subject.Enroll_Amount === "string" ? parseInt(subject.Enroll_Amount) : subject.Enroll_Amount,
            Reserved: typeof subject.Reserved === "string" ? parseInt(subject.Reserved) : subject.Reserved,
            Reserved_Enrolled: typeof subject.Reserved_Enroll === "string" ? parseInt(subject.Reserved_Enroll) : subject.Reserved_Enroll,
            Unit: typeof subject.Unit === "string" ? parseInt(subject.Unit) : subject.Unit,
            Section: typeof subject.Section === "string" ? parseInt(subject.Section) : subject.Section,
        };

        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${apiUrl}/subjects`, requestOptionsPost)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res)
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Saved!',
                                text: 'Success',
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: res.error,
                            })
                        }
                    });
            }
        })

    }

    return (
        <Container
            maxWidth={false}
            sx={{
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}>
            {/* <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >

                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar> */}

            {/* <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar> */}
            <Home_Navbar />
            <Toolbar />


            {/* Header */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Stack direction="row">
                    <Box sx={{ padding: 2, border: 0 }}>
                        <AutoStoriesSharpIcon fontSize="large" />
                    </Box>
                    <Box sx={{ padding: 1, border: 0 }}>
                        <Typography variant="h4" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold", padding: 0.5 }}> ระบบจัดการข้อมูลรายวิชา </Typography>

                    </Box>
                </Stack>
                <Breadcrumbs aria-label="breadcrumb" sx={{padding:1}}>
                    <Link underline="hover" href="/subject" sx={{fontFamily:"Noto Sans Thai"}}>
                        รายการข้อมูลรายวิชา
                    </Link>
                    <Typography color="text.primary" sx={{fontFamily:"Noto Sans Thai", fontWeight:"bold"}}> เพิ่มข้อมูลรายวิชา </Typography>
                </Breadcrumbs>
                {/* <Typography sx={{fontFamily:'Noto Sans Thai'}}> เพิ่มข้อมูลรายวิชา </Typography> */}
            </Paper>

            <Grid container item
                sx={{
                    // border: 1,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                    padding: 3
                }}>
                <Box flexGrow={1} sx={{ border: 0, width: "auto" }}>
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> รหัสวิชา </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Subject_ID"
                                size="small"
                                type="string"
                                value={subject.Subject_ID}
                                onChange={handleInputChange}
                                inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                            />
                        </FormControl>
                        <FormHelperText sx={{ fontFamily: 'Noto Sans Thai' }}> โปรดกรอกรหัสวิชา</FormHelperText>
                    </Box>

                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> อาจารย์ </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_ID"
                                size="small"
                                type="string"
                                value={subject.Professor_ID}
                                onChange={handleInputChange}
                                inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                            />
                        </FormControl>
                        <FormHelperText sx={{ fontFamily: 'Noto Sans Thai' }}> ระบุอาจารย์ผู้สอน </FormHelperText>
                    </Box>

                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> สถานะรายวิชา </Typography>
                        <FormControl fullWidth>
                            <Select
                                id="Subject_Status_ID"
                                size="small"
                                value={subject.Subject_Status_ID + ""}
                                inputProps={{ name: "Subject_Status_ID", }}
                                onChange={handleSelectChange}
                                sx={{ fontFamily: 'Noto Sans Thai' }}
                            >
                                {subject_status.map((item: Subject_Status) => (
                                    <MenuItem
                                        value={item.Subject_Status_ID}
                                        key={item.Subject_Status_ID}
                                    >
                                        {item.Subject_Status_Description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormHelperText> </FormHelperText>
                    </Box>

                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{ fontFamily: "Noto Sans Thai" }}> รูปแบบการเรียนการสอน </Typography>
                        <FormControl fullWidth>
                            <Select
                                id="Class_Type_ID"
                                size="small"
                                value={subject.Class_Type_ID + ""}
                                inputProps={{ name: "Class_Type_ID", }}
                                onChange={handleSelectChange}
                                sx={{ fontFamily: 'Noto Sans Thai' }}
                            >
                                {class_types.map((item: Class_Type) => (
                                    <MenuItem
                                        value={item.Class_Type_ID}
                                        key={item.Class_Type_ID}
                                    >
                                        {item.Class_Type_Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box flexGrow={1} sx={{ border: 0, width: "auto" }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> ชื่อรายวิชา(TH) </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Subject_TH_Name"
                                    size="small"
                                    type="string"
                                    value={subject.Subject_TH_Name}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> ชื่อรายวิชา(EN) </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Subject_EN_Name"
                                    size="small"
                                    type="string"
                                    value={subject.Subject_EN_Name}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    <FormHelperText> </FormHelperText>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> หลักสูตร </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Course_ID"
                                    size="small"
                                    value={subject.Course_ID + ""}
                                    inputProps={{ name: "Course_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Noto Sans Thai' }}
                                >
                                    {courses.map((item: Course) => (
                                        <MenuItem
                                            value={item.Course_ID}
                                            key={item.Course_ID}
                                        >
                                            {item.Course_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText>กรุณาเลือกหลักสูตร</FormHelperText>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> จำนวนที่เปิดรับ </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Capacity"
                                    size="small"
                                    type="number"
                                    value={subject.Capacity}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> สำรองที่นั่ง </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Reserved"
                                    size="small"
                                    type="number"
                                    value={subject.Reserved}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> หน่วยกิจ </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Unit"
                                    size="small"
                                    type="number"
                                    value={subject.Unit}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> กลุ่มเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Section"
                                    size="small"
                                    type="number"
                                    value={subject.Section}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                                />
                            </FormControl>
                            <FormHelperText> </FormHelperText>
                        </Box>
                        <FormHelperText> </FormHelperText>
                    </Grid>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> หมวด </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Subject_Categories_ID"
                                    size="small"
                                    value={subject.Subject_Category_ID + ""}
                                    inputProps={{ name: "Subject_Category_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Noto Sans Thai' }}
                                >
                                    {subject_category.map((item: Subject_Category) => (
                                        <MenuItem
                                            value={item.Subject_Category_ID}
                                            key={item.Subject_Category_ID}
                                        >
                                            {item.Subject_Category_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText> </FormHelperText>
                        </Box>
                    </Grid>
                </Box>

            </Grid>
            <p></p>
            <Grid container item
                sx={{ bgcolor: "white", width: "auto", boxShadow: 3, padding: 1.5 }}>
                <Grid container sx={{ border: 0 }}>
                    <Box flexGrow={1}>
                        <Button
                            component={RouterLink}
                            to="/subject" variant="contained"
                            sx={{ borderRadius: 0, fontFamily: "Noto Sans Thai" }}
                        > Back </Button>
                    </Box>
                    <Box flexGrow={1} justifyContent="flex-end" display="flex">
                        <Button
                            onClick={submit}
                            variant="contained"
                            endIcon={<AddIcon />}
                            sx={{ borderRadius: 0, fontFamily: "Noto Sans Thai" }}
                        > Submit </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateSubject;