import { withNamespaces } from 'react-i18next';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Persona from './Persona';
import Propiedad from './Propiedad';
import { getPersonaDocumento } from '../../services/Persona';
import Cliente from './Cliente';
import { getClienteIdPersona } from '../../services/Cliente';
import Alert from 'react-bootstrap/Alert';
import { Logout } from '../../services/Login';
import Fotos from './Fotos';

const Nuevo = ({ t, ciudades, usuario, tipoPropiedad, token }) => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState("busqueda");
    const [persona, setPersona] = useState(false);
    const [cliente, setCliente] = useState(false);
    const [propiedad, setPropiedad] = useState(false);
    const [documento, setDocumento] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [hpersona, setHPersona] = useState(false);
    const [hcliente, setHCliente] = useState(false);
    const [hpropiedad, setHPropiedad] = useState(false);
    const [hfotos, setHFotos] = useState(false);
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    useEffect(() => {
        if (!usuario) { navegacion('/home') }
        if (usuario?.nivel === '3') { navegacion('/home') }
        // eslint-disable-next-line
    }, []);

    function navegacion(direccion) {
        navigate(direccion);
    }


    const nextTab = async (e, tab) => {
        e.preventDefault();
        setCurrentTab(tab)
        if (tab === 'cliente') {
            setHCliente(true)
            setHPersona(false)
            setHPropiedad(false)
            setHFotos(false)
        }
        if (tab === 'persona') {
            setHCliente(false)
            setHPersona(true)
            setHPropiedad(false)
            setHFotos(false)
        }
        if (tab === 'propiedad') {
            setHCliente(false)
            setHPersona(false)
            setHPropiedad(true)
            setHFotos(false)
        }
        if (tab === 'fotos') {
            setHCliente(false)
            setHPersona(false)
            setHPropiedad(false)
            setHFotos(true)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const prevTab = async (e, tab) => {
        e.preventDefault();
        setCurrentTab(tab);

        if (tab === 'busqueda') {
            setHCliente(false)
            setHPersona(false)
            setHPropiedad(false)
            setPersona(null)
        }
        if (tab === 'cliente') {
            setHCliente(true)
            setHPersona(false)
            setHPropiedad(false)
        }
        if (tab === 'persona') {
            setHCliente(false)
            setHPersona(true)
            setHPropiedad(false)
        }
        if (tab === 'propiedad') {
            setHCliente(false)
            setHPersona(false)
            setHPropiedad(true)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

    const onSearchDocumento = async (e) => {
        e.preventDefault()
        if (documento) {
            await getPersonaDocumento({ token: token, documento: documento }).then(async (per) => {
                if (per?.mensaje === 'error') {
                    setMensaje(per?.detmensaje)
                    setShow(true)
                    Logout()
                    return;
                }
                console.log(per?.body)
                setFirstName(per?.body?.nombre);
                setLastName(per?.body?.apellido)
                setPersona(per?.body)
                await getClienteIdPersona({ token: token, idpersona: per?.body?.idpersona }).then((cli) => {
                    console.log('Cliente: ',cli)
                    setCliente(cli?.body);
                });
            });
        }
    }

    return (
        <div>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-0">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        {usuario ?
                            <>
                                <div className='d-flex justify-content-center text-success'>
                                    <h2 className="fw-bold mb-2">{'Nuevo registro'}</h2>
                                </div>
                                <Tabs
                                    id="uncontrolled-tab-example"
                                    className="mb-1"
                                    defaultActiveKey='busqueda'
                                    activeKey={currentTab}
                                >
                                    <Tab eventKey="busqueda" title="Busqueda" disabled >
                                        <div className='row'>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline mb-4">
                                                    <input type="text" id="documento" className="form-control" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
                                                    <label className="form-label" htmlFor="documento">*Documento</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 flex center">
                                                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={(e) => onSearchDocumento(e)}>
                                                    Buscar
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="fst_name" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} disabled />
                                                        <label className="form-label" htmlFor="fst_name" required >*{t('identify.fst_name')}</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="last_name" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} disabled />
                                                        <label className="form-label" htmlFor="last_name">*{t('identify.last_name')}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mt-5'>
                                                {mensajeAlerta()}
                                            </div>
                                            <div className="col-md-6 mb-4 flex center">
                                                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={(e) => nextTab(e, 'persona')}>
                                                    Siguiente
                                                </button>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="persona" title="Persona" disabled >
                                        {hpersona ?
                                            <Persona
                                                ciudades={ciudades}
                                                token={token}
                                                onchangePersona={setPersona}
                                                persona={persona}
                                                usuario={usuario}
                                                textoButton={'Siguiente'}
                                                nextTab={nextTab}
                                                prevTab={prevTab}
                                            />
                                            : null}
                                    </Tab>
                                    <Tab eventKey="cliente" title="Cliente" disabled >
                                        {hcliente ?
                                            <Cliente
                                                textoButton={'Siguiente'}
                                                nextTab={nextTab}
                                                prevTab={prevTab}
                                                setCliente={setCliente}
                                                persona={persona}
                                                token={token}
                                                clienteIn={cliente}
                                            />
                                            : null}
                                    </Tab>
                                    <Tab
                                        eventKey="propiedad"
                                        title="Propiedad"
                                        disabled
                                    >
                                        {hpropiedad ?
                                            <Propiedad 
                                                token={token} 
                                                tipoPropiedad={tipoPropiedad} 
                                                prevTab={prevTab}
                                                personaIn={persona}
                                                propiedad={propiedad}
                                                cliente={cliente}
                                                ciudades={ciudades}
                                                usuario={usuario}
                                                nextTab={nextTab}
                                                setPropiedad={setPropiedad} />
                                            : null}
                                    </Tab>
                                    <Tab eventKey="fotos" title="Imagenes" disabled >
                                        {hfotos ?
                                            <Fotos
                                                ciudades={ciudades}
                                                token={token}
                                                propiedad={propiedad}
                                                prevTab={prevTab}
                                            />
                                            : null}
                                    </Tab>

                                </Tabs>
                            </>
                            : null}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default withNamespaces()(Nuevo)