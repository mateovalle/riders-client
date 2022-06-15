import './RecentActivitiesList.css'
import {ArrowForward} from "@mui/icons-material";
import {useState} from "react";
import {Box} from "@mui/system";
import {Modal, Typography} from "@mui/material";
import {getRatingStars} from "../../util/ratingStars";
import RatingSelector from "../ratingSelector/RatingSelector";
import {getVehicleIcon} from "../../util/vehicleIcons";


const RecentActivitiesItem = ({rideData}) => {
    const [openModal, setOpenModal] = useState(false);

    const date = new Date(rideData.finishDate);
    const today = new Date();
    const hour = date.getMinutes() >= 10 ? (date.getHours() + ':' + date.getMinutes()) : (date.getHours() + ':0' + date.getMinutes());

    return(
        <>
            <div className={'activity-item-container'} onClick={() => setOpenModal(true)}>
                <div className={'activity-icon'}>
                    {getVehicleIcon(rideData.vehicleUsed)}
                </div>
                <span className={'activity-title'}>{rideData.call.startLocation.address}</span>
                <div style={{width: 100}}>
                    <span className={'activity-price'}>$ {rideData.call.priceInCents/100}</span>
                    <span className={'activity-date'}>{today.toDateString() === date.toDateString() ? hour : date.toDateString()}</span>
                </div>
            </div>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'recent-activities-item-modal'}>
                    <div className='recent-activities-item-modal-title'>
                        <Typography id="modal-modal-title" className={'modal-title'} component="h2">
                            {rideData.call.startLocation.address}
                        </Typography>
                        {getVehicleIcon(rideData.vehicleUsed)} {<ArrowForward fontSize='large' />}
                        <Typography id="modal-modal-title" className={'modal-title'} component="h2">
                            {rideData.call.finishLocation.address}
                        </Typography>
                    </div>
                    <Typography component="p" className='recent-activities-item-modal-description'>
                        {rideData.call.description}
                    </Typography>
                    <span className={'activity-price'}>$ {rideData.call.priceInCents/100}</span>
                    <span className={'activity-date'}>{date.toDateString()} {hour}</span>

                    {rideData.riderRatingStars > -1 ?
                        <div className={'modal-stars'}>{getRatingStars(rideData.riderRatingStars)}</div> : <RatingSelector rideId={rideData.id}/>
                    }
                </Box>
            </Modal>
        </>
    )
}

export default RecentActivitiesItem
