import {useQuery} from "@apollo/client";
import {GET_ONGOING_CALLS} from "../../util/queries/callQueries";
import OngoingCallCard from "../../components/ongoingCallCard/OngoingCallCard";
import {Modal} from "@mui/material";
import {useState} from "react";

const OngoingCallsPage = () => {

    const {loading, error, data, refetch} = useQuery(GET_ONGOING_CALLS, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <span>loading ...</span>
    return(
        <div>
            {data.getActiveCalls.map((data) => {
                return <OngoingCallCard callData={data} deleteCall={() => refetch()} key={data.id}/>
            })}

        </div>
    )
}

export default OngoingCallsPage
