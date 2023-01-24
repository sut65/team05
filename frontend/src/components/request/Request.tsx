import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { RequestInterface } from "../../models/IRequest";
import { Request_TypeInterface } from "../../models/IRequest_Type";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Request() {
  const [request, setRequest] = React.useState<RequestInterface[]>([]);

  const getRequest = async () => {
    const apiUrl = "http://localhost:8080/request";

    const requestOptions = {
      method: "GET",

      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setRequest(res.data);
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "Request_ID", headerName: "ลำดับ", width: 100 },

    { field: "Subject_ID", headerName: "รายวิชา", width: 300 },

    { field: "Section", headerName: "กลุ่ม", width: 300 },

    { field: "Student_ID:", headerName: "รหัสนักศึกษา", width: 300 },

    { field: "Reason", headerName: "เหตุผล", width: 300 },

    { field: "Request_Type_ID", headerName: "ประเภทคำร้อง", width: 300 },
  ];

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#e1e1e1",
          width: "auto",
          height: "auto",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
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
                ระบบยื่นคำร้องออนไลน์
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/create"
                variant="contained"
                color="primary"
              >
                ยื่นคำร้องออนไลน์
              </Button>
            </Box>
          </Box>
          <Typography component="h2" variant="h6" color="Black" gutterBottom>
            Requirement
          </Typography>
          <Box>
            ระบบลงทะเบียนเรียน
            เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทยาลัยหนึ่ง
            สามารถลงทะเบียนเรียนในหลักสูตรที่มหาวิทยาลัยนั้นได้กำหนดไว้
            ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชาต่างๆ , การเพิ่มลดรายวิชา
            และการยื่นคำร้องออนไลน์
            โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้
            ส่วนของการจัดสรรห้องเรียน , การบันทึกผลการเรียน ,
            และการอนุมัติคำร้องออนไลน์
            จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานในส่วนนี้ได้
            และส่วนสุดท้ายจะมี การเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร ,
            การเพิ่มข้อมูลรายวิชา และการคำนวณค่าใช่จ่าย
            โดยในส่วนนี้จะเป็นสิทธิของผู้เป็นแอดมินที่มีสิทธิสามารถใช้งานได้ในทีนี้จะขอกล่าวถึงระบบยื่นคำร้องออนไลน์เท่านั้น
            ระบบยื่นคำร้องออนไลน์เป็นระบบย่อยที่นักศึกษา
            สามารถจัดการในส่วนของการสามารถบันทึก,
            แก้ไขและลบข้อมูลการยื่นคำร้องออนไลน์ได้
            โดยนักศึกษาสามารถเลือกรายวิชาและเลือกประเภทคำร้องที่ต้องการยื่นคำร้องออนไลน์
            ซึ่งประเภทคำร้อง ได้แก่ กลุ่มเต็มและเปลี่ยนกลุ่ม
            เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว
            นักศึกษาจะสามารถกดบันทึกการยื่นคำร้องให้อาจารย์ในรายวิชาที่ต้องการยื่นคำร้องออนไลน์ได้
            โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง
            และนอกจากนี้นักศึกษาสามารถดูข้อมูลการยื่นคำร้องออนไลน์ที่บันทึกในรูปแบบของตารางได้
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}
        >
          <div style={{ height: 300, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={request}
              getRowId={(row) => row.Request_ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Request;
