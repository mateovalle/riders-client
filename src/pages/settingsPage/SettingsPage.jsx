import {useMutation, useQuery} from "@apollo/client";
import {EMAIL_NOTIFICATIONS, GET_CALLER} from "../../util/queries/sessionQueries";
import {useEffect, useState} from "react";
import {Button, CircularProgress, Input, Switch, TextField} from "@mui/material";
import './SettingsPage.css'
import {createPayment} from "../../util/mercadoPago";
import {Navigate, useNavigate} from "react-router-dom";

const SettingsPage = () => {
    const [callerData, setCallerData] = useState({})
    const [notifications, setNotifications] = useState(false)
    const [saldoACargar, setSaldoACargar] = useState(0)
    const navigate = useNavigate()

    const {loadingCallerData, data} = useQuery(GET_CALLER, {
        fetchPolicy: "cache-and-network",
        onCompleted: (res) => {
            setCallerData(res.getCaller)
            console.log(res.getCaller.emailNotifications)
        }
    });

    useEffect(() => {
        setNotifications(callerData.emailNotifications)
    }, [callerData])

    const [setEmailNotifications, {loading: loadingNotifications}] = useMutation(EMAIL_NOTIFICATIONS,{
    })

    const handleToggleNotifications = async () => {
        setNotifications(!notifications)
        await setEmailNotifications({variables: {emailNotifications: !notifications}})

    }

    const handleConfirm = async () => {
        const res = await createPayment(callerData.id, Number(saldoACargar))
        window.location.href = res.init_point;
    }

    if (loadingCallerData || loadingNotifications) return <CircularProgress style={{position: 'absolute', top: '100px', left: '50%'}} color='primary' />
    return(
        <div className={'settings-container'}>
            <h2>{callerData.name} {callerData.surname}</h2>
            <h3>DNI: {callerData.DNI}</h3>
            <h3>Balance: ${callerData.balanceInCents}</h3>

            <div>
                <span>I want to receive notifications via email</span>
                <Switch checked={notifications} onClick={() => handleToggleNotifications()}/>
            </div>
            <div>
                <span>Add money: </span>
                <TextField
                    value={saldoACargar}
                    onChange={(e) => setSaldoACargar(e.target.value)}
                    name="numberformat"
                    variant="standard"
                />
                <Button onClick={() => handleConfirm()}>Confirm</Button>
            </div>
        </div>
    )
}

export default SettingsPage
