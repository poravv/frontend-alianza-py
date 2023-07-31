import { withNamespaces } from 'react-i18next';
import { useState, useEffect } from 'react'
import { getBarrioCiudad } from '../services/Barrio';
import { updateUsuario } from '../services/Usuario';
import { useNavigate } from "react-router-dom";
import { NACIONALIDAD } from './utils/Nacionalidades'
import MapaGoogle from './utils/MarkerMap';
import { Logout } from '../services/Login';
import Alert from 'react-bootstrap/Alert';

import { createFotos } from '../services/Fotos';
import Modal from 'react-modal'
import { deletePhF } from '../services/PropiedadHFotos';
import { getPhotoPerfil } from '../services/Persona';



const Usuario = ({ t, ciudades, usuario, token }) => {
    console.log(usuario)
    const [editar, setEditar] = useState(true);
    const idusuario = usuario?.idusuario ?? 0;
    const nivel = usuario?.nivel ?? 3;
    const idpersona = usuario?.persona.idpersona ?? 0;
    const [first_name, setFirstName] = useState(usuario?.persona.nombre ?? '');
    const [last_name, setLastName] = useState(usuario?.persona.apellido ?? '');
    const [barrios, setBarrios] = useState([]);
    const [idciudad, setIdciudad] = useState(usuario?.persona.barrio.idciudad ?? '');
    const [idbarrio, setIdbarrio] = useState(usuario?.persona.barrio.idbarrio ?? '');
    const [phone, setPhone] = useState(usuario?.persona.telefono ?? '');
    const [email, setEmail] = useState(usuario?.correo ?? '');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [repPassrowrd, setRepPassword] = useState('');
    const [documento, setDocumento] = useState(usuario?.persona.documento ?? '');
    const [direccion, setDireccion] = useState(usuario?.persona.direccion ?? '');
    const [tipo_doc, setTipoDocumento] = useState(usuario?.persona.tipo_doc ?? '');
    const [nacionalidad, setNacionalidad] = useState(usuario?.persona.nacionalidad ?? '');
    const [sexo, setSexo] = useState(usuario?.persona.sexo ?? '');
    const [lat, setLat] = useState(usuario?.persona.lat ?? '');
    const [long, setLong] = useState(usuario?.persona.long ?? '');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    //Datos para perfil
    const [file, setFile] = useState(null)
    const [perfil, setPerfil] = useState(usuario?.persona?.photo??null);
    const [updated, setUpdated] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        if (!usuario) { navegacion('/home') }
        init();
        Modal.setAppElement('body')
        getPerfil();
        setUpdated(false)
        // eslint-disable-next-line
    }, [updated]);

    function navegacion(direccion) {
        navigate(direccion);
    }

    const init = async () => {
        getLstBarrios(usuario.persona.barrio.idciudad);
    }

    const getLstBarrios = async (idciudad) => {
        try {
            const res = await getBarrioCiudad({ idciudad: idciudad });
            //console.log(res.body)
            setBarrios(res.body);
        } catch (e) { console.log(e); }
    }

    const save = async (e) => {
        e.preventDefault();
        if (newpassword !== repPassrowrd) {
            setMensaje('Contraseñas nuevas no coinciden');
            setShow(true)
            return;
        };

        if (!password) {
            setMensaje('Favor cargar contraseña actual');
            setShow(true)
            return;
        };

        const json = {
            usuario: {
                //idpersona: idpersona,
                nivel: nivel,
                estado: "AC",
                correo: email,
                usuario: email,
                password: password,
                newpassword: newpassword
            },
            persona: {
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
            await updateUsuario({ json, idpersona: idpersona, idusuario: idusuario, token: token }).then((resultado) => {
                console.log('res: ', resultado);
                if (resultado?.mensaje === 'error') {
                    setMensaje(resultado?.detmensaje)
                    setShow(true)
                    return;
                }
                window.localStorage.removeItem('logAlianzaUser');
                navegacion('/home');
                // eslint-disable-next-line
                window.location.href = window.location.href;

            });
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

    const onchangeEditable = (e) => {
        console.log('Entra en editable')
        //e.preventDefault();
        setEditar(!editar);
        formulario();
    }


    const formulario = () => {

        //console.log('Entra en form',usuario.body.correo,'correo: ',email);
        return <form method="post"
            id='formulario'
            onSubmit={(e) => save(e)}>
            <div className='d-flex justify-content-center text-success'>
                <h2 className="fw-bold mb-5">{t('usuario.title')}</h2>
            </div>
            <div className='d-flex justify-content-center'>
                <a style={{ textDecoration: `none` }} href='#edit' onClick={(e) => onchangeEditable(e)}><h5 className="mb-5 text-primary">{editar ? `Editar` : `Cancelar`}</h5></a>
                <a style={{ textDecoration: `none` }} href='/home' onClick={(e) => Logout()} ><h5 className="mb-5 ms-5 text-primary">Cerrar sesion</h5></a>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                        <input type="text" id="fst_name" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} required disabled={editar} />
                        <label className="form-label" htmlFor="fst_name" required >*{t('identify.fst_name')}</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                        <input type="text" id="last_name" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} required disabled={editar} />
                        <label className="form-label" htmlFor="last_name">*{t('identify.last_name')}</label>
                    </div>
                </div>
            </div>
            <div className="md-6 mb-4">
                <div className="form-outline mb-4">
                    <input type="text" id="direccion" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required disabled={editar} />
                    <label className="form-label" htmlFor="direccion">*{t('identify.address')}</label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="text" id="documento" className="form-control" value={documento} onChange={(e) => setDocumento(e.target.value)} required disabled={editar} />
                        <label className="form-label" htmlFor="documento">*Documento</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={editar} />
                        <label className="form-label" htmlFor="email">*{t('identify.email')}</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="text" id="form3Example4" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={editar} />
                        <label className="form-label" htmlFor="form3Example4">*{t('identify.phone')}</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="password" id="newPass" className="form-control" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="on" disabled={editar} />
                        <label className="form-label" htmlFor="newPass">*{t('identify.password_new')}</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="password" id="form3Example6" className="form-control" value={repPassrowrd} onChange={(e) => setRepPassword(e.target.value)} autoComplete="on" disabled={editar} />
                        <label className="form-label" htmlFor="form3Example6">*{t('identify.rep_password_new')}</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    {
                        ciudades ?
                            <div className="form-outline mb-4">
                                <select id='ciudad_usuario' className="form-select" defaultValue={idciudad ?? '0'} defaultChecked={idciudad ?? 0} onChange={(e) => onchangeCiudad(e.target.value)} disabled={editar} >
                                    <option key={0} value={'0'} >{t('common.selected')}</option>
                                    {ciudades.map((ciudad, index) => (
                                        <option key={index} value={ciudad.idciudad}>
                                            {ciudad.descripcion}
                                        </option>
                                    ))}
                                </select>
                                <label className="form-label" htmlFor="ciudad_usuario">*{t('identify.city')}</label>
                            </div> : null
                    }
                </div>

                <div className="col-md-6 mb-4">
                    {
                        barrios ?
                            <div className="form-outline mb-4">
                                <select id='barrio_usuario' className="form-select" defaultValue={idbarrio ?? '0'} defaultChecked={idbarrio ?? 0} onChange={(e) => onchangeBarrio(e.target.value)} disabled={editar} >
                                    <option key={0} value={'0'} >{t('common.selected')}</option>
                                    {barrios.map((barrio, index) => (
                                        <option key={index} value={barrio.idbarrio}>
                                            {barrio.descripcion}
                                        </option>
                                    ))}
                                </select>
                                <label className="form-label" htmlFor="barrio_usuario">*{t('identify.district')}</label>
                            </div> : null
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <select id='tipodoc' className="form-select" defaultValue={tipo_doc ?? '0'} onChange={(e) => onchangeTipoDocumento(e.target.value)} disabled={editar} >
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
                                <select id='nacionalidad' className="form-select" defaultValue={nacionalidad ?? '0'} onChange={(e) => setNacionalidad(e.target.value)} disabled={editar} >
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
                        <select id='sexo' className="form-select" defaultValue={sexo ?? '0'} onChange={(e) => setSexo(e.target.value)} disabled={editar}  >
                            <option key={0} value={0} >{t('common.selected')}</option>
                            <option key={1} value={'MA'}>Masculino</option>
                            <option key={2} value={'FE'}>Femenino</option>
                        </select>
                        <label className="form-label" htmlFor="sexo">Sexo</label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline mb-4">
                        <input type="password" id="form3Example5" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" disabled={editar} />
                        <label className="form-label" htmlFor="form3Example5">*Contraseña actual</label>
                    </div>
                </div>
            </div>
            <div
                className='mt-4'
            >
                <div className="container mt-5">
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-10">
                                <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
                            </div>
                            <div className="col-2">
                                <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
                            </div>
                        </div>
                    </div>
                    <div className='container mt-5' style={{ display: `flex`, flexWrap: `wrap` }}>
                        {perfil ?
                            <div className='card m-2' key={1}>
                            <img src={'http://186.158.152.141:4002/' + perfil?.photo} alt='...' className='card-img-top' style={{ maxWidth: `250px`, }} />
                            <div>
                                <button onClick={(e) => modalHandler(e, perfil?.photo, perfil?.idpersona)} className='btn btn-dark'>View</button>
                            </div>
                        </div> : <img src={require('../componentes/img/sinfoto.jpg')} alt='...' className='card-img-top' style={{ maxWidth: `250px`, }} />} 
                    </div>
                </div>
                <Modal style={{ content: { right: `20%`, left: `20%` } }} isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                    <div className='card m-2'>
                        <img src={'http://186.158.152.141:4002/' + currentImage} alt='...' className='card-img-top' />
                        <div>
                            <button onClick={(e) => handleDelete(e, currentId, currentImage)} className='btn btn-dark'>Delete</button>
                        </div>
                    </div>
                </Modal>

                <div className='row mt-5'>
                    {mensajeAlerta()}
                </div>
            </div>
            <div className="row">
                <MapaGoogle setLat={setLat} setLong={setLong} lat={lat} long={long} />
            </div>
            <div className='row mt-5'>
                {mensajeAlerta()}
            </div>
            <div className="mb-4 my-4">
                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={editar} >
                    {t('common.save')}
                </button>
            </div>
        </form>
    }


    const modalHandler = (e, image, idfotos) => {
        e.preventDefault()
        setModalOpen(true)
        setCurrentImage(image)
        setCurrentId(idfotos)
    }

    const handleDelete = async (e, idfotos, currentImage) => {
        e.preventDefault();
        await deletePhF({ token: token, idfotos: idfotos, name: currentImage }).then((rs) => {
            console.log(rs)
            setUpdated(true)
            setModalOpen(false)
        })
    }


    const sendHandler = async () => {
        if (!file) {
            alert('Favor seleccione una imagen')
            return
        }
        const formdata = new FormData()
        formdata.append('image', file);

        try {
            await createFotos({ json: formdata, token, idpersona: idpersona }).then((resultado) => {
                console.log('res: ', resultado);
                if (resultado?.mensaje === 'error') {
                    setMensaje(resultado?.detmensaje)
                    setShow(true)
                    return;
                }
                setUpdated(true)

                //El evento que vuelve a la pagina de Nuevo

            });
        } catch (error) {
            //console.log('error', error?.response?.data)
            if (error?.mensaje === 'error') {
                setMensaje(error?.detmensaje)
                setShow(true)
                return;
            }
        }

        document.getElementById('fileinput').value = null

        setFile(null)
    }

    const getPerfil = () => {
        //console.log('idpropiedad: ', idpropiedad)
        getPhotoPerfil({ token: token, idpersona: idpersona }).then((personaFoto) => {
            console.log('Foto',personaFoto.body)
            if (personaFoto?.body?.photo !== null) {
                setPerfil(personaFoto?.body)
            }
        })
    }

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    return (
        <div>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-0">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        {usuario ? formulario() : null}
                    </div>
                </div>
            </section>
        </div>
    );
}


export default withNamespaces()(Usuario)