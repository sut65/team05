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

import { Adding_pointInterface } from "../../models/IAdding_point";
import { GradeInterface } from "../../models/IGrade";

function Adding_pointUpdate() {
  const [addingpoint, setAdding_point] = React.useState<
    Partial<Adding_pointInterface>
  >({});
  const [addingpoints, setAdding_points] = React.useState<
    Adding_pointInterface[]
  >([]);
  const [grade, setGreade] = React.useState<GradeInterface[]>([]);
  //   const [professor, setProfessor] = React.useState<Professor[]>([]);
  const [searchSubjectID, setSearchSubjectID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
  const [subject, setSubject] = React.useState<Subject[]>([]);
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
    const id = event.target.id as keyof typeof Adding_pointUpdate;
    const { value } = event.target;
    setAdding_point({ ...addingpoint, [id]: value });
    console.log(event.target.value);
  };

//   const handleSelectChange = (event: SelectChangeEvent<string>) => {
//     const name = event.target.name as keyof typeof addingpoint;
//     setAdding_point({
//       ...addingpoint,
//       [name]: event.target.value,
//     });
//     console.log(event.target.value);
//   };

  const apiUrl = "http://localhost:8080";

  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addingpoints.length) : 0;

    const getCurrentAdd = async () => {
      fetch(`${apiUrl}/adding_point/${params.adding_point_id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setAdding_point(res.data);
            console.log(res.data);
          } else {
            console.log("else");
          }
        });
    };
  //รับค่าส่งไปbackend
//   const getAdding_points = async (adding_point_id: string) => {
//     const requestOptions = {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch(`${apiUrl}/adding_point/${adding_point_id}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setAdding_points(res.data);
//           console.log(res.data);
//         }
//       });
//   };

  //รับค่าจากfrontendไปกรองรายวิชา และกลุ่มจากprofessor

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
    /* เพิ่มข้อมูลเกรดของ นศ ในรายวิชานั้น กลุ่มนั้น
        GetEnrollDataBySubjectID()
      */
    /* Get Adding_Point data
      GetAddingPointBySubjectID()
      */
     getCurrentAdd();
  }, []);

  function submitUpdate() {
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
    const requestOptionsPatch = {
      method: "PATCH",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));

    fetch(`${apiUrl}/adding_points`, requestOptionsPatch)
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
          {/* <div style={{ height: 300, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={request}
              getRowId={(row) => row.Request_ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div> */}
          <p>ลำดับ</p>
          <TextField
            disabled
            id="Adding_point_ID"
            variant="outlined"
            type="number"
            defaultValue={addingpoint.Adding_point_ID}
            value={addingpoint.Adding_point_ID}
            onChange={handleInputChange}
          />
          <p>รหัสอาจารย์</p>
          <TextField
            id="Professor_ID"
            type="number"
            variant="outlined"
            value={addingpoint.Professor_ID}
            onChange={handleInputChange}
          />
          <p>รหัสลงทะเบียน</p>
          <TextField
            id="Enroll_ID"
            type="string"
            variant="outlined"
            value={addingpoint.Enroll_ID}
            onChange={handleInputChange}
          />
          <p>grade</p>
          <TextField
            id="Grade_ID"
            type="string"
            variant="outlined"
            value={addingpoint.Grade_ID}
            onChange={handleInputChange}
          />
          {/* <TextField
            label="รายวิชา"
            id="Subject_ID"
            type="string"
            variant="outlined"
            value={addingpoint.Subject_ID}
            onChange={handleInputChange}
          /> */}
          {/* <TextField
            label="กลุ่ม"
            id="Section"
            variant="outlined"
            defaultValue={addingpoint.Section}
          /> */}
          {/* <Grid sx={{ marginTop: "10px" }}>
            <Button
              size="medium"
              variant="contained"
              //onClick={sendSearchedSubjectID}
            >
              ค้นหา
              <SvgIcon
                sx={{ marginLeft: "5px" }}
                component={SearchIcon}
                inheritViewBox
              />
            </Button>
          </Grid> */}
          {/* <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสนักศึกษา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ชื่อ-นามสกุล
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    เกรด
                  </StyledTableCell>
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
                  <StyledTableRow key={row.Adding_point_ID}>
                    <TableCell component="th" scope="row" align="center">
                      {row.Enroll_ID}{" "}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="Grade_ID"
                        variant="outlined"
                        type="number"
                        defaultValue={addingpoint.Grade_ID}
                      />
                    </TableCell>
                    {/* <TableCell align="center">{row.Subject_EN_Name}</TableCell> */}
          {/* <TableCell align="center">{row.Course_Name}</TableCell> */}
          {/* <TableCell align="center">{row.Section}</TableCell> */}

          {/* <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={toUpdateRequestPage}
                        component={RouterLink}
                        to="/update"
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </TableCell> */}
          {/* </StyledTableRow> */}
          {/* ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
          {/* </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={addingpoints.length}
                    count={addingpoints.length}
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
          </TableContainer> */}
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
            <Button component={RouterLink} to="/" variant="contained">
              ย้อนกลับ
            </Button>

            <Button
              style={{ float: "right" }}
              onClick={submitUpdate}
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

export default Adding_pointUpdate;
