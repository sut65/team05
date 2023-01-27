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
import { AdminInterface } from "../../models/I_Admin";
import { StatusInterface } from "../../models/I_Status";
import { QualificationsInterface } from "../../models/I_Qualification";
import { ProfessorInterface } from "../../models/I_Professor";
import { useEffect } from "react";
import { FormHelperText, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Stats } from "fs";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CreateProfessor() {

    let [professor, setProfessor] = React.useState<Partial<ProfessorInterface>>({});

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [status, setStatus] = React.useState<StatusInterface[]>([]);
    const [qualification, setQualification] = React.useState<QualificationsInterface[]>([]);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const apiUrl = "http://localhost:8080";

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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: unknown }>
    ) => {
        const id = event.target.id as keyof typeof professor;
        setProfessor({
            ...professor,
            [id]: event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof professor;
        setProfessor({
            ...professor,
            [name]: event.target.value,
        });
        // console.log(event.target)

    };

    const requestOptionsGet = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    // fetch previous professor record

    const getStatus = async () => {
        fetch(`${apiUrl}/statuses`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStatus(res.data)
                    // console.log(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    const getQualification = async () => {
        fetch(`${apiUrl}/qualifications`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setQualification(res.data)
                } else {
                    console.log("else");
                }
            });
    };

    const getAdmin = async () => {
        fetch(`${apiUrl}/admins`, requestOptionsGet)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setAdmin(res.data)
                } else {
                    console.log("else");
                }
            });
    };


    useEffect(() => {
        getStatus();
        getQualification();
        getAdmin();
    }, []);


    function submit() {
        let data = {
            ID: typeof professor.ID === "string" ? parseInt(professor.ID) : professor.ID,
            Professor_ID: professor.Professor_ID ?? "",
            Professor_Name: professor.Professor_name ?? "",
            Professor_Address: professor.Professor_address ?? "",
            Professor_Email: professor.Professor_email ?? "",
            Professor_Tel: professor.Professor_tel ?? "",
            Professor_Password: professor.Professor_password ?? "",
            Status: typeof professor.Status === "string" ? parseInt(professor.Status) : professor.Status,
            Qualification: typeof professor.Qualification === "string" ? parseInt(professor.Qualification) : professor.Qualification,
            Admin: typeof professor.Admin === "string" ? parseInt(professor.Admin) : professor.Admin,
        
        };

        const requestOptionsPost = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/professors`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.data) {
                    setSuccess(true);
                } else {
                    setError(true);
                }
            });
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                bgcolor: "#e1e1e1",
                padding: 2,
                width: "auto",
                height: "auto",
            }}>
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


            {/* Header */}
            <Paper elevation={3} sx={{ bgcolor: "white", padding: 2, marginBottom: 2 }}>
                <Typography variant="h4" sx={{fontFamily:'Mitr-Regular'}}> ระบบจัดการข้อมูลอาจารย์ </Typography>
                <Typography sx={{fontFamily:'Mitr-Regular'}}> เพิ่มข้อมูลอาจารย์ </Typography>
            </Paper>

            <Grid container item
                sx={{
                    // border: 1,
                    bgcolor: "white",
                    width: "auto",
                    boxShadow: 3,
                    padding: 3
                }}>
                <Box flexGrow={1} sx={{ border: 0, width: "auto" }}>
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{fontFamily:'Mitr-Regular'}}> เลขประจำตัวประชาชน </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_ID"
                                variant="standard"
                                type="string"
                                value={professor.Professor_ID}
                                onChange={handleInputChange} 
                                sx={{fontFamily:'Mitr-Regular'}}
                            />
                        </FormControl>
                        <FormHelperText sx={{fontFamily:'Mitr-Regular'}}> โปรดกรอกเลขประจำตัวประชาชน</FormHelperText>
                    </Box>

                    
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{fontFamily:'Mitr-Regular'}}> ชื่อ-นามสกุล </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_Name"
                                variant="standard"
                                type="string"
                                value={professor.Professor_name}
                                onChange={handleInputChange} 
                                sx={{fontFamily:'Mitr-Regular'}}
                            />
                        </FormControl>
                        <FormHelperText sx={{fontFamily:'Mitr-Regular'}}> โปรดกรอกชื่อ-นามสกุล</FormHelperText>
                    </Box>

                    
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{fontFamily:'Mitr-Regular'}}>  ที่อยู่ </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_Address"
                                variant="standard"
                                type="string"
                                value={professor.Professor_address}
                                onChange={handleInputChange} 
                                sx={{fontFamily:'Mitr-Regular'}}
                            />
                        </FormControl>
                        <FormHelperText sx={{fontFamily:'Mitr-Regular'}}> โปรดกรอกที่อยู่</FormHelperText>
                    </Box>

                    <Box flexGrow={1} sx={{ border: 0, width: "auto" }}>
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{fontFamily:'Mitr-Regular'}}>  เบอร์โทรศัพท์ </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_Tel"
                                variant="standard"
                                type="string"
                                value={professor.Professor_tel}
                                onChange={handleInputChange} 
                                sx={{fontFamily:'Mitr-Regular'}}
                            />
                        </FormControl>
                        <FormHelperText sx={{fontFamily:'Mitr-Regular'}}> โปรดกรอกเบอร์โทรศัพท์</FormHelperText>
                    </Box>

                    
                    <Box sx={{ border: 0, width: "auto", padding: 1 }}>
                        <Typography sx={{fontFamily:'Mitr-Regular'}}>  รหัสผ่าน </Typography>
                        <FormControl fullWidth>
                            <TextField
                                id="Professor_Password"
                                variant="standard"
                                type="string"
                                value={professor.Professor_password}
                                onChange={handleInputChange} 
                                sx={{fontFamily:'Mitr-Regular'}}
                            />
                        </FormControl>
                        <FormHelperText sx={{fontFamily:'Mitr-Regular'}}> โปรดกรอกรหัสผ่าน</FormHelperText>
                    </Box>


                 </Box>

                </Box>
                <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{fontFamily:'Mitr-Regular'}}> สถานะอาจารย์ </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Status_ID"
                                    variant="standard"
                                    value={professor.StatusID}
                                    inputProps={{ name: "Status_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{fontFamily:'Mitr-Regular'}}
                                >
                                    {status.map((item: StatusInterface) => (
                                        <MenuItem
                                            value={item.Status_ID}
                                            key={item.Status_ID}
                                        >
                                            {item.Status_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText>กรุณาเลือกสถานะอาจาย์</FormHelperText>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{fontFamily:'Mitr-Regular'}}> วุฒิการศึกษา </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Qualification_ID"
                                    variant="standard"
                                    value={professor.QualificationID}
                                    inputProps={{ name: "Qualification_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{fontFamily:'Mitr-Regular'}}
                                >
                                    {qualification.map((item: QualificationsInterface) => (
                                        <MenuItem
                                            value={item.Qualification_ID}
                                            key={item.Qualification_ID}
                                        >
                                            {item.Qualification_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText>กรุณาเลือกวุฒิการศึกษา</FormHelperText>
                        </Box>
                    </Grid>

                    <Grid container sx={{ border: 0 }}>
                        <Box flexGrow={1} sx={{ border: 0, width: "auto", padding: 1 }}>
                            <Typography sx={{fontFamily:'Mitr-Regular'}}> ผู้บันทึก </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="Admin_ID"
                                    variant="standard"
                                    value={professor.AdminID}
                                    inputProps={{ name: "Admin_ID", }}
                                    onChange={handleSelectChange}
                                    sx={{fontFamily:'Mitr-Regular'}}
                                >
                                    {admin.map((item: AdminInterface) => (
                                        <MenuItem
                                            value={item.Admin_ID}
                                            key={item.Admin_ID}
                                        >
                                            {item.Adminname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormHelperText>กรุณาเลือกผู้บันทึก</FormHelperText>
                        </Box>
                    </Grid>
                    </Grid>
    
            <p></p>
            <Grid container item
                sx={{ bgcolor: "white", width: "auto", boxShadow: 3, padding: 1.5 }}>
                <Grid container sx={{ border: 0 }}>
                    <Box flexGrow={1}>
                        <Button
                            component={RouterLink} 
                            to="/" variant="contained"
                            sx={{borderRadius: 0}}
                        > Back </Button>
                    </Box>
                    <Box flexGrow={1} justifyContent="flex-end" display="flex">
                        <Button
                            onClick={submit}
                            variant="contained"
                            endIcon={<AddIcon/>}
                            sx={{borderRadius: 0}}
                        > Submit </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateProfessor;