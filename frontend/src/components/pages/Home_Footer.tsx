import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { FormControl } from "@mui/material";

function Footer() {
    return (
        <AppBar sx={{ bgcolor: "#646464", position: "static", padding: 3 }}>
            <Stack direction="row" spacing={2}>
                <Box flexGrow={1} sx={{ border: 0, padding: 1 }}>
                    <Typography  sx={{fontSize:22, color:"#78B1C8", fontFamily:"Noto Sans Thai"}}> ติดต่อมหาวิทยาลัย</Typography>
                    <Typography  sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> มหาวิทยาลัยเทคโนโลยีสุรนารี ถ.มหาวิทยาลัย ต.สุรนารี  </Typography>
                    <Typography  sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> อ.เมือง จ.นครราชสีมา 30000 </Typography>
                    <p></p>
                    <Typography  sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> โทรศัพท์ 0-4422-3000 </Typography>
                    <Typography  sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> โทรสาร 0-4422-4070  </Typography>

                </Box>
                <Box flexGrow={1} sx={{ border: 0, padding: 1 }}>
                    <Typography sx={{fontSize:22, color:"#78B1C8", fontFamily:"Noto Sans Thai"}}> ติดต่อ หน่วยประสานงาน มทส. กทม.</Typography>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> 128/237 อาคารพญาไท พลาซ่า ชั้น 22 ถนนพญาไท เขต </Typography>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> ราชเทวี จังหวัดกรุงเทพมหานคร 10400 </Typography>
                    <p></p>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> โทรศัพท์ 0-2216-5410, 0-2216-5493-4</Typography>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> โทรสาร 0-2216-5411</Typography>
                </Box>
                <Box flexGrow={1} sx={{ border: 0, padding:1}}>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> 523332 Software Engineering </Typography>
                    <Typography sx={{fontSize:18, fontFamily:"Noto Sans Thai"}}> Computer Engineering </Typography>

                </Box>
            </Stack>
            <FormControl fullWidth>
                <Stack justifyItems="center" alignItems="center" direction="column">
                    <Typography sx={{ fontFamily:"Noto Sans Thai"}}> Copyright 2018 beta.sut.ac.th All Right Reserved. </Typography>
                </Stack>
            </FormControl>
            {/* <AppBar sx={{ bgcolor: "#646464", position: "static" , padding:3}}>
                <Typography component="div" > ท่านเข้าสู่ระบบในชื่อ ABCDERF </Typography>
                <Typography component="div" > หน้าหลัก </Typography>
                <Typography component="div" > Tel. 099-999-9999 </Typography>
            </AppBar> */}
        </AppBar>
    );
}

export default Footer;