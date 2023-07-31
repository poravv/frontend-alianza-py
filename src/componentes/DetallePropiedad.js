import { withNamespaces } from 'react-i18next';
import { separadorMiles } from './utils/Separador';
import ViewMarkerMap from './utils/ViewMarkerMap';

const DetallePropiedad = ({ t, propiedad, onchangeDetalle }) => {
    return (
        <>
            <div className='flex-wrap row'>
                <div className='col-md-8'>
                    <div className="container text-center text-lg-start">
                        <div className="my-2 shadow p-3 bg-white rounded row align-items-center">
                            <div className='m-2'>
                                <div className='d-flex justify-content-center text-success' >
                                    <h3 className="fw-bold">{propiedad?.titulo}</h3>
                                </div>
                                <div className='d-flex text-black my-3' >
                                    <h5 className="">{propiedad?.descripcion}</h5>
                                </div>
                                <div className='my-2'>
                                    <h3 style={{ letterSpacing: `-2px` }} className="text-danger">Gs. {separadorMiles(parseInt(propiedad?.precio))}</h3>
                                </div>
                                <label className="form-label" htmlFor="fst_name" required >Direccion: {propiedad?.direccion}</label>
                                <hr />
                                <div className='row my-3'>
                                    <div className='col min-w-50'><label className="form-label" ><b>Ciudad:</b> {propiedad?.ciudad}</label></div>
                                    <div className='col'><label className="form-label" ><b>Barrio:</b> {propiedad?.barrio}</label></div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col'><label className="form-label" ><b>Dimension:</b> {propiedad?.dimencion}</label></div>
                                    <div className='col'><label className="form-label" ><b>Cant. dormitorios:</b> {propiedad?.dormitorio}</label></div>
                                </div>
                                <div className='row my-3'>
                                    <div className='col'><label className="form-label" ><b>Superficie de terreno:</b> {propiedad?.superficie_terreno}</label></div>
                                    <div className='col'><label className="form-label" ><b>Tipo:</b> {propiedad?.tipo_propiedad}</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="container text-center text-lg-start">
                        <div className="my-2 shadow p-3 bg-white rounded row align-items-center">
                            <div className='m-2'>
                                <div className='d-flex justify-content-center text-black' >
                                    <h3 className="fw-bold">Datos del vendedor</h3>
                                </div>
                                <div className="row">
                                    <label className="form-label" htmlFor="fst_name" required >{propiedad?.nombre_vendedor}</label>
                                </div>
                                <div className='row'>
                                    <a className="text-decoration-none text-success" target='blanck' href={`https://wa.me/${propiedad?.whatsapp}`}><i className="fa-brands fa-whatsapp fa-fw text-success" /> {propiedad?.whatsapp}</a>
                                </div>
                                <div className='row'>
                                    <a style={{ color:`black` }} className="text-decoration-none" href={`tel:${propiedad?.whatsapp}`} ><i className="fa fa-phone fa-fw"></i> {propiedad?.whatsapp}</a>
                                </div>
                                <div className='row'>
                                    
                                    <a style={{ color:`black` }} className="text-decoration-none" href={`mailto:${propiedad?.correo_vendedor}`}><i className="fa fa-envelope fa-fw"></i> {propiedad?.correo_vendedor}</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className='d-flex text-success text-black justify-content-center bg-white rounded' >
                    <h4 className="my-3 mx-3">Datos de localizacion</h4>
                </div>
                <div className='my-1 bg-white rounded'>
                    <div className='my-3'>
                        <ViewMarkerMap propiedad={propiedad} />
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary btn-block shadow" onClick={(e) => onchangeDetalle(e, null)}>
                Atras
            </button>
        </>
    );
}

export default withNamespaces()(DetallePropiedad)