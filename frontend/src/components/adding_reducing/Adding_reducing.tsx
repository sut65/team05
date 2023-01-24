import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Adding_reducingInterface } from "../../models/IAdding_Reducing";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {BrowserRouter as Router,Route,Link,  useParams,} from "react-router-dom";
import { Adding_reducingI1nterface } from "../../models/IAdding_reducing1";

function Adding_reducing() {
  const [adding_reducings, setAdding_reducings] = React.useState<Partial<Adding_reducingInterface>>({});
  const [adding_reducings1, setAdding_reducings1] = React.useState<Adding_reducingI1nterface []>([]);
  const apiUrl = "http://localhost:8080";
  const para = useParams();
  console.log(para)
  const getAdding_reducings = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_reducing`,requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAdding_reducings(res.data);
        }
      });
  };
  const getAdding_reducings1 = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_reducing`,requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAdding_reducings1(res.data);
        }
      });
  };

  const ListAdding_reducing = async (subject_id: string,section:number,subject_EN_Name: string) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/adding_reducing/${para.subject_id}/${para.section}/${para.subject_EN_Name}`,requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdding_reducings(res.data);
          console.log(res.data);
        }
      });
  };
  useEffect(() => {
    if(para.subject_ID == undefined && para.section ==undefined && para.Subject_EN_Name == undefined){
      getAdding_reducings()}
    // }else{ListAdding_reducing(para.subject_ID,para.section,para.subject_EN_Name);}
    
    
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  

  return (
    <div>
      <Container maxWidth="md">
        <Paper>
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
                ระบบประวัติเพิ่มลดรายวิชา
              </Typography>
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
            </Box>
          </Box>
        </Paper>
      </Container>

      <br></br>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>รหัสรายวิชา</StyledTableCell>
                <StyledTableCell align="left">รายวิชา</StyledTableCell>
                <StyledTableCell align="center">กลุ่ม</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adding_reducings1.map((row:Adding_reducingI1nterface) => (
                <StyledTableRow key={row.Subject_ID}>
                  <StyledTableCell component="th" scope="row">{row.Subject_ID}</StyledTableCell>
                  <StyledTableCell align="left">{row.subject_EN_Name}</StyledTableCell>
                  <StyledTableCell align="center">{row.section}</StyledTableCell>
                </StyledTableRow> 
               ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
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
    </div>
  );
}

export default Adding_reducing;
