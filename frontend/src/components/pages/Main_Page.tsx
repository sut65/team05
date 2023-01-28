import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container, Stack } from '@mui/system';
import { AppBar, CardActions, CardContent, FormControl, Grid, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import ClassIcon from '@mui/icons-material/Class';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2'
import Card from '@mui/material/Card';

function MainPage() {
    return (
        <Box
            sx={{
                bgcolor: "#e1e1e1",
                width: "auto",
                height: "auto",
            }}>
            <Box> <Toolbar /> </Box>
            <Stack
                style={{
                    backgroundImage: "url(https://free4kwallpapers.com/uploads/originals/2018/05/22/japan-street-club-by-arseniy-chebynkin-wallpaper.jpg)",
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
                <Typography variant='h6'>
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
                <Typography variant='h3'> Features </Typography>
                <Divider />
                <Grid container justifyContent="center"
                    alignItems="center" sx={{ }}>
                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดการข้อมูลหลักสูตร
                                </Typography>
                                <Box>
                                    <Typography color="text.secondary">
                                        ระบบจัดการข้อมูลหลักสูตร เป็นระบบที่ผู้เป็นแอดมินของระบบ สามารถจัดการในส่วนของการเพิ่มข้อมูล
                                        ,แก้ไขข้อมูล , ลบข้อมูลหลักสูตรได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลหลักสูตร
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดการข้อมูลหลักสูตร',
                                            text: 'ระบบจัดการข้อมูลหลักสูตร เป็นระบบที่ผู้เป็นแอดมินของระบบ สามารถจัดการในส่วนของการเพิ่มข้อมูล' +
                                                ',แก้ไขข้อมูล , ลบข้อมูลหลักสูตรได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลหลักสูตร' +
                                                'โดยอิงจากรหัสหลักสูตรได้ โดยผู้เป็นแอดมินจะสามารถจัดการข้อมูล เช่น หลักสูตร ,วุฒิต่างๆรวมไปถึงคณะและสาขา' +
                                                'และวันที่ที่เพิ่มหรือแก้ไขข้อมูล หรือข้อมูลอื่นๆที่สำคัญเกี่ยวกับหลักสูตร เป็นต้น เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว' +
                                                'แอดมินจะสามารถกดเพิ่มข้อมูลหลักสูตรเข้ากับระบบได้ โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง' +
                                                'และนอกจากนี้ผู้เป็นแอดมินสามารถดูข้อมูลหลักสูตรที่ถูกเพิ่มเข้าไปในรูปแบบของตารางได้เช่นกัน',
                                            showConfirmButton: false,
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดการข้อมูลอาจารย์
                                </Typography>
                                <Box>
                                    <Typography color="text.secondary">
                                        ระบบจัดการข้อมูลอาจารย์ เป็นระบบที่แอดมินของระบบใช้งานเพื่อจัดการเกี่ยวกับอาจารย์ของ
                                        มหาวิทยาลัย ทั้งเพิ่มข้อมูลอาจารย์ที่มาใหม่ อัพเดทข้อมูลอาจาย์ที่มีการเปลี่ยนแปลงไปตามเวลา หรือ มีการ
                                        อัพเดทสถานะอาจารย์ว่ายังคงสอนอยู่หรือเกษียณไปแล้ว ข้อมูลติดต่ออาจารย์วุฒิอาจาย์ที่สำเร็จการศึกษามา
                                        สาขาวิชาที่สอน

                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดการข้อมูลอาจารย์',
                                            text: 'ระบบจัดการข้อมูลอาจารย์ เป็นระบบที่แอดมินของระบบใช้งานเพื่อจัดการเกี่ยวกับอาจารย์ของ' +
                                                'มหาวิทยาลัย ทั้งเพิ่มข้อมูลอาจารย์ที่มาใหม่ อัพเดทข้อมูลอาจาย์ที่มีการเปลี่ยนแปลงไปตามเวลา หรือ มีการ' +
                                                'โดยอิงจากรหัสหลักสูตรได้ โดยผู้เป็นแอดมินจะสามารถจัดการข้อมูล เช่น หลักสูตร ,วุฒิต่างๆรวมไปถึงคณะและสาขา' +
                                                'อัพเดทสถานะอาจารย์ว่ายังคงสอนอยู่หรือเกษียณไปแล้ว ข้อมูลติดต่ออาจารย์วุฒิอาจาย์ที่สำเร็จการศึกษามา' +
                                                'สาขาวิชาที่สอน',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดการข้อมูลนักศึกษา
                                </Typography>
                                <Box>
                                    <Typography color="text.secondary">
                                        ระบบจัดการข้อมูลนักศึกษา เป็นระบบที่ผู้เป็นแอดมินของระบบ สามารถจัดการในส่วนของการเพิ่มข้อมูล ,แก้ไขข้อมูล ,
                                        ลบข้อมูลนักศึกษาได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลนักศึกษา โดยอิงจากรหัสนักศึกษา
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดการข้อมูลนักศึกษา',
                                            text: 'ระบบจัดการข้อมูลนักศึกษา เป็นระบบที่ผู้เป็นแอดมินของระบบ สามารถจัดการในส่วนของการเพิ่มข้อมูล ,แก้ไขข้อมูล ,' +
                                                'ลบข้อมูลนักศึกษาได้ และสามารถค้นหาในหน้าแสดงข้อมูลเพื่อดูรายละเอียดข้อมูลนักศึกษา โดยอิงจากรหัสนักศึกษา ได้ โดยผู้เป็น' +
                                                'แอดมินจะสามารถจัดการข้อมูล เช่น หลักสูตร ,ชื่อนามสกุล ,รหัสประจําตัว, คณะสาขา , หอพักและวันที่ที่เพิ่มหรือแก้ไขข้อมูล' +
                                                'หรือข้อมูลอื่นๆที่สําคัญเกี่ยวกับนักศึกษา เป็นต้น เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว ผู้เป็นแอดมินจะสามารถกดเพิ่มข้อมูลของนักศึกษาเข้า' +
                                                'กับระบบได้ โดยจะสามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง และนอกจากนี้ผู้เป็นแอดมินสามารถดูข้อมูลนักศึกษาที่ถูกเพิ่มเข้าไปใน' +
                                                'รูปแบบของตารางได้เช่นกัน',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดการข้อมูลรายวิชา
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบย่อยจัดการข้อมูลรายวิชา เป็นระบบที่แอดมินสามารถแสดง, เพิ่ม, แก้ไข หรือลบข้อมูล
                                        รายวิชาได้ในส่วนของการแสดงข้อมูลรายวิชานั้น
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดการข้อมูลรายวิชา',
                                            text: 'ระบบย่อยจัดการข้อมูลรายวิชา เป็นระบบที่แอดมินสามารถแสดง, เพิ่ม, แก้ไข หรือลบข้อมูล' +
                                                'รายวิชาได้ในส่วนของการแสดงข้อมูลรายวิชานั้น แอดมินสามารถแสดงข้อมูลของรายวิชาได้โดย' +
                                                'สามารถดูได้จากกาช่องค้นหาที่ผู้ใช้สามารถค้นหารายวิชาได้ด้วยการใส่รหัสวิชา เพื่อแสดงข้อมูลรายวิชา' +
                                                'ตามรหัสวิชาได้ในส่วนของการเพิ่มและบันทึกข้อมูลของรายวิชา แอดมินสามารถเพิ่มและบันทึก' +
                                                'รายละเอียดข้อมูลรายวิชาได้ในส่วนของการแก้ไขข้อมูลรายวิชา แอดมินสามารถแก้ไขอยู่ในทุกข้อมูล' +
                                                'รายวิชาที่แสดง เมื่อผู้ใช้กดแก้ไขแล้ว ระบบจะนําข้อมูลรายวิชาทีผ่านการแก้ไขบันทึกลงระบบ ในส่วน' +
                                                'ของการลบข้อมูลรายวิชา ผู้ใช้สามารถลบข้อมูลรายวิชาได้โดยจะลบเฉพาะข้อมูลรายวิชาที่ระบุโดยรหัสนักศึกษา',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดการข้อมูลห้องเรียน
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบจัดการข้อมูลห้องเรียน เป็นระบบที่บันทึกโดยแอดมินโดยมีการบันทึกข้อมูลห้องเรียน ตึกเรียน และ
                                        เป็นห้องเรียนประเภทไหนห้องแลปที่มีการเรียนการสอนที่ต้องใช้สื่อการสอน เพื่อให้สามารถนําไปจัดสรรห้องใน
                                        การใช้สอนนักศึกษา
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดการข้อมูลห้องเรียน',
                                            text: 'ระบบจัดการข้อมูลห้องเรียน เป็นระบบที่บันทึกโดยแอดมินโดยมีการบันทึกข้อมูลห้องเรียน ตึกเรียน และ' +
                                                'เป็นห้องเรียนประเภทไหนห้องแลปที่มีการเรียนการสอนที่ต้องใช้สื่อการสอน เพื่อให้สามารถนําไปจัดสรรห้องใน' +
                                                'การใช้สอนนักศึกษา',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบจัดสรรห้องเรียนและห้องสอบ
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบจัดสรรห้องเรียนและห้องสอบ เป็นระบบที่แอดมินสามารถจัดสรรห้องเรียนสําหรับการ
                                        เรียนการสอนได้ สามารถเลือกได้ว่าจะบันทึกข้อมูลการใช้ห้องสอบในการสอบกลางภาคและประจําภาคของ
                                        แต่ละวิชาหรือไม่
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบจัดสรรห้องเรียนและห้องสอบ',
                                            text: 'ระบบย่อย ระบบจัดสรรห้องเรียนและห้องสอบ เป็นระบบที่แอดมินสามารถจัดสรรห้องเรียนสําหรับการ' +
                                                'เรียนการสอนได้ด้วยการเพิ่มข้อมูลการใช้ห้องเรียน โดยการเพิ่มข้อมูลนั้น จะต้องระบุรายวิชา, ห้องเรียนที่ใช้, กลุ่ม' +
                                                'เรียน และช่วงเวลาที่ใช้ในการเรียนการสอน โดยห้องที่ใช้และช่วงเวลานั้น จะต้องไม่ซ้ํากับข้อมูลการใช้ห้องเรียนที่' +
                                                'มีอยู่แล้ว นอกจากนี้ผู้จัดการระบบสามารถแก้ไขข้อมูลและลบข้อมูลการใช้ห้องเรียนได้' +
                                                'ต่อมาแอดมินสามารถเลือกได้ว่าจะบันทึกข้อมูลการใช้ห้องสอบในการสอบกลางภาคและประจําภาคของ' +
                                                'แต่ละวิชาหรือไม่ ถ้าต้องการบันทึกข้อมูล แอดมินจะต้องระบุรายวิชา, ห้องสอบ, วัน/เดือน/ปีที่จัดสอบ และ' +
                                                'ช่วงเวลาในการสอบ โดยห้องที่ใช้และช่วงเวลานั้น จะต้องไม่ซ้ํากับข้อมูลการใช้ห้องสอบที่มีอยู่แล้ว นอกจากนี้แอด' +
                                                'มินสามารถแก้ไขข้อมูลและลบข้อมูลการใช้ห้องสอบได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบลงทะเบียนรายวิชา
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบย่อยลงทะเบียนรายวิชา จะช่วยให้นักศึกษาสามารถเลือกลงทะเบียนเรียนในรายวิชาที่ตน
                                        ต้องการเมื่อถึงเวลาที่กําหนด โดยนักศึกษาสามารถเลือกหลักสูตร และกลุ่มที่ตนต้องการจะเรียน นักศึกษาสามารถ
                                        แก้ไข หรือลบรายวิชาที่ลงทะเบียนผิดพลาดได้ เมื่อลงทะเบียนเสร็จสิ้นระบบสามารถแสดงสรุปรายการที่นักศึกษา
                                        ลงทะเบียน เพื่อยืนยันว่านักศึกษาลงทะเบียน
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบลงทะเบียนรายวิชา',
                                            text: 'ระบบย่อยลงทะเบียนรายวิชา จะช่วยให้นักศึกษาสามารถเลือกลงทะเบียนเรียนในรายวิชาที่ตน' +
                                                'ต้องการเมื่อถึงเวลาที่กําหนด โดยนักศึกษาสามารถเลือกหลักสูตร และกลุ่มที่ตนต้องการจะเรียน นักศึกษาสามารถ' +
                                                'แก้ไข หรือลบรายวิชาที่ลงทะเบียนผิดพลาดได้ เมื่อลงทะเบียนเสร็จสิ้นระบบสามารถแสดงสรุปรายการที่นักศึกษา' +
                                                'ลงทะเบียน เพื่อยืนยันว่านักศึกษาลงทะเบียน',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบประวัติเพิ่มลดรายวิชา
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบประวัติเพิ่มลดรายวิชาเป็นระบบย่อยที่นักศึกษาสามารถทําการบันทึก เพิ่ม ลดและแก้ไขข้อมูลการ
                                        ลงทะเบียนได้
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบประวัติเพิ่มลดรายวิชา',
                                            text: 'ระบบประวัติเพิ่มลดรายวิชาเป็นระบบย่อยที่นักศึกษาสามารถทําการบันทึก เพิ่ม ลดและแก้ไขข้อมูลการ' +
                                                'ลงทะเบียนได้จากนักศึกษาที่ทําการเพิ่ม ลดเข้าในระบบ โดยทําการเลือกเพิ่ม ลดหรือเปลี่ยนกลุ่ม จากนั้นค้นหา' +
                                                'รายวิชาเลือกหลักสูตร และเลือกกลุ่มที่นักศึกษาต้องการลงทะเบียน โดยสามารถตรวจสอบกลุ่มว่าเต็มหรือไม่ได้' +
                                                'จากจํานวนคนที่เหลือ เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว นักศึกษาจะสามารถกดบันทึกประวัติเพิ่มลดรายวิชา โดยจะ' +
                                                'สามารถแก้ไขข้อมูลได้ และนอกจากนี้นักศึกษาสามารถดูข้อมูลการลงทะเบียนได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบยื่นคำร้องออนไลน์
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบยื่นคําร้องออนไลน์เป็นระบบย่อยที่นักศึกษา สามารถจัดการในส่วนของการสามารถบันทึก,
                                        แก้ไขและลบข้อมูลการยื่นคําร้องออนไลน์ได้ โดยนักศึกษาสามารถเลือกรายวิชาและเลือกประเภทคําร้องที่
                                        ต้องการยื่นคําร้องออนไลน์
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบยื่นคำร้องออนไลน์',
                                            text: 'ระบบยื่นคําร้องออนไลน์เป็นระบบย่อยที่นักศึกษา สามารถจัดการในส่วนของการสามารถบันทึก,' +
                                                'แก้ไขและลบข้อมูลการยื่นคําร้องออนไลน์ได้ โดยนักศึกษาสามารถเลือกรายวิชาและเลือกประเภทคําร้องที่' +
                                                'ต้องการยื่นคําร้องออนไลน์ ซึ่งประเภทคําร้อง ได้แก่ กลุ่มเต็มและเปลี่ยนกลุ่ม เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว' +
                                                'นักศึกษาจะสามารถกดบันทึกการยื่นคําร้องให้อาจารย์ในรายวิชาที่ต้องการยื่นคําร้องออนไลน์ได้ โดยจะ' +
                                                'สามารถแก้ไขหรือลบข้อมูลได้ในภายหลัง และนอกจากนี้นักศึกษาสามารถดูข้อมูลการยื่นคําร้องออนไลน์ที่' +
                                                'บันทึกในรูปแบบของตารางได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบอนุมัติคำร้องออนไลน์
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบอนุมัติคําร้องออนไลน์เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทําการบันทึก และ
                                        แก้ไขข้อมูลการอนุมัติคําร้องออนไลน์ได้จากนักศึกษาที่ยื่นคําร้องออนไลน์เข้าในระบบ โดยทําการเลือกรหัส
                                        การยื่นคําร้องออนไลน์ที่ต้องการตรวจสอบคําร้อง
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบอนุมัติคำร้องออนไลน์',
                                            text: 'ระบบอนุมัติคําร้องออนไลน์เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทําการบันทึก' +
                                                'แก้ไขข้อมูลการอนุมัติคําร้องออนไลน์ได้จากนักศึกษาที่ยื่นคําร้องออนไลน์เข้าในระบบ โดยทําการเลือกรหัส' +
                                                'การยื่นคําร้องออนไลน์ที่ต้องการตรวจสอบคําร้อง จากนั้นเลือกผลการอนุมัติ โดยสามารถเลือกกดอนุมัติคํา' +
                                                'ร้องหรือไม่อนุมัติคําร้องให้กับนักศึกษาที่ยื่นคําร้องออนไลน์มา เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว อาจารย์จะสามารถ' +
                                                'กดบันทึกการอนุมัติคําร้องออนไลน์ได้ โดยจะสามารถแก้ไขข้อมูลได้ในภายหลัง และนอกจากนี้อาจารย์' +
                                                'สามารถดูข้อมูลการอนุมัติคําร้องออนไลน์ที่บันทึกในรูปแบบของตารางได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบบันทึกผลการเรียน
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบย่อยระบบบันทึกผลการเรียน เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทําการเพิ่ม และ
                                        แก้ไขข้อมูลเกรดนักศึกษาในรายวิชาที่อาจารย์ผู้สอนเปิดสอนในรายวิชาเข้าในระบบ
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบบันทึกผลการเรียน',
                                            text: 'ระบบย่อยระบบบันทึกผลการเรียน เป็นระบบย่อยที่อาจารย์ผู้เปิดสอนในรายวิชาสามารถทําการเพิ่ม และ' +
                                                'แก้ไขข้อมูลเกรดนักศึกษาในรายวิชาที่อาจารย์ผู้สอนเปิดสอนในรายวิชาเข้าในระบบ โดยทําการค้นหารายวิชา' +
                                                'และกลุ่มรายวิชาที่สอน จากนั้นเลือกเกรดที่จะเพิ่มให้นักศึกษารายบุคคล เมื่อใส่ข้อมูลเสร็จสิ้นแล้ว อาจารย์จะ' +
                                                'สามารถกดบันทึกการ บันทึกผลการเรียนได้ โดยจะสามารถแก้ไขข้อมูลได้ในภายหลัง และนอกจากนี้อาจารย์' +
                                                'สามารถดูข้อมูลการบันทึกได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box sx={{ padding: 2 }}>
                        <Card sx={{ maxWidth: 500, width: 'auto', minWidth: 250, boxShadow: 5, height: 250 }}>
                            <CardContent>
                                <Typography variant='h5' color="text.secondary" gutterBottom>
                                    ระบบบันทึกรายจ่าย
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="text.secondary">
                                        ระบบบันทึกรายจ่ายเป็นระบบที่ให้เจ้าหน้าที่ของมหาลัย หรือแอดมินใช้ เพื่อยืนยันการชําระเงิน
                                        ค่าลงทะเบียนเรียนของนักศึกษา โดยเมื่อนักศึกษาทําการจ่ายเงินตามจํานวนครบแล้ว จะต้องยื่นหลักฐานเพื่อให้
                                        เจ้าหน้าที่ของมหาลัย หรือแอดมิน ทําการบันทึกลงในระบบ
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'ระบบบันทึกรายจ่าย',
                                            text: 'ระบบบันทึกรายจ่ายเป็นระบบที่ให้เจ้าหน้าที่ของมหาลัย หรือแอดมินใช้ เพื่อยืนยันการชําระเงิน' +
                                                'ค่าลงทะเบียนเรียนของนักศึกษา โดยเมื่อนักศึกษาทําการจ่ายเงินตามจํานวนครบแล้ว จะต้องยื่นหลักฐานเพื่อให้' +
                                                'เจ้าหน้าที่ของมหาลัย หรือแอดมิน ทําการบันทึกลงในระบบ โดยสิงที่ต้องบันทึกประกอบไปด้วยจํานวนเงินที่ชําระ' +
                                                'เลขที่ใบเสร็จ ในกรณีที่นักศึกษาใช้ประเภทการชําระเป็นการชําระด้วยการโอน และกรอกวันเวลาที่จ่าย นักศึกษา' +
                                                'สามารถผ่อนจ่ายได้ ไม่จําเป็นต้องชําระเต็มจํานวนในครั้งเดียว แอดมินสามารถแก้ไขรายจ่ายให้นักศึกษาได้',
                                            showConfirmButton: false,
                                            // width: 'auto',
                                        })
                                    }}
                                >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            </Box>
        </Box>

    )
}
export default MainPage;