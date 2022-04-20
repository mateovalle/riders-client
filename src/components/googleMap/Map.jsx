import {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import env from "react-dotenv";
import {Marker} from "react-google-maps";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import {LocationOn} from "@mui/icons-material";
import logo from '../../assets/ridersLogo.png'



const Map = ({coords, setCoords}) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: env.MAPS_KEY
    })

    const [map, setMap] = useState()

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const markerLoad = () => {
        console.log('markerLoaded')
    }

    const handleClick = (ev) => {
        setCoords(
            {
                lat: ev.latLng.lat(),
                lng: ev.latLng.lng(),
            }
        );
        console.log('new lat: ' + coords.lat)
        console.log('new lng: ' + coords.lng)
    }



    return isLoaded ? (
            <GoogleMap
                onClick={ev => handleClick(ev)}
                mapContainerStyle={containerStyle}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                    <Marker
                        onLoad={markerLoad}
                        position={coords}
                        draggable={true}
                    />
            </GoogleMap>
    ) : ''
}

const containerStyle = {
    width: '300px',
    height: '300px'
};

export default Map
