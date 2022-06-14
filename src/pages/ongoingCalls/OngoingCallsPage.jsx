import {useQuery} from "@apollo/client";
import {GET_ONGOING_CALLS} from "../../util/queries/callQueries";
import OngoingCallCard from "../../components/ongoingCallCard/OngoingCallCard";
import {GET_CALLER_ACTIVE_RIDES} from "../../util/queries/rideQueries";

const OngoingCallsPage = () => {

    const {loading, data, refetch} = useQuery(GET_ONGOING_CALLS, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000,
    });

    const {loading: loading2, data: data2} = useQuery(GET_CALLER_ACTIVE_RIDES, {
        fetchPolicy: "cache-and-network",
        pollInterval: 1000,
    });

    if (loading || loading2) return <span>loading ...</span>
    return(
        <div>
            {data.getActiveCalls.map((data) => {
                return <OngoingCallCard callData={data} deleteCall={() => refetch()} key={data.id} accepted={false}/>
            })}
            {data2.getCallerActiveRides.map((data) => {
                console.log(data.vehicleUsed)
                return <OngoingCallCard callData={data.call} key={data.id} accepted={true} vehicleUsed={data.vehicleUsed}/>
            })}


        </div>
    )
}

export default OngoingCallsPage
