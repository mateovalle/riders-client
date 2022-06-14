import HomeButton from "../../components/homeButton/HomeButton";
import {MAKE_A_CALL_IMAGE, ONGOING_CALLS_IMAGE} from "../../util/imageRoutes";
import RecentActivitiesList from "../../components/recentActivitiesList/RecentActivitiesList";
import './HomePage.css'

const HomePage = () => {

    return(
        <div>
            <div className={'home-container'}>
                <div className={'button1'}>
                    <HomeButton title={'Make a call'} description={'In few simple steps'} imageRoute={MAKE_A_CALL_IMAGE} navigateTo={'/call'}/>
                </div>
                <div className={'button2'}>
                    <HomeButton title={'Ongoing calls'} description={'See your ongoing calls'} imageRoute={ONGOING_CALLS_IMAGE} navigateTo={'/ongoingCalls'}/>
                </div>

                <RecentActivitiesList itemLimit={5}/>
            </div>
        </div>

    )
}

export default HomePage
