import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {ProfessorInterface} from"../../models/I_Professor";
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
// Add button to each row for getting certain data from selected row
// Source: https://smartdevpreneur.com/add-buttons-links-and-other-custom-cells-in-material-ui-datagrid/

// MUI Table 
// Source : https://mui.com/material-ui/react-table/
function ProfessorList() {
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
    const params = useParams();
    // console.log(params)

    const [professors, setProfessors] = React.useState<ProfessorInterface[]>([]);
    const [searchProfessorID, setSearchProfessorID] = React.useState("");
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
   
   
    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_professor_id = event.target.value;
        setSearchProfessorID(searched_professor_id);

    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const sendSearchedProfessorID = () => {
        navigate({ pathname: `/professor/${searchProfessorID}` })
        window.location.reload()
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - professors.length) : 0;


    const getPrrfessors = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/professors`, requestOptions)
            .then((response) => response.json())
            .then((res) => {

                if (res.data) {
                    setProfessors(res.data);
                    console.log(res.data)
                }
            });
    };

    const getProfessorsByProfessorID = async (subject_id: any) => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/subject/${subject_id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {

                if (res.data) {
                    setSearchProfessorID(subject_id);
                    setProfessors(res.data);
                }
            });
    };

    useEffect(() => {
        // Fetch all subject records from api if `subject_id` parameter value is undefined
        if (params.subject_id == undefined) {
            getPrrfessors()
        }

        else {
            getProfessorsByProfessorID(params.subject_id)
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
                    <Typography variant="h4"> ระบบจัดการข้อมูลอาจารย์ </Typography>
                    <Typography> ข้อมูลอาจารย์ทั้งหมด </Typography>
                </Paper>

                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2 }}>
                    <Box
                        display="flex"
                        sx={{ marginTop: 2, padding: 1 }}>
                        <Box flexGrow={1}>
                            <TextField
                                variant="standard"
                                size="small"
                                label="ค้นหาอาจารย์"
                                onChange={handleInputChange}
                            ></TextField>

                            <Button
                                variant="contained"
                                onClick={sendSearchedProfessorID}
                                sx={{ borderRadius: 0, margin: 1.25 }}>
                                <SearchIcon></SearchIcon>
                            </Button>
                        </Box>
                        <Button
                            component={RouterLink}
                            to="/professor/handle-create"
                            variant="contained"
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > Add </Button>
                    </Box>

                    <TableContainer sx={{ width: "auto" }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#5B98B9" }}>
                                <TableRow sx={{ width: "auto" }}>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>เลขบัตรประชาชน</StyledTableCell>
                                    <StyledTableCell width={"auto"} sx={{ border: 1 }}>ชื่อ</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>ที่อยู่</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1 }}>อีเมล์</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>เบอร์โทรศัพท์</StyledTableCell>
                                    <StyledTableCell width={225} sx={{ border: 1 }}>วุฒิการศึกษา</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>สถานะอาจารย์</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>รหัส</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1 }}>ผู้บันทึกข้อมูล</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(rowsPerPage > 0
                                    ? professors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : professors
                                ).map((row) => (
                                    <StyledTableRow key={row.ID}>
                                        <TableCell>{row.Professor_ID}</TableCell>
                                        <TableCell>{row.Professor_name}</TableCell>
                                        <TableCell>{row.Professor_address}</TableCell>
                                        <TableCell>{row.Professor_email}</TableCell>
                                        <TableCell>{row.Professor_tel}</TableCell>
                                        <TableCell>{row.QualificationID}</TableCell>
                                        <TableCell>{row.StatusID}</TableCell>
                                        <TableCell>{row.Professor_password}</TableCell>
                                        <TableCell>{row.AdminID}</TableCell>
                                        
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
                                        colSpan={professors.length}
                                        count={professors.length}
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
export default ProfessorList;