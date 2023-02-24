import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function First_Page_Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar component="nav" sx={{ bgcolor: "#FF7518" }}>
                <Toolbar>
                    <Stack
                        justifyContent="center"
                        alignItems="center" 
                        direction="row" 
                        spacing={2} 
                        flexGrow={1} 
                        sx={{border:0}}>
                        <Box sx={{border:0}}>
                            <Typography variant="h5" sx={{color:"white", fontFamily:"Noto Sans Thai"}}> ระบบลงทะเบียนเรียน </Typography>
                        </Box>
                        <Box sx={{border:0}}>
                            <Typography variant="h5" sx={{color:"white", fontFamily:"Noto Sans Thai"}}> Software Engineering </Typography>
                        </Box>
                        <Box sx={{border:0}}>
                            <LocalPhoneIcon/>
                        </Box>
                        <Box sx={{border:0}}>
                            <Button
                                component={Link}
                                to="/home"
                                variant="contained"
                                sx={{borderRadius:5, bgcolor:"black"}}
                            >   
                                <Typography sx={{fontFamily:"Noto Sans Thai"}}>
                                    Login
                                </Typography>
                            </Button>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )

}
export default First_Page_Navbar;