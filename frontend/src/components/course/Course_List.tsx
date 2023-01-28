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
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from "@mui/material";
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

const apiUrl = "http://localhost:8080";
const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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


function Course_Lists() {


    const navigate = useNavigate();


    const [courses, setCourses] = React.useState<Course[]>([]);
    const [searchCourseID, setSearchCourseID] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_course_id = event.target.value;
        setSearchCourseID(searched_course_id);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

    const getCourses = async () => {
        fetch(`${apiUrl}/courses`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCourses(res.data);
                }
            });
    };

    const getCoursesByCourseID = async () => {
        fetch(`${apiUrl}/courses/${searchCourseID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCourses(res.data);
                    // console.log(res.data)
                }
            });
    };


    useEffect(() => {
        if (searchCourseID === "") {
            getCourses();
        }
    }, []);


    return (
        <div>
            <Container maxWidth={false}
                sx={{
                    bgcolor: "#e1e1e1",
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
                                ระบบจัดการข้อมูลหลักสูตร
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                component={RouterLink}
                                to="/course_create"
                                variant="contained"
                                color="primary"
                            >
                                เพิ่มข้อมูลหลักสูตร
                            </Button>
                        </Box>
                    </Box>
                    <Typography component="h2" variant="h6" color="Black" gutterBottom>
                        Requirement
                    </Typography>
                    <Box>
                        ระบบลงทะเบียนเรียน เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทลัยหนึ่ง สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กำหนดไว้ ในส่วนแรก เช่น
                        การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา และการยื่นคำร้องกรณีกลุ่มเต็ม โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถ
                        ใช้สิทธิในระบบลงทะเบียนเรียนได้ ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน , และการอนุมัติคำร้องกรณีกลุ่มเต็ม จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถ
                        ใช้งานในส่วนนี้ได้ และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร , การเพิ่มข้อมูลรายวิชา ,การคำนวณค่าใช่จ่าย ,การเพิ่มข้อมูลอาจารย์
                        และเพิ่มข้อมูลห้องเรียน โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้ระบบจัดการข้อมูลหลักสูตร เป็นระบบที่ผู้เป็นแอดมินของระบบ สามารถจัดการ
                        ในส่วนของการเพิ่มข้อมูล ,แก้ไขข้อมูล , ลบข้อมูลหลักสูตรได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลหลักสูตร โดยอิงจากรหัสหลักสูตรได้
                        โดยผู้เป็นแอดมินจะสามารถจัดการข้อมูล เช่น หลักสูตร ,วุฒิต่างๆรวมไปถึงคณะและสาขา และวันที่ที่เพิ่มหรือแก้ไขข้อมูล หรือข้อมูลอื่นๆที่สำคัญเกี่ยวกับหลักสูตร
                        เป็นต้น เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว ผู้เป็นแอดมินจะสามารถกดเพิ่มข้อมูลหลักสูตรเข้ากับระบบได้ โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง และนอกจากนี้ผู้เป็น
                        แอดมินสามารถดูข้อมูลหลักสูตรที่ถูกเพิ่มเข้าไปในรูปแบบของตารางได้เช่นกัน

                    </Box>
                </Paper>


                {/* Header components */}
                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                    <Typography variant="h4"> ระบบจัดการข้อมูลหลักสูตร </Typography>
                    <Typography> รายการหลักสูตรทั้งหมด </Typography>
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2 }}>
                    <Box
                        display="flex"
                        sx={{ marginTop: 2, padding: 1 }}>
                        <Box flexGrow={1}>
                            <TextField
                                variant="standard"
                                size="small"
                                label="ค้นหาหลักสูตร"
                                onChange={handleInputChange}
                            ></TextField>

                            <Button
                                variant="contained"
                                onClick={() => {
                                    getCoursesByCourseID()
                                }}
                                sx={{ borderRadius: 0, margin: 1.25 }}>
                                <SearchIcon /> Search
                            </Button>
                        </Box>
                        <Button
                            component={RouterLink}
                            to="course_create"
                            variant="contained"
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > Add </Button>
                    </Box>

                    <TableContainer sx={{ width: "auto" }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#5B98B9" }}>
                                <TableRow sx={{ width: "auto" }}>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>รหัสหลักสูตร</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>ชื่อหลักสูตร</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>วันที่</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>วุฒิ</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>สาขา</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(rowsPerPage > 0
                                    ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : courses
                                ).map((row) => (
                                    <StyledTableRow key={row.Course_ID}>
                                        <TableCell>{row.Course_ID}</TableCell>
                                        <TableCell>{row.Course_Name}</TableCell>
                                        <TableCell>{row.Datetime}</TableCell>
                                        <TableCell>{row.Qualification_Name}</TableCell>
                                        <TableCell>{row.Major_Name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{ borderRadius: 0 }}
                                                onClick={() => {
                                                    navigate({ pathname: `/course/${row.Course_ID}` })
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
                                        colSpan={courses.length}
                                        count={courses.length}
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

                </Paper>
            </Container>

        </div>


    );
}


export default Course_Lists;