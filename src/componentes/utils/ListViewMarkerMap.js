import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function ListViewMarkerMap({ markers }) {
    console.log(markers)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEYMAP,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map markers={markers} />;
}

function Map({ markers }) {
    const defaultMap = { lat: -25.343571, lng: -57.481203 }
    // eslint-disable-next-line
    const center = useMemo(() => (defaultMap), []);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    return (
        <div>
            {
                markers ?
                    <GoogleMap
                        zoom={11}
                        center={center}
                        mapContainerStyle={{ borderRadius: `10px`, height: `100vh`, width: `100%` }
                        }
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }
                        }
                    //onClick={handleMapClick}
                    >
                        {
                            markers.map((marker, index) => (
                                <MarkerF
                                    key={index}
                                    position={marker}
                                    icon={{ 
                                        url: require('../../componentes/img/logo2.png'),
                                        //size:{height:40,width:40},
                                        scaledSize: {height:40,width:40},
                                        //anchor: [20,20]
                                        //fillColor:'red'
                                 }}
                                    title={marker.title}
                                    onClick={() => handleMarkerClick(marker)}
                                >
                                    {selectedMarker === marker && (
                                        <InfoWindowF
                                            onCloseClick={() => setSelectedMarker(null)}
                                        >
                                            <div style={{ margin: `14px` }}>
                                                <b>{marker.title}</b>
                                                <p>{marker.description}</p>
                                            </div>
                                        </InfoWindowF>
                                    )}
                                </MarkerF>
                            ))
                        }
                    </GoogleMap >
                    : null}
        </div>
    );
}