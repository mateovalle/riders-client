import './HomeButton.css'
import {MAKE_A_CALL_IMAGE} from "../../util/imageRoutes";
import {useNavigate} from "react-router-dom";

const HomeButton = ({title, description, imageRoute, navigateTo}) => {
    const navigate = useNavigate()

    return(
        <div className={'button-box'} onClick={() => navigate(navigateTo)}>
            <div className={'button-image-container'}>
                <img src={imageRoute} className={'button-image'} alt={title}/>
            </div>
            <div className={'button-footer'}>
                <span className={'button-title'}>{title}</span>
                <span className={'button-description'}>{description}</span>
            </div>
        </div>
    )

}

export default HomeButton
