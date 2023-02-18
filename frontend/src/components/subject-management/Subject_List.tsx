import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Subject } from "../../models/I_Subject";
import { Divider, IconButton, Paper, Stack, Toolbar, useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Home_Navbar from "../navbars/Home_navbar";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

// Add button to each row for getting certain data from selected row
// Source: https://smartdevpreneur.com/add-buttons-links-and-other-custom-cells-in-material-ui-datagrid/
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

  
function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  

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
    const [searchSubjectKey, setSearchSubjectKey] = React.useState(``);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;


    const handleInputChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        const searched_subject_key = event.target.value;
        setSearchSubjectKey(searched_subject_key);

    };


    const sendSearchedSubjectKey = () => {
        getSubjectBySubjectKey()
    };



    const getSubjects = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
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

    const getSubjectBySubjectKey = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        fetch(`${apiUrl}/get_subject/${searchSubjectKey}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    setSubjects(res.data);
                }
            });
    };
    useEffect(() => {
        // Fetch all subject records from api if `subject_id` parameter value is undefined
        if (searchSubjectKey === "") {
            getSubjects()
        } else {
            getSubjectBySubjectKey()
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
                <Home_Navbar />
                <Toolbar />

                {/* Header components */}
                <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                    <Stack direction="row">
                        <Box sx={{ padding: 2, border: 0 }}>
                            <AutoStoriesSharpIcon fontSize="large" />
                        </Box>
                        <Box sx={{ padding: 1, border: 0 }}>
                            <Typography variant="h4" sx={{ fontFamily: "Verdana", fontWeight: "bold", paddingBottom: 1.5 }}> ระบบจัดการข้อมูลรายวิชา </Typography>

                        </Box>
                    </Stack>
                    <Stack flexGrow={1} direction="row" sx={{ border: 0, }}>
                        <Box flex={1} sx={{ border: 0, padding: 2 }}>
                            <Typography variant="h5" sx={{ fontFamily: "Vendana", fontWeight: "bold", fontSize: 24 }}> Requirement </Typography>
                            <Divider />
                            <Typography sx={{ padding: 1, fontSize: 18 }}>
                                ระบบจัดการข้อมูลรายวิชา เป็นระบบที่แอดมินสามารถเพิ่ม, แก้ไข หรือลบข้อมูลรายวิชาได้โดยข้อมูล
                                รายวิชานั้นจะประกอบไปด้วย รหัสวิชา, ชื่อรายวิชาภาษาไทยและภาษาอังกฤษ, อาจารย์ผู้สอน, สาขาวิชาที่
                                รับผิดชอบรายวิชา, จำนวนหน่วยกิจ, หลักสูตร, สถานะรายวิชา, เวลาในการสอน กลุ่มเรียน และจำนวนที่เปิดรับ
                            </Typography>
                        </Box>
                        <Box flex={1} sx={{ border: 0, padding: 1 }}>
                            <Stack direction="row" sx={{ padding: 0 }}>
                                <Box sx={{ padding: 0.5 }}>
                                    <SearchIcon />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}> การค้นหารายวิชา </Typography>
                            </Stack>
                            <Box sx={{ padding: 1, bgcolor: "#e1e1e1" }}>
                                <Typography sx={{ fontSize: 18 }}>
                                    1. ค้นหาวิชาที่มีรหัสขึ้นต้นด้วย 102 ป้อน 102* ลงในช่องค้นหารายวิชา
                                </Typography>

                                <Typography sx={{ fontSize: 18 }}>
                                    2.  ค้นหาวิชาที่มีรหัสลงท้ายต้นด้วย 102 ป้อน *102 ลงในช่องค้นหารายวิชา
                                </Typography>

                                <Typography sx={{ fontSize: 18 }}>
                                    3. ค้นหาวิชาที่มีชื่อวิชาลงท้ายด้วย finance ป้อน *finance ลงในช่องค้นหารายวิชา
                                </Typography>

                                <Typography sx={{ fontSize: 18 }}>
                                    4. ค้นหาวิชาที่มีชื่อวิชาขึ้นต้นด้วย finance ป้อน finance* ลงในช่องค้นหารายวิชา
                                </Typography>

                                <Typography sx={{ fontSize: 18 }}>
                                    5. ค้นหาวิชาที่มีคำว่า world เป็นส่วนหนึ่งของชื่อวิชา ป้อน *world* ลงในช่องค้นหารายวิชา
                                </Typography>

                            </Box>
                        </Box>
                    </Stack>

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
                                sx={{ fontFamily: "Verdana" }}
                            ></TextField>

                            <Button
                                variant="contained"
                                onClick={sendSearchedSubjectKey}
                                sx={{ borderRadius: 0, margin: 1.25 }}>
                                <SearchIcon></SearchIcon>
                            </Button>
                        </Box>
                        <Button
                            component={RouterLink}
                            to="/subject/subject_create"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ borderRadius: 0, margin: 1.25, marginTop: 1.5 }}
                        > ADD
                        </Button>
                    </Box>

                    <TableContainer sx={{ width: "auto" }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#5B98B9" }}>
                                <TableRow sx={{ width: "auto" }}>
                                    <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>รหัสวิชา</StyledTableCell>
                                    <StyledTableCell width={250} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>ชื่อรายวิชา</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>กลุ่มที่</StyledTableCell>
                                    <StyledTableCell width={100} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>อาจารย์</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>หน่วยกิจ</StyledTableCell>
                                    <StyledTableCell width={225} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>หลักสูตร</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>เปิด</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>ลง</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>เหลือ</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>สถานะ</StyledTableCell>
                                    <StyledTableCell width={50} sx={{ border: 1, fontFamily: "Verdana", fontWeight: "bold" }}>Info</StyledTableCell>
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
                                        <TableCell>{row.Section}</TableCell>
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
                                        colSpan={10}
                                        count={subjects.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
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