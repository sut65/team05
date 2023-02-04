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
import { CssBaseline, Grid, Paper, SelectChangeEvent, TableFooter, TablePagination } from "@mui/material";
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


export function ListPayment() {
    const navigate = useNavigate();
    const params = useParams();
    const [payment, setPayment] = React.useState<Partial<Payment>>({});
    const [payments, setPayments] = React.useState<Payment[]>([]);

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
    }, []);
    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}
        >
            <Paper sx={{ padding: 1 }}>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography
                            variant="h5"
                            color="primary"
                            gutterBottom
                        >
                            ประวัติรายการจ่าย
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/payment/payment_create"
                            variant="contained"
                            color="primary"
                        >
                            บันทึกรายจ่าย
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{mt:2}}>
                <Typography
                    sx={{padding:2}}
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
            <Grid sx={{ mt: 5 }}>
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
                                <TableRow key={row.Payment_ID}>
                                    <TableCell align="left">{row.Payment_ID}</TableCell>
                                    <TableCell align="left">{row.Student_ID}</TableCell>
                                    <TableCell align="left">{row.Unit}</TableCell>
                                    <TableCell align="left">{row.Payment_Type_ID}</TableCell>
                                    <TableCell align="left">{row.Receipt_number}</TableCell>
                                    <TableCell align="left">{row.Payable}</TableCell>
                                    <TableCell align="left">{row.Amounts}</TableCell>
                                    <TableCell align="left">{row.Date_Time}</TableCell>
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
                                </TableRow>
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

        </Container >
    );
} export default ListPayment;