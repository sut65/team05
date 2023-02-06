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
import { Alert, CssBaseline, Grid, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TableFooter, TablePagination } from "@mui/material";
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


export function CreatePayment() {
    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = React.useState<Date | null>(null);



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
            Date_Time: payment.Date_Time ?? "",
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
        <Container maxWidth={false}
            sx={{
                mt: 10,
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}>
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
            <Paper sx={{ pt: -1, pl: 1, pr: 1, mt: 1 }}>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography
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
            <div>
                <Paper

                >
                    <Grid container sx={{ marginTop: '5px', marginLeft: 7, }}>
                        <Grid >
                            <p>กรุณาระบุรหัสนักศึกษา</p>
                            <Box>
                                <TextField
                                    label="ระบุรหัสนักศึกษา"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                >
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid sx={{ marginTop: '63px', marginLeft: 1, }}>
                            <Button
                                variant="contained"
                                onClick={sendSearchedStudentID}
                            >
                                ค้นหารหัสนักศึกษา
                            </Button>
                        </Grid>
                    </Grid>
                    
                        <Grid sx={{ marginTop: '20px', display: 'flex', paddingLeft:6,marginLeft: 1 ,width:700}}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">รหัสวิชา</TableCell>
                                            <TableCell align="left">ชื่อวิชา</TableCell>
                                            <TableCell align="left">Subject name</TableCell>
                                            <TableCell align="left">หน่วยกิต</TableCell>
                                            <TableCell align="left">กลุ่ม</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? enrolls.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage)
                                            : enrolls
                                        ).map((row) => (
                                            <TableRow
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
                    <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                        <Grid >
                            <p style={{ paddingLeft: 17, }}>หน่วยกิจรวม</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, marginTop: -1, paddingLeft: 1, }}>
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
                            <p style={{ paddingLeft: 18, }}>จำนวนเงินที่ต้องชำระ</p>
                            <TextField sx={{ width: "250px", pl: 2 }}
                                size="small"
                                id="Payable"
                                value={add(payment.Unit)}
                                //value={payment.Payable}
                                onChange={handleInputChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid sx={{ marginLeft: 3, }}>
                            <p style={{ paddingLeft: 18, }}>จำนวนเงินที่นักศึกษาชำระ</p>
                            <TextField sx={{ width: "250px", pl: 2 }}
                                size="small"
                                id="Amounts"
                                value={payment.Amounts}
                                onChange={handleInputChange}

                            >
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                        <Grid >
                            <p style={{ paddingLeft: 17, }}>แอดมินผู้ทำรายการ</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, marginTop: -1, paddingLeft: 1, }}>
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
                        <Grid >
                            <p style={{ paddingLeft: 18, }}>รหัสนักศึกษา</p>
                            <TextField sx={{ width: "250px", pl: 2 }}
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
                            <p style={{ paddingLeft: 17, }}>วิธีการชำระเงิน</p>
                            <Box

                                sx={{ m: 1, marginTop: -2, }}>
                                <Select sx={{ ml: 1, mt: 2, width: '25ch' }}
                                    id="Payment_Type_ID"
                                    size="small"
                                    value={payment.Payment_Type_ID}
                                    onChange={handleSelectChange}
                                    inputProps={{
                                        name: "Payment_Type_ID",
                                    }}

                                >
                                    {payment_type.map((item: Payment_Type) => (
                                        <MenuItem
                                            value={item.Payment_Type_ID}
                                            key={item.Payment_Type_ID}
                                        >
                                            {item.Payment_Type_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Grid>
                        <Grid >
                            <p style={{ paddingLeft: 17, }}>เลขที่ใบเสร็จ</p>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, marginTop: -1, paddingLeft: 1, }}>
                                <TextField sx={{ width: "200px" }}

                                    size="small"
                                    id="Receipt_number"
                                    value={payment.Receipt_number}
                                    onChange={handleInputChange}
                                >
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid >
                            <p style={{ paddingLeft: 18, }}>ระบุวัน-เวลาที่ชำระ</p>
                            <TextField sx={{ width: "270px", pl: 2 }}

                                size="small"
                                id="Date_Time"
                                value={payment.Date_Time}
                                onChange={handleInputChange}
                            >
                            </TextField>
                        </Grid>

                    </Grid>
                    <Box flexGrow={1}>
                        <Box
                            display="flex"
                            sx={{
                                paddingBlockEnd: 10,
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
            </div>
        </Container >
    );

} export default CreatePayment;

function setAlertMessage(arg0: string) {
    throw new Error("Function not implemented.");
}
