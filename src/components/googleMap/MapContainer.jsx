import env from "react-dotenv";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import './MapContainer.css'

const MapContainer = ({google, zoom, center, coords, setCoords}) => {
    const addMarker = (ref, map, ev) => {
        const location = {lat: ev.latLng.lat(), lng: ev.latLng.lng()}
        console.log(location)
        setCoords(location)
    }

    return (
        <div className={"map-container"}>
            <Map
                className={"map"}
                google={google}
                onClick={addMarker}
                zoom={zoom}
                initialCenter={center}
                //{{lat: -34.462053, lng: -58.85766385}}
            >
                {
                    coords ?
                        <Marker position={coords}/> : null
                }
            </Map>
        </div>

    )
}

export default GoogleApiWrapper({
    apiKey: env.MAPS_KEY,
    libraries: []
})(MapContainer);
