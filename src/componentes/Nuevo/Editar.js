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
import { useParams } from "react-router-dom";
import Fotos from './Fotos';
import { getPropiedadId } from '../../services/Propiedad';

const Editar = ({ t, ciudades, usuario, tipoPropiedad, token }) => {
    //console.log(usuario)
    const navigate = useNavigate();
    const { documento } = useParams();
    const { idpropiedad } = useParams();
    const [currentTab, setCurrentTab] = useState("persona");
    const [persona, setPersona] = useState(false);
    const [cliente, setCliente] = useState(false);
    const [propiedad, setPropiedad] = useState(false);
    const [hpersona, setHPersona] = useState(false);
    const [hcliente, setHCliente] = useState(false);
    const [hpropiedad, setHPropiedad] = useState(false);
    const [hfotos, setHFotos] = useState(false);

    useEffect(() => {
        if (!usuario) { navegacion('/home') }
        if (!documento || documento === 0 || documento === 'undefine' || documento === null) { navegacion(-1) }
        if (usuario?.nivel === '3') { navegacion('/home') }
        onSearchDocumento(documento);
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

        
        if (tab === 'persona') {
            setHCliente(false)
            setHPersona(true)
            setHPropiedad(false)
        }
        if (tab === 'cliente') {
            setHCliente(true)
            setHPersona(false)
            setHPropiedad(false)
        }
        if (tab === 'propiedad') {
            setHCliente(false)
            setHPersona(false)
            setHPropiedad(true)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const onSearchDocumento = async (e) => {
        //e.preventDefault()
        if (documento) {
            await getPersonaDocumento({ token: token, documento: documento }).then(async (per) => {
                if (per?.mensaje === 'error') {
                    //console.log(per?.detmensaje)
                    return;
                }
                setPersona(per?.body)
                setHPersona(per?.body)
                await getClienteIdPersona({ token: token, idpersona: per?.body?.idpersona }).then((cli) => {
                    //console.log('Cliente: ', cli)
                    if (cli?.mensaje === 'error') {
                        //console.log(per?.detmensaje)
                        return;
                    }
                    setCliente(cli?.body);
                });
                await getPropiedadId({ token, idprodpiedad: idpropiedad }).then((prod) =>{
                    //console.log(prod)
                    if (prod?.mensaje === 'error') {
                        //console.log(per?.detmensaje)
                        return;
                    }
                    setPropiedad(prod?.body)
                    
                })
            });
        }
    }

    return (
        <div>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-0">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <>
                            <div className='d-flex justify-content-center text-success'>
                                <h2 className="fw-bold mb-2">{'Editar registro'}</h2>
                            </div>
                            <Tabs
                                id="uncontrolled-tab-example"
                                className="mb-1"
                                defaultActiveKey='busqueda'
                                activeKey={currentTab}
                            >
                                <Tab eventKey="persona" title="Persona" disabled >
                                    {hpersona ?
                                        <Persona
                                            ciudades={ciudades}
                                            token={token}
                                            onchangePersona={setPersona}
                                            persona={persona}
                                            usuario={usuario}
                                            nextTab={nextTab}
                                            prevTab={prevTab}
                                        />
                                        : null}
                                </Tab>
                                <Tab eventKey="cliente" title="Cliente" disabled >
                                    {hcliente ?
                                        <Cliente
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
                    </div>
                </div>
            </section>
        </div>
    );
}

export default withNamespaces()(Editar)