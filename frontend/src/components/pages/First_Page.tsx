import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import { Card, Grid, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import First_Page_Navbar from '../navbars/First_Page_Navbar';
import { Link } from 'react-router-dom';
function First_Page() {
    return (
        <Box
            sx={{
                bgcolor: "#e1e1e1",
                width: "auto",
                height: "auto",
            }}>
            <First_Page_Navbar />
            <Toolbar />
            <Stack
                style={{
                    backgroundImage: "url(https://www.bloggang.com/data/rainynight/picture/1279006639.jpg)",
                    backgroundSize: 'cover',
                    height: '60vh',
                    width: 'auto',
                }}
                sx={{ border: 0 }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ height: '60vh', backgroundColor: 'rgba(255,255,255,0.6)', }}>
                    <SchoolIcon sx={{ fontSize: "150px", border: 0 }} />
                    <Typography sx={{ fontSize: 70, border: 0, fontFamily: "LilyUPC" }}> Group-5 ระบบลงทะเบียนเรียน </Typography>
                    <Typography variant='h3' sx={{ fontFamily: "LilyUPC" }}> Project of 523332 Software Engineer </Typography>
                </Stack>


            </Stack>
            <Box sx={{ border: 0, padding: 5, bgcolor: 'white' }}>
                <Grid container>
                    <Box sx={{ border: 0 }}>
                        <Typography variant='h4' sx={{ fontFamily: "Tahoma", }}> Overview </Typography>
                    </Box>
                </Grid>
                <Divider />
                <Typography variant='h6' sx={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2 }}>
                    <Typography sx={{ fontFamily: "Tahoma", fontSize: 20 }}>
                        ระบบลงทะเบียนเรียน เป็นระบบที่ใช้บริการเพื่อให้นักศึกษาของมหาวิทลัยหนึ่ง สามารถ
                        ลงทะเบียนเรียนในหลักสูตรที่มหาวิทลัยนั้นได้กําหนดไว้ในส่วนแรก เช่น การลงทะเบียนเรียนในรายวิชา
                        ต่างๆ , การเพิ่มลดรายวิชา และการยื่นคําร้องกรณีกลุ่มเต็ม โดยที่กล่าวมาข้างต้นนี้จะเกี่ยวข้องกับสิทธิ
                        ของผู้เป็นนักศึกษาที่สามารถใช้สิทธิในระบบลงทะเบียนเรียนได้ส่วนของการจัดสรรห้องเรียน , การ
                        บันทึกผลการเรียน , และการอนุมัติคําร้องกรณีกลุ่มเต็ม จะเป็นสิทธิของผู้เป็นอาจารย์ที่สามารถใช้งานใน
                        ส่วนนี้ได้และส่วนสุดท้ายจะมีการเพิ่มข้อมูลนักศึกษา , การเพิ่มข้อมูลหลักสูตร , การเพิ่มข้อมูลรายวิชา ,
                        การคํานวณค่าใช่จ่าย ,การเพิ่มข้อมูลอาจารย์และเพิ่มข้อมูลห้องเรียน โดยในส่วนนี้จะเป็นสิทธิของผู้เป็น
                        แอดมินที่มีสิทธิสามารถใชงานได้
                    </Typography>
                </Typography>

                <Stack spacing={2} sx={{ border: 1, padding: 2 }}>
                    <Box sx={{ padding: 1, bgcolor: "#e1e1e1" }}>
                        <Typography variant="h4" sx={{ fontFamily: "Tahoma" }}> ข่าวประกาศ </Typography>
                    </Box>
                    <p></p>
                    <Card variant="outlined" sx={{ border: 1, boxShadow: 2 }}>

                        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5">
                                    ประชาสัมพันธ์การ Sign in เข้าใช้งานคอมพิวเตอร์ประจำห้องเรียน
                                </Typography>
                                <Divider />
                                <p>
                                    การ Sign in เข้าใช้งานคอมพิวเตอร์ประจำห้องเรียน ณ อาคารเรียนรวม 1-2
                                    และห้องปฏิบัติการเทคโนโลยีดิจิทัล 1-15 อาคารรัฐสีมาคุณากร
                                    สามารถ Sign in ได้ 2 แบบ
                                </p>
                                <p></p>
                                <Typography>
                                    ประกาศโดย
                                    <Typography sx={{ color: "red" }}>
                                        ฝ่ายตารางสอนตารางสอบ วันที่ประกาศ 31 มกราคม 2566
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card variant="outlined" sx={{ border: 1, boxShadow: 2 }}>

                        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5">
                                    ประชาสัมพันธ์เปิดประเมินการสอนภาคการศึกษาที่ 2/2565
                                </Typography>
                                <Divider />
                                <p>
                                    ขอความร่วมมือนักศึกษาทุกท่านในการเข้าทำการประเมินการสอนประจำภาคการศึกษาที่ 2/2565 ได้ทาง {" "}
                                    <Link to="https://reg.sut.ac.th/"> http://reg.sut.ac.th</Link>
                                    {" "}ตั้งแต่วันนี้ - 9 มีนาคม 2566
                                    ทั้งนี้ผลจากการประเมินการสอนจักนำมาใช้ประโยชน์ในการพัฒนาคุณภาพการเรียนการสอน และข้อมูลของนักศึกษาที่ทำการประเมินการสอนจักถือเป็นความลับ
                                </p>
                                <Link to=""> [ตามรายละเอียดที่แนบ] </Link>
                                <p></p>
                                <Typography> ประกาศโดย
                                    <Typography sx={{ color: "red" }}>
                                        ฝ่ายตารางสอนตารางสอบ วันที่ประกาศ 31 มกราคม 2566
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card variant="outlined" sx={{ border: 1, boxShadow: 2 }}>

                        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5">
                                    นักศึกษาทุกท่านโปรดตรวจสอบรายวิชาที่เปลี่ยนแปลงรหัสใหม่ ภาคการศึกษาที่ 2/2565
                                </Typography>
                                <Divider />
                                <p>
                                    ในการลงทะเบียนภาคการศึกษาที่ 2/2565 โปรดตรวจสอบรายวิชา เนื่องจากมีการเปลี่ยนแปลงรหัสวิชาใหม่ (เทียบเท่ารายวิชาเดิม) ตามตารางที่แนบมาพร้อมนี้
                                </p>
                                <Link to="http://www2.sut.ac.th/ces/pr/2564-3/timetable/changeEng364.pdf">สำนักวิชาวิศวกรรมศาสตร์ </Link>
                                <p></p>
                                <Link to="http://www2.sut.ac.th/ces/pr/2564-2/timetable/change1and2_2.pdf"> สำนักวิชาวิทยาศาสตร์ สำนักวิชาเทคโนโลยีสังคม และสำนักวิชาสาธารณสุขศาสตร์ </Link>
                                <p></p>
                                <Typography> ประกาศโดย  </Typography>
                                <Typography sx={{ color: "red" }}>
                                    ฝ่ายตารางสอนตารางสอบ วันที่ประกาศ 10 กุมภาพันธ์ 2566
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card variant="outlined" sx={{ border: 1, boxShadow: 2 }}>

                        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                            <Box sx={{ padding: 1 }}>
                                <Typography variant="h5">
                                    สมาชิก
                                </Typography>
                                <Divider />
                                <p> B6000000 นาย A </p>
                                <p> B6000000 นาย A </p>
                                <p> B6000000 นาย A </p>
                                <p> B6000000 นาย A </p>
                                <p> B6000000 นาย A </p>
                                <p> B6000000 นาย A </p>
                                <Stack direction="row" spacing={1} sx={{ padding: 1 }}>
                                    <Typography variant="h6"> Sponsor  </Typography>
                                    <Box sx={{padding:0.5}}>
                                        <Typography> อาจารย์ </Typography>
                                        <Typography> พรี่ TA </Typography>
                                        <Typography> Stackoverflow  </Typography>
                                        <Typography> ChatGPT  </Typography>
                                        <Typography> Material UI  </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Card>
                </Stack>
            </Box>
        </Box>

    )
}
export default First_Page;