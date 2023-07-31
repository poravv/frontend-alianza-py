import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function MarkerMap({setLat,setLong,lat,long}) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEYMAP,
    });
    if (!isLoaded) return <div>Loading...</div>;
    return <Map setLat={setLat} setLong={setLong} inlat={lat} inlong={long} />;
}

function Map({setLat,setLong,inlat,inlong}) {
    //console.log(inlat,inlong,parseFloat(inlat),parseFloat(inlong))
    let defaultMap;
    if(inlat&&inlong){
        defaultMap ={ lat: parseFloat(inlat), lng: parseFloat(inlong) }
    }else{
        defaultMap= { lat: -25.343571, lng:-57.481203 }
    }
    // eslint-disable-next-line
    const center = useMemo(() => (defaultMap), []);
    
    const [markers, setMarkers] = useState([center]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMapClick = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            title: "Mi ubicacion",
            description: "Asegure que la ubicacion sea correcta"
        };
        setLat(event.latLng.lat())
        setLong(event.latLng.lng())
        setMarkers([newMarker]);
    };

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    return (
        <GoogleMap
            zoom={13}
            center={center}
            mapContainerStyle={{ borderRadius: `10px`, height: `100vh`, width: `100%` }}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
            onClick={handleMapClick}
        >
            {markers.map((marker, index) => (
                <MarkerF
                    key={index}
                    position={marker}
                    title={marker.title}
                    onClick={() => handleMarkerClick(marker)}
                >
                    {selectedMarker === marker && (
                        <InfoWindowF
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <div>
                                <h3>{marker.title}</h3>
                                <p>{marker.description}</p>
                            </div>
                        </InfoWindowF>
                    )}
                </MarkerF>
            ))}
        </GoogleMap>
    );
}
/*
{markers.map((marker, index) => (
                <MarkerF 
                    key={index}
                    position={marker}
                    //icon={{url: (require('../img/logo2.jpeg')),fillColor: '#EB00FF',scale: 1,width:`5px`}} 
                    //label={'Test'}
                >
                    <span>{`texto`}</span>
                </MarkerF>
            ))}
*/