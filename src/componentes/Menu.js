import { useState, useEffect } from 'react';
import Destacados from './Destacados';
import ListViewMarkerMap from './utils/ListViewMarkerMap';

const Menu = ({ propiedad, destacados }) => {

    const [markers, setMarkers] = useState([]);
    const [detalleSitios, setDetalleSitios] = useState([]);
    const [viewMap, setViewMap] = useState(false);

    useEffect(() => {
        init();
        // eslint-disable-next-line 
    }, [propiedad]);

    const init = () => {
        let detSitios = [];
        let disponibles = 0;
        let noDispo = 0;
        propiedad?.map((row) => {
            //console.log('row: ', row);
            const newMarker = {
                lat: parseFloat(row?.lat),
                lng: parseFloat(row?.long),
                title: row?.titulo,
                description: row?.descripcion,
                estado: row?.estado,
                idpropiedad: row?.idpropiedad
            };

            markers.push(newMarker)
            setMarkers(markers);
            if (row?.estado === 'AC') { disponibles = disponibles + 1; }
            if (row?.estado === 'VE') { noDispo = noDispo + 1; }
            return true;
        });
        detSitios = { disponibles, noDispo };
        console.log(detSitios)
        setDetalleSitios(detSitios)
    }

    const detalleSitio = () => {
        return (
            <div className="container text-center text-lg-start">
                <div className="my-2 shadow p-3 bg-white rounded row align-items-center">
                    <div className='m-2'>
                        <div className='d-flex justify-content-center text-black' >
                            <h3 className="fw-bold text-success">Detalle de sitios</h3>
                        </div>
                        <div className="row my-3">
                            <h4 className="form-label" htmlFor="fst_name" >Cantidades</h4>
                        </div>
                        <div className='row my-3'>
                            Disponibles: {detalleSitios?.disponibles}
                        </div>
                        <div className='row my-3'>
                            Vendidos: {detalleSitios?.noDispo}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div >
            <Destacados destacados={destacados} />

            <div className='flex-wrap row m-2'>

                <div className='col-md-7 '>
                    <div className="container text-center text-lg-start">

                        <div className="my-2 shadow p-3 bg-white rounded row align-items-center" style={{ minHeight:`240px` }}>
                            <div style={{ justifyContent: `center`, display: `flex` }}>
                                <button type="submit" className="input-group-text bg-primary text-light m-3" onClick={() => setViewMap(!viewMap)} >
                                    {!viewMap ? 'Ver mapa de sitios..' : 'Ocultar mapa de sitios..'}
                                </button>
                            </div>
                            {viewMap ?
                                <ListViewMarkerMap markers={markers} />
                                : null}
                        </div>
                    </div>
                </div>
                <div className='col'>
                    {detalleSitio()}
                </div>
            </div>
        </div>
    )
}

export default Menu;