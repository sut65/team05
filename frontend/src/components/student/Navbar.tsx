import * as React from "react";

import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import FolderIcon from '@mui/icons-material/Folder';

import CoPresentIcon from '@mui/icons-material/CoPresent';



function Navbar() {

 return (

   <Box sx={{ flexGrow: 1 }}>

     <AppBar position="static">

       <Toolbar>

         <IconButton

           size="large"

           edge="start"

           color="inherit"

           aria-label="menu"

           sx={{ mr: 2 }}

         >

           <MenuIcon />

         </IconButton>

         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

         <CoPresentIcon sx={{  fontFamily : "LilyUPC"  ,fontSize:40, mb:-1}} />

          ระบบลงทะเบียนเรียน

         </Typography>

       </Toolbar>

     </AppBar>

   </Box>

 );

}

export default Navbar;