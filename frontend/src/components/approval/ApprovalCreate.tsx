import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
//import { Subject } from "../models/I_Subject";
import { ApprovalInterface } from "../../models/I_Approval";
import { Approval_TypeInterface } from "../../models/I_Approval_Type";
import { Subject } from "../../models/I_Subject";
//table
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
import { SelectChangeEvent } from "@mui/material/Select";
import { IconButton, InputLabel, MenuItem, Select, SvgIcon, Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { RequestInterface } from "../../models/IRequest";
import { EnrollInterface } from "../../models/I_Enroll";
import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Home_Navbar from "../navbars/Home_navbar";
import Swal from "sweetalert2";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ApprovalCreate() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [approval, setApproval] = React.useState<Partial<ApprovalInterface>>(
    {}
  );
  const [approval_type, setApproval_Type] = React.useState<
    Approval_TypeInterface[]
  >([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [request, setRequest] = React.useState<Partial<RequestInterface>>({});
  const [requests, setRequests] = React.useState<RequestInterface[]>([]);
  const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [message, setAlertMessage] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
  const [adding_reducing, setAdding_reducing] = React.useState<
    Partial<Adding_reducingInterface>
  >({});
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
    const id = event.target.id as keyof typeof ApprovalCreate;
    const { value } = event.target;
    setApproval({ ...approval, [id]: value });
    console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof approval;
    setSearchSubjectID(event.target.value);
    setApproval({
      ...approval,
      [id]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof approval;
    setApproval({
      ...approval,
      [name]: event.target.value,
    });
    console.log(event.target.value);
  };

  //--------------Searched--------------
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const sendSearchedRequestID = () => {
    // navigate({ pathname: `/subject/${searchSubjectID}` });
    setSearchSubjectID(searchSubjectID);
    getRequestBySubjectID(searchSubjectID);
    // window.location.reload();
    console.log(searchSubjectID);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

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

  const apiUrl = "http://localhost:8080";
  const approvalOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  //------------professor
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getProfessor = async () => {
    let id = localStorage.getItem("id");

    fetch(`${apiUrl}/professor/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          approval.Professor_ID = res.data.Professor_ID;
        } else {
          console.log("else");
        }
      });
  };

  //----------Request----

  const getRequests = async () => {
    const approvalOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/requests`, approvalOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //setRequests(res.data);
          console.log(res.data);
        }
      });
  };

  const getRequestBySubjectID = async (subject_id: any) => {
    const approvalOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    console.log(searchSubjectID);
    
    fetch(
      `${apiUrl}/requests/${subject_id}/${localStorage.getItem("id")}`,
      approvalOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {console.log(res.data);
          setSubjects(res.data);
          setRequests(res.data);
        }
      });
  };

  const getApproval_Type = async () => {
    fetch(`${apiUrl}/approval_types`, approvalOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setApproval_Type(res.data);
        } else {
          console.log("else");
        }
      });
  };

  // fetch previous Approval
  const getPrevApproval = async () => {
    fetch(`${apiUrl}/previous_approval`, approvalOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          approval.Approval_ID = res.data.Approval_ID + 1;
        }
        // else {
        //   approval.Approval_ID = res.data = 401;
        //   //console.log("else");
        // }
      });
  };

  useEffect(() => {
    getApproval_Type();
    getPrevApproval();
    getProfessor();
    if (searchSubjectID == "") {
      getRequests();
    } else {
      getRequestBySubjectID(searchSubjectID);
    }
    console.log(searchSubjectID);
  }, []);

  function submit() {
    if (request.Request_Type_ID == "R01") {
      adding_reducing.History_Type_ID = "HT1";
    }
     if (request.Request_Type_ID == "R02") {
       adding_reducing.History_Type_ID = "HT3";
     }
    let data = {
      Approval_ID:
        typeof approval.Approval_ID === "string"
          ? parseInt(approval.Approval_ID)
          : approval.Approval_ID,
      Professor_ID: localStorage.getItem("id"),
      Request_ID:
        typeof approval.Request_ID === "string"
          ? parseInt(approval.Request_ID)
          : approval.Request_ID,
      Section: approval.Section ?? "",
      Reason: approval.Reason ?? "",
      Approval_Type_ID: approval.Approval_Type_ID ?? "",

      //update enroll
      Enroll_ID: enroll.Enroll_ID ?? "",
      Student_ID: enroll.Student_ID ?? "",
      Subject_ID: enroll.Subject_ID ?? "",
      Exam_Schedule_ID: enroll.Exam_Schedule_ID ?? "",
      Class_Schedule_ID: enroll.Class_Schedule_ID ?? "",
      Change_ID:
        typeof adding_reducing.Change_ID === "string"
          ? parseInt(adding_reducing.Change_ID)
          : adding_reducing.Change_ID,
      // History_Type_ID: (adding_reducing.History_Type_ID = "HT1"),
      History_Type_ID: adding_reducing.History_Type_ID ?? "",
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/approvals";
    if (request?.Request_Type_ID == "R01") {
      if (approval?.Approval_Type_ID == "Y01") {
        const apiUrl1 = "http://localhost:8080/approvalandadding";
        const requestOptionsGet = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

               Swal.fire({
                 title:
                   "คุณต้องการอนุมัติคำร้องของ \n" +
                   "รหัสนักศึกษา " +
                   data.Student_ID +
                   "\n รายวิชา " +
                   data.Subject_ID +
                   "\n กลุ่ม " +
                   data.Section,
                 icon: "warning",
                 showDenyButton: true,
                 showCancelButton: false,
                 confirmButtonText: "อนุมัติคำร้องออนไลน์",
                 denyButtonText: `ยกเลิก`,
               }).then((data) => {
                 if (data.isConfirmed) {
                   fetch(apiUrl1, requestOptionsGet)
                     .then((response) => response.json())
                     .then((res) => {
                       console.log(res);
                       if (res.data) {
                         console.log(res.data);
                         Swal.fire({
                           icon: "success",
                           title: "อนุมัติคำร้องสำเร็จ\n",
                           text: "Success",
                         });
                       } else {
                         Swal.fire({
                           icon: "error",
                           title: "เกิดข้อมูลผิดพลาด !",
                           text: res.error,
                         });
                       }
                     });
                 }
               });
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        
     Swal.fire({
       title:
         "คุณต้องการอนุมัติคำร้องของ \n" +
         "รหัสนักศึกษา " +
         data.Student_ID +
         "\n รายวิชา " +
         data.Subject_ID +
         "\n กลุ่ม " +
         data.Section,
       icon: "warning",
       showDenyButton: true,
       showCancelButton: false,
       confirmButtonText: "อนุมัติคำร้องออนไลน์",
       denyButtonText: `ยกเลิก`,
     }).then((data) => {
       if (data.isConfirmed) {
         fetch(apiUrl, requestOptions)
           .then((response) => response.json())
           .then((res) => {
             console.log(res);
             if (res.data) {
               console.log(res.data);
               Swal.fire({
                 icon: "success",
                 title: "อนุมัติคำร้องสำเร็จ\n",
                 text: "Success",
               });
             } else {
               Swal.fire({
                 icon: "error",
                 title: "เกิดข้อมูลผิดพลาด !",
                 text: res.error,
               });
             }
           });
       }
     });
      }
    } else {
      if (approval?.Approval_Type_ID == "Y01") {
        const apiUrl = "http://localhost:8080/approvalandadding";
        const requestOptions = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

             Swal.fire({
               title:
                 "คุณต้องการอนุมัติคำร้องของ \n" +
                 "รหัสนักศึกษา " +
                 data.Student_ID +
                 "\n รายวิชา " +
                 data.Subject_ID +
                 "\n กลุ่ม " +
                 data.Section,
               icon: "warning",
               showDenyButton: true,
               showCancelButton: false,
               confirmButtonText: "อนุมัติคำร้องออนไลน์",
               denyButtonText: `ยกเลิก`,
             }).then((data) => {
               if (data.isConfirmed) {
                 fetch(apiUrl, requestOptions)
                   .then((response) => response.json())
                   .then((res) => {
                     console.log(res);
                     if (res.data) {
                       console.log(res.data);
                       Swal.fire({
                         icon: "success",
                         title:
                           "อนุมัติคำร้องสำเร็จ\n",
                         text: "Success",
                       });
                     } else {
                       Swal.fire({
                         icon: "error",
                         title: "เกิดข้อมูลผิดพลาด !",
                         text: res.error,
                       });
                     }
                   });
               }
             });
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
             Swal.fire({
               title:
                 "คุณต้องการอนุมัติคำร้องของ \n" +
                 "รหัสนักศึกษา " +
                 data.Student_ID +
                 "\n รายวิชา " +
                 data.Subject_ID +
                 "\n กลุ่ม " +
                 data.Section,
               icon: "warning",
               showDenyButton: true,
               showCancelButton: false,
               confirmButtonText: "อนุมัติคำร้องออนไลน์",
               denyButtonText: `ยกเลิก`,
             }).then((data) => {
               if (data.isConfirmed) {
                 fetch(apiUrl, requestOptions)
                   .then((response) => response.json())
                   .then((res) => {
                     console.log(res);
                     if (res.data) {
                       console.log(res.data);
                       Swal.fire({
                         icon: "success",
                         title: "อนุมัติคำร้องสำเร็จ\n",
                         text: "Success",
                       });
                     } else {
                       Swal.fire({
                         icon: "error",
                         title: "เกิดข้อมูลผิดพลาด !",
                         text: res.error,
                       });
                     }
                   });
               }
             });
      }
    }
  }

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
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
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
                marginTop: 1,
              }}
            >
              <Grid>
                <Grid width="550px">
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
                    อนุมัติคำร้องออนไลน์
                  </Typography>
                  <Typography
                    sx={{
                      color: "blue",
                      flexGrow: 1,
                      fontFamily: "Noto Sans Thai",
                    }}
                  >
                    เพิ่มข้อมูลอนุมัติคำร้องออนไลน์
                  </Typography>
                </Grid>
              </Grid>

              <Grid sx={{ marginLeft: "150px" }}>
                <p>รหัสอาจารย์</p>
              </Grid>
              <Grid sx={{ marginLeft: "40px" }}>
                <TextField
                  disabled
                  id="Professor_ID"
                  variant="outlined"
                  type="string"
                  value={approval.Professor_ID}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid sx={{ marginLeft: "40px" }}>
                <p>ลำดับ</p>
              </Grid>
              <Grid sx={{ marginLeft: "40px" }}>
                <TextField
                  disabled
                  id="Approval_ID"
                  variant="outlined"
                  type="number"
                  defaultValue={approval.Approval_ID}
                  value={approval.Approval_ID}
                  onChange={handleInputChange}
                />
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ bgcolor: "white", marginBottom: 2 }}>
            <Grid container sx={{ padding: 2, marginLeft: "15px" }}>
              <Grid>
                <p>รหัสวิชา</p>
              </Grid>
              <Grid sx={{ marginLeft: "20px" }}>
                <Box sx={{ width: "250px" }}>
                  <TextField
                    label="กรอกรหัสวิชา"
                    variant="outlined"
                    // type="string"
                    // value={approval.Request_ID}
                    onChange={handleInputChangeSearch}
                  />
                </Box>
              </Grid>
              <Grid sx={{ marginTop: "10px" }}>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    bgcolor: "#F05A28",
                    ":hover": {
                      bgcolor: "#212121",
                    },
                    boxShadow: 3,
                    flexGrow: 1,
                    fontFamily: "Noto Sans Thai",
                  }}
                  onClick={sendSearchedRequestID}
                >
                  ค้นหารายวิชา
                  <SvgIcon
                    sx={{ marginLeft: "5px" }}
                    component={SearchIcon}
                    inheritViewBox
                  />
                </Button>
              </Grid>
            </Grid>

            <Box
              sx={{
                marginBottom: 1,
                padding: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table>
                  <TableHead>
                    <TableRow>
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
                        อาจารย์
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เหตุผล
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        ประเภทคำร้อง
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เลือก
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
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {row.Request_ID}
                        </StyledTableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.Student_ID}
                        </TableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
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
                        <TableCell align="center">{row.Reason}</TableCell>
                        <TableCell align="center">
                          {row.Request_Type_Name}
                        </TableCell>
                        <StyledTableCell>
                          <IconButton
                            sx={{
                              color: "#393838",
                              ":hover": {
                                color: "red",
                              },
                              ":focus": {
                                color: "red",
                              },
                              fontFamily: "Noto Sans Thai",
                            }}
                            onClick={() => {
                              approval.Request_ID = row.Request_ID;
                              approval.Section = row.Section;
                              request.Request_Type_ID = row.Request_Type_ID;

                              enroll.Student_ID = row.Student_ID;
                              enroll.Subject_ID = row.Subject_ID;
                              enroll.Section = row.Section;
                              enroll.Exam_Schedule_ID = row.Exam_Schedule_ID;
                              enroll.Class_Schedule_ID = row.Class_Schedule_ID;
                              console.log(approval.Request_ID);
                              console.log(approval.Section);
                              console.log(enroll.Exam_Schedule_ID);
                              console.log(enroll.Class_Schedule_ID);
                            }}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </StyledTableCell>
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
              <Grid container sx={{ padding: 2 }}>
                <Grid>
                  <p>เหตุผล</p>
                </Grid>
                <Grid sx={{ padding: 2 }}>
                  <TextField
                    label="เหตุผล"
                    id="Reason"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={approval.Reason}
                    sx={{ width: "50ch" }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid sx={{ marginLeft: "200px" }}>
                  <p>ผลการอนุมัติ</p>
                </Grid>
                <Grid>
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: "50ch",
                      marginTop: "14px",
                      marginLeft: "20px",
                    }}
                  >
                    {/* <InputLabel id="Approval_Type_ID">ผลการอนุมัติ</InputLabel> */}
                    <Select
                      native
                      id="Approval_Type_ID"
                      value={approval.Approval_Type_ID + ""}
                      onChange={handleSelectChange}
                      //autoWidth
                      inputProps={{
                        name: "Approval_Type_ID",
                      }}
                    >
                      <option aria-label="Noun" value="">
                        กรุณาเลือกผลการอนุมัติ
                      </option>
                      {approval_type.map((item: Approval_TypeInterface) => (
                        <option
                          value={item.Approval_Type_ID}
                          key={item.Approval_Type_ID}
                        >
                          {item.Approval_Type_Name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                maxWidth="xl"
                sx={{
                  bgcolor: "white",
                  width: "auto",
                  height: "auto",
                  padding: 1,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/approval"
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "#212121",
                    },
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  ย้อนกลับ
                </Button>

                <Button
                  sx={{
                    backgroundColor: "#F05A28",
                    float: "right",
                    fontFamily: "Noto Sans Thai",
                    ":hover": {
                      bgcolor: "#212121",
                    },
                  }}
                  onClick={submit}
                  variant="contained"
                  color="primary"
                >
                  อนุมัติคำร้องออนไลน์
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Container>
    </div>
  );
}

export default ApprovalCreate;
