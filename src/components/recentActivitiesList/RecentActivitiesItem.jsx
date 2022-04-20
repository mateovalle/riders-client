import './RecentActivitiesList.css'

const RecentActivitiesItem = () => {

    return(
        <div className={'activity-item-container'}>
            <div className={'activity-icon'}></div>
            <span className={'activity-title'}>Activity title</span>
            <div>
                <span className={'activity-price'}>$ 500</span>
                <span className={'activity-date'}>16:04</span>
            </div>
        </div>
    )
}

export default RecentActivitiesItem
