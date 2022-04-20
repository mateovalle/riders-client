import PedalBikeIcon from '@mui/icons-material/PedalBike';
import './VehicleSelector.css'
import {AirportShuttle, DirectionsCar, TwoWheeler} from "@mui/icons-material";
const VehicleSelector = ({vehicleTypes, toggleVehicleType}) => {

    return(
        <div className={'vehicle-selector-container'}>
            <div className={(vehicleTypes.bicycle ? ' vehicle-option-active' : '') + ' vehicle-option'} onClick={() => toggleVehicleType('bicycle')}>
                <PedalBikeIcon fontSize='large'/>
            </div>
            <div className={(vehicleTypes.motorcycle ? ' vehicle-option-active' : '') + ' vehicle-option'} onClick={() => toggleVehicleType('motorcycle')}>
                <TwoWheeler fontSize='large'/>
            </div>
            <div className={(vehicleTypes.car ? ' vehicle-option-active' : '') + ' vehicle-option'} onClick={() => toggleVehicleType('car')}>
                <DirectionsCar fontSize='large'/>
            </div>
            <div className={(vehicleTypes.van ? ' vehicle-option-active' : '') + ' vehicle-option'} onClick={() => toggleVehicleType('van')}>
                <AirportShuttle fontSize='large'/>
            </div>
        </div>
    )
}

export default VehicleSelector
