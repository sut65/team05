import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignInInterface } from '../../models/I_SignIn';
import First_Page_Navbar from '../navbars/First_Page_Navbar';
import { Toolbar } from '@mui/material';
import Swal from 'sweetalert2';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ fontFamily: "Noto Sans Thai" }} {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const [signin, setSignIn] = React.useState<Partial<SignInInterface>>({});


    const apiUrl = "http://localhost:8080";

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    // console.log(localStorage.getItem("usertype"))

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof signin;
        const { value } = event.target;
        setSignIn({ ...signin, [id]: value });
    };

    const login = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signin)
        };
        // // console.log(JSON.stringify(data))
        // console.log(localStorage.getItem("token"))
        // console.log(localStorage.getItem("id"))
        // console.log(localStorage.getItem("usertype"))
        if (signin.ID == undefined || signin.Password == undefined) {
            Swal.fire({
                icon: 'error',
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: 'กรุณากรอกรหัสผู้ใช้และรหัสผ่าน',
            })
        } else {
            fetch(`${apiUrl}/login`, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    // console.log(res)
                    if (res.data) {
                        //     // console.log(res.data)
                        Swal.fire({
                            title: 'เข้าสู่ระบบสำเร็จ',
                            icon: 'success',
                        }).then(() => {
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("id", res.data.id);
                            localStorage.setItem("usertype", res.data.usertype);
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                        })
                    }
                }
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <First_Page_Navbar />
                <Toolbar />
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" sx={{ fontFamily: "Noto Sans Thai" }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="ID"
                            // value={signin.Password}
                            onChange={handleInputChange}
                            label=""
                            inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                        // name="email"
                        // autoComplete="email"
                        // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            // value={signin.Password}
                            onChange={handleInputChange}
                            type="password"
                            inputProps={{ style: { fontFamily: "Noto Sans Thai" } }}
                            id="Password"
                        // autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{ fontFamily: "Noto Sans Thai" }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={login}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                Sign In
                            </Typography>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    <Typography sx={{ fontFamily: "Noto Sans Thai" }}>
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}