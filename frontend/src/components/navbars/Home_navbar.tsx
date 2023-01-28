import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Divider, Drawer, FormControl, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";
import ClassIcon from '@mui/icons-material/Class';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from "react-router-dom";

function Home_Navbar() {
    const page_navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    // const [member, setMember] = React.useState<Partial<MembersInterface>>({});
    // const [student, setStudent] = React.useState<Partial<StudentsInterface>>({});
    // const [role, setRole] = React.useState<Partial<RolesInterface>>({});

    const toggleDrawerOpen = () => {
        setOpen(true)
    };

    const toggleDrawerClose = () => {
        setOpen(false)
    };

    // Declaring a HTTP Port of 8080.
    const apiUrl = "http://localhost:8080";

    // Declaring a HTTP request for requesting GET method
    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("member_token")}`,
            "Content-Type": "application/json"
        },
    };

    React.useEffect(() => {
        // getStudent();
        // getMemberByStdID();
    }, []);


    const signout = () => {
        localStorage.clear();
        window.location.href = "/";
    };


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
                                <Button variant="contained"> เข้าสู่ระบบ </Button>
                            </FormControl>
                        </Box>
                        <ListItem disablePadding>
                            <ListItemButton
                            // component={RouterLink}
                            // to="/member-home"
                            >
                                {/* <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="หน้าหลัก" onClick={() => { page_navigate({ pathname: `/` }) }} />
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding>
                            <ListItemButton
                            // component={RouterLink}
                            // to="/activitymember"
                            >
                                {/* <ListItemIcon>
                                    <ClassIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="วิชาที่เปิดสอน" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                            component={RouterLink}
                            to="/course"
                            >
                                {/* <ListItemIcon>
                                    <FeedbackIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="หลักสูตรที่เปิดสอน" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                            component={RouterLink}
                            to="/student"
                            >
                                {/* <ListItemIcon>
                                    <FeedbackIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="จัดการนักศึกษา(สำหรับเจ้าหน้าที่)" />
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
export default Home_Navbar;