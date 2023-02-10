import React, { useEffect, useState } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

//import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Typography from "@mui/material/Typography";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { EnrollInterface } from "../../models/I_Enroll";

import SearchIcon from '@mui/icons-material/Search';

import FactCheckIcon from '@mui/icons-material/FactCheck';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
import { IconButton, MenuItem, TableFooter, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { set } from "date-fns/esm";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CreateEnroll() {

    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = React.useState<Date | null>(null);

    let [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
    const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);

    //const [subject, setSubject] = React.useState<Subject[]>([]);

    const [SearchSubjectByCourse, setSubjectByCourse] = React.useState("");
    const [subjects, setSubjects] = React.useState<Subject[]>([]);
    const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
    const [course_id, setCourse_id] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const [course, setCourse] = React.useState<Course[]>([]);
    const [courses, setCourses] = React.useState<Course>();
    const [error, setError] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [message, setAlertMessage] = React.useState("");
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };


    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof enroll;
        const searched_subject_id = event.target.value;
        console.log(event.target.value)
        setSearchSubjectID(searched_subject_id)
        const { value } = event.target;
        setEnroll({ ...enroll, [id]: value });
        console.log(event.target.value);
    };

    // const handleInputChangeSearch = (
    //     event: React.ChangeEvent<{ id?: string; value: any }>
    // ) => {
    //     const id = event.target.id as keyof typeof CreateEnroll;
    //     setSearchSubjectID(event.target.value);
    // };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof enroll;
        const searched_course_id = event.target.value;
        // const sendSearchedCourseID = () => {
        //      setSubjectByCourse(searched_course_id);
        // };
        console.log(searched_course_id)
        setCourse_id(event.target.value)
        getSubjectByCourseID(searched_course_id)

        setEnroll({
            ...enroll,
            [name]: event.target.value,
        });

    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

    const sendSearchedSubjectID = () => {
        //navigate({ pathname: `/subject/${searchSubjectID}` });
        setSearchSubjectID(searchSubjectID);
        getSubjectBySubjectID()

        //getSubjectBySubjectID(searchSubjectID);
        //getSubjectByCourseID(searched_course_id)
        //window.location.reload();
        //console.log(searchSubjectID);
    };

    // Declaring a HTTP request for requesting GET method


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#5B98B9",
            color: theme.palette.common.white,
            fontSize: 17,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: "white",
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 1,
        },
    }));

    const apiUrl = "http://localhost:8080";
    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    };

    // Fetch income type from API 
    const getCourse = async () => {
        fetch(`${apiUrl}/courses`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setCourse(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getSubjectByCourseID = async (course_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/subjects/${course_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setSubjects(res.data);
                    //console.log(course_id);
                    //getSubjectBySubjectID(course_id);
                } else {
                    console.log("else");
                }

            });
    };

    const getSubjectBySubjectID = async () => {
        console.log(course_id);
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        };
        console.log(searchSubjectID)
        console.log(course_id);
        fetch(`${apiUrl}/subjectbysubjectid/${course_id}/${searchSubjectID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    //setSearchSubjectID(subject_id);
                    setSubjects(res.data);
                    console.log(res.data)
                }
            });
    };

    const getSubjects = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        };
        fetch(`${apiUrl}/enrollsub`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                //console.log(res.data);
                if (res.data) {
                    setSubjects(res.data);
                    //console.log(res.data);
                }
            });
    };

    const getStudent = async () => {
        let uid = localStorage.getItem("id");
        fetch(`${apiUrl}/student/${uid}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    enroll.Student_ID = res.data.Student_ID;
                }
                else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getCourse();
        getStudent();
        console.log(SearchSubjectByCourse)
        if (SearchSubjectByCourse == "") {
            getSubjects();
        } else {
            getSubjectByCourseID(SearchSubjectByCourse);
        }
        console.log(SearchSubjectByCourse);
    }, []);

    function submit() {
        let data = {
            Enroll_ID: enroll.Enroll_ID ?? `${Math.random().toString().slice(2, 11)}`,
            Student_ID: enroll.Student_ID ?? "",
            Subject_ID: enroll.Subject_ID ?? "",
            Exam_Schedule_ID: enroll.Exam_Schedule_ID ?? "",
            Class_Schedule_ID: enroll.Class_Schedule_ID ?? "",
            Section: enroll.Section
        };

        console.log(data)
        const apiUrl = "http://localhost:8080/enroll";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setSuccess(true);
                } else {
                    setAlertMessage(res.error);
                    setError(true);
                }
            });
    }

    return (

        <Container maxWidth="lg" >

            <Snackbar

                open={success}

                autoHideDuration={6000}

                onClose={handleClose}

                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

            >

                <Alert onClose={handleClose} severity="success">

                    บันทึกข้อมูลสำเร็จ

                </Alert>

            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">

                    {message}

                </Alert>

            </Snackbar>
            <div>
                <Paper sx={{backgroundColor: '#FFFAF0'}}>
                    <Box display={"flex"}
                        sx={{ marginTop: 0, }}>
                        <Box sx={{ paddingX: 2, paddingY: 1 }}>
                            <Typography
                                sx={{fontFamily:"LilyUPC",fontSize:35,fontWeight : 'bold',mt:1}}
                                gutterBottom>
                                ลงทะเบียนรายวิชา
                            </Typography>
                        </Box>
                        <Box flexGrow={1} >
                        </Box>
                        <Box
                            component="form"
                            sx={{ paddingRight: 2 ,mt:2}}>
                            <TextField
                                disabled
                                size="small"
                                id="Student_ID"
                                variant="outlined"
                                value={enroll.Student_ID}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Box>
                </Paper>
                {/* -------------------------------------------------------------------------------------- */}
                <Paper sx={{ mt: 2 ,backgroundColor: '#FFFAF0'}}>
                    <Grid container sx={{ marginTop: '3px', marginLeft: 5, }}>
                        <Grid >
                            <p style={{ paddingLeft: 15, fontFamily:"LilyUPC",fontSize:25,fontWeight : 'bold'}}>กรุณาเลือกหลักสูตร</p>
                            <Box
                                component="form"
                                sx={{ m: 1, width: '40ch', marginTop: -4, }}>
                                <Select sx={{ ml: 1, mt: 2, width: '35ch' }}
                                    id="Course_ID"
                                    value={enroll.Course_ID}
                                    label="เลือกหลักสูตร"
                                    onChange={handleSelectChange}
                                    inputProps={{
                                        name: "Coures_ID",
                                    }}

                                >
                                    {course.map((item: Course) => (
                                        <MenuItem
                                            value={item.Course_ID}
                                            key={item.Course_ID}
                                        >
                                            {item.Course_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>

                        </Grid>
                        <Paper sx={{
                            mt:2,
                            padding:0.5,
                            height: 140,
                            backgroundColor: '#696969',
                        }}>
                            <Box
                                sx={{
                                    width: 300,
                                    height: 140,
                                    backgroundColor: '#FFFAF0',
                                }}><Typography sx={{ paddingLeft: 11 ,fontFamily:"LilyUPC",fontSize:25,fontWeight : 'bold'}}>
                                    วิธีการลงทะเบียน
                                    </Typography>
                                    <Typography sx={{ paddingLeft: 2 }}>
                                        1:เลือกหลักสูตรที่ต้องการลงทะเบียน
                                    </Typography>
                                    <Typography sx={{ paddingLeft: 2 }}>
                                        2:กรอกรหัสวิชาที่ต้องการลงทะเบียน
                                    </Typography>
                                    <Typography sx={{ paddingLeft: 2 }}>
                                        3:กดปุ่มค้นหารายวิชา
                                    </Typography>
                                    <Typography sx={{ paddingLeft: 2 }}>
                                        4:เลือกลงทะเบียนตามกลุ่มที่ต้องการ
                                    </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid container sx={{ marginTop: '-35px', marginLeft: 5, }}>
                        <Grid >
                            <p style={{ paddingLeft: 17,fontFamily:"LilyUPC",fontSize:25,fontWeight : 'bold' }}>กรอกรหัสวิชา</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '36ch' }, marginTop: -3, paddingLeft: 1, }}>
                                <TextField
                                    label="กรอกรหัสวิชา"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Grid>
                        <Grid sx={{ marginTop: '69px', marginLeft: 1, }}>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={sendSearchedSubjectID}
                                endIcon={<SearchIcon />}>ค้นหารายวิชา</Button>
                        </Grid>
                        <Grid sx={{ marginTop: '69px', marginLeft: 3, }}>
                            <Button sx={{ width: '21ch' }}
                                size="medium"
                                component={RouterLink} to="/enroll"
                                variant="contained"
                                endIcon={<FactCheckIcon />}>ผลการลงทะเบียน</Button>
                        </Grid>
                    </Grid>
                </Paper>
                {/* -------------------------------------------------------------------------------------- */}
                <Paper sx={{ mt: 1 ,backgroundColor: '#FFFAF0'}}>
                    <Grid sx={{ marginTop: '30px', display: 'flex', marginLeft: 1, marginRight: 1, paddingBlockEnd: 6 ,paddingTop:2}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">รหัสวิชา</StyledTableCell>
                                        <StyledTableCell align="left">ชื่อวิชา</StyledTableCell>
                                        <StyledTableCell align="left">Subject name</StyledTableCell>
                                        <StyledTableCell align="left">วันเรียน</StyledTableCell>
                                        <StyledTableCell align="left">เริ่มเรียน</StyledTableCell>
                                        <StyledTableCell align="left">เลิกเรียน</StyledTableCell>
                                        <StyledTableCell align="left">วันสอบ</StyledTableCell>
                                        <StyledTableCell align="left">เริ่มสอบ</StyledTableCell>
                                        <StyledTableCell align="left">เลิกสอบ</StyledTableCell>
                                        <StyledTableCell align="left">หน่วยกิต</StyledTableCell>
                                        <StyledTableCell align="left">กลุ่ม</StyledTableCell>
                                        <StyledTableCell align="center">เลือก</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? subjects.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage)
                                        : subjects
                                    ).map((row) => (
                                        <TableRow
                                            key={row.ID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.Subject_ID}</TableCell>
                                            <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                                            <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                                            <TableCell align="left">{row.Day}</TableCell>
                                            <TableCell align="left">{row.Start_Time}</TableCell>
                                            <TableCell align="left">{row.End_Time}</TableCell>
                                            <TableCell align="left">{row.Exam_Date}</TableCell>
                                            <TableCell align="left">{row.Exam_Start_Time}</TableCell>
                                            <TableCell align="left">{row.Exam_End_Time}</TableCell>
                                            <TableCell align="left">{row.Unit}</TableCell>
                                            <TableCell align="left">{row.Section}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    // id="Subject_ID"
                                                    onClick={() => {
                                                        enroll.Subject_ID = row.Subject_ID;
                                                        enroll.Exam_Schedule_ID = row.Exam_Schedule_ID;
                                                        enroll.Class_Schedule_ID = row.Class_Schedule_ID;
                                                        enroll.Section = row.Section;
                                                        console.log(enroll.Subject_ID);
                                                        console.log(enroll.Section);
                                                        console.log(enroll.Exam_Schedule_ID);
                                                        console.log(enroll.Class_Schedule_ID);
                                                        submit();
                                                    }}>
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={1} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[
                                                5,
                                                10,
                                                15,
                                                20,
                                                25,
                                                { label: "All", value: -1 },
                                            ]}
                                            colSpan={subjects.length}
                                            count={subjects.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    "aria-label": "rows per page",
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>

            </div>

        </Container>

    );

}


export default CreateEnroll;
