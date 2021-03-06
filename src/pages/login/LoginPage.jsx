import { useNavigate } from "react-router-dom";
import {
    Box, Button, Checkbox,
    Container,
    CssBaseline,
    FormControl, FormControlLabel, Grid, IconButton,
    InputAdornment,
    InputLabel, Link,
    OutlinedInput,
    Typography
} from "@mui/material";
import logo from '../../assets/ridersLogo.png'
import {useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import './LoginPage.css'
import {useMutation} from "@apollo/client";
import {LOGIN_CALLER} from "../../util/queries/sessionQueries";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState('')

    const [login, {loading}] = useMutation(LOGIN_CALLER,{
        onError: (e) => setErrorMessage(e.message),
        onCompleted: (res) => {
            console.log(res);
            setErrorMessage('')
                const token = res.logInCaller.token
            window.localStorage.setItem('token', token)
            if (token) {
                navigate('/home')
            }
        },
    })
    const navigate = useNavigate()
    const  loggedIn = window.localStorage.getItem('token')

    useEffect(() =>{
        if (loggedIn) navigate('/home')
    }, [loggedIn, navigate])
//hello


    const handleChange =(prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            const response = await login({variables: {email: values.email, password: values.password}})
            const token = response.data.logInCaller.token
            console.log(token)
            window.localStorage.setItem('token', token)
            navigate('/home')
    };

    const labelStyle = {
        display: 'block',
        color: 'red',
    }


    return (
            <Container component="main" maxWidth="sm" className={'cover-screen'}>
                <div className={'box-shadow'}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={logo} className={'loginLogo'}  alt='Riders logo'/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <FormControl fullWidth margin="normal" sx={{ mt: 1}} variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                                <OutlinedInput
                                    required
                                    id="email"
                                    type='text'
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 1}} variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    required
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <label style={labelStyle} id='passwordLabel'>{errorMessage}</label>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/sign-up" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </Container>
    );
}


export default LoginPage
