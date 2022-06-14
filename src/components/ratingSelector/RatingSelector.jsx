import {Button, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";
import {Box} from "@mui/system";
import {useState} from "react";
import './RatingSelector.css'
import {useMutation} from "@apollo/client";
import {RATE_RIDER} from "../../util/queries/rideQueries";
import {GET_CALLER_RECORD} from "../../util/queries/callQueries";

const RatingSelector = ({rideId}) => {
    const [rating, setRating] = useState(0)

    const [rate] = useMutation(RATE_RIDER, {
        onError: (e) => console.log(e.message),
        onCompleted: (res) => console.log(res),
        refetchQueries: [GET_CALLER_RECORD],
    });

    const getClassName = (starNumber) => {
        let className = 'rating-star';
        className += rating >= starNumber ? ' rating-star-selected' : '';
        return className;
    }

    const handleSubmit = async () => {
        await rate({variables: {rideId: rideId, stars: rating}});
    }
    return(
        <Box className={'rating-selector-container'}>
            <Typography id="modal-modal-title" className={'rating-selector-title'} component="h2">
                Rate Rider
            </Typography>
            <div>
            <Star className={getClassName(1)} onClick={() => setRating(1)}/>
            <Star className={getClassName(2)} onClick={() => setRating(2)}/>
            <Star className={getClassName(3)} onClick={() => setRating(3)}/>
            <Star className={getClassName(4)} onClick={() => setRating(4)}/>
            <Star className={getClassName(5)} onClick={() => setRating(5)}/>
            </div>
            <Button className={'rate-button'} onClick={handleSubmit}>
                Send
            </Button>
        </Box>
    )
}

export default RatingSelector
