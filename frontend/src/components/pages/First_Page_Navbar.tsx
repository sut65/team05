import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function First_Page_Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar component="nav" sx={{ bgcolor: "#7CB6D5" }}>
                <Toolbar>
                    <Typography component="div" sx={{ color: 'black', flexGrow: 1, fontFamily: 'LilyUPC', fontSize: 36 }}> ระบบลงทะเบียนเรียน </Typography>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to="/home" 
                        sx={{borderRadius:6}}> Login </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )

}
export default First_Page_Navbar;