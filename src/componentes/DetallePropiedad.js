import { withNamespaces } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { separadorMiles } from './utils/Separador';
import ViewMarkerMap from './utils/ViewMarkerMap';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Carousel } from "react-bootstrap";
import { Space, Spin } from 'antd';

const DetallePropiedad = ({ t, propiedades }) => {
    //console.log(propiedades)
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState(null);
    const { idpropiedad } = useParams();

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // eslint-disable-next-line
    function navegacion(direccion) {
        navigate(direccion);
    }

    useEffect(() => {
        // eslint-disable-next-line
        const res = propiedades.find((element) => (element.idpropiedad==idpropiedad));
        setPropiedad(res)
        // eslint-disable-next-line
    }, [propiedades]);


    return (
        <>
            {propiedad ?
                <>
                    <div className='flex-wrap row'>
                        <div className='col-md-7 m-3'>
                            <div className="container text-center text-lg-start">
                                <div className="my-2 shadow p-3 bg-white rounded row align-items-center">
                                    <div className='m-2'>
                                        <div className='d-flex justify-content-center text-success' >
                                            <h3 className="fw-bold">{propiedad?.titulo}</h3>
                                        </div>
                                        <div className={propiedad?.estado === 'AC' ? 'd-flex justify-content-start text-success' : 'd-flex justify-content-start text-danger'} >
                                            <h4 className="fw-bold">{propiedad?.estado === 'AC' ? 'Disponible' : 'Vendido'}</h4>
                                        </div>
                                        <div className='py-5'>
                                            <Carousel interval={3000} >
                                                {propiedad ?
                                                    propiedad.Propiedad_has_fotos?.map((row, index) => {
                                                        return (
                                                            <Carousel.Item key={index} style={{ marginTop: `10px`, textAlign: `center` }} >
                                                                <img style={{ borderRadius: `10px` }} width={`750em`} height={`500em`} src={'http://186.158.152.12:4002/' + row?.fotos_propiedads[0]?.name} alt='..' />
                                                            </Carousel.Item>
                                                        )
                                                    })
                                                    : null}
                                            </Carousel>
                                        </div>
                                        <div className='d-flex text-black my-3' >
                                            <h5 className="">{propiedad?.descripcion}</h5>
                                        </div>
                                        <div className='my-2'>
                                            <h3 style={{ letterSpacing: `-2px` }} className="text-danger"><b>Gs.</b> {separadorMiles(parseInt(propiedad?.precio))}</h3>
                                        </div>
                                        <label className="form-label" htmlFor="fst_name" required ><b>Direccion:</b> {propiedad?.direccion}</label>
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
                                        <div className='row my-3'>
                                            <div className='d-flex justify-content-center bg-white rounded' >
                                                <h4 className="my-3 mx-3 text-success">Geolocalizacion</h4>
                                            </div>
                                            <ViewMarkerMap propiedad={propiedad} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 m-3' >
                            <div className="container text-center text-lg-start">
                                <div className="my-2 shadow p-3 bg-white rounded row align-items-center">
                                    <div className='m-2'>
                                        <div className='d-flex justify-content-center text-black' >
                                            <h3 className="fw-bold text-success">Datos del vendedor</h3>
                                        </div>
                                        <div className='row'>
                                            <div className='container mt-3' style={{ display: `flex`, flexWrap: `wrap` }}>
                                                {propiedad?.img_vendedor ?
                                                    <div key={1} >
                                                        <img style={{ borderRadius: `1000px` }} src={'http://186.158.152.12:4002/' + propiedad?.img_vendedor} alt='...' className='card-img-top' />
                                                    </div> :
                                                    <img src={require('../componentes/img/sinfoto.jpg')} alt='...' className='card-img-top' style={{ maxWidth: `250px`, }} />
                                                }
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <h4 className="form-label" htmlFor="fst_name" required >{propiedad?.nombre_vendedor}</h4>
                                        </div>
                                        <div className='row my-3'>
                                            <a className="text-decoration-none text-success" target='blanck' href={`https://wa.me/${propiedad?.whatsapp}`}><i className="fa-brands fa-whatsapp fa-fw text-success" /> {propiedad?.whatsapp}</a>
                                        </div>
                                        <div className='row my-3'>
                                            <a style={{ color: `black` }} className="text-decoration-none" href={`tel:${propiedad?.whatsapp}`} ><i className="fa fa-phone fa-fw"></i> {propiedad?.whatsapp}</a>
                                        </div>
                                        <div className='row my-3'>
                                            <a style={{ color: `black` }} className="text-decoration-none" href={`mailto:${propiedad?.correo_vendedor}`}><i className="fa fa-envelope fa-fw"></i> {propiedad?.correo_vendedor}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-block shadow m-3" onClick={() => navigate(-1)}>
                        Atras
                    </button>
                </>
                :
                <div style={{ width:`100%`,minHeight:`20rem`,justifyContent:`center`,display:`flex` }}>
                    <Space >
                    <Spin size="large" />
                </Space>
                </div>
            }

        </>
    );
}

export default withNamespaces()(DetallePropiedad)