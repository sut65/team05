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
  unstable_useEnhancedEffect,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AppBar } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestUpdate() {
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

  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [searchRequestID, setSearchRequestID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

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
    const id = event.target.id as keyof typeof RequestUpdate;
    const { value } = event.target;
    setRequest({ ...request, [id]: value });
    //console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequestUpdate;
    setSearchRequestID(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof request;
    setRequest({
      ...request,
      [name]: event.target.value,
    });
    //console.log(event.target.value);
  };

  //--------------Searched--------------
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const sendSearchedSubjectID = () => {
  //   // navigate({ pathname: `/subject/${searchSubjectID}` });
  //   setSearchRequestID(searchRequestID);
  //   //getRequestBySubjectID(searchRequestID);
  //   // window.location.reload();
  //   console.log(searchRequestID);
  // };

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

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getCurrentRequest = async () => {
    fetch(`${apiUrl}/request/${params.request_id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRequest(res.data);
          getRequestBySubjectID(res.data.Subject_ID, res.data.Request_ID);
          //console.log(res.data);
        } else {
          //console.log("else");
        }
      });
  };
  //----------subject----

  const getRequestBySubjectID = async (subject_id: any, request_id: any) => {
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
        console.log(res.data);
        if (res.data) {
          setSubjects(res.data);
          console.log(request_id);
          request.Request_ID = request_id;

          // console.log(enroll.Enroll_ID)
        }
      });
  };

  const getRequest_Type = async () => {
    fetch(`${apiUrl}/request_types`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //console.log(res.data);
          setRequest_Type(res.data);
        } else {
          //console.log("else");
        }
      });
  };

  useEffect(() => {
    getRequest_Type();
    getCurrentRequest();
  }, []);

  function submitUpdate() {
    let data = {
      Request_ID:
        typeof request.Request_ID === "string"
          ? parseInt(request.Request_ID)
          : request.Request_ID,
      // request.Request_ID ?? "",
      Student_ID: request.Student_ID ?? "",
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));

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
        maxWidth="xl"
        sx={{
          bgcolor: "#e1e1e1",
          width: "auto",
          height: "auto",
          padding: 2,
        }}
      >
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
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <Box
            display="flex"
            sx={{
              marginTop: 1,
            }}
          >
            <Grid>
              <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
              >
                ยื่นคำร้องออนไลน์
              </Typography>
              <Typography sx={{ fontFamily: "Mitr-Regular" }}>
                {" "}
                แก้ไขข้อมูลรายวิชา{" "}
              </Typography>
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

        <Paper elevation={3} sx={{ bgcolor: "white", marginBottom: 2 }}>
          <Box
            sx={{
              marginBottom: 1,
              padding: 2,
            }}
          >
            <TableContainer component={Paper}>
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
                      <StyledTableCell align="left">{row.Day}</StyledTableCell>
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
                          style={{ color: "#393838" }}
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
                  }}
                >
                  {/* <InputLabel id="Request_Type_ID">ประเภทคำร้อง</InputLabel> */}
                  <Select
                    native
                    //labelId="Request_Type_ID"
                    id="Request_Type_ID"
                    value={request.Request_Type_ID + ""}
                    onChange={handleSelectChange}
                    //autoWidth
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
              <Button component={RouterLink} to="/request" variant="contained">
                ย้อนกลับ
              </Button>

              <Button
                style={{ float: "right" }}
                onClick={submitUpdate}
                variant="contained"
                color="primary"
              >
                ยื่นคำร้องออนไลน์
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default RequestUpdate;
