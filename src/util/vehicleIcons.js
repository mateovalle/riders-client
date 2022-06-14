import {AirportShuttle, DirectionsCar, TwoWheeler} from "@mui/icons-material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

export const getVehicleIcon = (vehicleString) => {
    return vehicleString === 'car' ? <DirectionsCar fontSize='large'/> :
    vehicleString === 'bicycle' ? <PedalBikeIcon fontSize='large'/> :
    vehicleString === 'motorcycle' ? <TwoWheeler fontSize='large'/> :
    vehicleString === 'van' ? <AirportShuttle fontSize='large'/> : ''
}
