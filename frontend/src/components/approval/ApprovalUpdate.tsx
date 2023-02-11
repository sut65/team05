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
import { RequestInterface } from "../../models/IRequest";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Autocomplete,
  FormHelperText,
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

function ApprovalUpdate() {
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

  const [approvals, setApprovals] = React.useState<ApprovalInterface[]>([]);
  const [searchApprovalID, setSearchApprovalID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    const id = event.target.id as keyof typeof ApprovalUpdate;
    const { value } = event.target;
    setApproval({ ...approval, [id]: value });
    console.log(event.target.value);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - approvals.length) : 0;

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

  //-------update

  const apiUrl = "http://localhost:8080";
  const approvalOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getCurrentApproval = async () => {
    fetch(`${apiUrl}/approval/${params.approval_id}`, approvalOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setApproval(res.data);
        } else {
          console.log("else");
        }
      });
  };
  //----------Approval----

  const getApprovals = async () => {
    const approvalOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/approvalupdate/${params.approval_id}`, approvalOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setApprovals(res.data);
          console.log(res.data);
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

  useEffect(() => {
    getApproval_Type();
    getCurrentApproval();
    getApprovals();
    console.log(searchApprovalID);
  }, []);

  function submitUpdate() {
    let data = {
      Approval_ID:
        typeof approval.Approval_ID === "string"
          ? parseInt(approval.Approval_ID)
          : approval.Approval_ID,
      Professor_ID: approval.Professor_ID ?? "",
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));

    fetch(`${apiUrl}/approvals`, approvalOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
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
            บันทึกข้อมูลไม่สำเร็จ
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
                อนุมัติคำร้องออนไลน์
              </Typography>
              <Typography sx={{ fontFamily: "Mitr-Regular" }}>
                {" "}
                แก้ไขข้อมูลอนุมัติคำร้องออนไลน์{" "}
              </Typography>
            </Grid>
            <Grid sx={{ marginLeft: "480px" }}>
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
                      ลำดับ
                    </StyledTableCell>
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
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Approval_ID}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Request_ID}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.Student_ID}
                      </StyledTableCell>
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
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
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
                    id="Approval_Type_ID"
                    value={approval.Approval_Type_ID+""}
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
                onClick={submitUpdate}
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

export default ApprovalUpdate;
