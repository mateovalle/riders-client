import {
    Box, Button, Checkbox, Container,
    CssBaseline,
    FormControl, FormControlLabel, Grid,
    IconButton,
    InputAdornment,
    InputLabel, Link,
    OutlinedInput, TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import VehicleSelector from "../../components/vehicleSelector/VehicleSelector";
import './CallPage.css';
import Map from "../../components/googleMap/Map";
import { Wrapper } from "@googlemaps/react-wrapper";
import {ArrowDownward, ArrowForward, LocationOn} from "@mui/icons-material";
import {useMutation} from "@apollo/client";
import {CREATE_CALL} from "../../util/queries/callQueries";

const CallPage = () => {
    const [vehicleTypes, setVehicleTypes] = useState({
        bicycle: false,
        motorcycle: false,
        car: false,
        van: false,
    })
    const [values, setValues] = useState({
        price: 0,
        description: '',
        startAddress: '',
        finishAddress: '',
    });
    const [startCoords, setStartCoords] = useState({lat: 0, lng: 0})
    const [finishCoords, setFinishCoords] = useState({lat: 0, lng: 0})
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const [createCall, {loading, error}] = useMutation(CREATE_CALL, {
        onError: (e) => setErrorMessage(e.message),
        onCompleted: (res) => {
            console.log(res);
            setErrorMessage('')
            navigate('/home')
        }
    })

    const handleChange =(prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const toggleVehicleType = (vehicleName) => {
        setVehicleTypes({...vehicleTypes, [vehicleName]: !vehicleTypes[vehicleName]})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createCall({variables: {bicycle: vehicleTypes.bicycle, motorcycle: vehicleTypes.motorcycle, car: vehicleTypes.car, van: vehicleTypes.van, priceInCents: Math.trunc(values.price * 100), description: values.description, startAddress: values.startAddress, finishAddress: values.finishAddress, startLat: startCoords.lat, startLong: startCoords.lng, finishLat: finishCoords.lat, finishLong: finishCoords.lng}})
        //const response = await login({variables: {email: values.email, password: values.password}})
    };


    return(
        <div className={'call-page-container'}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
                    Create a call
                </Typography>
                <VehicleSelector vehicleTypes={vehicleTypes} toggleVehicleType={toggleVehicleType}/>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <FormControl fullWidth margin="normal" sx={{ mt: 1}} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-password">Price</InputLabel>
                        <OutlinedInput
                            required
                            id="price"
                            type='number'
                            value={values.price}
                            onChange={handleChange('price')}
                            label="Price"
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal" sx={{mt: 1}} variant="outlined" >
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={6}
                            minRows={4}
                            value={values.description}
                            onChange={handleChange('description')}
                        />
                    </FormControl>

                    <div className={'separator'}>
                        <div>
                            <Typography component="h1" variant="h5">
                                {<LocationOn color={'primary'}/>}Starting point
                            </Typography>
                            <FormControl fullWidth margin="normal" sx={{ mt: 1}} >
                                <InputLabel htmlFor="outlined-adornment-password">Start address</InputLabel>
                                <OutlinedInput
                                    required
                                    id="startAddress"
                                    type='text'
                                    value={values.startAddress}
                                    onChange={handleChange('startAddress')}
                                    label="startAddress"
                                />
                            </FormControl>
                            <Map coords={startCoords} setCoords={setStartCoords}/>
                        </div>

                        <span className={'arrow'}> <ArrowDownward fontSize='large'/> </span>

                        <div>
                            <Typography component="h1" variant="h5">
                                {<LocationOn color={'primary'}/>}Finish point
                            </Typography>
                            <FormControl fullWidth margin="normal" sx={{ mt: 1}} >
                                <InputLabel htmlFor="outlined-adornment-password">Finish address</InputLabel>
                                <OutlinedInput
                                    required
                                    id="finishAddress"
                                    type='text'
                                    value={values.finishAddress}
                                    onChange={handleChange('finishAddress')}
                                    label="finishAddress"
                                />
                            </FormControl>
                            <Map coords={finishCoords} setCoords={setFinishCoords}/>
                        </div>
                    </div>


                    <label id='passwordLabel'>{errorMessage}</label>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Call
                    </Button>

                </Box>



            </Box>
        </div>
    )
}

export default CallPage
