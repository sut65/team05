import { Breadcrumbs, Button, FormControl, Grid, Link, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Class_Schedule, Class_Schedule_For_Update } from "../../models/I_Schedule";
import { Subject } from "../../models/I_Subject";
import { Room } from "../../models/I_Room";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatTime } from "../services/FormatDateTime";
import { Dayjs } from "dayjs";
import Swal from 'sweetalert2'
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import Home_Navbar from "../navbars/Home_navbar";
import { Link as RouterLink } from "react-router-dom";


function Class_Schedule_Update() {
    const params = useParams()
    const navigate = useNavigate();
    const [class_schedule, setClassSchedule] = React.useState<Partial<Class_Schedule_For_Update>>({});
    const [subject, setSubject] = React.useState<Subject>();
    const [rooms, setRooms] = React.useState<Room[]>([]);
    const [searchedSubject, setSearchSubject] = React.useState<string>();
    const [searchedSection, setSearchSection] = React.useState<number>();
    const [class_schedule_id, setClassScheduleID] = React.useState<string>();
    const [start_time, setStartTime] = React.useState<Dayjs | null>(null);
    const [end_time, setEndTime] = React.useState<Dayjs | null>(null);
    const [old_class_schedule_id, setOldClassScheduleID] = React.useState<string>();

    const apiUrl = "http://localhost:8080";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const id = event.target.id as keyof typeof class_schedule;
        setClassSchedule({
            ...class_schedule,
            [id]: event.target.value,
        });
        setSearchSubject(class_schedule.Subject_ID)
        setSearchSection(class_schedule.Section)
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof class_schedule;
        setClassSchedule({
            ...class_schedule,
            [name]: event.target.value,
        });

    };

    const getSubject = async () => {
        fetch(`${apiUrl}/subject/${class_schedule.Subject_ID}/${class_schedule.Section}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubject(res.data);
                }
            });
    };

    const getRooms = async () => {
        fetch(`${apiUrl}/rooms`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setRooms(res.data);
                }
            });
    };

    const getSendedClassSchedule = async () => {
        fetch(`${apiUrl}/class_schedule_by_id/${params.class_schedule_id}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                    setOldClassScheduleID(res.data.Class_Schedule_ID)
                    console.log(old_class_schedule_id)
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
            Old_Class_Schedule_ID: old_class_schedule_id,
            Class_Schedule_ID: class_schedule.Class_Schedule_ID ?? "",
            Section: typeof class_schedule.Section === "string" ? parseInt(class_schedule.Section) : class_schedule.Section,
            Subject_ID: class_schedule.Subject_ID ?? "",
            Room_ID: class_schedule.Room_ID ?? "",
            Admin_ID: localStorage.getItem("id"),
            Class_Schedule_Description: class_schedule.Class_Schedule_Description ?? "",
            Day: class_schedule.Day ?? "",
            Start_Time: formatTime(start_time),
            End_Time: formatTime(end_time),
        }
        const requestOptionsPatch = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data));

        Swal.fire({
            title: 'Do you want to update this class schedule data?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${apiUrl}/class_schedules`, requestOptionsPatch)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Updated!',
                                text: 'updated success',
                            })
                            setOldClassScheduleID(data.Class_Schedule_ID)
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
        getSendedClassSchedule();
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
            {/* Header */}
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
                    <Link underline="hover" href="/class_schedule" sx={{ fontFamily: "Noto Sans Thai" }}>
                        รายการข้อมูลการใช้ห้องเรียน
                    </Link>

                    <Link 
                        underline="hover" 
                        href = {`/class_schedule/${class_schedule?.Class_Schedule_ID}`}
                        // onClick = {() => {
                        //     navigate({ pathname: `/class_schedule/${class_schedule?.Class_Schedule_ID}` })
                        // }}
                        sx={{ fontFamily: "Noto Sans Thai" }}>
                        รายการข้อมูลการใช้ห้องเรียนวิชา {class_schedule?.Subject_ID} กลุ่มที่ {class_schedule?.Section}
                    </Link>
                    <Typography color="text.primary" sx={{ fontFamily: "Noto Sans Thai", fontWeight: "bold" }}> แก้ไขข้อมูลการใช้ห้องเรียน </Typography>
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
                <Box flexGrow={1} sx={{padding: 1, }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> รหัสการใช้ห้องเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Class_Schedule_ID"
                                    size="small"
                                    type="string"
                                    disabled
                                    value={class_schedule.Class_Schedule_ID}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}

                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> รหัสวิชา </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Subject_ID"
                                    size="small"
                                    type="string"
                                    value={class_schedule.Subject_ID}
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
                                    value={class_schedule.Section}
                                    onChange={handleInputChange}
                                    inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}

                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: 2, border: 0, marginTop: 2, }}>
                            <Button
                                onClick={() => { getSubject() }}
                                variant="contained"
                                sx={{ borderRadius: 0, fontFamily:"Noto Sans Thai" }}
                            > แสดงรายละเอียด </Button>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box sx={{ border: 0, width: 1, padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> ห้องเรียน </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Room_ID"
                                    size="small"
                                    value={class_schedule.Room_ID+""}
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

                        <Box flexGrow={5} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> เวลาเริ่มเรียน </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={start_time}
                                        onChange={(newValue) => {
                                            setStartTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField size="small" sx={{fontFamily:"Noto Sans Thai"}} {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                        <Box flexGrow={5} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> เวลาเลิกเรียน </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={end_time}
                                        onChange={(newValue) => {
                                            setEndTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField size="small" sx={{fontFamily:"Noto Sans Thai"}} {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                        <Box flexGrow={20} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> วัน </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Day"
                                    size="small"
                                    value={class_schedule.Day+""}
                                    inputProps={{ name: "Day", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Noto Sans Thai' }}
                                >
                                    {days.map((day) => (
                                        <MenuItem value={day} key={day}>
                                            {day}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{ fontFamily: 'Noto Sans Thai' }}> คำอธิบาย </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Class_Schedule_Description"
                                size="small"
                                type="string"
                                multiline
                                rows={4}
                                value={class_schedule.Class_Schedule_Description}
                                onChange={handleInputChange}
                                inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                            />
                        </FormControl>
                    </Box>
                    <Stack direction="row" flexGrow={1} display="flex" justifyContent="flex-end">
                        <Box flex={1}>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/class_schedule"
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
                <Box flexGrow={10} sx={{ border: 0, display: "flex", }}>
                    {ShowSubjectInfo()}
                </Box>
            </Grid>


        </Container>
    )
}
export default Class_Schedule_Update;