import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Subject_Management_Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: "#646464", position: "static" , padding:3}}>
                <Typography component="div" > ท่านเข้าสู่ระบบในชื่อ ABCDERF </Typography>
                <Typography component="div" > หน้าหลัก </Typography>
                <Typography component="div" > Tel. 099-999-9999 </Typography>
            </AppBar>
        </Box>
    );
}

export default Subject_Management_Footer;