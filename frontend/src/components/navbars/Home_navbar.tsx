import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Divider, Drawer, FormControl, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Home_Navbar() {
    const page_navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const usertype = localStorage.getItem("usertype")
    const [token, setToken] = useState<String>("");

    const toggleDrawerOpen = () => {
        setOpen(true)
    };

    const toggleDrawerClose = () => {
        setOpen(false)
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    if (usertype === "admin") {
        return (
            <Box sx={{ flexGrow: 1 }}>

                <AppBar component="nav" sx={{ bgcolor: "#7CB6D5" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="div" sx={{ color: 'black', flexGrow: 1, fontFamily: 'LilyUPC', fontSize: 36 }}> ระบบลงทะเบียนเรียน </Typography>


                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <Box style={{
                        backgroundImage: "url(https://free4kwallpapers.com/uploads/originals/2018/05/22/japan-street-club-by-arseniy-chebynkin-wallpaper.jpg)",
                    }}></Box>
                    <Box width={'300px'}>
                        <Grid>
                            <Typography variant="h5" color="primary" sx={{ ml: 2 }} > ระบบต่างๆ </Typography>
                        </Grid>
                        <Divider />
                        <List>

                            <Box flex={1} sx={{ padding: 2 }}>
                                <FormControl fullWidth>
                                    <Button
                                        onClick={() => {
                                            localStorage.clear()
                                            window.location.reload()
                                        }}
                                        component={RouterLink}
                                        to="/home"
                                        variant="contained"
                                    > ออกจากระบบ </Button>
                                </FormControl>
                            </Box>
                            <ListItem disablePadding>
                                <ListItemButton component={RouterLink} to="/">

                                    <ListItemText primary="หน้าหลัก" />
                                </ListItemButton>
                            </ListItem>


                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/subject"
                                >
                                    <ListItemText primary="จัดการข้อมูลรายวิชา" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/schedule"
                                >
                                    <ListItemText primary="ข้อมูลการใช้ห้อง" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/course"
                                >
                                    <ListItemText primary="หลักสูตรที่เปิดสอน" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/student"
                                >
                                    <ListItemText primary="จัดการข้อมูลนักศึกษา" />
                                </ListItemButton>
                            </ListItem>

                            {/* <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to="/request"
                                    >
                                        <ListItemText primary="ยื่นคำร้องออนไลน์" />
                                    </ListItemButton>
                                </ListItem> */}

                            <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to="/approval"
                                    >
                                        <ListItemText primary="อนุมัติคำร้องออนไลน์(สำหรับอาจารย์)" />
                                    </ListItemButton>
                                </ListItem>

                        </List>
                        <Divider />
                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > 523332 Software Engineering </Typography>

                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > Group 15 </Typography>

                    </Box>

                </Drawer>


            </Box>
        )
    }
    if (usertype === "student") {
        return (
            <Box sx={{ flexGrow: 1 }}>

                <AppBar component="nav" sx={{ bgcolor: "#7CB6D5" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="div" sx={{ color: 'black', flexGrow: 1, fontFamily: 'LilyUPC', fontSize: 36 }}> ระบบลงทะเบียนเรียน </Typography>


                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <Box style={{
                        backgroundImage: "url(https://free4kwallpapers.com/uploads/originals/2018/05/22/japan-street-club-by-arseniy-chebynkin-wallpaper.jpg)",
                    }}></Box>
                    <Box width={'300px'}>
                        <Grid>
                            <Typography variant="h5" color="primary" sx={{ ml: 2 }} > ระบบต่างๆ </Typography>
                        </Grid>

                        <Divider />

                        <List>
                            <Box flex={1} sx={{ padding: 2 }}>
                                <FormControl fullWidth>
                                    <Button
                                        onClick={() => {
                                            localStorage.clear()
                                            window.location.reload()
                                        }}
                                        component={RouterLink}
                                        to="/home"
                                        variant="contained"
                                    > ออกจากระบบ </Button>
                                </FormControl>
                            </Box>
                            <ListItem disablePadding>
                                <ListItemButton component={RouterLink} to="/">

                                    <ListItemText primary="หน้าหลัก" onClick={() => { page_navigate({ pathname: `/` }) }} />
                                </ListItemButton>
                            </ListItem>



                            {/* <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to="/course"
                                    >
                                        <ListItemText primary="หลักสูตรที่เปิดสอน" />
                                    </ListItemButton>
                                </ListItem> */}


                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/request"
                                >
                                    <ListItemText primary="ยื่นคำร้องออนไลน์" />
                                </ListItemButton>
                            </ListItem>

                            {/* <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to="/approval"
                                    >
                                        <ListItemText primary="อนุมัติคำร้องออนไลน์(สำหรับอาจารย์)" />
                                    </ListItemButton>
                                </ListItem> */}
                        </List>
                        <Divider />
                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > 523332 Software Engineering </Typography>

                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > Group 15 </Typography>
                    </Box>
                </Drawer>
            </Box>
        )
    }
    if (usertype === "professor") {
        return (
            <Box sx={{ flexGrow: 1 }}>

                <AppBar component="nav" sx={{ bgcolor: "#7CB6D5" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="div" sx={{ color: 'black', flexGrow: 1, fontFamily: 'LilyUPC', fontSize: 36 }}> ระบบลงทะเบียนเรียน </Typography>


                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <Box style={{
                        backgroundImage: "url(https://free4kwallpapers.com/uploads/originals/2018/05/22/japan-street-club-by-arseniy-chebynkin-wallpaper.jpg)",
                    }}></Box>
                    <Box width={'300px'}>
                        <Grid>
                            <Typography variant="h5" color="primary" sx={{ ml: 2 }} > ระบบต่างๆ </Typography>
                        </Grid>

                        <Divider />

                        <List>
                            <Box flex={1} sx={{ padding: 2 }}>
                                <FormControl fullWidth>
                                    <Button
                                        onClick={() => {
                                            localStorage.clear()
                                            window.location.reload()
                                        }}
                                        component={RouterLink}
                                        to="/home"
                                        variant="contained"
                                    > ออกจากระบบ </Button>
                                </FormControl>
                            </Box>
                            <ListItem disablePadding>
                                <ListItemButton component={RouterLink} to="/">

                                    <ListItemText primary="หน้าหลัก" onClick={() => { page_navigate({ pathname: `/` }) }} />
                                </ListItemButton>
                            </ListItem>



                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/course"
                                >
                                    <ListItemText primary="หลักสูตรที่เปิดสอน" />
                                </ListItemButton>
                            </ListItem>

                            {/* //* Adding Point System */}
                            {/* <ListItem disablePadding>
                                    <ListItemButton
                                        component={RouterLink}
                                        to="/adding_point"
                                    >
                                        <ListItemText primary="ยื่นคำร้องออนไลน์" />
                                    </ListItemButton>
                                </ListItem> */}

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={RouterLink}
                                    to="/approval"
                                >
                                    <ListItemText primary="อนุมัติคำร้องออนไลน์(สำหรับอาจารย์)" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > 523332 Software Engineering </Typography>

                        <Typography
                            sx={{
                                padding: 1,
                                fontWeight: 'bold',
                                fontStyle: 'LilyUPC',
                            }}
                        > Group 15 </Typography>
                    </Box>
                </Drawer>
            </Box>
        )
    }
    else {
        return (
            <div></div>
        )

    }

}
export default Home_Navbar;