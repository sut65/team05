import React, { useEffect, } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import { Class_Schedule, Exam_Schedule } from "../../models/I_Schedule";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Button, Divider, Paper, styled, TextField, Typography } from "@mui/material";

const apiUrl = "http://localhost:8080";
const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5B98B9",
        color: theme.palette.common.white,
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

function Schedule_Main() {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: 'Mitr-Regular' }}> About System : ระบบจัดสรรห้องเรียนและห้องสอบ </Typography>
            <Divider />
            <p>
                ระบบจัดสรรห้องเรียนและห้องสอบ เป็นระบบที่แอดมินสามารถจัดสรรห้องเรียนสำหรับการเรียนการ
                สอนได้ด้วยการเพิ่มข้อมูลการใช้ห้องเรียน โดยการเพิ่มข้อมูลนั้น จะต้องระบุรายวิชา, ห้องเรียนที่ใช้, กลุ่มเรียน
                และช่วงเวลาที่ใช้ในการเรียนการสอน โดยห้องที่ใช้และช่วงเวลานั้น จะต้องไม่ซ้ำกับข้อมูลการใช้ห้องเรียนที่มีอยู่
                แล้ว นอกจากนี้ผู้จัดการระบบสามารถแก้ไขข้อมูลและลบข้อมูลการใช้ห้องเรียนได้
            </p>
            <p>
                ต่อมาแอดมินสามารถเลือกได้ว่าจะบันทึกข้อมูลการใช้ห้องสอบหรือไม่ ถ้าต้องการบันทึก ให้แอดมินเลือก
                ว่าจะบันทึกข้อมูลการสอบกลางภาคหรือประจำภาค โดยจะต้องระบุรายวิชา, ห้องสอบ, วัน/เดือน/ปี ที่จัดสอบ
                และช่วงเวลาในการสอบ โดยห้องที่ใช้และช่วงเวลานั้น จะต้องไม่ซ้ำกับข้อมูลการใช้ห้องสอบที่มีอยู่แล้ว นอกจากนี้
                แอดมินสามารถแก้ไขข้อมูลและลบข้อมูลการใช้ห้องสอบได้
            </p>
        </Box>
    )
}

export function Class_Schedules_List() {
    const class_navigate = useNavigate();

    const [class_schedules, setClassSchedule] = React.useState<Class_Schedule[]>([]);
    const [searchSubjectID, setSearchSubjectID] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_subject_id = event.target.value;
        setSearchSubjectID(searched_subject_id);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - class_schedules.length) : 0;


    const getClassSchedules = async () => {
        fetch(`${apiUrl}/class_schedules`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                }
            });
    };



    const getClassSchedulesBySubjectID = async () => {
        fetch(`${apiUrl}/class_schedule/${searchSubjectID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                    // console.log(res.data)
                }
            });
    };

    useEffect(() => {
        if (searchSubjectID === "") {
            getClassSchedules();
        }
    }, []);

    return (
        <div>
            <Box sx={{ bgcolor: "white", padding: 2 }}>
                <Box
                    display="flex"
                    sx={{ marginTop: 2, padding: 1 }}>
                    <Box flexGrow={1}>
                        <TextField
                            variant="standard"
                            size="small"
                            label="ค้นหารายวิชา"
                            onChange={handleInputChange}
                        ></TextField>

                        <Button
                            variant="contained"
                            onClick={() => {
                                getClassSchedulesBySubjectID()
                            }}
                            sx={{ borderRadius: 0, margin: 1.25 }}>
                            <SearchIcon />
                        </Button>
                    </Box>
                    <Box sx={{ border: 0 }}>
                        <Button
                            component={Link}
                            to="/class_schedule/create"
                            variant="contained"
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > Add </Button>
                    </Box>
                </Box>



                <TableContainer sx={{ width: "auto" }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#5B98B9" }}>
                            <TableRow sx={{ width: "auto" }}>
                                <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>รหัสวิชา</StyledTableCell>
                                <StyledTableCell width={20} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>กลุ่มที่</StyledTableCell>
                                <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>ห้อง</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>รายละเอียด</StyledTableCell>
                                <StyledTableCell width={225} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>วัน</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>เวลาเริ่ม</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>เวลาเลิก</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>Info</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(rowsPerPage > 0
                                ? class_schedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : class_schedules
                            ).map((row) => (
                                <StyledTableRow key={row.Class_Schedule_ID}>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Subject_ID}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Section}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Room_ID}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Class_Schedule_Description}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Day}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Start_Time}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.End_Time}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ borderRadius: 0 }}
                                            onClick={() => {
                                                class_navigate({ pathname: `/class_schedule/${row.Subject_ID}/${row.Section}` })
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
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

// ! กดค้นหาข้อมูลการใช้ห้องสอบไม่ได้ เอาไว้ก่อน
// * แก้ได้ละ แก้ที่ controller
export function Exam_Schedules_List() {

    let [exam_schedules, setExamSchedule] = React.useState<Exam_Schedule[]>([]);
    const [searchExamSubjectID, setSearchExamSubjectID] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const exam_navigate = useNavigate();

    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        // const searched_subject_id = ;
        setSearchExamSubjectID(event.target.value);
        // console.log(searchExamSubjectID)

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - exam_schedules.length) : 0;

    const getExamSchedules = async () => {
        fetch(`${apiUrl}/exam_schedules`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setExamSchedule(res.data);
                }
            });
    };

    const getExamSchedulesBySubjectID = async () => {
        fetch(`${apiUrl}/exam_schedule/${searchExamSubjectID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setExamSchedule(res.data);
                    console.log(res.data)
                }
            });
    };

    useEffect(() => {
        if (searchExamSubjectID === "") {
            getExamSchedules();
        }
    }, []);

    return (
        <div>
            <Box sx={{ bgcolor: "white", padding: 2 }}>
                <Box
                    display="flex"
                    sx={{ marginTop: 2, padding: 1 }}>
                    <Box flexGrow={1}>
                        <TextField
                            variant="standard"
                            size="small"
                            label="ค้นหารายวิชา"
                            onChange={handleInputChange}
                        ></TextField>

                        <Button
                            variant="contained"
                            onClick={() => { getExamSchedulesBySubjectID() }}
                            sx={{ borderRadius: 0, margin: 1.25 }}>
                            <SearchIcon />
                        </Button>
                    </Box>
                    <Box sx={{ border: 0 }}>
                        <Button
                            component={Link}
                            to="/exam_schedule/exam_schedule_create"
                            variant="contained"
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > Add </Button>
                    </Box>
                </Box>



                <TableContainer sx={{ width: "auto" }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#5B98B9" }}>
                            <TableRow sx={{ width: "auto" }}>
                                <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>รหัสวิชา</StyledTableCell>
                                <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>ห้องสอบ</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>วัน/เดือน/ปี ที่จัดสอบ</StyledTableCell>
                                <StyledTableCell width={225} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>ประเภทการสอบ</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>เวลาเริ่มสอบ</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>เวลาเลิกสอบ</StyledTableCell>
                                <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Mitr-Regular" }}>Info</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(rowsPerPage > 0
                                ? exam_schedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : exam_schedules
                            ).map((row) => (
                                <StyledTableRow key={row.Exam_Schedule_ID}>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Subject_ID}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Room_ID}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Exam_Date}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Exam_Type}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Exam_Start_Time}</TableCell>
                                    <TableCell sx={{ fontFamily: "Mitr-Regular" }}>{row.Exam_End_Time}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ borderRadius: 0 }}
                                            onClick={() => {
                                                exam_navigate({ pathname: `/exam_schedule/${row.Subject_ID}/${row.Exam_Type}` })
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
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

function ScheduleList() {

    const [tabvalue, setTabValue] = React.useState(0);

    const handleTabsChange = (event: any, newValue: any) => {
        setTabValue(newValue);
    }

    useEffect(() => {
        const pathname = window.location.pathname;
        switch (pathname) {
            default:
                setTabValue(0);
                break;
            case "/schedule":
                setTabValue(0);
                break;
            case "/class_schedule":
                setTabValue(1);
                break;
            case "/exam_schedule":
                setTabValue(2);
                break;
        }
    }, [window.location.pathname]);
    return (
        <div>
            <Container maxWidth={false}
                sx={{
                    bgcolor: "#e1e1e1",
                    width: "auto",
                    height: "auto",
                    padding: 2
                }}>

                {/* Header components */}
                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Mitr-Regular' }}> ระบบจัดสรรห้องเรียนและห้องสอบ </Typography>
                    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "white" }}>
                        <Tabs
                            onChange={handleTabsChange}
                            value={tabvalue}
                            sx={{ color: "black" }}
                        >
                            <Tab label="หน้าหลัก" component={Link} to="/schedule" />
                            <Tab label="ข้อมูลรายวิชาและห้องเรียน" component={Link} to="/class_schedule" />
                            <Tab label="ข้อมูลห้องสอบ" component={Link} to="/exam_schedule" />
                        </Tabs>
                    </AppBar>
                    {tabvalue === 0 && <Schedule_Main />}
                    {tabvalue === 1 && <Class_Schedules_List />}
                    {tabvalue === 2 && <Exam_Schedules_List />}
                </Paper>


            </Container>
        </div>
    )

}

export default ScheduleList;
