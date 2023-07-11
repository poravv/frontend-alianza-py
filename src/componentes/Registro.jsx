import { withNamespaces } from 'react-i18next';
import { useState } from 'react';
import { getBarrioCiudad } from '../services/Barrio';
import { createUsuario } from '../services/Usuario';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const Registro = ({ t, ciudades }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [barrios, setBarrios] = useState('');
    const [idciudad, setIdciudad] = useState('');
    const [idbarrio, setIdbarrio] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassrowrd, setRepPassword] = useState('');
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const navigate = useNavigate();

    const mensajeAlerta = () => {
        if (show) {
            return <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{mensaje}</Alert.Heading>
            </Alert>
        } else {
            return null
        }
    }

    function navegacion(direccion) {
        navigate(direccion);
    }


    const getLstBarrios = async (idciudad) => {
        try {
            const res = await getBarrioCiudad({ idciudad: idciudad });
            setBarrios(res.body);
            //console.log(res);
        } catch (e) { console.log(e); }
    }

    const save = async (e) => {
        e.preventDefault();
        console.log(idciudad);
        const json = {
            usuario: {
                idpersona: 0,
                nivel: 3,
                estado: "AC",
                correo: email,
                usuario: email,
                password: password
            },
            persona: {
                nombre: first_name,
                apellido: last_name,
                estado: "AC",
                telefono: phone,
                correo: email,
                documento: "nn",
                idbarrio: idbarrio
            }
        }
        //console.log(json);

        try {
            await createUsuario({ json }).then((resultado) => {
                console.log('res: ', resultado)
                if(resultado?.mensaje==='error'){
                    setMensaje(resultado?.detmensaje)
                    setShow(true)
                    return;
                }
                navegacion('/home')
                // eslint-disable-next-line
                window.location.href = window.location.href;
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
        <div>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-1 px-md-5 text-center text-lg-start">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: `10` }} >
                            <h1 className="my-5 display-5 fw-bold ls-tight" >
                                {t('identify.title')}
                                <br />
                                <span className="text-success">{t('identify.subtitle')}</span>
                            </h1>
                            <p className="mb-4 opacity-70" >
                                {t('identify.description')}
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form method="post" onSubmit={(e) => save(e)}>
                                        <div className='d-flex justify-content-center text-success'>
                                            <h2 className="fw-bold mb-5">{t('identify.signup')}</h2>
                                        </div>
                                        <div className='row'>
                                            {mensajeAlerta()}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Example1" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                                                    <label className="form-label" htmlFor="form3Example1" required >*{t('identify.fst_name')}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Example2" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                                                    <label className="form-label" htmlFor="form3Example2">*{t('identify.last_name')}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            <label className="form-label" htmlFor="form3Example3">*{t('identify.email')}</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example4" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                            <label className="form-label" htmlFor="form3Example4">*{t('identify.phone')}</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example5" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <label className="form-label" htmlFor="form3Example5">*{t('identify.password')}</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example6" className="form-control" value={repPassrowrd} onChange={(e) => setRepPassword(e.target.value)} required />
                                            <label className="form-label" htmlFor="form3Example6">*{t('identify.rep_password')}</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <select id='form3Example7' className="form-select" aria-label="Default select example" onChange={(e) => onchangeCiudad(e.target.value)} >
                                                <option value={'0'} >{t('common.selected')}</option>
                                                {ciudades ? ciudades.map((ciudad, index) => (
                                                    <option key={index} value={ciudad.idciudad}>
                                                        {ciudad.descripcion}
                                                    </option>
                                                )) : null}
                                            </select>
                                            <label className="form-label" htmlFor="form3Example7">*{t('identify.city')}</label>
                                        </div>

                                        {
                                            barrios ?
                                                <div className="form-outline mb-4">
                                                    <select id='form3Example8' className="form-select" aria-label="Default select example" onChange={(e) => onchangeBarrio(e.target.value)} >
                                                        <option value={0} defaultValue={0} >{t('common.selected')}</option>
                                                        {barrios.map((barrio, index) => (
                                                            <option key={index} defaultValue={barrio.idbarrio} value={barrio.idbarrio}>
                                                                {barrio.descripcion}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label className="form-label" htmlFor="form3Example8">*{t('identify.district')}</label>
                                                </div> : null
                                        }

                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            {t('identify.signup')}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default withNamespaces()(Registro)