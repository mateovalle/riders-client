import {Notifications, NotificationsActive} from "@mui/icons-material";
import './NotificationsButton.css'
import {Popover, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const NotificationsButton = ({notifications, setNotifications}) => {
    const navigate = useNavigate()

    return(
        <>
            <div className={'notifications-button-container'} onClick={() => navigate('/ongoingCalls')}>
                {notifications.length > 0 ? <NotificationsActive /> : <Notifications />}
            </div>
        </>
    )
}

export default NotificationsButton
