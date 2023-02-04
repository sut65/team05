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


export function UpdatePayment() {
    const navigate = useNavigate();
    const params = useParams();
    const [date, setDate] = React.useState<Date | null>(null);



    //const [subject, setSubject] = React.useState<Subject[]>([]);

    const [subjects, setSubjects] = React.useState<Subject[]>([]);
    const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

    const [success, setSuccess] = React.useState(false);
    const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
    const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);
    const [payments, setPayments] = React.useState<Payment[]>([]);
    const [payment, setPayment] = React.useState<Partial<Payment>>({});
    const [payment_type, setPayment_Type] = React.useState<Payment_Type[]>([]);

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
        const { value } = event.target;
        setPayment({
            ...payment,
            [id]: event.target.value
        });
    };

    const handleInputChangeSearch = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof UpdatePayment;
        setSearchSubjectID(event.target.value);
    };

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

    const sendSearchedSubjectID = () => {
        //navigate({ pathname: `/subject/${searchSubjectID}` });
        setSearchSubjectID(searchSubjectID);
        getSubjectBySubjectID(searchSubjectID);
        //window.location.reload();
        //console.log(searchSubjectID);
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
            "Content-Type": "application/json"
        },
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



    const getCurrentPaymemt = async () => {
        fetch(`${apiUrl}/payment/${params.payment_id}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPayment(res.data);
                    console.log(res.data);
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
                    setEnrolls(res.data);
                    console.log(res.data);
                }
            });
    };

    const getSubjectByCourse = async (course_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/subjectd/${course_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setSubjects(res.data);
                }
            });
    };
    const getSubjectBySubjectID = async (subject_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/subljects/${subject_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSearchSubjectID(subject_id);
                    setSubjects(res.data);
                }
            });
    };

    // const getPrevEnroll = async () => {
    //     fetch(`${apiUrl}/previousenroll`, requestOptionsGet)
    //         .then((response) => response.json())
    //         .then((res) => {
    //             if (res.data) {
    //                 enroll.Enroll_ID = res.data.Enroll_ID + 1;
    //             }
    //             else {
    //                 enroll.Enroll_ID = res.data = "1";
    //                 //console.log("else");
    //             }
    //         });
    // };

    const getPrevPayment = async () => {
        fetch(`${apiUrl}/previousenpayment`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    payment.Payment_ID = res.data.Payment_ID;
                }
                else {
                    payment.Payment_ID = res.data = 1;
                    //console.log("else");
                }
            });
    };

    //   const getCall_Payment = async () => {
    //     fetch(`${apiUrl}/getcall_payment`, requestOptionsGet)
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.data) {
    //           payment.Unit = res.data.Unit * 800;
    //         }
    //         else {
    //           payment.Unit = res.data = 1;
    //           //console.log("else");
    //         }
    //       });
    //   };


    useEffect(() => {
        // getPrevPayment();
        getPayment_type();
        //getPrevEnroll();
        getCurrentPaymemt();


        if (searchSubjectID == "") {
            getEnroll();
        } else {
            getSubjectBySubjectID(searchSubjectID);
        }
        console.log(searchSubjectID);
    }, []);

    function updatePayment() {
        let data = {
            Admin_ID: payment.Admin_ID ?? "",
            Amounts: typeof payment.Amounts === "string" ? parseInt(payment.Amounts) : payment.Amounts,
            Date_Time: payment.Date_Time ?? "",
            Payment_ID: typeof payment.Payment_ID === "string" ? parseInt(payment.Payment_ID) : payment.Payment_ID,
            Payment_Type_ID: payment.Payment_Type_ID,
            Receipt_number: payment.Receipt_number ?? "",
            Student_ID: payment.Student_ID ?? "",
            Unit: typeof payment.Unit === "string" ? parseInt(payment.Unit) : payment.Unit,
            // Student_ID:
            //Section: typeof enroll.Section === "string" ? parseInt(enroll.Section) : enroll.Section,
        };


        const apiUrl = "http://localhost:8080/updatepayment";
        const requestOptions = {
            method: "PATCH",
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
                console.log(res);
                if (res.data) {
                    setSuccess(true);
                } else {
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
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >

                <Alert onClose={handleClose} severity="success">
                    แก้ไขข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    แก้ไชข้อมูลไม่สำเร็จ
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
                    <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
                        <Grid >
                            <p>กรุณาระบุรหัสนักศึกษา</p>
                            <Box>
                                <TextField
                                    id="Student_ID"
                                    label="ระบุรหัสนักศึกษา"
                                    variant="outlined"
                                >
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid sx={{ marginTop: '63px', marginLeft: 1, }}>
                            <Button
                                variant="contained">
                                ค้นหารหัสนักศึกษา
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: '20px', display: 'flex', marginLeft: 1 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">รหัสวิชา</TableCell>
                                        <TableCell align="left">ชื่อวิชา</TableCell>
                                        <TableCell align="left">Subject name</TableCell>
                                        <TableCell align="left">วันเรียน</TableCell>
                                        <TableCell align="left">เริ่มเรียน</TableCell>
                                        <TableCell align="left">เลิกเรียน</TableCell>
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
                                            key={row.Enroll_ID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.Subject_ID}</TableCell>
                                            <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                                            <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                                            <TableCell align="left">{row.Day}</TableCell>
                                            <TableCell align="left">{row.Start_Time}</TableCell>
                                            <TableCell align="left">{row.End_Time}</TableCell>
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
                                id="AmountsCal"
                                value={payment.AmountsCal}
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
                                    size="small"
                                    id="Admin_ID"
                                    value={payment.Admin_ID}
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
                                    onClick={updatePayment}
                                >
                                    แก้ไขรายจ่าย
                                </Button>
                            </Box>
                        </Box>
                    </Box>



                </Paper>
            </div>
        </Container >
    );

} export default UpdatePayment;