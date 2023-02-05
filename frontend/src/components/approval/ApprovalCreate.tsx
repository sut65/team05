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
import { RequestInterface } from "../../models/IRequest";
import AddIcon from "@mui/icons-material/Add";

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
  // const [student, setStudent] = React.useState<
  //    StudentInterface[]
  // >([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [requests, setRequests] = React.useState<RequestInterface[]>([]);
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
    const id = event.target.id as keyof typeof ApprovalCreate;
    const { value } = event.target;
    setApproval({ ...approval, [id]: value });
    console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ApprovalCreate;
    setSearchRequestID(event.target.value);
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
    setSearchRequestID(searchRequestID);
    getRequestByRequestID(searchRequestID);
    // window.location.reload();
    console.log(searchRequestID);
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
  const approvalOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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
          setRequests(res.data);
          console.log(res.data);
        }
      });
  };

  const getRequestByRequestID = async (request_id: any) => {
    const approvalOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/request/${request_id}`, approvalOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSearchRequestID(request_id);
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

  // fetch previous ActivityMember
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

    if (searchRequestID == "") {
      getRequests();
    } else {
      getRequestByRequestID(searchRequestID);
    }
    console.log(searchRequestID);
  }, []);

  function submit() {
    let data = {
      Approval_ID:
        typeof approval.Approval_ID === "string"
          ? parseInt(approval.Approval_ID)
          : approval.Approval_ID,
      // approval.Approval_ID ?? "",
      // Student_ID: approval.Student_ID ?? "",
      Professor_ID:
        typeof approval.Professor_ID === "string"
          ? parseInt(approval.Professor_ID)
          : approval.Professor_ID,
      Request_ID:
        typeof approval.Request_ID === "string"
          ? parseInt(approval.Request_ID)
          : approval.Request_ID,
      Section: approval.Section ?? "",
      Reason: approval.Reason ?? "",
      Approval_Type_ID: approval.Approval_Type_ID ?? "",
    };
    console.log(data);

    // const apiUrl = "http://localhost:8080/approvals";
    const approvalOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/approvals`, approvalOptions)
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
            <Grid width="550px">
              <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
              >
                อนุมัติคำร้องออนไลน์
              </Typography>
            </Grid>
            {/* <TextField
              label="รหัสนักศึกษา"
              id="Student_ID"
              variant="outlined"
              type="string"
              value={approval.Student_ID}
              sx={{ marginLeft: "550px" }}
              onChange={handleInputChange}
            /> */}

            {/*<TextField
              label="รหัสลงทะเบียน"
              id="Request_ID"
              variant="outlined"
              type="string"
              value={approval.Request_ID}
              onChange={handleInputChange}
              // sx={{ marginLeft: "550px" }}
            /> */}
            <Box sx={{ marginLeft: "850px" }}>
              <p>ลำดับ</p>
              <TextField
                disabled
                id="Approval_ID"
                variant="outlined"
                type="number"
                defaultValue={approval.Approval_ID}
                value={approval.Approval_ID}
                onChange={handleInputChange}
              />
              <p>อาจารย์</p>
              <TextField
                disabled
                id="Professor_ID"
                variant="outlined"
                type="string"
                value={approval.Professor_ID}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ bgcolor: "white", marginBottom: 2 }}>
          {/* <Grid container sx={{ padding: 2, marginLeft: "15px" }}>
            <Grid>
              <p>รหัสลงทะเบียน</p>
            </Grid>
            <Grid sx={{ marginLeft: "20px" }}>
              <Box sx={{ width: "250px" }}>
                <TextField
                  id="Request_ID"
                  variant="outlined"
                  type="string"
                  value={approval.Request_ID}
                  onChange={handleInputChangeSearch}
                />
              </Box>
            </Grid>
            <Grid sx={{ marginTop: "10px" }}>
              <Button
                size="medium"
                variant="contained"
                onClick={sendSearchedRequestID}
              >
                ค้นหา
                <SvgIcon
                  sx={{ marginLeft: "5px" }}
                  component={SearchIcon}
                  inheritViewBox
                />
              </Button>
            </Grid>
          </Grid> */}

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
                      รหัสลงทะเบียน
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
                        <Button
                          variant="contained"
                          aria-label="AddIcon"
                          sx={{ borderRadius: 0 }}
                          onClick={() => {
                            approval.Request_ID = row.Request_ID;
                            approval.Section = row.Section;
                            console.log(approval.Request_ID);
                            console.log(approval.Section);
                          }}
                        >
                          เพิ่ม
                        </Button>
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
                  <InputLabel id="Approval_Type_ID">ผลการอนุมัติ</InputLabel>
                  <Select
                    labelId="Approval_Type_ID"
                    id="Approval_Type_ID"
                    value={approval.Approval_Type_ID}
                    onChange={handleSelectChange}
                    autoWidth
                    inputProps={{
                      name: "Approval_Type_ID",
                    }}
                  >
                    {approval_type.map((item: Approval_TypeInterface) => (
                      <MenuItem
                        value={item.Approval_Type_ID}
                        key={item.Approval_Type_ID}
                      >
                        {item.Approval_Type_Name}
                      </MenuItem>
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
              <Button component={RouterLink} to="/approval" variant="contained">
                ย้อนกลับ
              </Button>

              <Button
                style={{ float: "right" }}
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
    </div>
  );
}

export default ApprovalCreate;
