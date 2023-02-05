import { Button, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Class_Schedule } from "../../models/I_Schedule";
import { Subject } from "../../models/I_Subject";
import { Room } from "../../models/I_Room";
import { useParams } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Class_Schedule_Update() {
    const params = useParams()

    let [class_schedule, setClassSchedule] = React.useState<Partial<Class_Schedule>>({});
    const [subject, setSubject] = React.useState<Subject>();
    const [rooms, setRooms] = React.useState<Room[]>([]);
    const [searchedSubject, setSearchSubject] = React.useState<string>();
    const [searchedSection, setSearchSection] = React.useState<number>();
    const [class_schedule_id, setClassScheduleID] = React.useState<string>();
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const apiUrl = "http://localhost:8080";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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

    const requestOptionsGet = {
        method: "GET",
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
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
        fetch(`${apiUrl}/class_schedule/${params.subject_id}/${params.section}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClassSchedule(res.data);
                    console.log(res.data)
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
            Class_Schedule_ID: class_schedule.Class_Schedule_ID ?? "",
            Section: typeof class_schedule.Section === "string" ? parseInt(class_schedule.Section) : class_schedule.Section,
            Subject_ID: class_schedule.Subject_ID ?? "",
            Room_ID: class_schedule.Room_ID ?? "",
            Admin_ID: class_schedule.Admin_ID ?? "",
            Class_Schedule_Description: class_schedule.Class_Schedule_Description ?? "",
            Day: class_schedule.Day ?? "",
            Start_Time: class_schedule.Start_Time ?? "",
            End_Time: class_schedule.End_Time ?? "",
        }
        const requestOptionsPatch = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data));

        fetch(`${apiUrl}/class_schedules`, requestOptionsPatch)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.data) {
                    setSuccess(true);
                } else {
                    setError(true);
                }
            });

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
                <Box flexGrow={1} sx={{ border: 1, padding: 2, bgcolor: "#e1e1e1" }}>
                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> รหัสการใช้ห้องเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Class_Schedule_ID"
                                    variant="standard"
                                    type="string"
                                    disabled
                                    value={class_schedule.Class_Schedule_ID}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                            <Box sx={{ padding: 1 }}>
                                <Button
                                    onClick={() => {
                                        class_schedule.Class_Schedule_ID = `CLS-${class_schedule.Subject_ID}-${class_schedule.Section}-${class_schedule.Room_ID}-${class_schedule.Day}-${class_schedule.Start_Time}-${class_schedule.End_Time}`
                                        setClassScheduleID(class_schedule.Class_Schedule_ID)
                                    }}
                                    variant="contained"
                                    sx={{ borderRadius: 0 }}
                                > Format ID </Button>
                            </Box>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> รหัสวิชา </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Subject_ID"
                                    variant="standard"
                                    type="string"
                                    value={class_schedule.Subject_ID}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> กลุ่มเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Section"
                                    variant="standard"
                                    type="number"
                                    value={class_schedule.Section}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ padding: 1, border: 0, marginTop: 2, }}>
                            <Button
                                onClick={() => { getSubject() }}
                                variant="contained"
                                sx={{ borderRadius: 0 }}
                            > แสดงรายละเอียด </Button>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> ห้องเรียน </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Room_ID"
                                    variant="standard"
                                    value={class_schedule.Room_ID}
                                    inputProps={{ name: "Room_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
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

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> เวลาเริ่มเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="Start_Time"
                                    variant="standard"
                                    type="string"
                                    value={class_schedule.Start_Time}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> เวลาเลิกเรียน </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    id="End_Time"
                                    variant="standard"
                                    type="string"
                                    value={class_schedule.End_Time}
                                    onChange={handleInputChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                />
                            </FormControl>
                        </Box>

                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{ fontFamily: 'Mitr-Regular' }}> วัน </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Day"
                                    variant="standard"
                                    value={class_schedule.Day}
                                    inputProps={{ name: "Day", }}
                                    onChange={handleSelectChange}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
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
                        <Typography sx={{ fontFamily: 'Mitr-Regular' }}> คำอธิบาย </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Class_Schedule_Description"
                                variant="standard"
                                type="string"
                                value={class_schedule.Class_Schedule_Description}
                                onChange={handleInputChange}
                                sx={{ fontFamily: 'Mitr-Regular' }}
                            />
                        </FormControl>
                    </Box>
                    <Box flexGrow={1} display="flex" justifyContent="flex-end">
                        <Button
                            onClick={submit}
                            variant="contained"
                            // endIcon={<AddIcon />}
                            sx={{ borderRadius: 0 }}
                        > Submit </Button>
                    </Box>
                </Box>
                <Box flexGrow={10} sx={{ border: 1, display: "flex", }}>
                    {ShowSubjectInfo()}
                </Box>
            </Grid>


        </Container>
    )
}
export default Class_Schedule_Update;