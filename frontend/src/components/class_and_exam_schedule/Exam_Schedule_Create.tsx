import { Button, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from "@mui/material";
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShowSubjectInfo(subject: Subject | undefined) {
    if (subject === undefined) {
        return (
            <Box flexGrow={1} sx={{ border: 1, padding: 2, }}>
                Subject Not found!!
            </Box>

        )
    }
    else {

        return (
            <Box flexGrow={1} sx={{ border: 1, padding: 2, width: "auto" }}>
                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> รหัสวิชา </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Subject_ID} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> ชื่อรายวิชา </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Subject_EN_Name} </Box>
                </Grid>
                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> อาจารย์ผู้สอน </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Professor_ID} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> หลักสูตร </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Course_ID} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> สถานะรายวิชา </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Subject_Status_ID} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> จำนวนที่เปิดรับ </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Capacity} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> ที่นั่งสำรอง </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Reserved} </Box>
                </Grid>

                <Grid container sx={{ border: 1 }}>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.3 }}> หน่วยกิจ </Box>
                    <Box flexGrow={1} sx={{ border: 1, width: 0.6 }}> {subject?.Unit} </Box>
                </Grid>
            </Box>
        )
    }

}

function Exam_Schedule_Create() {
    let [exam_schedule, setExamSchedule] = React.useState<Partial<Exam_Schedule>>({});

    const exam_types = [
        { exam_type: "Midterm", exam_type_name: "สอบกลางภาค" },
        { exam_type: "Final", exam_type_name: "สอบประจำภาค" }
    ]
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

    const getSubject = async () => {
        const requestOptions = {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
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
                <Box flexGrow={1} sx={{ border: 1, padding: 2, }}>
                    Subject Not found!!
                </Box>
            )
        }
        else {
            return (
                <Box flexGrow={1} sx={{ border: 0, padding: 2, width: "auto" }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> รหัสวิชา </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Subject_ID} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> ชื่อรายวิชา </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Subject_EN_Name} </Box>
                    </Grid>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> อาจารย์ผู้สอน </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Professor_ID} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> หลักสูตร </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Course_ID} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> สถานะรายวิชา </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Subject_Status_ID} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> จำนวนที่เปิดรับ </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Capacity} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> ที่นั่งสำรอง </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Reserved} </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.3 }}> หน่วยกิจ </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: 0.6 }}> {subject?.Unit} </Box>
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
                "Content-Type": "application/json" },
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
    return (
        <Container
            maxWidth={false}
            sx={{
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}>

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
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            {/* Header */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Typography variant="h4" sx={{ fontFamily: 'Mitr-Regular' }}> ระบบจัดสรรห้องเรียนและห้องสอบ </Typography>
                <Typography sx={{ fontFamily: 'Mitr-Regular' }}> เพิ่มข้อมูลการใช้ห้องเรียน </Typography>
            </Paper>

            <Grid container item
                sx={{
                    // border: 1,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                    padding: 3
                }}>
                <Box flexGrow={1} sx={{ border: 1, }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> รหัสเวลาสอบ </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Exam_Schedule_ID"
                                    variant="standard"
                                    disabled
                                    type="string"
                                    value={exam_schedule.Exam_Schedule_ID}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: 1 }}>
                            <Button
                                onClick={() => {
                                    exam_schedule.Exam_Schedule_ID = `EXAM${exam_schedule.Subject_ID}-${exam_schedule.Room_ID}-${exam_schedule.Exam_Type}-${formatDate(exam_date)}-${formatTime(exam_start_time)}-${formatTime(exam_end_time)}`
                                    // setClassScheduleID(class_schedule.Class_Schedule_ID)
                                    setExamScheduleID(exam_schedule.Exam_Schedule_ID);
                                }}
                                variant="contained"
                                sx={{ borderRadius: 0 }}
                            > Format ID </Button>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> รหัสวิชา </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Subject_ID"
                                    variant="standard"
                                    type="string"
                                    value={exam_schedule.Subject_ID}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: 1, border: 1 }}>
                            <Button
                                // component={RouterLink} 
                                // to="/" 
                                onClick={getSubject}
                                variant="contained"
                                sx={{ borderRadius: 0 }}
                            > แสดงรายละเอียด </Button>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> วัน/เดือน/ปี ที่จัดสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={exam_date}
                                        onChange={(newValue : Dayjs | null) => {
                                            setExamDate(newValue);
                                            // exam_schedule.Exam_Date = `${newValue?.year()}-${newValue?.month() + 1}-${newValue?.date()}`
                                            // console.log(exam_schedule.Exam_Date)
                                        }}
                                        renderInput={(params: any) => <TextField variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> ห้องสอบ </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Room_ID"
                                    variant="standard"
                                    type="string"
                                    value={exam_schedule.Room_ID}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> เวลาเริ่มสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={exam_start_time}
                                        onChange={(newValue) => {
                                            setExamStartTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> เวลาสิ้นสุดการสอบ </Typography>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm={false}
                                        value={exam_end_time}
                                        onChange={(newValue) => {
                                            setExamEndTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                    </Grid>
                    <Box flexGrow={1}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> ประเภทการสอบ </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Exam_Date"
                                    variant="standard"
                                    value={exam_schedule.Exam_Type+""}
                                    inputProps={{ name: "Exam_Type", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Mitr-Regular'}}
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
                    <Box sx={{ width: 0.33, margin: 0.5, }}>
                        <Button
                            onClick={submit}
                            variant="contained"
                            // endIcon={<AddIcon />}
                            sx={{ borderRadius: 0 }}
                        > Submit </Button>
                    </Box>
                </Box>
                <Box flexGrow={10} sx={{ border: 0, display: "flex" }}>
                    {ShowSubjectInfo()}
                </Box>
            </Grid>
        </Container>
    )
}
export default Exam_Schedule_Create;