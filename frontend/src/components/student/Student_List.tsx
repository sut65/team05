import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { Course } from "../../models/I_Course";

import { StudentsInterface } from "../../models/I_Student";


import { QualificationsInterface } from "../../models/I_Qualification";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import SendIcon from '@mui/icons-material/Send';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Paper, Stack, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Home_Navbar from "../navbars/Home_navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const apiUrl = "http://localhost:8080";
const requestOptions = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5B98B9",
        // color: theme.palette.common.white,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#EAF1F4",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 1,
    },
}));


function Students_List() {


    const navigate = useNavigate();


    const [students, setStudents] = React.useState<StudentsInterface[]>([]);
    const [searchStudentID, setSearchStudentID] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_student_id = event.target.value;
        setSearchStudentID(searched_student_id);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

    const getStudents = async () => {
        let uid = localStorage.getItem("id");
        fetch(`${apiUrl}/studentadmin/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStudents(res.data);
                }
            });
    };

    const getStudentByStudentID = async () => {
        fetch(`${apiUrl}/students/${searchStudentID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStudents(res.data);
                    // console.log(res.data)
                }
            });
    };


    useEffect(() => {
        if (searchStudentID === "") {
            getStudents();
        }
    }, []);


    return (
        <div>
            <Container maxWidth={false}
                sx={{
                    bgcolor: "#D4F5C4",
                    width: "auto",
                    height: "auto",
                    padding: 2
                }}>

                <Paper
                    elevation={3}
                    sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
                >
                    <Box
                        display="flex"
                        sx={{
                            marginTop: 2,
                        }}
                    >
                        
                        <Box flexGrow={1}>
                            <Typography
                                component="h2"
                                variant="h4"
                                color="primary"
                                gutterBottom
                            >
                                <Home_Navbar></Home_Navbar>
                        <Toolbar></Toolbar>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        bgcolor: "#F7BA6E",
                                        marginBottom: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    ระบบจัดการข้อมูลนักศึกษา
                                </Paper>
                            </Typography>
                        </Box>
                    </Box>
                    <Typography component="h2" variant="h6" color="Black" gutterBottom>
                        <u>Requirement</u>
                    </Typography>
                    <Box>
                        ระบบลงทะเบียนเรียน เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทลัยหนึ่ง สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กำหนดไว้ ในส่วนแรก
                        เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา และการยื่นคำร้องกรณีกลุ่มเต็ม โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษา
                        ที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้ ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน , และการอนุมัติคำร้องกรณีกลุ่มเต็ม จะเป็นสิทธิของผู้เป็น
                        อาจารย์ที่สามารถใช้งานในส่วนนี้ได้ และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร , การเพิ่มข้อมูลรายวิชา ,การคำนวณค่าใช่จ่าย ,
                        การเพิ่มข้อมูลอาจารย์ และเพิ่มข้อมูลห้องเรียน โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้ระบบจัดการข้อมูลหลักสูตร เป็นระบบที่ผู้เป็น
                        แอดมินของระบบ สามารถจัดการในส่วนของการเพิ่มข้อมูล ,แก้ไขข้อมูล , ลบข้อมูลหลักสูตรได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลหลักสูตร
                        โดยอิงจากรหัสหลักสูตรได้ โดยผู้เป็นแอดมินจะสามารถจัดการข้อมูล เช่น หลักสูตร ,วุฒิต่างๆรวมไปถึงคณะและสาขา และวันที่ที่เพิ่มหรือแก้ไขข้อมูล หรือข้อมูลอื่นๆที่
                        สำคัญเกี่ยวกับหลักสูตร เป็นต้น เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว ผู้เป็นแอดมินจะสามารถกดเพิ่มข้อมูลหลักสูตรเข้ากับระบบได้ โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง
                        และนอกจากนี้ผู้เป็นแอดมินสามารถดูข้อมูลหลักสูตรที่ถูกเพิ่มเข้าไปในรูปแบบของตารางได้เช่นกัน

                    </Box>
                </Paper>


                {/* Header components */}

                <Grid
                    container
                    item
                    sx={{
                        // border: 1,
                        bgcolor: "white",
                        width: "auto",
                        boxShadow: 20,
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
                        <Paper elevation={3} sx={{ bgcolor: "white", padding: 2 }}>
                            <Typography variant="h4" color="#F1E262">
                                <Paper elevation={2} sx={{ bgcolor: "#F7BA6E", padding: 1 }}>
                                    <ImportContactsIcon
                                        sx={{ fontSize: "50px", border: 0, mb: -1.7, mr: 2 }}
                                    />
                                    รายการนักศึกษาทั้งหมด
                                </Paper>
                            </Typography>
                            <Box
                                display="flex"
                                sx={{ marginTop: 2, padding: 1 }}>
                                <Box flexGrow={1}>
                                    <TextField
                                        variant="standard"
                                        size="small"
                                        label="ค้นหาข้อมูลนักศึกษา"
                                        onChange={handleInputChange}
                                    ></TextField>

                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            getStudentByStudentID()
                                        }}
                                        sx={{ borderRadius: 0, margin: 1.25, bgcolor: "#4E84DA" }}>
                                        <SearchIcon /> Search
                                    </Button>
                                </Box>
                                <Button
                                    component={RouterLink}
                                    to="student_create"
                                    variant="contained"
                                    sx={{
                                        borderRadius: 0, margin: 1.25, marginTop: 1.5, bgcolor: "#4CED5F",
                                    }}
                                > <AddCircleOutlineIcon />Add </Button>
                            </Box>

                            <Stack>
                                <TableContainer sx={{ width: "auto" }}>
                                    <Table>
                                        <TableHead sx={{ bgcolor: "#5B98B9" }}>
                                            <TableRow sx={{ width: "auto" }}>
                                                <StyledTableCell width={100} sx={{ border: 1 }}>รหัสนักศึกษา</StyledTableCell>
                                                <StyledTableCell width={100} sx={{ border: 1 }}>ชื่อนักศึกษา</StyledTableCell>
                                                <StyledTableCell width={100} sx={{ border: 1 }}>วันที่เพิ่ม</StyledTableCell>
                                                <StyledTableCell width={100} sx={{ border: 1 }}>อายุ</StyledTableCell>
                                                <StyledTableCell width={100} sx={{ border: 1 }}>หอพัก</StyledTableCell>
                                                <StyledTableCell width={150} sx={{ border: 1 }}>หลักสูตร</StyledTableCell>
                                                <StyledTableCell width={150} sx={{ border: 1 }}>แอดมิน</StyledTableCell>
                                                <StyledTableCell width={90} sx={{ border: 1 }}>
                                                </StyledTableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {(rowsPerPage > 0 ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : students).map((row) => (
                                                <StyledTableRow key={row.Student_ID}>
                                                    <TableCell>{row.Student_ID}</TableCell>
                                                    <TableCell>{row.Student_Name}</TableCell>
                                                    <TableCell>{row.Datetime.toString()}</TableCell>
                                                    <TableCell>{row.Student_Age}</TableCell>
                                                    <TableCell>{row.Dormitory_ID}</TableCell>
                                                    <TableCell>{row.Course_ID}</TableCell>
                                                    <TableCell>{row.Admin_ID}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ borderRadius: 0 }}
                                                            onClick={() => {
                                                                navigate({ pathname: `/student/${row.Student_ID}` })
                                                            }}> Info </Button>
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={students.length}
                                                    count={students.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: {
                                                            'aria-label': 'rows per page',
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
                            </Stack>
                        </Paper>
                    </Stack>
                    <Box flexGrow={10} sx={{ padding: 1 }}>
                        <Box flexGrow={1} className="Status_Component"
                            sx={{
                                bgcolor: "#C3CAD9",
                                margin: 1,
                                fontSize: 20,
                                maxWidth: "false",
                            }}>
                            <Typography variant="h5" sx={{ margin: 0.5, padding: 1 }}> โปรดอ่านก่อนที่จะจัดการข้อมูลนักศึกษา </Typography>
                            <Stack direction="row" sx={{ margin: 0.5 }}>


                            </Stack>
                        </Box>
                        <Paper>
                        <Box flexGrow={5} className="Status_Component"
                            sx={{
                                bgcolor: "#E6E4E3",
                                margin: 1,
                                fontSize: 20,
                                maxWidth: "false",
                            }}>
                            <Stack sx={{ margin: 3, }}>
                                <Typography sx={{ mb: 1 }}> </Typography>
                                

                            </Stack>
                            </Box>
                        </Paper>
                        <Paper >
                            <Stack sx={{ margin: 3, fontSize:16 , bgcolor:"#F59392"}} color="#9A4600" >
                                <p><b>*ท่านสามารถใช้คำสั่งค้นหา เป็นเครื่องมือช่วยค้นหารหัสนักศึกษา*</b></p>
                                <p><b>*You can use Search as a tool to help find the student id.*</b></p>

                            </Stack>
                        </Paper>
                    </Box>

                </Grid>
            </Container>
            <Grid sx={{ml:5 , mt:2 ,mb:2}}>
            <Button component={RouterLink} to="/home" variant="contained" color="warning" >
           <ArrowBackIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:30,}}/>
             ย้อนกลับ
           </Button>
           </Grid>

        </div>


    );
}


export default Students_List;