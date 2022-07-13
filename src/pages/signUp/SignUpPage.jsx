import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Container,
    CssBaseline,
    FormControl, Grid, IconButton,
    InputAdornment,
    InputLabel, Link,
    OutlinedInput,
    Typography
} from "@mui/material";
import logo from "../../assets/ridersLogo.png";
import LoadingButton from '@mui/lab/LoadingButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useMutation} from "@apollo/client";
import {REGISTER_CALLER} from "../../util/queries/sessionQueries";


const SignUpPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        surename: '',
        dni: '',
        showPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState()

    const [registerCaller, {loading, error}] = useMutation(REGISTER_CALLER, {
        onError: (e) => setErrorMessage(e.message),
        onCompleted: (res) => {
            console.log(res);
            setErrorMessage('')
            navigate('/')
        }
    });

    const navigate = useNavigate()
    const  loggedIn = window.localStorage.getItem('token')

    useEffect(() =>{
        if (loggedIn) navigate('/home')
    }, [loggedIn])



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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        registerCaller({variables: {name: values.name, surname: values.surename, DNI: parseInt(values.dni, 10), email: values.email, password: values.password}})
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
                        Sign up
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

                        <div style={{display: 'flex', justifyContent: 'space-between'} }>
                        <FormControl margin="normal" sx={{ mt: 2}} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                            <OutlinedInput
                                required
                                id="name"
                                type='text'
                                value={values.name}
                                onChange={handleChange('name')}
                                label="Name"
                            />
                        </FormControl>

                        <FormControl margin="normal" sx={{ mt: 2}} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
                            <OutlinedInput
                                required
                                id="surename"
                                type='text'
                                value={values.surename}
                                onChange={handleChange('surename')}
                                label="Surename"
                            />
                        </FormControl>
                        </div>

                        <FormControl margin="normal" fullWidth sx={{ mt: 2}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">DNI</InputLabel>
                            <OutlinedInput
                                required
                                id="dni"
                                type='number'
                                value={values.dni}
                                onChange={handleChange('dni')}
                                label="DNI"
                            />
                        </FormControl>


                        <label style={labelStyle} id='passwordLabel'>{errorMessage}</label>

                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Already registered? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </Container>
    );
}



export default SignUpPage
