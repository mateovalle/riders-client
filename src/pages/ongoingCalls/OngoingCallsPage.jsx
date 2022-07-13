import {useQuery} from "@apollo/client";
import {GET_ONGOING_CALLS} from "../../util/queries/callQueries";
import OngoingCallCard from "../../components/ongoingCallCard/OngoingCallCard";
import {GET_CALLER_ACTIVE_RIDES} from "../../util/queries/rideQueries";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/socket";
import ChatRoom from "../chatRoom/ChatRoom";

const OngoingCallsPage = () => {
    const navigate = useNavigate()
    const socket = useContext(SocketContext);

    const [ongoingCalls, setOngoingCalls] = useState([])
    const [ongoingRides, setOngoingRides] = useState([])

    const {loading: loadingCalls, data: calls, refetch} = useQuery(GET_ONGOING_CALLS, {
        fetchPolicy: "cache-and-network",
        onCompleted: (res) => setOngoingCalls(res.getActiveCalls)
    });

    const {loading: loadingRides, data: rides} = useQuery(GET_CALLER_ACTIVE_RIDES, {
        fetchPolicy: "cache-and-network",
        onCompleted: (res) => setOngoingRides(res.getCallerActiveRides)
    });

    useEffect(() => {
        // check if socket is connected
        socket.on('connection', data => {
            console.log(data)
        })

        // subscribe to socket event on ride changes
        socket.on('ride', newRideData => handleNewRideData(newRideData))
    })

    const handleDeleteCall = (id) => {
        setOngoingCalls(ongoingCalls.filter(call => call.id !== id))
    }

    const deleteOldRide = (ride) => {
        let ongoingRidesCopy = ongoingRides.slice();
        setOngoingCalls(ongoingCalls.filter(ongoingCall => ongoingCall.id !== ride.call.id)) //delete it from ongoing calls
        ongoingRidesCopy = ongoingRidesCopy.filter(ongoingRide => ongoingRide.id !== ride.id) //delete old ride from ongoing rides
        ongoingRidesCopy = ride.date !== ride.finishDate ? ongoingRidesCopy : [...ongoingRidesCopy, ride] //add new ride if it didnt finish
        setOngoingRides(ongoingRidesCopy)
    }

    const handleNewRideData = (newRideData) => {
        console.log(newRideData.message)
        console.log(newRideData.ride);
        deleteOldRide(newRideData.ride)
        console.log(ongoingRides)
    }

    if (loadingCalls || loadingRides) return <CircularProgress style={{position: 'absolute', top: '100px', left: '50%'}} color='primary' />
    if (ongoingCalls?.length + ongoingRides?.length === 0) return <h3>You dont have any ongoing calls. <span style={{color: '#ee2738'}} onClick={() => navigate('/call')}>Create a new call</span></h3>
    return(
        <div>
            {ongoingRides.map((ride) => {
                console.log(ride.vehicleUsed)
                return <OngoingCallCard callData={ride.call} key={ride.id} rideId={ride.id} vehicleUsed={ride.vehicleUsed} riderArrivedStartLocation={ride.riderArrivedStartLocation}/>
            })}
            {ongoingCalls.map((call) => {
                return <OngoingCallCard callData={call} deleteCall={() => handleDeleteCall(call.id)} key={call.id} accepted={false}/>
            })}
        </div>
    )
}

export default OngoingCallsPage
