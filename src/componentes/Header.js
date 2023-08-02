import { NavLink, useLocation, useNavigate, } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Footer from "./Footer";
import { withNamespaces } from 'react-i18next';
import { useState } from "react";
import { Modal } from 'react-bootstrap'
import Registro from "./Registro";
import LoginForm from "./LoginForm";

const Header = ({ ciudades, dato, clearDato, setDato, categorias, usuario, tipoPropiedad, t }) => {
    //console.log(dato)
    const location = useLocation();
    //console.log(location.pathname)
    const navigate = useNavigate();
    const [isShowLogin, invokeModal] = useState(false)
    const [isShowSignUp, invokeModalSignUp] = useState(false)
    const [idciudad, setIdciudad] = useState(0)
    const [idtipo_propiedad, setIdTipoPropiedad] = useState(0)
    const [desde, setDesde] = useState('')
    const [hasta, setHasta] = useState('')

    function navegacion(direccion) {
        navigate(direccion);
    }
    const initModalLogin = () => {
        return invokeModal(!isShowLogin)
    }

    const onClean = (e) => {
        e.preventDefault();
        setIdciudad(0)
        setIdTipoPropiedad(0)
        setDesde('')
        setHasta('')
        clearDato();
    }

    const onchangeTipoPropiedad = (value) => {
        clearDato();
        setIdTipoPropiedad(value)
    }

    const onchangeCiudad = (value) => {
        clearDato();
        setIdciudad(value)
    }
    const onchangeDesde = (value) => {
        clearDato();
        setDesde(value)
    }
    const onchangeHasta = (value) => {
        clearDato();
        setHasta(value)
    }


    const onSearch = (e) => {
        e.preventDefault();
        //console.log(idtipo_propiedad)
        //console.log(idciudad)
        //console.log(dato)
        navegacion('/market')

        if (idtipo_propiedad !== 0 && idtipo_propiedad) {
            setDato(dato.filter((dato) => dato.idtipo_propiedad.toString() === idtipo_propiedad));
            console.log('Entra en idtipo_propiedad')
        };
        if (idciudad !== 0 && idciudad) setDato(dato.filter((dato) => dato?.idciudad?.toString() === idciudad));
        if (desde !== 0 && desde) setDato(dato.filter((dato) => parseFloat(dato.precio) >= desde));
        if (hasta !== 0 && hasta) setDato(dato.filter((dato) => parseFloat(dato.precio) <= hasta));
    }

    const initModalRegistro = () => {
        invokeModal(false)
        return invokeModalSignUp(!isShowSignUp)
    }

    var sectionStyle = {
        minWidth: "100%",
        minHeight: `17em`,
        backgroundSize: `cover`,
        backgroundColor: `rgb(30,30,30)`,
        backgroundBlendMode: `soft-light`,
        backgroundImage: `url(${require('../componentes/img/bienesraices.jpg')})`
    };

    const identidad = () => {
        if (usuario) {
            return <a style={{ textDecoration: `none` }} href="#usuario" onClick={() => navegacion('/usuario')} >
                {/*<i style={{ color: `white` }} className="fa-solid fa-user"></i>*/}
                Usuario
            </a>
        } else {
            return <a style={{ textDecoration: `none` }} href="!#" onClick={initModalLogin} >{t('navbar.identify')}</a>
        }
    }

    const miCatalogo = () => {
        //console.log(usuario)
        if (usuario?.body?.nivel === 2) {
            return <a href="#!" style={{ textDecoration: `none` }} onClick={() => navegacion('/micatalogo')} >Mi catalogo</a>
        } else {
            return null
        }
    }

    const modalRegistro = () => {
        return (
            <Modal size="xl" show={isShowSignUp} onHide={invokeModalSignUp}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        ...
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Registro categorias={categorias} ciudades={ciudades} />
                </Modal.Body>
            </Modal>
        )
    }


    const modalLogin = () => {
        return (
            <Modal size="xl" show={isShowLogin} onHide={initModalLogin}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        ...
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <LoginForm />
                </Modal.Body>
                <Modal.Footer className="text-center">
                    <div className="text-center">
                        <p>{t('identify.no_member')} <a href="#!" onClick={initModalRegistro} >{t('identify.signup')}</a></p>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    const buscador = () => {
        return (
            <ul className="mb-xxl-0 p-5">
                <form method="get">
                    <div className="input-group mb-2">
                        {
                            tipoPropiedad ?
                                <select value={idtipo_propiedad} id='tipo_prop_head' className="form-select" defaultChecked={0} onChange={(e) => onchangeTipoPropiedad(e.target.value)} >
                                    <option value={0} >{`Tipo`}</option>
                                    {tipoPropiedad.map((tp, index) => (
                                        <option key={index} value={tp.idtipo_propiedad}>
                                            {tp.descripcion}
                                        </option>
                                    ))}
                                </select> : null
                        }
                        {
                            ciudades ?
                                <select value={idciudad} id='ciudad_head' className="form-select" defaultChecked={0} onChange={(e) => onchangeCiudad(e.target.value)} >
                                    <option value={0} >{`Ciudad`}</option>
                                    {ciudades.map((ciudad, index) => (
                                        <option key={index} value={ciudad.idciudad}>
                                            {ciudad.descripcion}
                                        </option>
                                    ))}
                                </select> : null
                        }
                        <input type="number" placeholder="precios desde" id="desde" className="form-control" value={desde} onChange={(e) => onchangeDesde(e.target.value)} autoComplete="off" />
                        <input type="number" placeholder="precios hasta" id="hasta" className="form-control" value={hasta} onChange={(e) => onchangeHasta(e.target.value)} autoComplete="off" />
                        <button type="submit" className="input-group-text bg-success text-light" onClick={(e) => onSearch(e)}>
                            <i className="fa fa-fw fa-search text-white"></i>
                        </button>
                        <button type="submit" className="input-group-text bg-primary text-light" onClick={(e) => onClean(e)}>
                            <i className="fa fa-sharp fa-light fa-magnifying-glass-minus text-light"></i>
                        </button>
                    </div>
                </form>
            </ul>
        )
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-dark shadow"
                style={sectionStyle}
            >
                <div className="container d-flex justify-content-between align-items-center">
                    <div >
                        <img style={{ width: `8rem` }} onClick={() => navegacion('/home')} src={require('../componentes/img/logo2.jpeg')} alt="Logo" />
                    </div>
                    <button className="m-5 navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                        <div className="flex-fill">
                            <ul className="p-0 nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                <li className="nav-item" >
                                    <NavLink style={{ textDecoration: `none` }} to={'/home'} >{t('navbar.home')}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ textDecoration: `none` }} to={'/about'}>{t('navbar.about')}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ textDecoration: `none` }} to={'/market'}>{t('navbar.catalogue')}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink style={{ textDecoration: `none` }} to={'/contact'}>{t('navbar.contact')}</NavLink>
                                </li>
                                <li className="nav-item">
                                    {miCatalogo()}
                                </li>
                                <li className="nav-item">
                                    {/*<NavLink style={{ textDecoration: `none` }} to={'/identify'}>{t('navbar.identify')}</NavLink>*/}
                                    {identidad()}
                                </li>
                            </ul>
                            {location.pathname === '/market' ? buscador() : null}
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
            {modalLogin()}
            {modalRegistro()}
            <Footer tipoPropiedad={tipoPropiedad} />
        </div>
    );
}

export default withNamespaces()(Header);
