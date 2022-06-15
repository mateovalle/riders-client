import {useQuery} from "@apollo/client";
import {GET_ONGOING_CALLS} from "../../util/queries/callQueries";
import OngoingCallCard from "../../components/ongoingCallCard/OngoingCallCard";
import {GET_CALLER_ACTIVE_RIDES} from "../../util/queries/rideQueries";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const OngoingCallsPage = () => {
    const navigate = useNavigate()

    const {loading, data, refetch} = useQuery(GET_ONGOING_CALLS, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000,
    });

    const {loading: loading2, data: data2} = useQuery(GET_CALLER_ACTIVE_RIDES, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000,
    });

    if (loading || loading2) return <CircularProgress color='primary' />
    if (data.getActiveCalls.length + data2.getCallerActiveRides.length === 0) return <h3>You dont have any ongoing calls. <span style={{color: '#ee2738'}} onClick={() => navigate('/call')}>Create a new call</span></h3>
    return(
        <div>
            {data2.getCallerActiveRides.map((data) => {
                console.log(data.vehicleUsed)
                return <OngoingCallCard callData={data.call} key={data.id} accepted={true} vehicleUsed={data.vehicleUsed} riderArrivedStartLocation={data.riderArrivedStartLocation}/>
            })}
            {data.getActiveCalls.map((data) => {
                return <OngoingCallCard callData={data} deleteCall={() => refetch()} key={data.id} accepted={false}/>
            })}
        </div>
    )
}

export default OngoingCallsPage
