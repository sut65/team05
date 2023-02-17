import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { EnrollInterface } from "../../models/I_Enroll";
import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
//import { StudentInterface } from "../models/studentInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Alert, CssBaseline, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TableFooter, TablePagination } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import CreateEnroll from "../enroll/Enroll_Create";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Payment } from "../../models/I_Payment";
import { Payment_Type } from "../../models/I_Payment";
import { bgcolor } from "@mui/system";
import { amber } from "@mui/material/colors";
import { StudentsInterface } from "../../models/I_Student";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { datePickerToolbarClasses, LocalizationProvider } from "@mui/x-date-pickers";
import Home_Navbar from "../navbars/Home_navbar";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AddCardIcon from '@mui/icons-material/AddCard';


export function CreatePayment() {
    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = React.useState<Date | null>(null);

    const [date_time, setDate_time] = React.useState<Dayjs | null>(dayjs);

    //const [subject, setSubject] = React.useState<Subject[]>([]);

    const [subjects, setSubjects] = React.useState<Subject[]>([]);
    const [SearchStudentID, setSearchStudentID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
    const [success, setSuccess] = React.useState(false);
    const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
    const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);
    const [payment1, setPayment1] = React.useState<Payment>();
    const [payments, setPayments] = React.useState<Payment[]>([]);
    const [payment, setPayment] = React.useState<Partial<Payment>>({});
    const [payment_type, setPayment_Type] = React.useState<Payment_Type[]>([]);
    const [message, setAlertMessage] = React.useState("");
    const [student, setStudent] = React.useState<StudentsInterface[]>([]);

    const [error, setError] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        const id = event.target.id as keyof typeof payment;
        const searched_stuent_id = event.target.value;
        setSearchStudentID(searched_stuent_id)
        setPayment({
            ...payment,
            [id]: event.target.value
        });
    };

    let add = function (num1: any) {
        if ((num1 === undefined)) {
            return 0;
        } else {
            payment.Payable = num1 * 800;
            return payment.Payable;
        }

    }




    // const handleInputChangeSearch = (
    //     event: React.ChangeEvent<{ id?: string; value: any }>
    // ) => {
    //     const id = event.target.id as keyof typeof CreatePayment;
    //     setSearchStudentID(event.target.value);
    // };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof payment;
        setPayment({
            ...payment,
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

    const sendSearchedStudentID = () => {
        setSearchStudentID(SearchStudentID);
        getEnrollByStudentID(SearchStudentID);
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
            "Content-Type": "application/json",
        },
    };

    const getAdmin = async () => {
        let uid = localStorage.getItem("id");
        fetch(`${apiUrl}/admin/${uid}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    payment.Admin_ID = res.data.Admin_ID;
                }
                else {
                    console.log("else");
                }
            });
    };

    // Fetch income type from API 
    const getPayment_type = async () => {
        fetch(`${apiUrl}/payment_type`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setPayment_Type(res.data);
                } else {
                    console.log("else");
                }
            });
    };



    const getEnroll = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/enroll`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    //setEnrolls(res.data);
                    console.log(res.data);
                }
            });
    };

    const getEnrollByStudentID = async (student_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        console.log(SearchStudentID)
        fetch(`${apiUrl}/enrolls/${SearchStudentID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setEnrolls(res.data);
                    setSubjects(res.data);
                }
            });
    };

    const getPrevEnroll = async () => {
        fetch(`${apiUrl}/previousenroll`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    enroll.Enroll_ID = res.data.Enroll_ID + 1;
                }
                else {
                    enroll.Enroll_ID = res.data = "1";
                    //console.log("else");
                }
            });
    };


    const getPrevPayment = async () => {
        fetch(`${apiUrl}/previousenpayment`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    payment.Payment_ID = res.data.Payment_ID + 1;
                }
                else {
                    payment.Payment_ID = res.data = 1;
                    //console.log("else");
                }
            });
    };

    useEffect(() => {
        getPrevPayment();
        getPayment_type();
        getPrevEnroll();
        getAdmin();
        if (SearchStudentID == "") {
            getEnroll();
        } else {
            getEnrollByStudentID(SearchStudentID);
        }
        console.log(

        );
    }, []);

    function submitPayment() {
        let data = {
            Admin_ID: payment.Admin_ID ?? "",
            Student_ID: payment.Student_ID ?? "",
            Payable: typeof payment.Payable === "string" ? parseInt(payment.Payable) : payment.Payable,
            Amounts: typeof payment.Amounts === "string" ? parseInt(payment.Amounts) : payment.Amounts,
            Date_Time: date_time,
            Payment_ID: typeof payment.Payment_ID === "string" ? parseInt(payment.Payment_ID) : payment.Payment_ID,
            Payment_Type_ID: payment.Payment_Type_ID ?? "",
            Receipt_number: payment.Receipt_number ?? "",
            Unit: typeof payment.Unit === "string" ? parseInt(payment.Unit) : payment.Unit,
        };

        const apiUrl = "http://localhost:8080/payment";
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
        console.log(data)
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                } else {
                    setAlertMessage(res.error);
                    setError(true);
                }
            });
    }

    return (
        <div>
            <Container maxWidth={false}
                sx={{
                    mt: 0,
                    width: "auto",
                    height: "auto",
                    p: 1,
                    bgcolor: '#93BFCF'
                }}>
                <Container maxWidth="xl" style={{ height: "auto" }} sx={{ p: 2, bgcolor: '#BEF0CB', mt: -1 }}>
                    <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        id="success"
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >

                        <Alert onClose={handleClose} severity="success">
                            บันทึกข้อมูลถูกต้อง
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        id="error"
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {message}
                        </Alert>
                    </Snackbar>
                    <Paper sx={{ pt: 0, pl: 2, pr: 0, mt: 0, height: 55 }}>
                        <Box
                            display="flex"
                            sx={{
                                marginTop: 0,
                            }}
                        > <CreditScoreIcon sx={{ fontSize: 40, mt: 0.6, paddingRight: 1, color: "#e65100" }} />
                            <Box flexGrow={1}>

                                <Typography

                                    sx={{ fontFamily: "LilyUPC", fontSize: 35, fontWeight: 'bold' }}
                                    component="h2"
                                    variant="h6"
                                    color="primary"
                                    gutterBottom
                                >
                                    บันทึกรายจ่าย
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        sx={{ paddingBlockEnd: 3 }}
                    >
                        <Grid container sx={{ marginTop: 3, marginLeft: 7, }}>
                            <Grid sx={{ mt: 2 }}>
                                <Typography
                                    sx={{ fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold', }}>
                                    กรุณาระบุรหัสนักศึกษา
                                </Typography>

                                <Box sx={{mt:-0.5}}>
                                    <TextField  sx={{mt:1}}
                                        id="Student_ID"
                                        size="small"
                                        label="ระบุรหัสนักศึกษา"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid sx={{ marginTop: '60px', marginLeft: 3, }}>
                                <Button
                                    
                                    variant="contained"
                                    onClick={sendSearchedStudentID}
                                >
                                    ค้นหารหัสนักศึกษา
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid sx={{ marginTop: '20px', display: 'flex', paddingLeft: 6, marginLeft: 1, width: 700 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">รหัสวิชา</StyledTableCell>
                                            <StyledTableCell align="left">ชื่อวิชา</StyledTableCell>
                                            <StyledTableCell align="left">Subject name</StyledTableCell>
                                            <StyledTableCell align="left">หน่วยกิต</StyledTableCell>
                                            <StyledTableCell align="left">กลุ่ม</StyledTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? enrolls.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage)
                                            : enrolls
                                        ).map((row) => (
                                            <StyledTableRow
                                                key={row.Enroll_ID
                                                }
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{row.Subject_ID}</TableCell>
                                                <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                                                <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                                                <TableCell align="left">{row.Unit}</TableCell>
                                                <TableCell align="left">{row.Section}</TableCell>
                                                <TableCell align="center">
                                                </TableCell>
                                            </StyledTableRow>
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
                                                colSpan={enrolls.length}
                                                count={enrolls.length}
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
                    <Paper sx={{ mt: 2 }}>
                        <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                            <Grid >
                                <p style={{ paddingLeft: 17, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>หน่วยกิจรวม</p>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, marginTop: -3, paddingLeft: 1, }}>
                                    <TextField sx={{ width: "200px" }}
                                        size="small"
                                        id="Unit"
                                        value={payment.Unit}
                                        onChange={handleInputChange}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid >
                                <p style={{ paddingLeft: 18, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>จำนวนเงินที่ต้องชำระ</p>
                                <TextField sx={{ width: "250px", pl: 3, paddingRight: 2 ,marginTop: -2}}
                                    size="small"
                                    id="Payable"
                                    value={add(payment.Unit)}
                                    //value={payment.Payable}
                                    onChange={handleInputChange}
                                >
                                </TextField>
                            </Grid>
                            <Grid sx={{ marginLeft: 3, }}>
                                <p style={{ paddingLeft: 18, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>จำนวนเงินที่นักศึกษาชำระ</p>
                                <TextField sx={{ width: "250px", pl: 2, paddingLeft: 0 ,marginTop: -2}}
                                    size="small"
                                    label="กรุณากรอกจำนวนเงิน"
                                    id="Amounts"
                                    value={payment.Amounts}
                                    onChange={handleInputChange}

                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                            <Grid >
                                <p style={{ paddingLeft: 17, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>แอดมินผู้ทำรายการ</p>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, marginTop: -3, paddingLeft: 1, paddingRight: 2 }}>
                                    <TextField sx={{ width: "200px" }}
                                        type="string"
                                        size="small"
                                        id="Admin_ID"
                                        disabled
                                        value={payment.Admin_ID}
                                        inputProps={{
                                            name: "Admin_ID",
                                        }}
                                        onChange={handleInputChange}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid sx={{paddingLeft:1}}>
                                <p style={{ paddingLeft: 1,fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold', }}>รหัสนักศึกษา</p>
                                <TextField sx={{ width: "250px", pl: 2, paddingLeft: 0 ,marginTop: -2}}
                                    size="small"
                                    id="Student_ID"
                                    value={payment.Student_ID}
                                    onChange={handleInputChange}
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                            <Grid >
                                <p style={{ paddingLeft: 17, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>วิธีการชำระเงิน</p>
                                <Box

                                    sx={{ m: 1, marginTop: -2, }}>
                                    <Select native sx={{ ml: 1, mt: 0, width: '25ch' }}
                                        required
                                        id="Payment_Type_ID"
                                        size="small"
                                        value={payment.Payment_Type_ID + ""}
                                        onChange={handleSelectChange}
                                        inputProps={{
                                            name: "Payment_Type_ID",
                                        }}

                                    > <option aria-label="None" value=""> กรุณาเลือกวิธีการชำระเงิน </option>
                                        {payment_type.map((item: Payment_Type) => (
                                            <option
                                                defaultValue={item.Payment_Type_ID}
                                                value={item.Payment_Type_ID}
                                                key={item.Payment_Type_ID}
                                            >
                                                {item.Payment_Type_Name}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                            </Grid>
                            <Grid >
                                <p style={{ paddingLeft: 17, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>เลขที่ใบเสร็จ</p>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 1, width: '29ch' }, marginTop: -3, paddingLeft: 1, }}>
                                    <TextField sx={{ width: "200px" }}

                                        size="small"
                                        id="Receipt_number"
                                        value={payment.Receipt_number}
                                        onChange={handleInputChange}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid sx={{ paddingLeft: 4 }}>
                                <p style={{ paddingLeft: 18, fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold',}}>ระบุวัน-เวลาที่ชำระ</p>
                                {/* <TextField 
                                id="Date_Time"
                                size="small"
                                value={payment.Date_Time}
                                type="datetime-local"
                                sx={{ width: 250 ,paddingLeft:2}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /> */}
                                <FormControl fullWidth variant="outlined" size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(params) => <TextField size="small" sx={{marginTop: -2}} {...params} />}
                                            value={date_time}
                                            onChange={(newValue: Dayjs | null) => {
                                                setDate_time(newValue);
                                                console.log(newValue)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Box flexGrow={1}>
                            <Box
                                display="flex"
                                sx={{
                                    paddingBlockEnd: 3,
                                    paddingLeft: 7,
                                    marginTop: 2,
                                }}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/payment"
                                    variant="contained"
                                    color="primary"
                                >
                                    กลับ
                                </Button>
                                <Box flexGrow={1}>
                                </Box>
                                <Box sx={{ paddingRight: 5 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={submitPayment}
                                    >
                                        บันทึกรายจ่าย
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Container >
        </div>
    );

} export default CreatePayment;

function setAlertMessage(arg0: string) {
    throw new Error("Function not implemented.");
}
