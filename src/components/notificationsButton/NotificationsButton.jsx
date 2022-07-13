import {Notifications, NotificationsActive} from "@mui/icons-material";
import './NotificationsButton.css'
import {Popover, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const NotificationsButton = ({notifications, setNotifications}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        setNotifications([])
        navigate('/ongoingCalls')
    }

    return(
        <>
            <div className={'notifications-button-container'} onClick={() => handleClick()}>
                {notifications.length > 0 ? <NotificationsActive /> : <Notifications className={'not-active'}/>}
            </div>
        </>
    )
}

export default NotificationsButton
