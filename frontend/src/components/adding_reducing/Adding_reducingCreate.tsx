import React from "react";

import { Link as RouterLink } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { Adding_reducingInterface } from "../models/IAdding_Reducing";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

import { InputLabel } from "@mui/material";

import Autocomplete from '@mui/material/Autocomplete';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function Adding_reducingCreate() {

 const [date, setDate] = React.useState<Date | null>(null);

 const [users, setUser] = React.useState<Partial<Adding_reducingInterface>>({});
// const [enrolls, setEnroll] = React.useState<EnrollInterface[]>([]);
 //const [subjects, setSubject] = React.useState<SubjectInterface[]>([]);
 //const [students, setStudent] = React.useState<StudentInterface[]>([]);
 const [success, setSuccess] = React.useState(false);

 const [error, setError] = React.useState(false);

 const status_addandreduce = [
  { label: 'เพิ่ม' },
  { label: 'ลด' },
  { label: 'เปลี่ยนกลุ่ม' },]
 const handleClose = (

   event?: React.SyntheticEvent | Event,

   reason?: string

 ) => {

   if (reason === "clickaway") {

     return;

   }

   setSuccess(false);

   setError(false);

 };
 const handleSelectChange = (event: SelectChangeEvent<string>) => {
  const name = event.target.name as keyof typeof Adding_reducingCreate;
  setUser({
    ...users,
    [name]: event.target.value,
  });
};

 const handleInputChange = (

   event: React.ChangeEvent<{ id?: string; value: any }>

 ) => {

   const id = event.target.id as keyof typeof Adding_reducingCreate;

   const { value } = event.target;

   setUser({ ...users, [id]: value });

 };


 function submit() {

   let data = {
     Status: users.Status ?? "",
     enroll: users.Enroll_ID ?? "",
     Subject: users.Subject_ID?? "",
     Student: users.Student_ID?? "",
   };


   const apiUrl = "http://localhost:8080/users";

   const requestOptions = {

     method: "POST",

     headers: { "Content-Type": "application/json" },

     body: JSON.stringify(data),

   };


   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       if (res.data) {

         setSuccess(true);

       } else {

         setError(true);

       }

     });

 }

 function createData(
  name: string,
  calories: number,
  fat: number,
  aa: number,
  
) {
  return { name, calories, fat,aa };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0,10),
  createData('Ice cream sandwich', 237, 9.0,10),
  createData('Eclair', 262, 16.1,10),
  createData('Eclair', 262, 16.1,10),
  
];
 return (

   <Container maxWidth="md">

     <Snackbar

       open={success}

       autoHideDuration={6000}

       onClose={handleClose}

       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

     >

       <Alert onClose={handleClose} severity="success">

         บันทึกข้อมูลสำเร็จ

       </Alert>

     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

       <Alert onClose={handleClose} severity="error">

         บันทึกข้อมูลไม่สำเร็จ

       </Alert>

     </Snackbar>

     <Paper>

       <Box

         display="flex"

         sx={{

           marginTop: 2,

         }}

       >

         <Box sx={{ paddingX: 2, paddingY: 1 }}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

             ระบบประวัติเพิ่มลดรายวิชา

           </Typography>

         </Box>

       </Box>

       <Divider />

       <Grid container spacing={3} sx={{ padding: 2 }}>

         <Grid item xs={3}>

           <FormControl fullWidth variant="outlined">

             
           {/* <InputLabel id="status">เพิ่ม</InputLabel> */}
             
            <Autocomplete
              disablePortal
              id="Status"
              options={status_addandreduce}
              sx={{ width: 200 }}
              renderInput={(params) => 
          <TextField {...params} label="เพิ่ม"/>}/>
               {/* <Select
                value={users.Status}
                onChange={handleSelectChange}
                autoWidth
              > */}
                        {/* {users.map((item: Adding_reducingInterface) => (
                            <MenuItem value={item.Change_ID} key={item.Change_ID}>
                            {item.Status}
                           </MenuItem>
                          ))} */}
                       {/* </Select> */}

           </FormControl>

         </Grid>
         <Grid item xs={3}>
         <FormControl fullWidth variant="outlined">

             
<InputLabel id="Course">หลักสูตร</InputLabel>
  <Select
     value={users.Status}//ใช้enroll interface
     onChange={handleSelectChange}
     autoWidth
   >
             {/* {users.map((item: Adding_reducingInterface) => (
                 <MenuItem value={item.Change_ID} key={item.Change_ID}>
                 {item.Status}ใช้item.course_id
                </MenuItem>
               ))} */}
            </Select>

</FormControl>
          </Grid>


          
         <Grid item xs={12}>

           <FormControl fullWidth variant="outlined">

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>กลุ่ม</TableCell>
                    <TableCell align="right">เวลา</TableCell>
                    <TableCell align="right">รับ</TableCell>
                    <TableCell align="right">ลง</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.aa}</TableCell> 
                  </TableRow>
                 ))}
                </TableBody>
             </Table>
            </TableContainer>

             {/* <TextField

               id="Email"

               variant="outlined"

               type="string"

               size="medium"

              //  value={user.Email || ""}

              //  onChange={handleInputChange}

             /> */}

          </FormControl>
        </Grid>



         <Grid item xs={12}>

           <FormControl fullWidth variant="outlined">

             {/* <p>Age</p>

             <TextField

               id="Age"

               variant="outlined"

               type="number"

               size="medium"

               InputProps={{ inputProps: { min: 1 } }}

               InputLabelProps={{

                 shrink: true,

               }}

              //  value={user.Age || ""}

              //  onChange={handleInputChange} */}

             {/* /> */}
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>รหัสวิชา</TableCell>
            <TableCell align="right">หลักสูตร</TableCell>
            <TableCell align="right">รายวิชา</TableCell>
            <TableCell align="right">หน่วยกิต</TableCell>
            <TableCell align="right">กลุ่ม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.aa}</TableCell>
              <TableCell align="right">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="section">หลักสูตร</InputLabel>
                    <Select
                        value={users.Status}//ใช้enroll interface
                        onChange={handleSelectChange}
                        autoWidth>
                      {/* {users.map((item: Adding_reducingInterface) => (
                      <MenuItem value={item.Change_ID} key={item.Change_ID}>
                        {item.Status}ใช้item.course_id
                      </MenuItem>
                      ))} */}
                    </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

           </FormControl>

         </Grid>

         

         <Grid item xs={12}>

           <Button component={RouterLink} to="/" variant="contained">

             Back

           </Button>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="primary"

           >

             Submit

           </Button>

         </Grid>

       </Grid>

     </Paper>

   </Container>

 );

}


export default Adding_reducingCreate;