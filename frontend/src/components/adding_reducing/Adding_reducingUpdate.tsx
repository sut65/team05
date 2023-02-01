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
import FactCheckIcon from '@mui/icons-material/FactCheck';
import  IconButton from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
import { Adding_reducingInterface} from "../../models/IAdding_Reducing";
import { Course } from "../../models/I_Course";
import { StudentsInterface } from "../../models/I_Student";
import { EnrollInterface } from "../../models/I_Enroll";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adding_reducingCreate() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});
  const [adding_reducings, setAdding_reducings] = React.useState<Adding_reducingInterface[]>([]);

  const [course,setCoures]= React.useState<Course[]>([]);
  const [student, setStudent] = React.useState<StudentsInterface[]>([]);
  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
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

 
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subjects.length) : 0;

const status_addandreduce = [
  { label: "เพิ่ม", id: 1 },
  { label: "ลด", id: 2 },
  { label: "เปลี่ยนกลุ่ม", id: 3 },
];


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

  


const getAdding_reducings = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch(`${apiUrl}/adding_reducings`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setAdding_reducings(res.data);
        console.log(adding_reducings);
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
  //  const GetEnrollSubject = async () => {
  //   fetch(`${apiUrl}/enrollsub`, requestOptionsGet)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //           setSubjectForAddReduce(res.data)
  //       }
  //       else {
  //       //   request.Request_ID = res.data = 401;
  //         console.log("else");
  //       }
  //     });
  // };


  useEffect(() => {
    // getRequest_Type();
    getAdding_reducings();
    GetPreviousAdding_reducing();
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
      // HistoryType_ID: adding_reducing.HistoryType_ID ?? "",
      Status: adding_reducing.Status ?? "",
      // Type_Name :adding_reducing.Type_Name ?? "",
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
    

      <Container maxWidth="lg" >
  
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
        <div>
          <Paper >
            <Box display={"flex"}
              sx={{ marginTop: 1, }}>
  
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                  variant="h6"
                  color="parmary"
                  gutterBottom>
                  เพิ่มรายวิชา
                </Typography>
              </Box>
            </Box>
            {/* -------------------------------------------------------------------------------------- */}
            <Grid container sx={{ marginTop: '3px', marginLeft: 5, }}>
              <Grid >
                <p style={{ paddingLeft: 15, }}>กรุณาเลือกหลักสูตร</p>
                <Box
                  component="form"
                  sx={{ m: 1, width: '45ch', marginTop: -2, }}>
                  <Select sx={{ ml: 1, mt: 2, width: '50ch' }}
                    id="Course_ID"
                    value={enroll.Course_ID}
                    label="เลือกหลักสูตร"
                    onChange={handleSelectChange}
                    inputProps={{
                      name: "Coures_ID",
                    }}
  
                  >
                    {course.map((item: Course) => (
                      <MenuItem
                        value={item.Course_ID}
                        key={item.Course_ID}
                      >
                        {item.Course_Name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
            </Grid>
  
            <Grid container sx={{ marginTop: '5px', marginLeft: 5, }}>
              <Grid >
                <p style={{ paddingLeft: 17, }}>กรอกรหัสวิชา</p>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, marginTop: -1, paddingLeft: 1, }}>
                  <TextField
                    id="Subject_ID"
                    label="กรอกรหัสวิชา"
                    variant="outlined"
                    value={enroll.Subject_ID}
                    onChange={handleInputChangeSearch}
                  />
                </Box>
              </Grid>
              <Grid sx={{ marginTop: '63px', marginLeft: 1, }}>
                <Button
                  size="medium"
                  variant="contained"
                  onClick={sendSearchedSubjectID}
                  endIcon={<SearchIcon />}>ค้นหารายวิชา</Button>
              </Grid>
              {/* <Grid sx={{ marginTop: '63px', marginLeft: 3, }}>
                <Button sx={{ width: '21ch' }}
                  size="medium"
                  component={RouterLink} to="/"
                  variant="contained"
                  onClick={sendSearchedSubjectID}
                  endIcon={<FactCheckIcon />}>ผลการลงทะเบียน</Button>
              </Grid> */}
            </Grid>
  
            {/* -------------------------------------------------------------------------------------- */}
            <Grid sx={{ marginTop: '20px', display: 'flex', marginLeft: 1, paddingBlockEnd: 10 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">รหัสวิชา</TableCell>
                      <TableCell align="left">ชื่อวิชา</TableCell>
                      <TableCell align="left">Subject name</TableCell>
                      <TableCell align="left">วันเรียน</TableCell>
                      <TableCell align="left">เริ่มเรียน</TableCell>
                      <TableCell align="left">เลิกเรียน</TableCell>
                      <TableCell align="left">วันสอบ</TableCell>
                      <TableCell align="left">เริ่มสอบ</TableCell>
                      <TableCell align="left">เลิกสอบ</TableCell>
                      <TableCell align="left">หน่วยกิต</TableCell>
                      <TableCell align="left">กลุ่ม</TableCell>
                      <TableCell align="center">เลือก</TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody>
                    {(rowsPerPage > 0
                      ? subjects.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage)
                      : subjects
                    ).map((row) => (
                      <TableRow
                        key={row.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{row.Subject_ID}</TableCell>
                        <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                        <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                        <TableCell align="left">{row.Day}</TableCell>
                        <TableCell align="left">{row.Start_Time}</TableCell>
                        <TableCell align="left">{row.End_Time}</TableCell>
                        <TableCell align="left">{row.Exam_Date}</TableCell>
                        <TableCell align="left">{row.Exam_Start_Time}</TableCell>
                        <TableCell align="left">{row.Exam_End_Time}</TableCell>
                        <TableCell align="left">{row.Unit}</TableCell>
                        <TableCell align="left">{row.Section}</TableCell>
                        <TableCell align="center">
                        <Button
                              // id="Subject_ID"
                              onClick={() => {
                              enroll.Subject_ID = row.Subject_ID;
                              enroll.Exam_Schedule_ID = row.Exam_Schedule_ID;
                              enroll.Class_Schedule_ID = row.Class_Schedule_ID;
                              enroll.Section = row.Section;
                              
                              console.log(enroll.Subject_ID);
                              console.log(enroll.Section);
                              console.log(enroll.Exam_Schedule_ID);
                              console.log(enroll.Class_Schedule_ID);
                              submit();
                            }}>
                            
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={1} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          15,
                          20,
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
            </Grid>
            {/* <Box
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },
          }}>  
        <div><Box sx={{paddingLeft:1,}}>
          กรอกรหัสวิชา
      </Box>
          </div>
      </Box> 
          <div>
              <Box 
              display={"flex"}
          sx={{
              marginTop: 5,
              width: 1000,
              height: 70,
              }}>
              <Box
              component="form"
              sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },
              }}>
              <div> 
              <TextField id="outlined-basic" label="รหัสวิชา" variant="outlined" />
              </div>
              </Box>
              </Box>
          </div> */}
  
          </Paper>
        </div>
  
      </Container>
  
    );
  
  }

export default Adding_reducingCreate;
