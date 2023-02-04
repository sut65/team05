import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { useEffect } from "react";
import { createTheme, FormHelperText, Select, SelectChangeEvent, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
import { IconButton, MenuItem, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { EnrollInterface, extendedEnrollSubjectInterface } from "../../models/I_Enroll";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReplayIcon from '@mui/icons-material/Replay';
import pink from "@mui/material/colors/pink";
import { red } from "@mui/material/colors";
import ReplyIcon from '@mui/icons-material/Reply';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateEnroll() {
    const navigate = useNavigate();
    const params = useParams();
    const [subjects, setSubjects] = React.useState<Subject[]>([]);
    // const [course, setCourse] = React.useState<Course[]>([]);

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    //  สำหรับอัพเดต
    let [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});

    // สำหรับแสดง
    const [enrolls, setEnrolls] = React.useState<extendedEnrollSubjectInterface>();

    const theme = createTheme();

    const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    theme.typography.h3 = {
        fontSize: '1rem',
        '@media (min-width:600px)': {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
    };

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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof UpdateEnroll;
        const { value } = event.target;
        setEnroll({ ...enroll, [id]: value });
        console.log(event.target.value);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

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



    const getcerantEnroll = async () => {
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/currentenroll/${params.enroll_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setEnrolls(res.data);
                    // console.log(res.data);
                }

            });
    };
    const getStudent = async () => {
        const apiUrl = "http://localhost:8080";
        const requestOptionsGet = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
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

    const getSubjectsBySubjectID = async () => {
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/enroll/${enrolls?.Subject_ID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSubjects(res.data);
                    // console.log(res.data);
                    console.log(enrolls?.Enroll_ID)
                    enroll.Enroll_ID = enrolls?.Enroll_ID

                    // console.log(enroll.Enroll_ID)

                }
            });
    };



    function submitUpdate() {
        let data = {
            Student_ID: enroll.Student_ID ?? "",
            Enroll_ID: enroll.Enroll_ID ?? "",
            Subject_ID: enroll.Subject_ID ?? "",
            Exam_Schedule_ID: enroll.Exam_Schedule_ID ?? "",
            Class_Schedule_ID: enroll.Class_Schedule_ID ?? "",
            Section: enroll.Section
            //Section: typeof enroll.Section === "string" ? parseInt(enroll.Section) : enroll.Section,
        };
        console.log("Data : ");
        console.log(data);
        const requestOptionsPatch = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data));
        const apiUrl = "http://localhost:8080";
        fetch(`${apiUrl}/updateenroll`, requestOptionsPatch)
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
        // console.log(params)
        getStudent();
        getcerantEnroll();
        getSubjectsBySubjectID();
        // console.log(searchSubjectID);
    }, []);


    return (
        <Container maxWidth="xl"
            sx={{
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}
        >
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
            <Paper>
                {/* Header */}
                <Grid>
                    <Box display={"flex"}
                        sx={{ marginTop: 1, }}>
                        <Box sx={{ paddingX: 2, paddingY: 1 }}>
                            <Typography
                                variant="h6"
                                color="parmary"
                                gutterBottom>
                                ลงทะเบียนรายวิชา
                            </Typography>
                        </Box>
                        
                            <Box flexGrow={1}>
                            </Box>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' }, marginTop: 0.1, paddingLeft: 45, }}>
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
                </Grid>
            </Paper>
            <Paper>
                <Grid container sx={{ marginTop: '20px', marginLeft: 1, }} >
                    <Grid>
                        <Box sx={{ paddingLeft: 2, mt: 2 }}>

                            <Box sx={{
                                marginTop: 1,

                                height: 50,
                            }}>
                                <p style={{ paddingLeft: 2, paddingTop: 5 }}>แก้ไขรายการลงทะเบียน </p>
                            </Box>

                        </Box>
                    </Grid>

                    <Grid sx={{ ml: 120, mt: 1.7 }}>

                        <TextField sx={{ width: '13ch' }}
                            disabled
                            size="small"
                            value={enrolls?.Subject_ID}
                        />
                    </Grid>
                    <Grid sx={{ ml: 1, mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={getSubjectsBySubjectID}>
                            {<ReplayIcon />}
                            โหลดข้อมูล
                        </Button>
                    </Grid>
                    <Grid sx={{ ml: 1, mt: 2 }}>
                        <Button

                            component={RouterLink}
                            variant="outlined"
                            to="/enroll"
                        >
                            {<ReplyIcon />}
                            กลับ
                        </Button>
                    </Grid>


                </Grid>



            </Paper>

            <Paper sx={{ mt: -1 }}>
                <Grid>

                </Grid>
                <Grid sx={{ marginTop: '40px', display: 'flex', marginLeft: 1, paddingBlockEnd: 10 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, mt: 2, ml: -1 }} aria-label="simple table">
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
                                                    submitUpdate();
                                                }}>

                                                <CheckBoxIcon />
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

        </Container>

    );
}

export default UpdateEnroll;