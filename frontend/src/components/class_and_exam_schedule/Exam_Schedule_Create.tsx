import { Breadcrumbs, Button, FormControl, Grid, Link, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Exam_Schedule } from "../../models/I_Schedule";
import { Subject } from "../../models/I_Subject";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { formatTime, formatDate } from "../services/FormatDateTime";
import Swal from 'sweetalert2'
import Home_Navbar from "../navbars/Home_navbar";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import { Link as RouterLink } from "react-router-dom";
import { Room } from "../../models/I_Room";

function Exam_Schedule_Create() {
    let [exam_schedule, setExamSchedule] = React.useState<Partial<Exam_Schedule>>({});

    const exam_types = [
        { exam_type: "Midterm", exam_type_name: "สอบกลางภาค" },
        { exam_type: "Final", exam_type_name: "สอบประจำภาค" }
    ]
    const [rooms, setRooms] = React.useState<Room[]>([]);
    const [exam_date, setExamDate] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
    const [subject, setSubject] = React.useState<Subject>();
    const [searchedSubject, setSearchSubject] = React.useState<string>();
    const [exam_schedule_id, setExamScheduleID] = React.useState<string>();
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [exam_start_time, setExamStartTime] = React.useState<Dayjs | null>(null);
    const [exam_end_time, setExamEndTime] = React.useState<Dayjs | null>(null);

    const apiUrl = "http://localhost:8080";

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
        event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const id = event.target.id as keyof typeof exam_schedule;
        setExamSchedule({
            ...exam_schedule,
            [id]: event.target.value,
        });
        setSearchSubject(exam_schedule.Subject_ID)
        // setSearchSection(class_schedule.Section)
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof exam_schedule;
        setExamSchedule({
            ...exam_schedule,
            [name]: event.target.value,
        });

    };

    const getRooms = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/rooms`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setRooms(res.data);
                }
            });
    };


    const getSubject = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/subject/${exam_schedule.Subject_ID}/1`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setSubject(res.data);
                    // ShowSubjectInfo(res.data);
                }
            });
    };

    function ShowSubjectInfo() {
        if (subject === undefined) {
            return (
                <Box flexGrow={1} sx={{ bgcolor: "#e0e0e0", border: 0, padding: 2, }}>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" sx={{ fontFamily: "Noto Sans Thai" }}>
                            Subject Not found!!
                        </Typography>
                    </Stack>
                </Box>
            )
        }
        else {
            return (
                <Box flexGrow={1} sx={{ bgcolor: "#e0e0e0", padding: 2, width: "auto" }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                รหัสวิชา
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Subject_ID}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                ชื่อรายวิชา
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Subject_EN_Name}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                กลุ่มที่
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Section}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                อาจารย์ผู้สอน
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Professor_Name}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                หลักสูตร
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Course_Name}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                สถานะรายวิชา
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Subject_Status_Description}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                จำนวนที่เปิดรับ
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Capacity}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                ที่นั่งสำรอง
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Reserved}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                หน่วยกิจ
                            </Typography>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Thai" }}>
                                {subject?.Unit}
                            </Typography>
                        </Box>
                    </Grid>
                </Box>
            )
        }
    }

    function submit() {
        let data = {
            Exam_Schedule_ID: exam_schedule.Exam_Schedule_ID ?? "",
            Subject_ID: exam_schedule.Subject_ID ?? "",
            Room_ID: exam_schedule.Room_ID ?? "",
            Admin_ID: localStorage.getItem("id"),
            Exam_Type: exam_schedule.Exam_Type ?? "",
            Exam_Date: formatDate(exam_date),
            Exam_Start_Time: formatTime(exam_start_time),
            Exam_End_Time: formatTime(exam_end_time),
        }
        console.log(data)

        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        Swal.fire({
            title: 'Do you want to save this exam schedule data?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${apiUrl}/exam_schedules`, requestOptionsPost)
                    .then((response) => response.json())
                    .then((res) => {
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

    useEffect(() => {
        getRooms();
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

            <Home_Navbar />
            <Toolbar />

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
                    <Typography color="text.primary" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold" }}> เพิ่มข้อมูลการใช้ห้องเรียน </Typography>
                </Breadcrumbs>
            </Paper>

            <Grid container item
                sx={{
                    // border: 1,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                    padding: 3
                }}>
                <Box flexGrow={8} sx={{ border: 0, }}>
                    <Grid container sx={{ border: 0 }}>
                        <Stack  direction="row" spacing={1} flex={0.95}>
                            <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                                <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> รหัสวิชา </Typography>
                                <FormControl fullWidth>
                                    <TextField
                                        id="Subject_ID"
                                        size="small"
                                        type="string"
                                        value={exam_schedule.Subject_ID}
                                        onChange={handleInputChange}
                                        inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}

                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ paddingTop: 4, border: 0 }}>
                                <Button
                                    // component={RouterLink} 
                                    // to="/" 
                                    onClick={getSubject}
                                    variant="contained"
                                    sx={{ borderRadius: 0, fontFamily: "Noto Sans Thai" }}
                                > แสดงรายละเอียด </Button>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> วัน/เดือน/ปี ที่จัดสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={exam_date}
                                        onChange={(newValue: Dayjs | null) => {
                                            setExamDate(newValue);
                                            // exam_schedule.Exam_Date = `${newValue?.year()}-${newValue?.month() + 1}-${newValue?.date()}`
                                            // console.log(exam_schedule.Exam_Date)
                                        }}
                                        renderInput={(params: any) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 1, padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> ห้องเรียน </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Room_ID"
                                    size="small"
                                    value={exam_schedule.Room_ID}
                                    inputProps={{ name: "Room_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Noto Sans Thai' }}
                                >
                                    {rooms.map((item: Room) => (
                                        <MenuItem
                                            key={item.Room_ID}
                                            value={item.Room_ID}
                                        > {item.Room_ID}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>


                    </Grid>
                    <Box flexGrow={1}>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> เวลาเริ่มสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={exam_start_time}
                                        onChange={(newValue) => {
                                            setExamStartTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField size="small" sx={{fontFamily:"Noto Sans Thai"}} {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> เวลาสิ้นสุดการสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={exam_end_time}
                                        onChange={(newValue) => {
                                            setExamEndTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField size="small" sx={{fontFamily:"Noto Sans Thai"}} {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box flexGrow={1}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> ประเภทการสอบ </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Exam_Date"
                                    size="small"
                                    value={exam_schedule.Exam_Type + ""}
                                    inputProps={{ name: "Exam_Type", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Noto Sans Thai' }}
                                >
                                    {exam_types.map((item) => (
                                        <MenuItem value={item.exam_type} key={item.exam_type}>
                                            {item.exam_type_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Stack direction="row" flexGrow={1} display="flex" justifyContent="flex-end" sx={{padding:1}}>
                        <Box flex={1}>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/exam_schedule"
                            // endIcon={<AddIcon />}
                            sx={{ borderRadius: 0, fontFamily: "Noto Sans Thai" }}
                        > Back </Button>
                        </Box>

                        <Button
                            onClick={submit}
                            variant="contained"
                            // endIcon={<AddIcon />}
                            sx={{ borderRadius: 0, fontFamily: "Noto Sans Thai" }}
                        > Submit </Button>
                    </Stack>
                </Box>
                <Box flexGrow={10} sx={{ border: 0, display: "flex" }}>
                    {ShowSubjectInfo()}
                </Box>
            </Grid>
        </Container>
    )
}
export default Exam_Schedule_Create;