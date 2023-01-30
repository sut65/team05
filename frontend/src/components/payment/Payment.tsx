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

function createData(
    payment_ID: number,
    Student_ID: string,
    Unit: number,
    Amount: number,
    Payment_Type: string,
    Receipt_number: string,
    date_time: string,
    Admin_ID: string,) {
    return { payment_ID, date_time, Admin_ID, Receipt_number, Student_ID, Unit, Amount, Payment_Type };
}
const rows = [
    createData(1001, "B6200232", 15, 24000, "เงินสด", "12354dsf820", "12.00", "AD001"),
    createData(1002, "B6200232", 8, 10000, "เงินสด", "sdftg455653", "12.00", "AD001"),
];
export function ListPayment() {
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


    const getPayment = async () => {
        const apiUrl = "http://localhost:8080/payment";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
    useEffect(() => {
        getPayment();
    }, []);
    return (
        <Container maxWidth="xl" >
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
                        ประวัติรายการจ่าย
                    </Typography>
                </Box>
                <Box>
                    <Button
                        component={RouterLink}
                        to="/create"
                        variant="contained"
                        color="primary"
                    >
                        บันทึกรายจ่าย
                    </Button>
                </Box>
            </Box>
            <Grid sx={{ mt: 5 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">เลขที่รายการ</TableCell>
                                <TableCell align="left">รหัสนักศึกษา</TableCell>
                                <TableCell align="left">หน่วยกิจรวม</TableCell>
                                <TableCell align="left">วิธีการชำระเงิน</TableCell>
                                <TableCell align="left">เลขที่ใบเสร็จ</TableCell>
                                <TableCell align="left">จำนวนเงินที่ต้องชำระ</TableCell>
                                <TableCell align="left">จำนวนเงินที่ชำระ</TableCell>
                                <TableCell align="left">วันเวลาที่ชำระ</TableCell>
                                <TableCell align="left">ลบรายการ</TableCell>
                                <TableCell align="left">แก้ไขรายจ่าย</TableCell>
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
                                    <TableCell align="left">{row.Payment_Type_Name}</TableCell>
                                    <TableCell align="left">{row.Receipt_number}</TableCell>
                                    <TableCell align="left">{row.Amounts}</TableCell>
                                    <TableCell align="left">{row.Amounts}</TableCell>
                                    <TableCell align="left">{row.Date_Time}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="delete"
                                            //onClick={() => deleteEnroll(row.Enroll_ID)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            ///${row.Subject_ID}/${row.Section}
                                            onClick={() => {
                                                //navigate({ pathname: `/updateenroll/${row.Enroll_ID}` })
                                            }}
                                        >
                                            <ModeEditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>

        </Container >
    );
} export default ListPayment;