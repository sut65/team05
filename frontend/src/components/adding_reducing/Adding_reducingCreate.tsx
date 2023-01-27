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
import { Adding_reducingInterface, SubjectForAddingReduce } from "../../models/IAdding_Reducing";
import { Course } from "../../models/I_Course";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adding_reducingCreate() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});
  const [subject_for_add_reduce, setSubjectForAddReduce] = React.useState<SubjectForAddingReduce[]>([]);
  const [course,setCoures]= React.useState<Course[]>([]);
  // const [student, setStudent] = React.useState<
  //    StudentInterface[]
  // >([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

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
    const id = event.target.id as keyof typeof Adding_reducingCreate;
    const { value } = event.target;
    setAdding_reducing({ ...adding_reducing, [id]: value });
    console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Adding_reducingCreate;
    setSearchSubjectID(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof adding_reducing;
    setAdding_reducing({
      ...adding_reducing,
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
    headers: { "Content-Type": "application/json" },
  };



  const getadding_reducings = async (Change_ID :number) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_reducing/${Change_ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAdding_reducing(res.data);
        }
      });
  };


  //----------subject----

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
          console.log(res.data);
          getadding_reducings(res.data);///////
        }
      });
  };

  const getSubjectByCourse = async (course_id: any) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/subjects/${course_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSubjects(res.data);
          console.log(res.data)
        }
      });
  };

  const getSubjectBySubjectID = async (subject_id: any) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/subject/${subject_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSearchSubjectID(subject_id);
          setSubjects(res.data);
        }
      });
  };
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

const status_addandreduce = [
  { label: "เพิ่ม", id: 1 },
  { label: "ลด", id: 2 },
  { label: "เปลี่ยนกลุ่ม", id: 3 },
];


  const getCourse = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${apiUrl}/courses`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCoures(res.data);
          console.log(res.data);
        }
      });
  };
  

  // fetch previous ActivityMember
  const GetPreviousAdding_reducing = async () => {
    fetch(`${apiUrl}/previous_adding`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          adding_reducing.Change_ID = res.data.Change_ID + 1;
        }
        // else {
        //   request.Request_ID = res.data = 401;
        //   //console.log("else");
        // }
      });
  };

   // fetch previous ActivityMember
   const GetEnrollSubject = async () => {
    fetch(`${apiUrl}/enrollsub`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setSubjectForAddReduce(res.data)
        }
        else {
        //   request.Request_ID = res.data = 401;
          console.log("else");
        }
      });
  };


  useEffect(() => {
    // getRequest_Type();
    GetEnrollSubject();
    // GetPreviousAdding_reducing();
    // getCourse();

   
    if (searchSubjectID == "") {
      getSubjects();
    } else {
      getSubjectBySubjectID(searchSubjectID);
    }
    console.log(searchSubjectID);
  }, []);

  function submit() {
    let data = {
      Change_ID:
        typeof adding_reducing.Change_ID === "string"
          ? parseInt(adding_reducing.Change_ID)
          : adding_reducing.Change_ID,
      // Student_ID: request.Student_ID ?? "",
      Subject_ID: adding_reducing.Subject_ID ?? "",
      Status: adding_reducing.Status ?? "",
      Enroll_ID: adding_reducing.Enroll_ID ?? "",
    };
    console.log(data);

  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/adding_reducings`, requestOptions)
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
            <Box>
              <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
              >
                ประวัติเพิ่มลดรายวิชา
              </Typography>
            </Box>
            {/* <TextField
              label="รหัสนักศึกษา"
              id="Student_ID"
              variant="outlined"
              type="string"
              value={request.Student_ID}
              sx={{ marginLeft: "550px" }}
              onChange={handleInputChange}
            /> */}
            {/* <TextField
              id="Professor_ID"
              variant="outlined"
              type="string"
              value={request.Professor_ID}
              onChange={handleInputChange}
              sx={{ marginLeft: "550px" }}
            /> */}
            <TextField
              disabled
              id="Change_ID"
              variant="outlined"
              type="number"
              defaultValue={adding_reducing.Change_ID}
              value={adding_reducing.Change_ID}
              onChange={handleInputChange}
            />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ bgcolor: "white", marginBottom: 2 }}>
          <Grid container sx={{ padding: 2, marginLeft: "15px"}}>
            <Grid item xs={3}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="status">เพิ่ม</InputLabel>
                        <Select
                            id="Status"
                            variant="standard"
                            value={adding_reducing.Status}
                            inputProps={{ name: "Status" }}
                            onChange={handleSelectChange}
                            sx={{ fontFamily: "Mitr-Regular" }}
                        >
                            {status_addandreduce.map((item) => (
                                <MenuItem value={item.label} key={item.id}>{item.label}
                                </MenuItem>
                                ))}
                        </Select>
                </FormControl>
            </Grid>


                
                    <Grid item xs={3} sx={{ padding: 2, marginLeft: "15px"}} >
                    <FormControl fullWidth variant="outlined">
                        <Select
                        id="Course_ID"
                        variant="standard"
                        //value={adding_reducings.Course_ID} //ใช้enroll interface
                        onChange={handleSelectChange}
                        inputProps={{ name: "Course_ID" }}
                        sx={{ fontFamily: "Mitr-Regular" }}
                        autoWidth
                        >
                        {course.map((item: Course) => (
                        <MenuItem value={item.Course_ID} key={item.Course_ID}>
                        {item.Course_Name}
                        </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    </Grid>
               
            <Grid>
                <Box sx={{ width: "250px" }}>
                  <TextField
                    label="รหัสวิชา"
                    id="Subject_ID"
                    variant="outlined"
                    type="string"
                    value={adding_reducing.Subject_ID}
                    onChange={handleInputChangeSearch}
                  />
                </Box>
            </Grid>

            <Grid sx={{ marginTop: "10px" }}>
              <Button
                size="medium"
                variant="contained"
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      ลำดับ
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      หลักสูตร
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      รายวิชา
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      เวลา
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      หน่วยกิต
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      รับ
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      ลง
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ border: 1 }}>
                      กลุ่ม
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? subject_for_add_reduce.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : subject_for_add_reduce
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
                        {row.Course_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Subject_EN_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Class_Schedule_ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Unit}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Capacity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Enroll_Amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Section}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          sx={{ borderRadius: 0 }}
                          onClick={() => {
                            adding_reducing.Subject_ID = row.Subject_ID;
                            // adding_reducing.Section = row.Section;
                            // console.log(adding_reducing.Subject_ID);
                            // console.log(adding_reducing.Section);
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
            <Button component={RouterLink} to="/" variant="contained">
              Back
            </Button>
            </Grid>
              {/* <Grid sx={{ padding: 2 }}>
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
                  }}
                >
                  <InputLabel id="Request_Type_ID">ประเภทคำร้อง</InputLabel>
                  <Select
                    labelId="Request_Type_ID"
                    id="Request_Type_ID"
                    value={request.Request_Type_ID}
                    onChange={handleSelectChange}
                    autoWidth
                    inputProps={{
                      name: "Request_Type_ID",
                    }}
                  >
                    {request_type.map((item: Request_TypeInterface) => (
                      <MenuItem
                        value={item.Request_Type_ID}
                        key={item.Request_Type_ID}
                      >
                        {item.Request_Type_Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid> */}
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
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Adding_reducingCreate;
