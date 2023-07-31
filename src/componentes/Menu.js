import { useState, useEffect } from 'react';
import Destacados from './Destacados';
import ListViewMarkerMap from './utils/ListViewMarkerMap';

const Menu = ({ propiedad }) => {

    const [markers, setMarkers] = useState([]);
    const [viewMap, setViewMap] = useState(false);

    useEffect(() => {
        init();
        // eslint-disable-next-line 
    }, [propiedad]);

    const init = () => {
        propiedad?.map((row) => {
            console.log('row: ', row);
            const newMarker = {
                lat: parseFloat(row?.lat),
                lng: parseFloat(row?.long),
                title: row?.titulo,
                description: row?.descripcion
            };
            markers.push(newMarker)
            setMarkers(markers);
            return true;
        })
    }
    return (
        <div style={{ margin: `5px` }}>
            <Destacados />
            <div style={{ justifyContent:`center`,display:`flex` }}>
                <button type="submit" className="input-group-text bg-primary text-light m-3" onClick={() => setViewMap(!viewMap)} >
                    {!viewMap ? 'Ver mapa de sitios..' : 'Ocultar mapa de sitios..'}
                </button>
            </div>
            {viewMap ?
                <ListViewMarkerMap markers={markers} />
                : null}
        </div>
    )
}

export default Menu;