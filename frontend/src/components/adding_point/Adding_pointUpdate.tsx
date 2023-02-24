import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import {Grid,TextField,Snackbar, Toolbar,} from "@mui/material";


import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


import { Adding_pointInterface } from "../../models/IAdding_point";
import Swal from "sweetalert2";
import { EnrollInterface } from "../../models/I_Enroll";
import Home_Navbar from "../navbars/Home_navbar";
import { pink } from "@mui/material/colors";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adding_pointUpdate() {
  const [addingpoint, setAdding_point] = React.useState<Partial<Adding_pointInterface>>({});
  const [enroll, setEnroll] = React.useState<Partial<EnrollInterface>>({});
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


 


  

//เรียกใช้ฟังก์ชั่นเพื่อส่งค่าaddingมาใช้ในการอัพเดต
    const getCurrentAdd = async () => {
      const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" },
  };
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
      const apiUrl = "http://localhost:8080";
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

    const apiUrl = "http://localhost:8080/adding_points";
    const requestOptionsPatch = {
      
      method: "PATCH",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));
    Swal.fire({
      title: "คุณต้องการเปลี่ยนเกรดใช่หรือไม่" ,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'เปลี่ยนเกรด',
      denyButtonText: `ยกเลิก`,
  }).then((data) => {
      if (data.isConfirmed) {
          fetch(apiUrl, requestOptionsPatch)
              .then((response) => response.json())
              .then((res) => {
                  console.log(res)
                  if (res.data) {
                      console.log(res.data)
                      Swal.fire({
                          icon: 'success',
                          title: 'คุณได้เปลี่ยนเกรดนักศึกษาแล้ว ',
                          text: 'Success',
                      })
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'เกิดข้อมูลผิดพลาด !',
                          text: res.error,
                      })
                  }
              });
      }
  })
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
        <Home_Navbar></Home_Navbar>
        <Toolbar></Toolbar>
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
          <Paper elevation={3} sx={{ p: 2, bgcolor: "pink" ,marginTop :2}}>
          <Typography 
          color="red"sx={{ fontFamily:"Prompt", fontSize: 20 }}>
                                        เงื่อนไข
          </Typography>
          <Typography component="h2"
                    
                    sx={{
                      fontSize: 16,
                      fontFamily: "Noto Sans Thai",
                      boxShadow: 0,
                      whiteSpace: "pre-line",
                    }}
                  
                  >
          A = ดีเยี่ยม ,B+ = ดีมาก ,B = ดี ,C+ = ดีพอใช้ ,C = พอใช้ ,D+ = อ่อน ,D = อ่อนมาก ,F = ตก ,I = การวัดผลยังไม่สมบูรณ์ ,M = นักศึกษาขาดสอบ ,P = การสอนยังไม่สิ้นสุด , S = ผลการประเมินเป็นที่พอใจ ,<br></br>ST = ผลการประเมินเป็นที่พอใจสำหรับรายวิขา ,U = ผลการประเมินไม่เป็นที่พอใจ ,V = ผู้ร่วมเรียน ,W = การถอนรายวิชา ,X =ยังไม่ได้รับผลการประเมิน 
          </Typography>
                                    
          </Paper>
          
          </Grid>
          
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#FFD3BD" }}>
          <Typography
                    component="h2"
                    color="red"
                    gutterBottom
                    sx={{
                      flexGrow: 1,
                      fontSize: 16,
                      fontFamily: "Noto Sans Thai",
                    }}
                  >
                    <b>หมายเหตุ</b>
                  </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontFamily: "Noto Sans Thai",
                        boxShadow: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      1.ไม่สามารถเพิ่มเกรดได้หากไม่มีค่าในช่องเกรด
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.ไม่สามารถเพิ่มเกรดได้หากในช่องเกรดเป็นตัวอักษรภาษาไทย
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.ไม่สามารถเพิ่มเกรดได้หากในช่องเกรดเป็นตัวอักษรภาษาอังกฤษตัวพิมพ์เล็ก
                      {"\n"}
                      4.ไม่สามารถเพิ่มเกรดได้เมื่อเพิ่มเกรดนักศึกษาในรายวิชานั้นๆแล้ว           
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.สามารถเพิ่มเกรดได้เมื่อพิมพ์ตามรูปแบบในเงื่อนไข
                    </Typography>
                  </Paper>
          
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