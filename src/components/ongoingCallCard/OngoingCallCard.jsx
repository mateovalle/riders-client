import {PedalBike, AirportShuttle, DirectionsCar, TwoWheeler, ArrowRightAlt, Close} from "@mui/icons-material";
import './OngoingCallCard.css'
import {Button, Modal, Typography} from "@mui/material";
import {useState} from "react";
import {Box} from "@mui/system";
import {useMutation} from "@apollo/client";
import {REGISTER_CALLER} from "../../util/queries/sessionQueries";
import {CANCEL_CALL} from "../../util/queries/callQueries";

const OngoingCallCard = ({callData, deleteCall}) => {
    const [openModal, setOpenModal] = useState(false);

    const [cancelCall, {loading, error}] = useMutation(CANCEL_CALL, {
        onError: (e) => console.log(e.message),
        onCompleted: (res) => {
            setOpenModal(false)
        }
    });

    const handleCancelCall = () => {
        cancelCall({variables: {callId: callData.id}}).then(deleteCall);
    }

    return(
        <div className={'ongoing-call-card-container'}>
            <span className={'ongoing-call-card-address'}>{callData.startLocation.address}</span>
            <ArrowRightAlt fontSize={'large'} className={'arrow-right'}/>
            <span className={'ongoing-call-card-address'}>{callData.finishLocation.address}</span>

            <div className={'ongoing-call-card-vehicle-options'}>
                {callData.requestedVehicles.bicycle ? <PedalBike fontSize={'large'} /> : ''}
                {callData.requestedVehicles.motorcycle ? <TwoWheeler fontSize={'large'} /> : ''}
                {callData.requestedVehicles.car ? <DirectionsCar fontSize={'large'} /> : ''}
                {callData.requestedVehicles.van ? <AirportShuttle fontSize={'large'} /> : ''}
            </div>

            <div className={'ongoing-call-card-price'}>
                <span>${callData.priceInCents/100}</span>
            </div>

            <div className={'ongoing-call-card-description'}>
                <span>{callData.description}</span>
            </div>

            <Close className={'closeIcon'} onClick={() => setOpenModal(true)}/>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={'cancel-call-modal'}>
                    <Typography id="modal-modal-title" className={'modal-title'} component="h2">
                        Do you want to cancel this call?
                    </Typography>
                    <Button className={'modal-button'} onClick={handleCancelCall}>Yes</Button>
                    <Button className={'modal-button'} onClick={() => setOpenModal(false)}>No</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default OngoingCallCard
