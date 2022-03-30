import {Paper} from "@mui/material";
import './MakeACallButton.css'

const MakeACallButton = ({imgUrl, title, onClick}) => {
    return(
        <Paper elevation={15} className={'call-button'}>
            <h3 className={'button-title'}>Make a call</h3>
        </Paper>
    )
}

export default MakeACallButton