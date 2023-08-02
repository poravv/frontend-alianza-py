import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

export default function ListViewMarkerMap({ markers }) {

    console.log(markers)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEYMAP,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map markers={markers} />;
}

function Map({ markers }) {
    const navigate = useNavigate();
    function navegacion(direccion) {
        navigate(direccion);
    }
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
                                    opacity={0.5}
                                    icon={{ 
                                        url: (marker.estado==='AC'?require('../../componentes/img/logodispo.png'):require('../../componentes/img/logovendido.png')),
                                        //size:{height:40,width:40},
                                        scaledSize: {height:40,width:40},
                                        //anchor: [20,20]
                                        //fillColor:'#EA2828',
                                 }}
                                    title={marker.title}
                                    onClick={() => handleMarkerClick(marker)}
                                >
                                    {selectedMarker === marker && (
                                        <InfoWindowF
                                            onCloseClick={() => setSelectedMarker(null)}
                                        >
                                            <div style={{ margin: `14px`,cursor:`pointer` }} onClick={() => navegacion(`/detalle/${marker.idpropiedad}`)}>
                                                <b>{marker.title}</b>
                                                <p>{marker.description}</p>
                                                <p style={{ color:(marker.estado==='AC' ? 'Blue': 'red') }}>{marker.estado ==='AC' ? 'Disponible' : 'No disponoble'}</p>
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