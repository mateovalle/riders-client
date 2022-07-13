import RecentActivitiesItem from "./RecentActivitiesItem";
import './RecentActivitiesList.css'
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_CALLER_RECORD} from "../../util/queries/callQueries";
import {CircularProgress} from "@mui/material";

const RecentActivitiesList = ({itemLimit}) => {
    const navigate = useNavigate()

    const {loading, data} = useQuery(GET_CALLER_RECORD, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <CircularProgress color='primary'/>
    return(
        <div className={'activities-list-container'}>
            <div className={'activities-list-header'}>
                <span>Your activity</span>
            </div>
            {data?.getCallerRecord.length > 0 ?
                <>
                    <div className={'activities-list'}>
                        {data.getCallerRecord.slice(0, itemLimit? itemLimit : data.getCallerRecord.length).map((rideData) => {
                            return <RecentActivitiesItem rideData={rideData} key={rideData.id}/>
                        })}
                    </div>
                    {itemLimit && (<div className={'activities-list-header activities-list-footer'}>
                        <span onClick={() => navigate('/history')}>See all history</span>
                    </div>)}
                </> : <div className={'no-rides'}><span>No rides completed yet</span></div>
            }
        </div>
    )
}

export default RecentActivitiesList
