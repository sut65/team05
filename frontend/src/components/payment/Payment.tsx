import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Navbar from "./Payment_Navbar";
import Home_Navbar from "../navbars/Home_navbar";
import { EnrollInterface } from "../../models/I_Enroll";
import { Subject } from "../../models/I_Subject";
import { Course } from "../../models/I_Course";
//import { StudentInterface } from "../models/studentInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CssBaseline, Grid, Paper, SelectChangeEvent, TableFooter, TablePagination, TextField } from "@mui/material";
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
import { Payment } from "../../models/I_Payment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from "@mui/material/colors";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
export function ListPayment() {
    const navigate = useNavigate();
    const params = useParams();
    const [payment, setPayment] = React.useState<Partial<Payment>>({});
    const [payments, setPayments] = React.useState<Payment[]>([]);
    const [SearchStudentID, setSearchStudentID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);



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
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof payment;
        const searched_student_id = event.target.value;
        setSearchStudentID(searched_student_id)
        setPayment({
            ...payment,
            [id]: event.target.value
        });
    };
    const sendSearchedStudentID = () => {
        setSearchStudentID(SearchStudentID);
        getPaymentByStudentID(SearchStudentID);
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



    const getPayment = async () => {
        const apiUrl = "http://localhost:8080/payment";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())

            .then((res) => {
                console.log(res.data);

                if (res.data) {
                    setPayments(res.data);
                }
            });
    };
    const apiUrl = "http://localhost:8080";
    const getPaymentByStudentID = async (student_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        console.log(SearchStudentID)
        fetch(`${apiUrl}/paymentdata/${SearchStudentID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setPayments(res.data);
                    //setSubjects(res.data);
                }
            });
    };


    const deletePayment = async (payment_id: number) => {
        console.log("good");
        const apiUrl = "http://localhost:8080";
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };


        fetch(`${apiUrl}/delepayment/${payment_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Data remove");
                    window.location.href = "/payment";
                } else {
                    console.log("Something was wrong!!");
                }
            });
    };

    useEffect(() => {
        getPayment();
        if (SearchStudentID == "") {
            getPayment();
        } else {
            getPaymentByStudentID(SearchStudentID);
        }
    }, []);
    return (
        <div>
            <Home_Navbar></Home_Navbar>
            <Container maxWidth={false}
                sx={{
                    mt: -1,
                    width: "auto",
                    height: "auto",
                    p: 1,
                    bgcolor: '#93BFCF'
                }}>
                <Container maxWidth="xl" style={{ height: "auto" }} sx={{ p: 2, bgcolor: '#BEF0CB', mt: 6 }}>
                    <Paper sx={{
                        height: 50,
                        bgcolor: '#FFFAF0',
                        mt: 3
                    }}>
                        <Box
                            display="flex"
                            sx={{
                                marginTop: 2,
                            }}
                        ><CreditScoreIcon sx={{ fontSize: 40, mt: 0.6, paddingRight: 1,paddingLeft:1, color: "#388e3c" }} />
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{ fontFamily: "LilyUPC", fontSize: 35, fontWeight: 'bold',mt:0.5 }}
                                    variant="h5"
                                    color="primary"
                                    gutterBottom
                                >
                                    ประวัติรายจ่าย
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ mt: 2 }}>
                        <Typography
                            sx={{ padding: 2 }}
                            variant="subtitle2"
                            color="back"
                            gutterBottom
                        >
                            ระบบบันทึกรายจ่ายเป็นระบบที่ให้เจ้าหน้าที่ของมหาลัย
                            หรือแอดมินใช้ เพื่อยืนยันการชําระเงินค่าลงทะเบียนเรียนของนักศึกษา
                            โดยเมื่อนักศึกษาทําการจ่ายเงินตามจํานวนครบแล้ว
                            จะต้องยื่นหลักฐานเพื่อให้เจ้าหน้าที่ของมหาลัย หรือแอดมิน
                            ทําการบันทึกลงในระบบ โดยสิงที่ต้องบันทึกประกอบไปด้วยจํานวนเงินที่ชําระเลขที่ใบเสร็จ
                            ในกรณีที่นักศึกษาใช้ประเภทการชําระเป็นการชําระด้วยการโอน และกรอกวันเวลาที่จ่าย
                            นักศึกษาสามารถผ่อนจ่ายได้ ไม่จําเป็นต้องชําระเต็มจํานวนในครั้งเดียว แอดมินสามารถแก้ไขรายจ่ายให้นักศึกษาได้
                        </Typography>
                    </Paper>
                    <Paper sx={{ padding: 2, mt: 2 }}>
                        <Grid container sx={{ marginTop: -1, marginLeft: 0, height: 70, }}>
                            <Grid >
                                <Typography sx={{ fontFamily: "LilyUPC", fontSize: 25, fontWeight: 'bold' }}>
                                    ค้นหารหัสนักศึกษา
                                </Typography>

                                <Box>
                                    <TextField

                                        sx={{ mt: 0 }}
                                        size="small"
                                        id="Student_ID"
                                        label="ระบุรหัสนักศึกษา"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    >
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid sx={{ marginTop: 4.7, marginLeft: 2, }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon sx={{ color: "#84ffff" ,}}/>}
                                    onClick={sendSearchedStudentID}
                                >
                                    ค้นหาประวัติรายจ่าย
                                </Button>
                            </Grid>
                            <Grid sx={{paddingLeft:3,mt:3.7}}>
                                <Box sx={{ paddingRight: 2 }}>
                                    <Button
                                        sx={{ mt: 1, paddingRight: 2 }}
                                        color="success"
                                        component={RouterLink}
                                        to="/payment/payment_create"
                                        variant="contained"
                                        
                                        startIcon={<AddCircleOutlineIcon sx={{ color: "#b2ff59" ,}}/>}
                                    >
                                        เพิ่มบันทึกรายจ่าย
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper sx={{ padding: 2, marginTop: 2 }}>
                        <Grid sx={{ mt: 0 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">เลขที่รายการ</StyledTableCell>
                                            <StyledTableCell align="left">รหัสนักศึกษา</StyledTableCell>
                                            <StyledTableCell align="left">หน่วยกิจรวม</StyledTableCell>
                                            <StyledTableCell align="left">วิธีการชำระเงิน</StyledTableCell>
                                            <StyledTableCell align="left">เลขที่ใบเสร็จ</StyledTableCell>
                                            <StyledTableCell align="left">จำนวนเงินที่ต้องชำระ</StyledTableCell>
                                            <StyledTableCell align="left">จำนวนเงินที่ชำระ</StyledTableCell>
                                            <StyledTableCell align="left">วันเวลาที่ชำระ</StyledTableCell>
                                            <StyledTableCell align="left">ไอดีผู้ทำรายการ</StyledTableCell>
                                            <StyledTableCell align="left">ลบรายการ</StyledTableCell>
                                            <StyledTableCell align="left">แก้ไขรายจ่าย</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? payments.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : payments
                                        ).map((row) => (
                                            <StyledTableRow key={row.Payment_ID}>
                                                <TableCell align="left">{row.Payment_ID}</TableCell>
                                                <TableCell align="left">{row.Student_ID}</TableCell>
                                                <TableCell align="left">{row.Unit}</TableCell>
                                                <TableCell align="left">{row.Payment_Type_ID}</TableCell>
                                                <TableCell align="left">{row.Receipt_number}</TableCell>
                                                <TableCell align="left">{row.Payable}</TableCell>
                                                <TableCell align="left">{row.Amounts}</TableCell>
                                                <TableCell align="left">{row.Date_Time.toString()}</TableCell>
                                                <TableCell align="left">{row.Admin_ID}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => deletePayment(row.Payment_ID)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        // ${row.Payment_ID}/${row.Section}
                                                        onClick={() => {
                                                            navigate({ pathname: `/payment/updatepayment/${row?.Payment_ID}` })
                                                        }}
                                                    >
                                                        <ModeEditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
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
                                                colSpan={payments.length}
                                                count={payments.length}
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
                </Container >

            </Container>
        </div>
    );
} export default ListPayment;