import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


import { Grid, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import { EnrollInterface } from "../../models/I_Enroll";

import Home_Navbar from "../navbars/Home_navbar";

function Adding_reducingCreate() {
  const [adding_reducing, setAdding_reducing] = React.useState<Partial<Adding_reducingInterface>>({});
  const [adding_reducings, setAdding_reducings] = React.useState<Adding_reducingInterface[]>([]);
  const [enroll, setEnroll] = React.useState<EnrollInterface[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchEnrollID, setSearchEnrollID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง
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

 

  const apiUrl = "http://localhost:8080";


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adding_reducings.length) : 0;

  //ListAdding_reducing นำค่าจากตารางในdbของaddingมาแสดง
  const getAdding_reducings = async () => {
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_reducings/${localStorage.getItem("id")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_reducings(res.data);
          // console.log(adding_reducings);
        }
      });
  };

//จากdb
    //listenroll เพื่อแสดงตาราง
    const getEnroll = async () => {
      const requestOptions = {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
          },
      };
      fetch(`${apiUrl}/enrolls/${localStorage.getItem("id")}`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
              console.log(res.data);
              if (res.data) {
                setEnroll(res.data);
                  //console.log(course_id);
                  //getSubjectBySubjectID(course_id);
              }
          });
  };
    
 
//รับค่าจากget enrollมาใช้โดยจะหาจากid enroll
  const getEnrollByEnrollID = async (enroll_id: any) => {
    const approvalOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/enroll/${enroll_id}`, approvalOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSearchEnrollID(enroll_id);
          setEnroll(res.data);
        }
      });
  };

  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };
  
  const getStudent = async () => {
    let uid = localStorage.getItem("id");
    fetch(`${apiUrl}/student/${uid}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                adding_reducing.Student_ID = res.data.Student_ID;
            }
            else {
                console.log("else");
            }
        });
};


   //delete ตารางenroll

   const DeleteEnroll = async (enroll_id: string) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
    };

    fetch(`${apiUrl}/deleEnroll/${enroll_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("Data remove");
          window.location.href ="/adding_reducing";
        } else {
          console.log("Something was wrong!!");
        }
      });
  };
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
    getAdding_reducings();
    getStudent();
    if (searchEnrollID == "") {
      getEnroll();
    } else {
      getEnrollByEnrollID(searchEnrollID);
    }
    // console.log(searchEnrollID);
  }, []);




  return (
    <div>
    <Container maxWidth="xl" sx={{ p: 2 }}
    >
    <Home_Navbar></Home_Navbar>
        <Toolbar></Toolbar>
      <Box

        display="flex"

        sx={{

          marginTop: 2,

        }}

      >

        <Box flexGrow={1}>

          <Typography

            component="h2"

            variant="h6"

            color="primary"

            gutterBottom

          >

            รายการที่ลงทะเบียน

          </Typography>

        </Box>

        <Box>

          <Button

            component={RouterLink}

            to="/adding_reducing/create"

            variant="contained"

            color="primary"
           
          >
            เพิ่มลดรายวิชา
          </Button>
        </Box>
      </Box>
      <Grid sx={{ mt: 2 }}>
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
                <TableCell align="left">หน่วยกิต</TableCell>
                <TableCell align="left">กลุ่ม</TableCell>
                <TableCell align="center">ลบ</TableCell>
                <TableCell align="center">แก้ไข</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? enroll.slice(page * rowsPerPage, 
                  page * rowsPerPage + rowsPerPage
                  ): enroll

              ).map((row) => (
                <TableRow
                  key={row.Enroll_ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell align="left">{row.Subject_ID}</TableCell>
                  <TableCell align="left">{row.Subject_TH_Name}</TableCell>
                  <TableCell align="left">{row.Subject_EN_Name}</TableCell>
                  <TableCell align="left">{row.Day}</TableCell>
                  <TableCell align="left">{row.Start_Time}</TableCell>
                  <TableCell align="left">{row.End_Time}</TableCell>
                  <TableCell align="left">{row.Exam_Date}</TableCell>
                  <TableCell align="left">{row.Unit}</TableCell>
                  <TableCell align="left">{row.Section}</TableCell>
                  <TableCell align="center">
                    <IconButton
                     aria-label="delete"
                     onClick={() => {
                      DeleteEnroll(row.Enroll_ID)
                       console.log(row.Enroll_ID)
                    }
                    }
                    >
                    <DeleteIcon />
                  </IconButton>
                  </TableCell>
                  <TableCell align="center">
                  <IconButton
                  onClick={() => {
                    navigate({ pathname: `/adding_reducing/updateenroll/${row.Enroll_ID}` })
              }}
                  >
                    <ModeEditIcon />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                    colSpan={enroll.length}
                    count={enroll.length}
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

      </Grid>
    </Container>

  
    
      <Container
        maxWidth="xl"
        sx={{
  
          width: "auto",
          height: "auto",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{  padding: 2, marginBottom: 2 }}
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
                color="primary"
                gutterBottom
              >
                ระบบประวัติเพิ่มลดรายวิชา
              </Typography>
            </Box>
           
          </Box>
          
          <Box>
          Requirements ระบบลงทะเบียนเรียน
                เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง
                สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กำหนดไว้
                ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ ,
                การเพิ่มลดรายวิชาและการยื่นคำร้องกรณีกลุ่มเต็ม
                โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้
                ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน ,
                และการอนุมัติคำร้องกรณีกลุ่มเต็มจะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้
                และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา ,
                การเพิ่มข้อมูลหลักสูตร ,
                การเพิ่มข้อมูลรายวิชาและการคำนวณค่าใช่จ่าย
                โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                   ลำดับ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    สถานะประวัติ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสวิชา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ชื่อรายวิชา
                  </StyledTableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? adding_reducings.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : adding_reducings
                ).map((row) => (
                  <StyledTableRow key={row.Change_ID}>
                    <TableCell component="th" scope="row" align="center">{row.Change_ID} </TableCell>
                    <TableCell align="center">{row.Type_Name}</TableCell>
                    <TableCell align="center">{row.Subject_ID}</TableCell>
                    <TableCell align="center">{row.Subject_EN_Name}</TableCell>  
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
                    colSpan={adding_reducings.length}
                    count={adding_reducings.length}
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
    </div>
  );
}

export default Adding_reducingCreate;
