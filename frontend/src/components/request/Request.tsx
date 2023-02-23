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
import { Stack, Divider, Grid, Toolbar, Snackbar} from "@mui/material";
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
import Home_Navbar from "../navbars/Home_navbar";
import { ApprovalInterface } from "../../models/I_Approval";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Swal from "sweetalert2";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Request() {
  const [request, setRequest] = React.useState<Partial<RequestInterface>>({});
  const [requests, setRequests] = React.useState<RequestInterface[]>([]);
  const [subject, setSubject] = React.useState<Subject[]>([]);
  const [request_type, setRequest_Type] = React.useState<
    Request_TypeInterface[]
  >([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 const [approvals, setApprovals] = React.useState<ApprovalInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
 const [message, setAlertMessage] = React.useState("");
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
    const id = event.target.id as keyof typeof Request;
    const { value } = event.target;
    setRequest({ ...request, [id]: value });
  };

  const apiUrl = "http://localhost:8080";

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;
  const emptyRowsA =
     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - approvals.length) : 0;
  //request 
  const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
  };
  
  const getRequests = async () => {
    let uid = localStorage.getItem("id");
    fetch(`${apiUrl}/requeststudent/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRequests(res.data);
          console.log(res.data);
        }
      });
  };

  const getApprovalStudents = async () => {
    fetch(`${apiUrl}/approvalstudent/${localStorage.getItem("id")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setApprovals(res.data);
          console.log(res.data);
        }
      });
  };

  //delete
  const deleteRequest = async (request_id: number,Subject_ID:string) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    Swal.fire({
      title: "ต้องการลบการยื่นคำร้องออนไลน์ \n" + Subject_ID + " หรือไม่",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: true,
      denyButtonText: `ปิด`,
      confirmButtonText: "ลบการยื่นคำร้องออนไลน์",
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`${apiUrl}/request/${request_id}`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);

            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "ลบรายการเรียบร้อย !",
                text: "Success",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อมูลผิดพลาด !",
                text: res.error,
              });
            }
            //window.location.href = "/request";
          });
      }
    });
  };

  //table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#44484D",
      color: theme.palette.common.white,
      fontFamily: "Noto Sans Thai",
      fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.common.black,
      fontFamily: "Noto Sans Thai",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
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
    getRequests();
    getApprovalStudents();
  }, []);

  

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          width: "auto",
          height: "auto",
          p: 2,
          bgcolor: "#DADADA",
          flexGrow: 1,
          fontFamily: "Noto Sans Thai",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "#DADADA",
            width: "auto",
            height: "auto",
            padding: 2,
          }}
        >
          <Home_Navbar></Home_Navbar>
          <Toolbar></Toolbar>
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
          <Paper
            elevation={3}
            sx={{ bgcolor: "white", padding: 2, marginBottom: 2, boxShadow: 1 }}
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
                  color="#454547"
                  sx={{
                    flexGrow: 1,
                    fontFamily: "Noto Sans Thai",
                  }}
                  gutterBottom
                >
                  ระบบยื่นคำร้องออนไลน์
                </Typography>
              </Box>
              <Box>
                <Button
                  component={RouterLink}
                  to="/request/request_create"
                  variant="contained"
                  size="large"
                  sx={{
                    boxShadow: 3,
                    flexGrow: 1,
                    fontFamily: "Noto Sans Thai",
                    ":hover": {
                      bgcolor: "#212121",
                    },
                  }}
                >
                  ยื่นคำร้องออนไลน์
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{ bgcolor: "white", padding: 2, marginBottom: 2, boxShadow: 1 }}
          >
            <Typography
              component="h2"
              variant="h5"
              color="primary"
              gutterBottom
              sx={{
                flexGrow: 1,
                fontFamily: "Noto Sans Thai",
              }}
            >
              Requirement
            </Typography>
            <Box sx={{ bgcolor: "#FEF6D6" }}>
              ระบบลงทะเบียนเรียน
              เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง
              สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทยาลัยนั้นได้กำหนดไว้
              ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา
              และการยื่นคำร้องออนไลน์
              โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้
              ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน ,
              และการอนุมัติคำร้องออนไลน์
              จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้
              และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร
              , การเพิ่มข้อมูลรายวิชา และการคำนวณค่าใช่จ่าย
              โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้ในทีนี้จะขอกล่าวถึงระบบยื่นคำร้องออนไลน์เท่านั้น
              ระบบยื่นคำร้องออนไลน์เป็นระบบย่อยที่นักศึกษา
              สามารถจัดการในส่วนของการสามารถบันทึก,
              แก้ไขและลบข้อมูลการยื่นคำร้องออนไลน์ได้
              โดยนักศึกษาสามารถเลือกรายวิชาและเลือกประเภทคำร้องที่ต้องการยื่นคำร้องออนไลน์
              ซึ่งประเภทคำร้อง ได้แก่ กลุ่มเต็มและเปลี่ยนกลุ่ม
              เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว
              นักศึกษาจะสามารถกดบันทึกการยื่นคำร้องให้อาจารย์ในรายวิชาที่ต้องการยื่นคำร้องออนไลน์ได้
              โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง
              และนอกจากนี้นักศึกษาสามารถดูข้อมูลการยื่นคำร้องออนไลน์ที่บันทึกในรูปแบบของตารางได้
            </Box>
          </Paper>

          <Paper
            elevation={3}
            sx={{ bgcolor: "white", padding: 2, marginBottom: 2, boxShadow: 1 }}
          >
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table>
                <TableHead>
                  <TableRow>
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
                      อาจารย์
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      เหตุผล
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      ประเภทคำร้อง
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
                    ? requests.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : requests
                  ).map((row) => (
                    <StyledTableRow key={row.Request_ID}>
                      <StyledTableCell align="center">
                        {row.Student_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Subject_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Subject_EN_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Unit}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Section}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Course_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Professor_Name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ color: "#1300FF" }}
                        align="center"
                      >
                        {row.Reason}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ color: "#1300FF" }}
                        align="center"
                      >
                        {row.Request_Type_Name}
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="delete"
                          sx={{
                            color: "#393838",
                            ":hover": {
                              color: "red",
                            },
                          }}
                          onClick={() => {
                            deleteRequest(row.Request_ID, row.Subject_ID);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="edit"
                          sx={{
                            color: "#393838",
                            ":hover": {
                              color: "red",
                            },
                          }}
                          onClick={() => {
                            navigate({
                              pathname: `/request/update/${row.Request_ID}`,
                            });
                          }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <StyledTableCell colSpan={6} />
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
                      colSpan={requests.length}
                      count={requests.length}
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

          <Paper
            elevation={3}
            sx={{ bgcolor: "white", padding: 2, marginBottom: 2, boxShadow: 1 }}
          >
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table>
                <TableHead>
                  <TableRow>
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
                      <StyledTableCell align="center">
                        {row.Student_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Subject_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Subject_EN_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Unit}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Section}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Course_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Request_Type_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Professor_Name}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ color: "#1300FF" }}
                        align="center"
                      >
                        {row.Reason}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{ color: "#FF0000" }}
                        align="center"
                      >
                        {row.Approval_Type_Name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRowsA > 0 && (
                    <TableRow style={{ height: 53 * emptyRowsA }}>
                      <StyledTableCell colSpan={6} />
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
      </Container>
    </div>
  );
}

export default Request;
