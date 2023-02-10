import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { RequestInterface } from "../../models/IRequest";
import { Request_TypeInterface } from "../../models/IRequest_Type";
import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import { ApprovalInterface } from "../../models/I_Approval";
import { Approval_TypeInterface } from "../../models/I_Approval_Type";
import Home_Navbar from "../navbars/Home_navbar";

function Approval() {
  const [approval, setApproval] = React.useState<Partial<ApprovalInterface>>(
    {}
  );
  const [approvals, setApprovals] = React.useState<ApprovalInterface[]>([]);
  const [subject, setSubject] = React.useState<Subject[]>([]);
  const [approval_type, setApproval_Type] = React.useState<
    Approval_TypeInterface[]
  >([]);

  const [request, setRequest] = React.useState<RequestInterface[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();
  // const getRequest = async () => {

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
    const id = event.target.id as keyof typeof Approval;
    const { value } = event.target;
    setApproval({ ...approval, [id]: value });
  };

  const apiUrl = "http://localhost:8080";

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - approvals.length) : 0;
  
  const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
  };
  
  //approvall
  const getApprovals = async () => {
    let uid = localStorage.getItem("id");
    fetch(`${apiUrl}/approvalprofessor/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setApprovals(res.data);
          console.log(res.data);
        }
      });
  };
  //delete
  const deleteApproval = async (approval_id: number) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/approval/${approval_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("Data remove");
          window.location.href = "/approval";
        } else {
          console.log("Something was wrong!!");
        }
      });
  };

  //table
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

  useEffect(() => {
    getApprovals();
  }, []);

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#e1e1e1",
          width: "auto",
          height: "auto",
          padding: 2,
        }}
      >
        <Home_Navbar></Home_Navbar>
        <Toolbar></Toolbar>
        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
              >
                ระบบอนุมัติคำร้องออนไลน์
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/approval/approval_create"
                variant="contained"
                color="primary"
              >
                อนุมัติคำร้องออนไลน์
              </Button>
            </Box>
          </Box>
          <Typography component="h2" variant="h6" color="Black" gutterBottom>
            Requirement
          </Typography>
          <Box>
            ระบบลงทะเบียนเรียน
            เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง
            สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทยาลัยนั้นได้กำหนดไว้
            ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา
            และการยื่นคำร้องออนไลน์
            โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้
            ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน ,
            และการอนุมัติคำร้องออนไลน์
            จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้
            และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร ,
            การเพิ่มข้อมูลรายวิชา ,การคำนวณค่าใช้จ่าย ,การเพิ่มข้อมูลอาจารย์
            และเพิ่มข้อมูลห้องเรียนในทีนี้จะขอกล่าวถึงระบบอนุมัติคำร้องกรณีกลุ่มเต็มเท่านั้น
            ระบบอนุมัติคำร้องออนไลน์เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทำการบันทึก
            และแก้ไขข้อมูลการอนุมัติคำร้องออนไลน์ได้จากนักศึกษาที่ยื่นคำร้องออนไลน์เข้าในระบบ
            โดยทำการเลือกรหัสการยื่นคำร้องออนไลน์ที่ต้องการตรวจสอบคำร้อง
            จากนั้นเลือกผลการอนุมัติ
            โดยสามารถเลือกกดอนุมัติคำร้องหรือไม่อนุมัติคำร้องให้กับนักศึกษาที่ยื่นคำร้องออนไลน์มา
            เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว
            อาจารย์จะสามารถกดบันทึกการอนุมัติคำร้องออนไลน์ได้
            โดยจะสามารถแก้ไขข้อมูลได้ในภายหลัง
            และนอกจากนี้อาจารย์สามารถดูข้อมูลการอนุมัติคำร้องออนไลน์ที่บันทึกในรูปแบบของตารางได้
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ลำดับ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสคำร้อง
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสนักศึกษา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสวิชา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รายวิชา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    หน่วยกิต
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    กลุ่ม
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    หลักสูตร
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ประเภทคำร้อง
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    อาจารย์
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    เหตุผล
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ผลการอนุมัติ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ลบ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    แก้ไข
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? approvals.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : approvals
                ).map((row) => (
                  <StyledTableRow key={row.Approval_ID}>
                    <TableCell component="th" scope="row" align="center">
                      {row.Approval_ID}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Request_ID}
                    </TableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.Student_ID}
                    </StyledTableCell>
                    <TableCell align="center">{row.Subject_ID}</TableCell>
                    <TableCell align="center">{row.Subject_EN_Name}</TableCell>
                    <TableCell align="center">{row.Unit}</TableCell>
                    <TableCell align="center">{row.Section}</TableCell>
                    <TableCell align="center">{row.Course_Name}</TableCell>
                    <TableCell align="center">
                      {row.Request_Type_Name}
                    </TableCell>
                    <TableCell align="center">{row.Professor_Name}</TableCell>
                    <TableCell style={{ color: "#1300FF" }} align="center">
                      {row.Reason}
                    </TableCell>
                    <TableCell style={{ color: "#1300FF" }} align="center">
                      {row.Approval_Type_Name}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#393838" }}
                        onClick={() => deleteApproval(row.Approval_ID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        style={{ color: "#393838" }}
                        onClick={() => {
                          navigate({
                            pathname: `/approval/update/${row.Approval_ID}`,
                          });
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={approvals.length}
                    count={approvals.length}
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
        </Paper>
      </Container>
    </div>
  );
}

export default Approval;
