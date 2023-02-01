import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import { Grid, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import First_Page_Navbar from '../navbars/First_Page_Navbar';
import SignIn from '../sign_in/Sign_In';
function First_Page() {
    return (
        <Box
            sx={{
                bgcolor: "#e1e1e1",
                width: "auto",
                height: "auto",
            }}>
            <First_Page_Navbar />
            <Stack
                style={{
                    backgroundImage: "url(https://us-fbcloud.net/picpost/data/283/283823-qgdgho-6.n.jpg)",
                    backgroundSize: 'cover',
                    height: '60vh',
                    width: 'auto',
                }}
                sx={{ border: 2 }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ height: '60vh', backgroundColor: 'rgba(255,255,255,0.6)', }}>
                    <SchoolIcon sx={{ fontSize: "150px", border: 0 }} />
                    <Typography sx={{ fontSize: 50, border: 0 }}> Group-5 ระบบลงทะเบียนเรียน </Typography>
                    <Typography variant='h4'> Project of 523332 Software Engineer </Typography>
                </Stack>


            </Stack>
            <Box sx={{ border: 2, padding: 5, bgcolor: 'white' }}>
                <Typography variant='h3'> Overview </Typography>
                <Divider />
                <Typography variant='h6' sx={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                    <p>
                        ระบบลงทะเบียนเรียน เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทลัยหนึ่ง สามารถ
                        ลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กําหนดไว้ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชา
                        ต่างๆ , การเพิ่มลดรายวิชา และการยื่นคําร้องกรณีกลุ่มเต็ม โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิ
                        ของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้ส่วนของการจัดสรรห้องเรียน , การ
                        บันทึกผลการเรียน , และการอนุมัติคําร้องกรณีกลุ่มเต็ม จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานใน
                        ส่วนนี้ได้และส่วนสุดท้ายจะมีการเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร , การเพิ่มข้อมูลรายวิชา ,
                        การคํานวณค่าใช่จ่าย ,การเพิ่มข้อมูลอาจารย์และเพิ่มข้อมูลห้องเรียน โดยในส่วนนี้จะเป็นสิทธิของผู้เป็น
                        แอดมินที่มีสิทธิสามารถใชงานได้
                    </p>
                </Typography>
            </Box>
        </Box>

    )
}
export default First_Page;