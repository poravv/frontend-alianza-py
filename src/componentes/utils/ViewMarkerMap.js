import { useMemo,useState,useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function ViewMarkerMap({propiedad}) {
    //console.log(propiedad)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEYMAP,
    });
    if (!isLoaded) return <div>Loading...</div>;
    return <Map propiedad={propiedad} />;
}

function Map({propiedad}) {

    let defaultMap;
    if(propiedad){
        defaultMap ={ lat: parseFloat(propiedad?.lat), lng: parseFloat(propiedad?.long) }
    }else{
        defaultMap= { lat: -25.343571, lng:-57.481203 }
    }
    // eslint-disable-next-line
    const center = useMemo(() => (defaultMap), []);
    const [markers, setMarkers] = useState([center]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const newMarker = {
            lat: parseFloat(propiedad?.lat),
            lng: parseFloat(propiedad?.long),
            title: propiedad?.titulo,
            description: propiedad?.descripcion
        };
        
        setMarkers([newMarker]);
        // eslint-disable-next-line
    }, []);

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
            //onClick={handleMapClick}
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
                            <div style={{ margin:`14px` }}>
                                <p>{marker.title}</p>
                                <p>{marker.description}</p>
                            </div>
                        </InfoWindowF>
                    )}
                </MarkerF>
            ))}
        </GoogleMap>
    );
}