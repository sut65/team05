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
import { RequestInterface } from "../../models/IRequest";
import { Request_TypeInterface } from "../../models/IRequest_Type";
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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Autocomplete,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Toolbar,
  unstable_useEnhancedEffect,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AppBar } from "@mui/material";
import { StudentsInterface } from "../../models/I_Student";
import Home_Navbar from "../navbars/Home_navbar";
import { fontSize } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestCreate() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [request, setRequest] = React.useState<Partial<RequestInterface>>({});
  const [request_type, setRequest_Type] = React.useState<
    Request_TypeInterface[]
  >([]);
  // const [student, setStudent] = React.useState<
  //    StudentInterface[]
  // >([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [students, setStudents] = React.useState<StudentsInterface[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [message, setAlertMessage] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();

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
    const id = event.target.id as keyof typeof RequestCreate;
    const { value } = event.target;
    setRequest({ ...request, [id]: value });
    console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequestCreate;
    setSearchSubjectID(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof request;
    setRequest({
      ...request,
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

  const sendSearchedSubjectID = () => {
    // navigate({ pathname: `/subject/${searchSubjectID}` });
    setSearchSubjectID(searchSubjectID);
    getSubjectBySubjectID(searchSubjectID);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

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
      "Content-Type": "application/json",
    },
  };

  //------------
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getStudent = async () => {
    let student_id = localStorage.getItem("id");

    fetch(`${apiUrl}/student/${student_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          request.Student_ID = res.data.Student_ID;
        } else {
          console.log("else");
        }
      });
  };

  //----------subject----

  const getSubjects = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/enrollsub`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSubjects(res.data);
          console.log(res.data);
        }
      });
  };

  const getSubjectBySubjectID = async (subject_id: any) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/enroll/${subject_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSearchSubjectID(subject_id);
          setSubjects(res.data);
        }
      });
  };

  const getRequest_Type = async () => {
    fetch(`${apiUrl}/request_types`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRequest_Type(res.data);
        } else {
          console.log("else");
        }
      });
  };

  // fetch previous ActivityMember
  const getPrevRequest = async () => {
    fetch(`${apiUrl}/previous_request`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          request.Request_ID = res.data.Request_ID + 1;
        }
        // else {
        //   request.Request_ID = res.data = 401;
        //   //console.log("else");
        // }
      });
  };

  useEffect(() => {
    getRequest_Type();
    getPrevRequest();
    getStudent();

    if (searchSubjectID == "") {
      getSubjects();
    } else {
      getSubjectBySubjectID(searchSubjectID);
    }
    console.log(searchSubjectID);
  }, []);

  function submit() {
    let data = {
      Request_ID:
        typeof request.Request_ID === "string"
          ? parseInt(request.Request_ID)
          : request.Request_ID,
      // request.Request_ID ?? "",
      Student_ID: request.Student_ID ?? "",
      Professor_ID:
        typeof request.Professor_ID === "string"
          ? parseInt(request.Professor_ID)
          : request.Professor_ID,

      Subject_ID: request.Subject_ID ?? "",
      Section: request.Section ?? "",
      Reason: request.Reason ?? "",
      Exam_Schedule_ID: request.Exam_Schedule_ID ?? "",
      Class_Schedule_ID: request.Class_Schedule_ID ?? "",
      Request_Type_ID: request.Request_Type_ID ?? "",
    };
    console.log(data);

    // const apiUrl = "http://localhost:8080/requests";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/requests`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
      });
  }

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          width: "auto",
          height: "auto",
          p: 2,
          bgcolor: "#F3F3F3",
          flexGrow: 1,
          fontFamily: "Noto Sans Thai",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "#F3F3F3",
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
                <Grid>
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
                    ยื่นคำร้องออนไลน์
                  </Typography>
                  <Typography
                    sx={{
                      color: "blue",
                      flexGrow: 1,
                      fontFamily: "Noto Sans Thai",
                    }}
                  >
                    เพิ่มข้อมูลการยื่นคำร้องออนไลน์
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ marginLeft: "450px" }}>
                <p>รหัสลงทะเบียน</p>
              </Grid>
              <Grid sx={{ marginLeft: "30px" }}>
                <TextField
                  disabled
                  id="Request_ID"
                  variant="outlined"
                  type="number"
                  defaultValue={request.Request_ID}
                  value={request.Request_ID}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid sx={{ marginLeft: "40px" }}>
                <p>รหัสนักศึกษา</p>
              </Grid>
              <TextField
                disabled
                // label="รหัสนักศึกษา"
                id="Student_ID"
                variant="outlined"
                type="string"
                value={request.Student_ID}
                sx={{ marginLeft: "30px" }}
                onChange={handleInputChange}
              />
            </Box>
          </Paper>

          <Paper
            elevation={3}
            sx={{ bgcolor: "white", marginBottom: 2, boxShadow: 1 }}
          >
            <Grid container sx={{ padding: 2, marginLeft: "15px" }}>
              <Grid>
                <p>รหัสวิชา</p>
              </Grid>
              <Grid sx={{ marginLeft: "20px" }}>
                <Box sx={{ width: "250px" }}>
                  <TextField
                    id="Subject_ID"
                    variant="outlined"
                    type="string"
                    value={request.Subject_ID}
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
                  onClick={sendSearchedSubjectID}
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
                        รหัสวิชา
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        รายวิชา
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        วันเรียน
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เริ่มเรียน
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เลิกเรียน
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        วันสอบ
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เริ่มสอบ
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ border: 1 }}>
                        เลิกสอบ
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
                        เลือก
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? subjects.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : subjects
                    ).map((row) => (
                      <StyledTableRow key={row.ID}>
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
                        <StyledTableCell align="left">
                          {row.Day}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.Start_Time}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.End_Time}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.Exam_Date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.Exam_Start_Time}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.Exam_End_Time}
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
                        <StyledTableCell>
                          <IconButton
                            sx={{
                              color: "#393838",
                              ":hover": {
                                color: "red",
                              },
                              fontFamily: "Noto Sans Thai",
                            }}
                            onClick={() => {
                              request.Subject_ID = row.Subject_ID;
                              request.Section = row.Section;
                              request.Exam_Schedule_ID = row.Exam_Schedule_ID;
                              request.Class_Schedule_ID = row.Class_Schedule_ID;
                              console.log(request.Subject_ID);
                              console.log(request.Section);
                              console.log(request.Exam_Schedule_ID);
                              console.log(request.Class_Schedule_ID);
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
                        colSpan={subjects.length}
                        count={subjects.length}
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
                    value={request.Reason}
                    sx={{ width: "50ch" }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid sx={{ marginLeft: "200px" }}>
                  <p>ประเภทคำร้อง</p>
                </Grid>
                <Grid>
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: "50ch",
                      marginTop: "14px",
                      marginLeft: "20px",
                      fontFamily: "Noto Sans Thai",
                    }}
                  >
                    <Select
                      native
                      id="Request_Type_ID"
                      value={request.Request_Type_ID + ""}
                      onChange={handleSelectChange}
                      inputProps={{
                        name: "Request_Type_ID",
                      }}
                    >
                      <option aria-label="Noun" value="">
                        กรุณาเลือกประเภทคำร้อง
                      </option>
                      {request_type.map((item: Request_TypeInterface) => (
                        <option
                          value={item.Request_Type_ID}
                          key={item.Request_Type_ID}
                        >
                          {item.Request_Type_Name}
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
                  to="/request"
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
                  ยื่นคำร้องออนไลน์
                  <SendIcon sx={{ marginLeft: "10px" }} />
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Container>
    </div>
  );
}

export default RequestCreate;
