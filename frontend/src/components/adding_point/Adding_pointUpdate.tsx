import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Subject } from "../../models/I_Subject";
import {Grid,TextField,Alert,Snackbar,} from "@mui/material";
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
  const [addingpoint, setAdding_point] = React.useState<Partial<Adding_pointInterface>>({});
  const [addingpoints, setAdding_points] = React.useState<Adding_pointInterface[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [message, setAlertMessage] = React.useState("");
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


  const apiUrl = "http://localhost:8080";

  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addingpoints.length) : 0;
//เรียกใช้ฟังก์ชั่นเพื่อส่งค่าaddingมาใช้ในการอัพเดต
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

    //เรียกใช้ฟังก์ชั่นเพื่อรับค่าprofessor ที่loginเข้ามา
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


  useEffect(() => {
     getProfessor_ID();
     getCurrentAdd();
  }, []);

  function submitUpdate() {
    let data = {
      Adding_point_ID:
        typeof addingpoint.Adding_point_ID === "string"
          ? parseInt(addingpoint.Adding_point_ID)
          : addingpoint.Adding_point_ID,
   
      Professor_ID:
        addingpoint.Professor_ID === "string"
          ? parseInt(addingpoint.Professor_ID)
          : addingpoint.Professor_ID,
      Grade_ID: addingpoint.Grade_ID ?? "",
      Enroll_ID: addingpoint.Enroll_ID ?? "",
    };
    console.log(data);


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

         
        </Paper>
        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
        
        <Grid container sx={{ padding: 2, marginLeft: "20px" }}>
            <p>ลำดับ</p>
            <Grid>
              <TextField
              sx={{ marginLeft: "45px" }}
              disabled
             
              id="Adding_point_ID"
              variant="outlined"
              type="number"
              
              value={addingpoint.Adding_point_ID}
              onChange={handleInputChange}
            />
            </Grid>
            <Grid sx={{ marginLeft: "50px" }}>
              <p >รหัสอาจารย์</p></Grid>
              <Grid>
                <TextField    
                  sx={{ marginLeft: "45px" }}
                  disabled
                  id="Professor_ID"
                  type="string"
                  variant="outlined"
                  value={addingpoint.Professor_ID}
                  onChange={handleInputChange}
                  />
              </Grid>



              <Grid  sx={{  marginLeft: "20px" }}>
            <p>เกรด</p></Grid>
            <Grid   sx={{ marginLeft: "45px" }}>
            <TextField
             
              id="Grade_ID"
              type="string"
              variant="outlined"
              value={addingpoint.Grade_ID}
              onChange={handleInputChange}
            />
            
          </Grid> 
          <Box sx={{bgcolor:"Pink",marginTop: "30px"}}>
          <Typography sx={{ paddingLeft: 5,fontFamily:"Prompt", fontSize: 20 }}>
                                        เงื่อนไข
                                    </Typography>
          <Typography sx={{ paddingLeft: 2 ,fontFamily:"Times New Roman" }}>
          A = ดีเยี่ยม ,B+ = ดีมาก ,B = ดี ,C+ = ดีพอใช้ ,C = พอใช้ ,D+ = อ่อน ,D = อ่อนมาก ,F = ตก ,I = การวัดผลยังไม่สมบูรณ์ ,M = นักศึกษาขาดสอบ ,P = การสอนยังไม่สิ้นสุด , <br></br>S = ผลการประเมินเป็นที่พอใจ ,ST = ผลการประเมินเป็นที่พอใจสำหรับรายวิขา ,U = ผลการประเมินไม่เป็นที่พอใจ ,V = ผู้ร่วมเรียน ,W = การถอนรายวิชา ,<br></br>X =ยังไม่ได้รับผลการประเมิน 
          </Typography>
                                    
          </Box>
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