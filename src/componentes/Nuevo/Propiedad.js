import { withNamespaces } from 'react-i18next';
import { useState, useEffect } from 'react'
import { getBarrioCiudad } from '../../services/Barrio';
import { createPropiedad, updatePropiedad } from '../../services/Propiedad';
import MapaGoogle from '../utils/MarkerMap';
import Alert from 'react-bootstrap/Alert';

const Propiedad = ({ t, ciudades, personaIn, setPropiedad, token, cliente, usuario, nextTab, prevTab, tipoPropiedad, propiedad }) => {
    //console.log(propiedad.barrio);
    const [barrios, setBarrios] = useState([propiedad?.barrio ?? null]);
    const idvendedor = usuario?.vendedor.idvendedor ?? 0;
    const idcliente = cliente?.idcliente ?? 0;
    const idpropiedad = propiedad?.idpropiedad ?? 0;
    const [titulo, setTitulo] = useState(propiedad?.titulo ?? '');
    const persona = personaIn?.nombre ? `${personaIn.nombre} ${personaIn.apellido}` : '';
    const [descripcion, setDescripcion] = useState(propiedad?.descripcion ?? '');
    const [direccion, setDireccion] = useState(propiedad?.direccion ?? '');
    const [superficie_terreno, setSuperficieTerreno] = useState(propiedad?.superficie_terreno ?? '');
    const [area_construida, setAreaConstruida] = useState(propiedad?.area_construida ?? '');
    const [precio, setPrecio] = useState(propiedad?.precio ?? 0);
    const [dimencion, setDimencion] = useState(propiedad?.dimencion ?? '');
    const [metros_c, setMetrosC] = useState(propiedad?.metros_c ?? '');
    const [lat, setLat] = useState(propiedad?.lat ?? '');
    const [long, setLong] = useState(propiedad?.long ?? '');
    const [idtipo_propiedad, setTipoPropiedad] = useState(propiedad?.idtipo_propiedad ?? '');
    const [idciudad, setIdciudad] = useState(propiedad?.barrio?.idciudad ?? '');
    const [idbarrio, setIdbarrio] = useState(propiedad?.idbarrio ?? '');
    const [contacto_extra, setContactoExtra] = useState(propiedad?.contacto_extra ?? '');
    const [dormitorio, setDormitorio] = useState(propiedad?.dormitorio ?? 0);
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    const getLstBarrios = async (idciudad) => {
        try {
            const res = await getBarrioCiudad({ idciudad: idciudad });
            //console.log(res.body)
            setBarrios(res.body);
        } catch (e) { console.log(e); }
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    const init = async () => {
        getLstBarrios(cliente?.persona?.barrio?.idciudad ?? 0);
    }


    const mensajeAlerta = () => {
        if (show) {
            return <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{mensaje}</Alert.Heading>
            </Alert>
        } else {
            return null
        }
    }
    const savePropiedad = async (e) => {
        e.preventDefault();

        if (idtipo_propiedad === 0 || idtipo_propiedad === '' || idtipo_propiedad === '0') {
            setMensaje('Seleccione un tipo de propiedad');
            setShow(true)
            return;
        };
        //console.log(superficie_terreno);
        const json = {
            idpropiedad: idpropiedad,
            titulo: titulo,
            descripcion: descripcion,
            area_construida: area_construida,
            superficie_terreno: superficie_terreno,
            dimencion: dimencion,
            metros_c: metros_c,
            precio: precio,
            long: long.toString(),
            lat: lat.toString(),
            idbarrio: idbarrio,
            direccion: direccion,
            idvendedor: idvendedor,
            idcliente: idcliente,
            dormitorio: dormitorio,
            contacto_extra: contacto_extra,
            idtipo_propiedad: idtipo_propiedad,
            estado: 'AC'
        }
        console.log(json);
        try {
            if (idpropiedad === 0) {
                await createPropiedad({ json, token }).then((resultado) => {
                    console.log('res: ', resultado)

                    if (resultado?.mensaje === 'error') {
                        console.log('entra en error')
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    setPropiedad(resultado?.body)
                    nextTab(e, 'fotos');

                });
            } else {
                await updatePropiedad({ json, token, param: idpropiedad }).then((resultado) => {
                    console.log('res: ', resultado)
                    if (resultado?.mensaje === 'error') {
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    setPropiedad(resultado?.body)
                    nextTab(e, 'fotos');
                });
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }

    const onchangeCiudad = async (value) => {
        setIdciudad(value);
        await getLstBarrios(value);
    }

    const onchangeBarrio = (value) => {
        setIdbarrio(value);
    }

    return (
        <>
            <form
                id='formulario'
                className='mt-4'>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="cliprop" className="form-control" value={persona} disabled />
                            <label className="form-label" htmlFor="cliprop">Cliente</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        {
                            tipoPropiedad ?
                                <div className="form-outline mb-4">
                                    <select id='tipoprop' className="form-select" defaultValue={idtipo_propiedad ?? '0'} onChange={(e) => setTipoPropiedad(e.target.value)} >
                                        <option key={0} value={'0'} >{t('common.selected')}</option>
                                        {tipoPropiedad.map((prop, index) => (
                                            <option key={index} value={prop.idtipo_propiedad}>
                                                {prop.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="tipoprop">Tipo propiedad</label>
                                </div> : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="text" id="form3Example1" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                            <label className="form-label" htmlFor="form3Example1" required >*{'Titulo'}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="text" id="form3Example2" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                            <label className="form-label" htmlFor="form3Example2">*{'Descripcion'}</label>
                        </div>
                    </div>
                </div>
                <div className="md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="text" id="direccion" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                        <label className="form-label" htmlFor="direccion">*{'Direccion'}</label>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="number" id="precio" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                            <label className="form-label" htmlFor="precio">*{'Precio'}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="form3Example4" className="form-control" value={area_construida} onChange={(e) => setAreaConstruida(e.target.value)} required />
                            <label className="form-label" htmlFor="form3Example4">*{'Area construida'}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="metros_c" id="form3Example5" className="form-control" value={metros_c} onChange={(e) => setMetrosC(e.target.value)} required autoComplete="on" />
                            <label className="form-label" htmlFor="form3Example5">*{'Metros cuadrados'}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="dim" className="form-control" value={dimencion} onChange={(e) => setDimencion(e.target.value)} required autoComplete="on" />
                            <label className="form-label" htmlFor="dim">*{'Dimension'}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="superficie" className="form-control" value={superficie_terreno} onChange={(e) => setSuperficieTerreno(e.target.value)} required autoComplete="on" />
                            <label className="form-label" htmlFor="superficie">*{'Superficie de terreno'}</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6 mb-4">
                        {
                            ciudades ?
                                <div className="form-outline mb-4">
                                    <select id='ciudad_new' className="form-select" defaultValue={idciudad ?? '0'} defaultChecked={idciudad ?? 0} onChange={(e) => onchangeCiudad(e.target.value)} >
                                        <option key={0} value={'0'} >{t('common.selected')}</option>
                                        {ciudades.map((ciudad, index) => (
                                            <option key={index} value={ciudad.idciudad}>
                                                {ciudad.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="ciudad_new">*{t('identify.city')}</label>
                                </div> : null
                        }
                    </div>
                    <div className="col-md-6 mb-4">
                        {
                            barrios ?
                                <div className="form-outline mb-4">
                                    <select id='barrio_persona' className="form-select" defaultValue={idbarrio ?? '0'} defaultChecked={idbarrio ?? 0} onChange={(e) => onchangeBarrio(e.target.value)}  >
                                        <option key={0} value={'0'} >{t('common.selected')}</option>
                                        {barrios.map((barrio, index) => (
                                            <option key={index} value={barrio?.idbarrio}>
                                                {barrio?.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div> : null
                        }
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="text" id="conextra" className="form-control" value={contacto_extra} onChange={(e) => setContactoExtra(e.target.value)} required />
                            <label className="form-label" htmlFor="conextra" required >*{'Contacto adicional'}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="number" id="dormitorio" className="form-control" value={dormitorio} onChange={(e) => setDormitorio(e.target.value)} required />
                            <label className="form-label" htmlFor="dormitorio" required >*{'Cantidad de dormitorios'}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <MapaGoogle setLat={setLat} setLong={setLong} lat={lat} long={long} />
                </div>
                <div className='row mt-5'>
                    {mensajeAlerta()}
                </div>
                <div className="mb-4 my-4">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => prevTab(e, 'cliente')}>
                        Atras
                    </button>
                    <button type="button" className="btn btn-primary btn-block mb-4 ms-2" onClick={(e) => savePropiedad(e)}>
                        Siguiente
                    </button>
                </div>
            </form>
        </>
    );
}

export default withNamespaces()(Propiedad)