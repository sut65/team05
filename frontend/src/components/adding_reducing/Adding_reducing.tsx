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
import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import { EnrollInterface } from "../../models/I_Enroll";

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

  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof Request;
  //   const { value } = event.target;
  //   setAdding_reducing({ ...adding_reducing, [id]: value });
  // };

  const apiUrl = "http://localhost:8080";

  //update
  const toUpdateRequestPage = () => {
    navigate({
      pathname: `/adding_reducings_update/${adding_reducing?.Change_ID}`,
    });
    // window.location.reload()
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adding_reducings.length) : 0;

  //request
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
          // console.log(adding_reducings);
        }
      });
  };

//จากdb
    //listenroll
    const getEnroll = async () => {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${apiUrl}/enrollsub`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setEnroll(res.data);
            console.log(res.data);
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
//รับค่าจากget enrollมาใช้โดยจะหาจากid enroll
  const getEnrollByEnrollID = async (enroll_id: any) => {
    const approvalOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

  // //delete
  // const DeleteAdding_reducing= async (change_id: number) => {
  //   console.log("good");
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(`${apiUrl}/adding_reducing/${change_id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         console.log("Data remove");
  //         window.location.href = "/";
  //       } else {
  //         console.log("Something was wrong!!");
  //       }
  //     });
  // };


   //delete
   const DeleteEnroll= async (enroll_id:string) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/deleteEnroll/${enroll_id}`, requestOptions)
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
    getAdding_reducings();
    if (searchEnrollID == "") {
      getEnroll();
    } else {
      getEnrollByEnrollID(searchEnrollID);
    }
    // console.log(searchEnrollID);
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
    <Container maxWidth="xl" sx={{ p: 2 }}>

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

            to="/create"

            variant="contained"

            color="primary"
            onClick={() => {
              navigate({ pathname: `/update/${adding_reducing.Change_ID}` })
        }}
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
                {/* <TableCell align="left">เริ่มสอบ</TableCell>
                <TableCell align="left">เลิกสอบ</TableCell> */}
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
                  {/* <TableCell align="left">{row.Exam_Date}</TableCell> */}
                  {/* <TableCell align="left">{row.Exa}</TableCell>
                  <TableCell align="left">{row.Exam_End_Time}</TableCell> */}
                  <TableCell align="left">{row.Unit}</TableCell>
                  <TableCell align="left">{row.Section}</TableCell>
                  <TableCell align="center">
                    <IconButton
                     aria-label="delete"
                     onClick={() => {
                       DeleteEnroll(row.Enroll_ID)
                       console.log(row.Enroll_ID)
                      //  navigate({ pathname: `/${row.Enroll_ID}` })
                    }
                    }
                    >
                    <DeleteIcon />
                  </IconButton>
                  </TableCell>
                  <TableCell align="center">
                  <IconButton
                  ///${row.Subject_ID}/${row.Section}
                  onClick={() => {
                    navigate({ pathname: `/updateenroll/${row.Enroll_ID}` })
                    // navigate({ pathname: `/update/${row.Change_ID}` })
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
                   ลำดับ
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ border: 1 }}>
                    สถานะ
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
                    <TableCell align="center">{row.Status}</TableCell>
                    {/* <TableCell align="center">{row.Type_Name}</TableCell> */}
                    <TableCell align="center">{row.Subject_ID}</TableCell>
                    <TableCell align="center">{row.Subject_EN_Name}</TableCell>
{/*                     
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => DeleteAdding_reducing(row.Change_ID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell> */}
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
          {/* <Box sx={{ padding: 2 }} textAlign="right">
        <Button
          component={RouterLink}
          to="/create"
          variant="contained"
          color="primary"
        >
          แก้ไข
        </Button>
      </Box> */}
        </Paper>
      </Container>
    </div>
  );
}

export default Adding_reducingCreate;
