import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Subject } from "../../models/I_Subject";
import { Stack, Divider, Grid, TextField } from "@mui/material";
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
import {
  Adding_reducingInterface,
} from "../../models/IAdding_Reducing";
import { Adding_pointInterface } from "../../models/IAdding_point";

function Adding_reducingCreate() {
  const [addingpoints, setAdding_points] = React.useState<
    Adding_pointInterface[]
  >([]);
  const [addingpoint, setAdding_point] = React.useState<
    Partial<Adding_pointInterface>
  >({});
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

  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof Request;
  //   const { value } = event.target;
  //   setAdding_reducing({ ...adding_reducing, [id]: value });
  // };

  const apiUrl = "http://localhost:8080";

  //update
  // const toUpdateRequestPage = () => {
  //   navigate({
  //     pathname: `/adding_reducings_update/${adding_reducing?.Change_ID}`
  //   });
  //   // window.location.reload()
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addingpoints.length) : 0;

  //ส่งค่าจากlist ผ่านinterface
  const getAdding_reducings = async () => {
    const requestOptions = {
      method: "GET",
      headers: { 
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_points`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_points(res.data);
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

   //delete
  const deleteAdding_point = async (Adding_point_ID: number) => {
    console.log("good");
    const requestOptions = {
      method: "DELETE",
      headers: { 
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_point/${Adding_point_ID}`, requestOptions)
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

          {/* <TextField
            disabled
            id="Subject_ID"
            variant="outlined"
            type="number"
            defaultValue={addingpoint.Subject_ID}
          />
          <TextField
            disabled
            id="Section"
            variant="outlined"
            type="number"
            defaultValue={addingpoint.Section}
          /> */}
          <TableContainer component={Paper}>
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
                      {row.Student_ID}{" "}
                    </TableCell>
                    <TableCell align="center">{row.Student_Name}</TableCell>
                    <TableCell align="center">{row.Grade_ID}</TableCell>
                     <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          deleteAdding_point(row.Adding_point_ID);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        // onClick={toUpdateRequestPage}
                        // component={RouterLink}
                        // to="/update"
                        onClick={() => {
                          navigate({ pathname: `/update/${row.Adding_point_ID}` });
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

export default Adding_reducingCreate;
