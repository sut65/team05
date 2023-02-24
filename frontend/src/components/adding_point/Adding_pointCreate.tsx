import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {Grid,TextField,SvgIcon,Snackbar, Toolbar} from "@mui/material";

import IconButton from "@mui/material/IconButton";

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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Adding_pointInterface } from "../../models/IAdding_point";

import { EnrollInterface } from "../../models/I_Enroll";
import Swal from "sweetalert2";
import Home_Navbar from "../navbars/Home_navbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Adding_pointCreate() {
  const [addingpoint, setAdding_point] = React.useState<
    Partial<Adding_pointInterface>
  >({});
  const [addingpoints, setAdding_points] = React.useState<
    Adding_pointInterface[]
  >([]);
 
  
  const [enroll, setEnroll] = React.useState<EnrollInterface[]>([]);
  
  const [searchID, setSearchID] = React.useState(""); //ค่าเริ่มต้นเป็น สตริงว่าง

  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
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
   //table
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#44484D",
      color: theme.palette.common.white,
      fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.common.black,
      fontFamily: "Noto Sans Thai",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
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

 

  const handleInputChangeSearch = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Adding_pointCreate;
    setSearchID(event.target.value);

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

  
    const apiUrl = "http://localhost:8080";
    const requestOptionsGet = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
 


    const sendSearchedID = () => {
 
      getSubjectByProfessorandStudenByEnroll(searchID);//เรียกใช้ฟังชั่นโดยนำค่าจากtextboxมาเข้าฟังก์ชั่นแล้วselectออกมา
    };
  

  const getSubjectByProfessorandStudenByEnroll = async (subject_id: any) => {
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/addingsearch/${subject_id}/${localStorage.getItem("id")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_points(res.data);
          console.log(res.data);
        }
      });
      
  };



// //ดึง id enrollมาใช้เพื่อเช้คว่าใครลงรหัสรายวิชานี้บ้างของอาจารที่lloginเข้ามา
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

//ดึง id professorมาใช้ในfrontent เพื่อให้ทราบว่าอาจารคนไหนlogin เข้ามา
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

//เพิ่มค่าid addทีละ1
  const getPrevAdd = async () => {
    fetch(`${apiUrl}/previous_adding_point`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          addingpoint.Adding_point_ID = res.data.Adding_point_ID + 1;
        }

      });
  };

  
  

  useEffect(() => {
    getPrevAdd();
    getProfessor_ID();
    getEnroll();
  }, []);

  function submit() {
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
    const requestOptions = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    Swal.fire({
      title: "คุณต้องการเพิ่มเกรดนักศึกษาใช่หรือไม่  " + 
      addingpoint.Student_ID,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'เพิ่มเกรด',
      denyButtonText: `ยกเลิก`,
  }).then((data) => {
      if (data.isConfirmed) {
          fetch(apiUrl, requestOptions)
              .then((response) => response.json())
              .then((res) => {
                  console.log(res)
                  if (res.data) {
                      console.log(res.data)
                      Swal.fire({
                          icon: 'success',
                          title: 'คุณได้เพิ่มเกรดนักศึกษาแล้ว '+addingpoint.Student_ID,
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
          bgcolor: "#e1e1e1",
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
              marginTop: 1,
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
       
         



<Paper>
<Grid>
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
            <Grid sx={{ marginLeft: "150px" }}>
              <p >รหัสอาจารย์</p></Grid>
              <Grid>
                <TextField    
                  sx={{ marginLeft: "20px" }}
                  disabled
                  id="Professor_ID"
                  type="string"
                  variant="outlined"
                  value={addingpoint.Professor_ID}
                  onChange={handleInputChange}
                  />
              </Grid>

          </Grid>

          <Grid container sx={{ padding: 2, marginLeft: "20px" }}>
            <p>รหัสวิชา</p>
              <Grid>
             
           <TextField
           label="รหัสวิชา"
             sx={{ marginLeft: "30px" }}
             
             id="Subject_ID"
             variant="outlined"
             type="any"
             
             value={addingpoint.Subject_ID}
             onChange={handleInputChangeSearch}
           />
          
           <Button
            sx={{ marginLeft: "10px" }}
               size="small"
               variant="contained"
               onClick={sendSearchedID}//เรียกใช้ฟังชั่น
               
             >
               ค้นหารายวิชา
               <SvgIcon
                 sx={{ marginLeft: "5px" }}
                 component={SearchIcon}
                 inheritViewBox
               />
             </Button>
                </Grid>


                <Grid  sx={{  marginLeft: "15px" }}>
            <p>เกรด</p></Grid>
            <Grid   sx={{ marginLeft: "65px" }}>
            <TextField
              label="เกรด"
              id="Grade_ID"
              type="string"
              variant="outlined"
              value={addingpoint.Grade_ID}
              onChange={handleInputChange}
            />
            
          </Grid>  



          </Grid>





         <Box sx={{bgcolor:"Pink"}}>
          <Typography sx={{ paddingLeft: 5,fontFamily:"Prompt", fontSize: 20 }}>
                                        เงื่อนไข
                                    </Typography>
          <Typography sx={{ paddingLeft: 2 ,fontFamily:"Times New Roman" }}>
          A = ดีเยี่ยม ,B+ = ดีมาก ,B = ดี ,C+ = ดีพอใช้ ,C = พอใช้ ,D+ = อ่อน ,D = อ่อนมาก ,F = ตก ,I = การวัดผลยังไม่สมบูรณ์ ,M = นักศึกษาขาดสอบ ,P = การสอนยังไม่สิ้นสุด , <br></br>S = ผลการประเมินเป็นที่พอใจ ,ST = ผลการประเมินเป็นที่พอใจสำหรับรายวิชา ,U = ผลการประเมินไม่เป็นที่พอใจ ,V = ผู้ร่วมเรียน ,W = การถอนรายวิชา ,<br></br>X =ยังไม่ได้รับผลการประเมิน 
          </Typography>
                                    
          </Box>





          
</Grid>

</Paper>



<Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 , marginTop: 2 }}
        >
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
                      key={row.Adding_point_ID}
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
                      <StyledTableCell align="left">{row.Unit}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Section}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          sx={{
                            color: "blue",
                            ":hover": {
                              color: "red",
                            },
                           
                      
                          }}
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
              </Table>
            </TableContainer>
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