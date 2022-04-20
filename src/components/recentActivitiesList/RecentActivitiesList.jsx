import RecentActivitiesItem from "./RecentActivitiesItem";
import './RecentActivitiesList.css'
import {useNavigate} from "react-router-dom";

const RecentActivitiesList = () => {
    const navigate = useNavigate()

    return(
        <div className={'activities-list-container'}>
            <div className={'activities-list-header'}>
                <span>Your activity</span>
            </div>
            <div className={'activities-list'}>
                <RecentActivitiesItem />
                <RecentActivitiesItem />
                <RecentActivitiesItem />
                <RecentActivitiesItem />
                <RecentActivitiesItem />
                <RecentActivitiesItem />
                <RecentActivitiesItem />
            </div>
            <div className={'activities-list-header activities-list-footer'}>
                <span onClick={() => navigate('/history')}>See all history</span>
            </div>
        </div>
    )
}

export default RecentActivitiesList
