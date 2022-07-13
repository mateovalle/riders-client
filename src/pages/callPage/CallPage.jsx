import {
    Alert,
    Box, Button, Checkbox, Container,
    CssBaseline,
    FormControl, FormControlLabel, Grid,
    IconButton,
    InputAdornment,
    InputLabel, Link,
    OutlinedInput, Snackbar, TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import VehicleSelector from "../../components/vehicleSelector/VehicleSelector";
import './CallPage.css';
import MapContainer from "../../components/googleMap/MapContainer";
import { Wrapper } from "@googlemaps/react-wrapper";
import {ArrowDownward, ArrowForward, LocationOn, Star} from "@mui/icons-material";
import {useMutation} from "@apollo/client";
import {CREATE_CALL} from "../../util/queries/callQueries";
import {LoadingButton} from "@mui/lab";
import '../../components/ratingSelector/RatingSelector.css'

const CallPage = () => {
    const [rating, setRating] = useState(0)
    const [vehicleTypes, setVehicleTypes] = useState({
        bicycle: false,
        motorcycle: false,
        car: false,
        van: false,
    })
    const [values, setValues] = useState({
        price: null,
        description: null,
        startAddress: null,
        finishAddress: null,
    });
    const [startCoords, setStartCoords] = useState(null)
    const [finishCoords, setFinishCoords] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const [createCall, {loading, error}] = useMutation(CREATE_CALL, {
        onCompleted: (res) => {
            console.log(res);
            setErrorMessage('')
        }
    })

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
        navigate('/home')
    };

    const handleChange =(prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const toggleVehicleType = (vehicleName) => {
        setVehicleTypes({...vehicleTypes, [vehicleName]: !vehicleTypes[vehicleName]})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getRatingStarClassName = (starNumber) => {
        let className = 'rating-star';
        className += rating >= starNumber ? ' rating-star-selected' : '';
        return className;
    }

    const validateForm = () => {
        if (!(vehicleTypes.bicycle || vehicleTypes.motorcycle || vehicleTypes.car || vehicleTypes.van)){
            throw new Error('Please select a vehicle type')
        }
        if (!values.description) {
            throw new Error('Please enter a description')
        }
        if (values.price <= 0) {
            throw new Error('Please enter a valid price value')
        }
        if (!values.startAddress || !values.finishAddress) {
            throw new Error('Please complete both addresses')
        }
        if (!startCoords || !finishCoords) {
            throw new Error('Please select a starting point and finish point on the maps')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await createCall(
                {
                    variables: {
                        minRiderRatingStars: rating,
                        bicycle: vehicleTypes.bicycle,
                        motorcycle: vehicleTypes.motorcycle,
                        car: vehicleTypes.car,
                        van: vehicleTypes.van,
                        priceInCents: Math.trunc(values.price * 100),
                        description: values.description,
                        startAddress: values.startAddress,
                        finishAddress: values.finishAddress,
                        startLat: startCoords.lat,
                        startLong: startCoords.lng,
                        finishLat: finishCoords.lat,
                        finishLong: finishCoords.lng
                    }
                })
            setErrorMessage('')
            setOpenSnackBar(true)
        } catch (e) {
            setErrorMessage('Please select coordinates')
        }
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

                <br/>
                <Typography component="h4" variant="h5" color={'primary'}>
                    Rider rating
                </Typography>
                <Box className={'rating-selector-container'}>
                    <div>
                        <Star className={getRatingStarClassName(1)} onClick={() => setRating(1)}/>
                        <Star className={getRatingStarClassName(2)} onClick={() => setRating(2)}/>
                        <Star className={getRatingStarClassName(3)} onClick={() => setRating(3)}/>
                        <Star className={getRatingStarClassName(4)} onClick={() => setRating(4)}/>
                        <Star className={getRatingStarClassName(5)} onClick={() => setRating(5)}/>
                    </div>
                </Box>

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
                            <MapContainer zoom={12} center={{lat: -34.44769900724159, lng: -58.872275516234836}} coords={startCoords} setCoords={setStartCoords}/>
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
                            <MapContainer zoom={12} center={{lat: -34.44769900724159, lng: -58.872275516234836}} coords={finishCoords} setCoords={setFinishCoords}/>
                        </div>
                    </div>
                    <label id='passwordLabel' className={'error-message'}>{errorMessage}</label>

                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Call
                    </LoadingButton>
                    <Snackbar open={openSnackBar} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                            Call created successfully!
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </div>
    )
}

export default CallPage
