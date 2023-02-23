import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Divider, Drawer, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Stack, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

function UserShow() {
    const usertype = localStorage.getItem("usertype") == "admin" ? "Admin" : localStorage.getItem("usertype") == "student" ? "Student" : "Professor"
    const [username, setUsername] = React.useState("");
    const apiUrl = "http://localhost:8080";

    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let uid = localStorage.getItem("id");
    if (usertype == "Student") {
        fetch(`${apiUrl}/student/${uid}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setUsername(res.data.Student_Name);
                }
            });

    } else if (usertype == "Professor") {
        fetch(`${apiUrl}/professor/${uid}`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setUsername(res.data.Professor_name);
                }
            });
    }

    return (
        <Box sx={{ border: 0, bgcolor: "grey", padding: 2 }}>
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ border: 0 }}>
                <Box sx={{ padding: 0.5 }}>
                    <Avatar sx={{ width: 60, height: 60 }} />
                </Box>
                <Typography sx={{ fontWeight: "Bold", fontFamily: "Noto Sans Thai", paddingTop: 2 }}> {localStorage.getItem("id")} </Typography>
                <Typography sx={{ fontWeight: "Bold", fontFamily: "Noto Sans Thai" }}> {username}</Typography>
                <Typography sx={{ fontWeight: "Bold", fontFamily: "Noto Sans Thai" }}> {usertype}</Typography>
            </Stack>
        </Box>
    )
}

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

                <AppBar component="nav" sx={{ bgcolor: "#FF7518" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2, bgcolor: "white" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{
                                color: "white",
                                flexGrow: 1,
                                fontFamily: "Noto Sans Thai",
                                fontSize: 22,
                            }}
                        >
                            {" "}
                            ระบบลงทะเบียนเรียน{" "}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <UserShow />
                    <Box flex={1} sx={{ padding: 2 }}>
                        <FormControl fullWidth>
                            <Button
                                onClick={() => {
                                    localStorage.clear()
                                    window.location.href = "/"
                                }}
                                component={RouterLink}
                                to="/home"
                                variant="contained"
                            >
                                <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                    ออกจากระบบ
                                </Typography>
                            </Button>
                        </FormControl>
                    </Box>

                    <Box width='300px'>
                        <Box sx={{ margin: 1.5 }}>
                            <Stack sx={{ border: 1, borderRadius: 3, borderColor: "#e1e1e1" }}>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/">
                                            <ListItemText primary="หน้าหลัก" />
                                        </ListItemButton>
                                    </ListItem>

                                    <Divider />
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/subject"
                                        >
                                            <ListItemText primary="จัดการข้อมูลรายวิชา" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/schedule"
                                        >
                                            <ListItemText primary="ข้อมูลการใช้ห้อง" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/course"
                                        >
                                            <ListItemText primary="หลักสูตรที่เปิดสอน" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/student"
                                        >
                                            <ListItemText primary="จัดการข้อมูลนักศึกษา" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/payment"
                                        >
                                            <ListItemText primary="บันทึกรายจ่าย" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />


                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/adding_point">
                                            <ListItemText primary="บันทึกผลการเรียน" />
                                        </ListItemButton>
                                    </ListItem>


                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/approval"
                                        >
                                            <ListItemText primary="อนุมัติคำร้องออนไลน์(สำหรับอาจารย์)" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Stack>
                        </Box>
                        <Divider />
                        <Stack justifyContent="center" alignItems="center">
                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontFamily: "Noto Sans Thai",
                                }}
                            >
                                {" "}
                                523332 Software Engineering{" "}
                            </Typography>

                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontFamily: "Noto Sans Thai",
                                }}
                            >
                                {" "}
                                Team 05{" "}
                            </Typography>
                        </Stack>
                    </Box>
                </Drawer>
            </Box>
        )
    }
    if (usertype === "student") {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar component="nav" sx={{ bgcolor: "#FF7518" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2, bgcolor: "white" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{
                                color: "white",
                                flexGrow: 1,
                                fontFamily: "Noto Sans Thai",
                                fontSize: 22,
                            }}
                        >
                            {" "}
                            ระบบลงทะเบียนเรียน{" "}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <UserShow />
                    <Box sx={{ padding: 2 }}>
                        <FormControl fullWidth>
                            <Button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/";
                                }}
                                component={RouterLink}
                                to="/home"
                                variant="contained"
                            >
                                <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                    {" "}ออกจากระบบ{" "}
                                </Typography>
                            </Button>
                        </FormControl>
                    </Box>

                    <Box width={"300px"}>
                        <Box sx={{ margin: 1.5 }}>
                            <Stack
                                sx={{ border: 1, borderRadius: 3, borderColor: "#e1e1e1" }}
                            >
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/">
                                            <ListItemText
                                                primary="หน้าหลัก"
                                                onClick={() => {
                                                    page_navigate({ pathname: `/` });
                                                }}
                                            />

                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/adding_reducing"
                                        >
                                            <ListItemText primary="ประวัติเพิ่มลดรายวิชา" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/request">
                                            <ListItemText primary="ยื่นคำร้องออนไลน์" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />

                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/enroll">
                                            <ListItemText primary="ลงทะเบียนรายวิชา" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Stack>
                        </Box>

                        <Divider />
                        <Stack justifyContent="center" alignItems="center">
                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontStyle: "Noto Sans Thai",
                                }}
                            >
                                {" "}
                                523332 Software Engineering{" "}
                            </Typography>

                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontStyle: "Noto Sans Tha",
                                }}
                            >
                                {" "}
                                Team 05{" "}
                            </Typography>
                        </Stack>
                    </Box>
                </Drawer>
            </Box>
        );
    }
    if (usertype === "professor") {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar component="nav" sx={{ bgcolor: "#FF7518" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            onClick={toggleDrawerOpen}
                            sx={{ mr: 2, bgcolor: "white" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            sx={{
                                color: "white",
                                flexGrow: 1,
                                fontFamily: "Noto Sans Thai",
                                fontSize: 22,
                            }}
                        >
                            {" "}
                            ระบบลงทะเบียนเรียน{" "}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={open} onClose={toggleDrawerClose}>
                    <UserShow />
                    <Box sx={{ padding: 2 }}>
                        <FormControl fullWidth>
                            <Button
                                onClick={() => {
                                    localStorage.clear()
                                    window.location.href = "/"
                                }}
                                component={RouterLink}
                                to="/home"
                                variant="contained"
                            >
                                <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                    ออกจากระบบ
                                </Typography>
                            </Button>
                        </FormControl>
                    </Box>
                    <Box width={'300px'}>
                        <Box sx={{ margin: 1.5 }}>
                            <Stack sx={{ border: 1, borderRadius: 3, borderColor: "#e1e1e1" }}>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/">

                                            <ListItemText primary="หน้าหลัก" onClick={() => { page_navigate({ pathname: `/` }) }} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton component={RouterLink} to="/adding_point">
                                            <ListItemText primary="บันทึกผลการเรียน" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={RouterLink}
                                            to="/approval"
                                        >
                                            <ListItemText primary="อนุมัติคำร้องออนไลน์(สำหรับอาจารย์)" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Stack>
                        </Box>

                        <Divider />
                        <Stack justifyContent="center" alignItems="center">
                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontStyle: "Noto Sans Thai",
                                }}
                            >
                                {" "}
                                523332 Software Engineering{" "}
                            </Typography>

                            <Typography
                                sx={{
                                    padding: 1,
                                    fontWeight: "bold",
                                    fontStyle: "Noto Sans Tha",
                                }}
                            >
                                {" "}
                                Team 05{" "}
                            </Typography>
                        </Stack>
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