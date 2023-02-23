import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {  Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
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
import { Adding_pointInterface } from "../../models/IAdding_point";
import Home_Navbar from "../navbars/Home_navbar";

function Adding_point() {
  const [addingpoints, setAdding_points] = React.useState<
    Adding_pointInterface[]
  >([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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

 
  const apiUrl = "http://localhost:8080";

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addingpoints.length) : 0;

  //ส่งค่าจากlist ผ่านinterface คือข้อมูลตาราง
  const getAdding_point = async () => {
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_points/${localStorage.getItem("id")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_points(res.data);
          console.log(res.data);
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
    getAdding_point();
    
    
  }, []);

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          width: "auto",
          height: "auto",
          padding: 2,
          bgcolor:"#CCFFFF",
        }}
      >
        <Home_Navbar></Home_Navbar>
        <Toolbar></Toolbar>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสวิชา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ชื่อวิชา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                  กลุ่ม
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    หลักสูตร
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ปริญญา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    รหัสนักศึกษา
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ชื่อ-นามสกุล
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    เกรด
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    เเก้ไข
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
                      {row.Subject_ID}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                    {row.Subject_EN_Name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Section}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Course_Name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Qualification_Name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.Student_ID}
                    </TableCell>
                    <TableCell align="center">{row.Student_Name}</TableCell>
                    <TableCell align="center">{row.Grade_ID}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"             
                        onClick={() => {
                          navigate({ 
                            pathname: `/adding_point/update/${row.Adding_point_ID}` });
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </TableCell>

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
                      5,10,25,
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
          </TableContainer>

          <Box sx={{ padding: 2 }} textAlign="right">
            <Button
              component={RouterLink}
              to="/adding_point/create"
              variant="contained"
              color="primary"
            >
              เพิ่ม
            </Button>
          </Box>


        </Paper>
      </Container>
    </div>
  );
}

export default Adding_point;