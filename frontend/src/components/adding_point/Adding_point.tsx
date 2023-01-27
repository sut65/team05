import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid } from "@mui/material";
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

function  Adding_pointCreate() {
  const [adding_point, setAdding_point] = React.useState<Partial<Adding_pointInterface>>({});
  const [adding_points, setAdding_points] = React.useState<Adding_pointInterface[]>([]);
  const [grade, setGreade] = React.useState<GradeInterface[]>([]);
//   const [professor, setProfessor] = React.useState<Professor[]>([]);
 
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

  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof Request;
  //   const { value } = event.target;
  //   setAdding_reducing({ ...adding_reducing, [id]: value });
  // };

  const apiUrl = "http://localhost:8080";

 

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adding_points.length) : 0;

  //request
  const getAdding_points = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_points`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setAdding_points(res.data);
        //   console.log(adding_reducings);
        }
      });
  };


  
  const getStudenByEnroll = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_points`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setAdding_points(res.data);
        //   console.log(adding_reducings);
        }
      });
  };
 

  const getProfesserBySubject = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_points`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setAdding_points(res.data);
        //   console.log(adding_reducings);
        }
      });
  };
  // const [RequestByRequestID, setRequestByRequestID] = React.useState("");
  //  const getRequestByRequestID = async (request_id: any) => {
  //    const requestOptions = {
  //      method: "GET",
  //      headers: { "Content-Type": "application/json" },
  //    };
  //    fetch(`${apiUrl}/request/${request_id}`, requestOptions)
  //      .then((response) => response.json())
  //      .then((res) => {
  //        if (res.data) {
  //          setRequestByRequestID(request_id);
  //          setRequest(res.data);
  //        }
  //      });
  //  };

  //delete
  const DeleteAdding_point= async (adding_point_id: String) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_point/${adding_point_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("Data remove");
          window.location.href = "/";
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
    getAdding_points();
  }, []);

  // function submit() {
  //   let data = {
  //     Change_ID:
  //       typeof adding_reducing.Change_ID === "string"
  //         ? parseInt(adding_reducing.Change_ID)
  //         : adding_reducing.Change_ID,
  //     Status: adding_reducing.Status ?? "",
  //     Subject_ID: adding_reducing.Subject_ID ?? "", 
  //     Enroll_ID: adding_reducing.Enroll_ID ?? "",
  //   };

  //   const apiUrl = "http://localhost:8080/requests";
  //   const requestOptionsPatch = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };
  //   console.log(JSON.stringify(data));

  //   fetch(`${apiUrl}/request`, requestOptionsPatch)
  //     .then((response) => response.json())

  //     .then((res) => {
  //       if (res.data) {
  //         setSuccess(true);
  //       } else {
  //         setError(true);
  //       }
  //     });
  // }

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
                ระบบบันทึกผลการเรียน
              </Typography>
            </Box>
           
          </Box>
          
          <Box>
          Requirements
	ระบบลงทะเบียนเรียน เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กำหนดไว้ ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา และการยื่นคำร้องกรณีกลุ่มเต็ม โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้ ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน , และการอนุมัติคำร้องกรณีกลุ่มเต็ม จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้ และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร , การเพิ่มข้อมูลรายวิชา และการคำนวณค่าใช่จ่าย โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้
          ระบบย่อยระบบบันทึกผลการเรียน เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทำการเพิ่ม และ แก้ไขข้อมูลเกรดนักศึกษาในรายวิชาที่อาจารย์ผู้สอนเปิดสอนในรายวิชาเข้าในระบบ โดยทำการค้นหา รายวิชา และกลุ่มรายวิชาที่สอน  จากนั้นเลือกเกรดที่จะเพิ่มให้นักศึกษารายบุคคล เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว อาจารย์จะสามารถกดบันทึกการ บันทึกผลการเรียนได้ โดยจะสามารถแก้ไขข้อมูลได้ในภายหลัง และนอกจากนี้อาจารย์สามารถดูข้อมูลการบันทึกได้

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                   รหัส
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    ชื่อ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    เกรด
                  </StyledTableCell>
                   
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? adding_points.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : adding_points
                ).map((row) => (
                  <StyledTableRow key={row.Adding_point_ID}>
                    <TableCell component="th" scope="row" align="center">{row.Enroll_ID} </TableCell>
                    <TableCell align="center">{row.Grade_ID}</TableCell>
                    {/* <TableCell align="center">{row.Subject_EN_Name}</TableCell> */}
                    {/* <TableCell align="center">{row.Course_Name}</TableCell> */}
                    {/* <TableCell align="center">{row.Section}</TableCell> */}
                    
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => DeleteAdding_point(row.Adding_point_ID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
                    colSpan={adding_points.length}
                    count={adding_points.length}
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
          to="/create"
          variant="contained"
          color="primary"
        >
          แก้ไข
        </Button>
      </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Adding_pointCreate;
