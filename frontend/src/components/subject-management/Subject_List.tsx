import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Subject } from "../../models/I_Subject";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Home_Navbar from "../navbars/Home_navbar";
// Add button to each row for getting certain data from selected row
// Source: https://smartdevpreneur.com/add-buttons-links-and-other-custom-cells-in-material-ui-datagrid/

// MUI Table 
// Source : https://mui.com/material-ui/react-table/
function SubjectList() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#5B98B9",
            color: theme.palette.common.white,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#EAF1F4",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 1,
        },
    }));
    const apiUrl = "http://localhost:8080";

    const navigate = useNavigate();
    // const params = useParams();
    // console.log(params)

    const [subjects, setSubjects] = React.useState<Subject[]>([]);
    const [searchSubjectID, setSearchSubjectID] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_subject_id = event.target.value;
        setSearchSubjectID(searched_subject_id);

    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const sendSearchedSubjectID = () => {
        getSubjectBySubjectID()
    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;


    const getSubjects = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subjects`, requestOptions)
            .then((response) => response.json())
            .then((res) => {

                if (res.data) {
                    setSubjects(res.data);
                    console.log(res.data)
                }
            });
    };

    const getSubjectBySubjectID = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subject/${searchSubjectID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {

                if (res.data) {
                    setSubjects(res.data);
                }
            });
    };
    useEffect(() => {
        // Fetch all subject records from api if `subject_id` parameter value is undefined
        if (searchSubjectID === "") {
            getSubjects()
        }
    }, []);


    return (
        <div>
            <Container maxWidth={false}
                sx={{
                    bgcolor: "#e1e1e1",
                    width: "auto",
                    height: "auto",
                    padding: 2
                }}>

                {/* Header components */}
                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                    <Typography variant="h4"> ระบบจัดการรายวิชา </Typography>
                    <Typography> รายการรายวิชาทั้งหมด </Typography>
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2 }}>
                    <Box
                        display="flex"
                        sx={{ marginTop: 2, padding: 1 }}>
                        <Box flexGrow={1}>
                            <TextField
                                variant="standard"
                                size="small"
                                label="ค้นหารายวิชา"
                                onChange={handleInputChange}
                            ></TextField>

                            <Button
                                variant="contained"
                                onClick={sendSearchedSubjectID}
                                sx={{ borderRadius: 0, margin: 1.25 }}>
                                <SearchIcon></SearchIcon>
                            </Button>
                        </Box>
                        <Button
                            component={RouterLink}
                            to="/subject/subject_create"
                            variant="contained"
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > Add </Button>
                    </Box>

                    <TableContainer sx={{ width: "auto" }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#5B98B9" }}>
                                <TableRow sx={{ width: "auto" }}>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>รหัสวิชา</StyledTableCell>
                                    <StyledTableCell width={"auto"} sx={{ border: 1 }}>ชื่อรายวิชา</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>อาจารย์</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>หน่วยกิจ</StyledTableCell>
                                    <StyledTableCell width={225} sx={{ border: 1 }}>หลักสูตร</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>เปิด</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>ลง</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>เหลือ</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>สถานะ</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>Info</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(rowsPerPage > 0
                                    ? subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : subjects
                                ).map((row) => (
                                    <StyledTableRow key={row.ID}>
                                        <TableCell>{row.Subject_ID}</TableCell>
                                        <TableCell>{row.Subject_EN_Name}</TableCell>
                                        <TableCell>{row.Professor_Name}</TableCell>
                                        <TableCell>{row.Unit}</TableCell>
                                        <TableCell>{row.Course_Name}</TableCell>
                                        <TableCell>{row.Capacity}</TableCell>
                                        <TableCell>{row.Enroll_Amount}</TableCell>
                                        <TableCell>{row.Capacity - row.Enroll_Amount}</TableCell>
                                        <TableCell>{row.Subject_Status_ID}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{ borderRadius: 0 }}
                                                onClick={() => {
                                                    navigate({ pathname: `/subject/${row.Subject_ID}/${row.Section}` })
                                                }}> Info </Button>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={subjects.length}
                                        count={subjects.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
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

                </Paper>
            </Container>

        </div>
    );
}
export default SubjectList;