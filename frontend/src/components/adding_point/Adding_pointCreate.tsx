import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Subject } from "../../models/I_Subject";
import {
  Stack,
  Divider,
  Grid,
  TextField,
  SvgIcon,
  Alert,
  Snackbar,
} from "@mui/material";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Adding_pointInterface } from "../../models/IAdding_point";
import { GradeInterface } from "../../models/IGrade";
import { EnrollInterface } from "../../models/I_Enroll";

function Adding_pointCreate() {
  const [addingpoint, setAdding_point] = React.useState<
    Partial<Adding_pointInterface>
  >({});
  const [addingpoints, setAdding_points] = React.useState<
    Adding_pointInterface[]
  >([]);
  const [grade, setGreade] = React.useState<GradeInterface[]>([]);
  //   const [professor, setProfessor] = React.useState<Professor[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [enrolls, setEnrolls] = React.useState<EnrollInterface[]>([]);
  const [searchEnrollID, setSearchEnrollID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Adding_pointCreate;
    const { value } = event.target;
    setAdding_point({ ...addingpoint, [id]: value });
    console.log(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof addingpoint;
    setAdding_point({
      ...addingpoint,
      [name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Adding_pointCreate;
    setSearchEnrollID(event.target.value);
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addingpoints.length) : 0;

  // const sendSearchedSubjectID = () => {
  //   //navigate({ pathname: `/subject/${searchSubjectID}` });
  //   setSearchEnrollID(searchEnrollID);
  //   getSubjectByEnrollID(searchEnrollID);
  //   //window.location.reload();
  //   //console.log(searchSubjectID);
  // };

  //รับค่าส่งไปbackend
  const getAdding_points = async (adding_point_id: string) => {
    const requestOptions = {
      method: "GET",
      headers: { 
        
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_point/${adding_point_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_points(res.data);
          console.log(res.data);
        }
      });
  };

  //รับค่าจากfrontendไปกรองรายวิชา และกลุ่มจากprofessor

  //table
  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: "#5B98B9",
  //     color: theme.palette.common.white,
  //     fontSize: 17,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: "white",
  //   },
  //   // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 1,
  //   },
  // }));

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };
//ดึง id enrollมาใช้เพื่อเช้คว่าใครลงรหัสรายวิชานี้บ้าง
  const getEnrolls = async () => {
    const requestOptions = {
      method: "GET",
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/enroll`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAdding_points(res.data);
          console.log(res.data);
        }
      });
  };

//ดึง id professorมาใช้ในfrontent เพื่อให้ทราบว่าอาจารคนไหนแก้ไข
  const getProfessor_ID = async () => {
    let id = localStorage.getItem("id")
    const requestOptions = {
      method: "GET",
      headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/professor/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          addingpoint.Professor_ID = res.data.Professor_ID;
        } else {
          console.log("else");
        }
      });
  };
  // const getSubjectByEnrollID = async (subject_id: any) => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(`${apiUrl}/enroll/${subject_id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setSearchEnrollID(subject_id);
  //         setEnrolls(res.data);
  //       }console.log(res.data);
  //     });
  // };
//เพิ่มค่าid addทีละ1
  const getPrevAdd = async () => {
    fetch(`${apiUrl}/previous_adding_point`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          addingpoint.Adding_point_ID = res.data.Adding_point_ID + 1;
        }
        // else {
        //   request.Request_ID = res.data = 401;
        //   //console.log("else");
        // }
      });
  };

  useEffect(() => {
    getPrevAdd();
    getProfessor_ID();
    if (searchEnrollID == "") {
      getEnrolls();
    } 
    //else {
    //   getSubjectByEnrollID(searchEnrollID);
    // }
    // console.log(searchEnrollID);
  }, []);

  function submit() {
    let data = {
      Adding_point_ID:
        typeof addingpoint.Adding_point_ID === "string"
          ? parseInt(addingpoint.Adding_point_ID)
          : addingpoint.Adding_point_ID,
      // Adding_point_ID: addingpoint.Adding_point_ID ?? "",
      Professor_ID:
        addingpoint.Professor_ID === "string"
          ? parseInt(addingpoint.Professor_ID)
          : addingpoint.Professor_ID,
      Grade_ID: addingpoint.Grade_ID ?? "",
      Enroll_ID: addingpoint.Enroll_ID ?? "",
    };
    console.log(data);

    //const apiUrl = "http://localhost:8080/adding_points";
    const requestOptions = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));

    fetch(`${apiUrl}/adding_points`, requestOptions)
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
        
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
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
                ระบบบันทึกผลการเรียน
              </Typography>
            </Box>
          </Box>

          <Box>
            Requirements ระบบลงทะเบียนเรียน
            เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง
            สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กำหนดไว้ ในส่วนแรก
            เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ ,
            การเพิ่มลดรายวิชาและการยื่นคำร้องกรณีกลุ่มเต็ม
            โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้
            ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน ,
            และการอนุมัติคำร้องกรณีกลุ่มเต็มจะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้
            และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร ,
            การเพิ่มข้อมูลรายวิชาและการคำนวณค่าใช่จ่าย
            โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <Grid container sx={{ padding: 2, marginLeft: "15px" }}>
            {/* <Grid>
              <p>รหัสวิชา</p>
            </Grid>
            <Grid sx={{ marginLeft: "20px" }}>
              <Box sx={{ width: "250px" }}>
                <TextField
                  id="Subject_ID"
                  variant="outlined"
                  type="string"
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
            </Grid> */}
            <TextField
              sx={{ marginLeft: "300px" }}
              disabled
              id="Adding_point_ID"
              variant="outlined"
              type="number"
              
              value={addingpoint.Adding_point_ID}
              onChange={handleInputChange}
            />
            <TextField
              disabled
              id="Professor_ID"
              type="string"
              variant="outlined"
              value={addingpoint.Professor_ID}
              onChange={handleInputChange}
            />
            <TextField
              label="เกรด"
              id="Grade_ID"
              type="string"
              variant="outlined"
              value={addingpoint.Grade_ID}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid
            sx={{
              marginTop: "20px",
              display: "flex",
              marginLeft: 1,
              paddingBlockEnd: 10,
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">รหัสนักศึกษา</StyledTableCell>
                    <StyledTableCell align="left">รหัสวิชา</StyledTableCell>
                    <StyledTableCell align="left">ชื่อวิชา</StyledTableCell>
                    <StyledTableCell align="left">Subject name</StyledTableCell>
                    <StyledTableCell align="left">หน่วยกิต</StyledTableCell>
                    <StyledTableCell align="left">กลุ่ม</StyledTableCell>
                    <StyledTableCell align="center">เลือก</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? addingpoints.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : addingpoints
                  ).map((row) => (
                    <StyledTableRow
                      key={row.Enroll_ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="left">
                        {row.Student_ID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Subject_ID}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Subject_TH_Name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Subject_EN_Name}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">{row.Day}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Start_Time}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.End_Time}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Exam_Schedule_ID}
                      </StyledTableCell> */}
                      {/* <TableCell align="left">{row.Exa}</TableCell>
                    <TableCell align="left">{row.Exam_End_Time}</TableCell> */}
                      <StyledTableCell align="left">{row.Unit}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Section}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          // id="Subject_ID"
                          onClick={() => {
                            addingpoint.Subject_ID = row.Subject_ID;
                            addingpoint.Student_ID = row.Student_ID;
                            addingpoint.Enroll_ID = row.Enroll_ID;
                            console.log(addingpoint.Subject_ID);
                            console.log(addingpoint.Student_ID);
                            console.log(addingpoint.Enroll_ID);
                          }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
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
                      colSpan={enrolls.length}
                      count={enrolls.length}
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
            <Button component={RouterLink} to="/adding_point" variant="contained">
              ย้อนกลับ
            </Button>

            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default Adding_pointCreate;