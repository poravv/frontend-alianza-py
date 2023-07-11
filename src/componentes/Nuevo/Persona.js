import { withNamespaces } from 'react-i18next';
import { useState } from 'react'
import { getBarrioCiudad } from '../../services/Barrio';
import { createPersona, updatePersona } from '../../services/Persona';
import { NACIONALIDAD } from '../utils/Nacionalidades'
import MapaGoogle from '../utils/MarkerMap';
import Alert from 'react-bootstrap/Alert';

const Persona = ({ t, ciudades, token, onchangePersona, persona, usuario, nextTab, prevTab }) => {
    //console.log(usuario)
    const idpersona = persona?.idpersona ?? 0;
    //const idusuario = usuario?.idusuario ?? 0;
    const [first_name, setFirstName] = useState(persona?.nombre ?? '');
    const [last_name, setLastName] = useState(persona?.apellido ?? '');
    const [barrios, setBarrios] = useState([persona?.barrio]);
    const [idciudad, setIdciudad] = useState(persona?.barrio?.idciudad ?? '');
    const [idbarrio, setIdbarrio] = useState(persona?.barrio?.idbarrio ?? '');
    const [phone, setPhone] = useState(persona?.telefono ?? '');
    const [email, setEmail] = useState(persona?.correo ?? '');
    const [documento, setDocumento] = useState(persona?.documento ?? '');
    const [direccion, setDireccion] = useState(persona?.direccion ?? '');
    const [tipo_doc, setTipoDocumento] = useState(persona?.tipo_doc ?? '');
    const [nacionalidad, setNacionalidad] = useState(persona?.nacionalidad ?? '');
    const [sexo, setSexo] = useState(persona?.sexo ?? '');
    const [lat, setLat] = useState(persona?.lat ?? '');
    const [long, setLong] = useState(persona?.long ?? '');
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    const getLstBarrios = async (idciudad) => {
        try {
            const res = await getBarrioCiudad({ idciudad: idciudad });
            //console.log(res.body)
            setBarrios(res.body);
        } catch (e) { console.log(e); }
    }


    const save = async (e) => {
        e.preventDefault();
        console.log('------------Entra en save persona ', idpersona)
        if (idciudad === 0 || idciudad === '' || idciudad === '0') {
            setMensaje('Seleccione una ciudad');
            setShow(true)
            return;
        };
        if (idbarrio === 0 || idbarrio === '' || idbarrio === '0') {
            setMensaje('Seleccione un barrio');
            setShow(true)
            return;
        };
        if (tipo_doc === 0 || tipo_doc === '' || tipo_doc === '0') {
            setMensaje('Seleccione un tipo de documento');
            setShow(true)
            return;
        };

        if (nacionalidad === 0 || nacionalidad === '' || nacionalidad === '0') {
            setMensaje('Seleccione una Nacionalidad');
            setShow(true)
            return;
        };
        if (sexo === 0 || sexo === '' || sexo === '0') {
            setMensaje('Seleccione un sexo');
            setShow(true)
            return;
        };
        const json = {
            persona: {
                idpersona: idpersona,
                nombre: first_name,
                apellido: last_name,
                estado: "AC",
                telefono: phone,
                correo: email,
                documento: documento,
                idbarrio: idbarrio,
                direccion: direccion,
                nacionalidad: nacionalidad,
                tipo_doc: tipo_doc,
                sexo: sexo,
                lat: lat,
                long: long
            }
        }

        console.log(json);
        try {
            if (idpersona === 0) {
                await createPersona({ json, token: token }).then((resultado) => {
                    console.log('res: ', resultado);
                    if (resultado?.mensaje === 'error') {
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    //El evento que vuelve a la pagina de Nuevo
                    onchangePersona(resultado.body)
                    nextTab(e,'cliente');
                });
            } else {
                await updatePersona({ json, token: token, idpersona: idpersona }).then((resultado) => {
                    console.log('res: ', resultado);
                    if (resultado?.mensaje === 'error') {
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    //El evento que vuelve a la pagina de Nuevo
                    //No se carga persona ya que actualizar no retorna datos de persona
                    //onchangePersona(resultado.body)
                    nextTab(e,'cliente');
                });
            }
        } catch (error) {
            console.log('error', error.response.data)
            setMensaje(error.response.data)
            setShow(true)
            return;
        }
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


    const onchangeCiudad = async (value) => {
        setIdciudad(value);
        await getLstBarrios(value);
    }

    const onchangeBarrio = (value) => {
        setIdbarrio(value);
    }

    const onchangeTipoDocumento = (value) => {
        setTipoDocumento(value);
    }

    return (
        <>
            <form
                id='formPersona'
                className='mt-4'
            >
                <div className='row'>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="documento" className="form-control" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
                            <label className="form-label" htmlFor="documento">*Documento</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="text" id="fst_name" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                            <label className="form-label" htmlFor="fst_name" required >*{t('identify.fst_name')}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                            <input type="text" id="last_name" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                            <label className="form-label" htmlFor="last_name">*{t('identify.last_name')}</label>
                        </div>
                    </div>
                </div>
                <div className="md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="text" id="direccion" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                        <label className="form-label" htmlFor="direccion">*{t('identify.address')}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label className="form-label" htmlFor="email">*{t('identify.email')}</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            <label className="form-label" htmlFor="phone">*{t('identify.phone')}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        {
                            ciudades ?
                                <div className="form-outline mb-4">
                                    <select id='ciudad_persona' className="form-select" defaultValue={idciudad ?? '0'} defaultChecked={idciudad ?? 0} onChange={(e) => onchangeCiudad(e.target.value)}  >
                                        <option key={0} value={'0'} >{t('common.selected')}</option>
                                        {ciudades.map((ciudad, index) => (
                                            <option key={index} value={ciudad.idciudad}>
                                                {ciudad.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="ciudad_persona">*{t('identify.city')}</label>
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
                                            <option key={index} value={barrio.idbarrio}>
                                                {barrio.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="barrio_persona">*{t('identify.district')}<p style={{ fontSize: `8px`, color: `red` }}>Vuelva a seleccionar la ciudad para cambiar el barrio</p></label>
                                </div> : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <select id='tipodoc' className="form-select" defaultValue={tipo_doc ?? '0'} onChange={(e) => onchangeTipoDocumento(e.target.value)}  >
                                <option key={0} value={'0'} >{t('common.selected')}</option>
                                <option key={1} value={'CI'}>Cedula de Identidad</option>
                                <option key={2} value={'DE'}>Documento Extranjero</option>
                            </select>
                            <label className="form-label" htmlFor="tipodoc">Tipo documento</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        {
                            NACIONALIDAD ?
                                <div className="form-outline mb-4">
                                    <select id='nacionalidad' className="form-select" defaultValue={nacionalidad ?? '0'} onChange={(e) => setNacionalidad(e.target.value)}  >
                                        <option key={0} value={0} >{t('common.selected')}</option>
                                        {NACIONALIDAD.map((nacion, index) => (
                                            <option key={index} value={nacion.value}>
                                                {nacion.label}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label" htmlFor="nacionalidad">Nacionalidad</label>
                                </div> : null
                        }
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <select id='sexo' className="form-select" defaultValue={sexo ?? '0'} onChange={(e) => setSexo(e.target.value)}   >
                                <option key={0} value={0} >{t('common.selected')}</option>
                                <option key={1} value={'MA'}>Masculino</option>
                                <option key={2} value={'FE'}>Femenino</option>
                            </select>
                            <label className="form-label" htmlFor="sexo">Sexo</label>
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
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => prevTab(e,'busqueda')}>
                        Atras
                    </button>
                    <button type="button" className="btn btn-primary btn-block ms-2 mb-4" onClick={(e) => save(e)}>
                        Siguiente
                    </button>
                </div>
            </form>
        </>
    );
}

export default withNamespaces()(Persona)