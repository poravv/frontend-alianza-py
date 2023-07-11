import { withNamespaces } from 'react-i18next';
import { useState, useEffect } from 'react'
import { getBarrioCiudad } from '../../services/Barrio';
import { createPropiedad } from '../../services/Propiedad';
import MapaGoogle from '../utils/MarkerMap';
import Alert from 'react-bootstrap/Alert';

const Propiedad = ({ t, ciudades, personaIn,setPropiedad, token, cliente, usuario,nextTab, prevTab, tipoPropiedad }) => {
    const idusuario = usuario?.idusuario ?? 0;
    const idcliente = cliente?.idcliente ?? 0;
    const [titulo, setTitulo] = useState('');
    const persona = personaIn?.nombre ? `${personaIn.nombre} ${personaIn.apellido}` : '';
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState([]);
    const [superficie_terreno, setSuperficieTerreno] = useState('');
    const [area_construida, setAreaConstruida] = useState('');
    const [precio, setPrecio] = useState(0);
    const [dimencion, setDimencion] = useState('');
    const [metros_c, setMetrosC] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [idtipo_propiedad, setTipoPropiedad] = useState('');
    const [idciudad, setIdciudad] = useState('');
    const [idbarrio, setIdbarrio] = useState('');
    const [contacto_extra, setContactoExtra] = useState('');
    const [dormitorio, setDormitorio] = useState(0);
    const [show, setShow] = useState(false);
    const [barrios, setBarrios] = useState([]);
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
                titulo: titulo,
                descripcion: descripcion,
                area_construida: area_construida,
                superficie_terreno:superficie_terreno,
                dimencion:dimencion,
                metros_c:metros_c,
                precio: precio,
                long: long.toString(),
                lat: lat.toString(),
                idbarrio: idbarrio,
                direccion: direccion,
                idusuario: idusuario,
                idcliente:idcliente,
                dormitorio:dormitorio,
                contacto_extra:contacto_extra,
                idtipo_propiedad: idtipo_propiedad,
                estado:'AC'
        }
        console.log(json);
        try {
            await createPropiedad({ json,token }).then((resultado) => {
                console.log('res: ', resultado)
                setPropiedad(resultado.body)
                nextTab(e, 'fotos');
                
            });
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
                            <label className="form-label" htmlFor="dim">*{'Dimencion'}</label>
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
                                    <select id='barrio' className="form-select" defaultValue={idbarrio ?? '0'} defaultChecked={idbarrio ?? 0} onChange={(e) => onchangeBarrio(e.target.value)} >
                                        <option key={0} value={'0'} >{t('common.selected')}</option>
                                        {barrios.map((barrio, index) => (
                                            <option key={index} value={barrio.idbarrio}>
                                                {barrio.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="barrio">*{t('identify.district')}</label>
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