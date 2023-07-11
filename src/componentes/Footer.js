import i18n from '../componentes/config/i18next-config';
import { withNamespaces } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const Footer = ({ tipoPropiedad, t }) => {
    const navigate = useNavigate();

    function navegacion(direccion) {
        navigate(direccion);
    }
    //Traduccion
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    return (
        <div>
            <footer className="bg-dark" id="tempaltemo_footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 pt-5">
                            <h2 onClick={() => navegacion('/home')} className="h2 text-success border-bottom pb-3 border-light logo">Alianza Inmobiliaria</h2>
                            <ul className="list-unstyled text-light footer-link-list">
                                <li>
                                    <i className="fa fa-map-marker-alt fa-fw"></i>
                                    Capiatá
                                </li>
                                <li>
                                    <i className="fa-brands fa-whatsapp fa-fw"></i>
                                    <a className="text-decoration-none" href="https://wa.me/+595992756462">+595 992 756462</a>
                                </li>
                                <li>
                                    <i className="fa fa-phone fa-fw"></i>
                                    <a className="text-decoration-none" href="tel:+595992756462">+595 992 756462</a>
                                </li>
                                <li>
                                    <i className="fa fa-envelope fa-fw"></i>
                                    <a className="text-decoration-none" href="mailto:info@company.com">info@company.com</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-4 pt-5">
                            <h2 className="h2 text-light border-bottom pb-3 border-light">{t(`footer.category`)}</h2>
                            <ul className="list-unstyled text-light footer-link-list">
                                {tipoPropiedad.map((categoria, index) => (
                                    <li key={index} >
                                        <a className="text-decoration-none" href='#!' >{categoria.descripcion}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-4 pt-5">
                            <h2 className="h2 text-light border-bottom pb-3 border-light">{t(`common.languaje`)}</h2>
                            <ul className="list-unstyled text-light footer-link-list">
                                <li id='1'><a className="text-decoration-none" href="#!" onClick={() => changeLanguage('es')} >español</a></li>
                                <li id='2'><a className="text-decoration-none" href="#!" onClick={() => changeLanguage('en')} >english</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row text-light mb-4">
                        <div className="col-12 mb-3">
                            <div className="w-100 my-3 border-top border-light"></div>
                        </div>
                        <div className="col-auto me-auto">
                            <ul className="list-inline text-left footer-icons">
                                <li className="list-inline-item border border-light rounded-circle text-center">
                                    <a rel="noreferrer" target="_blank" className="text-light text-decoration-none" href="http://facebook.com/"><i className="fab fa-facebook-f fa-lg fa-fw"></i></a>
                                </li>
                                <li className="list-inline-item border border-light rounded-circle text-center">
                                    <a rel="noreferrer" target="_blank" className="text-light text-decoration-none" href="https://www.instagram.com/"><i className="fab fa-instagram fa-lg fa-fw"></i></a>
                                </li>
                                <li className="list-inline-item border border-light rounded-circle text-center">
                                    <a rel="noreferrer" target="_blank" className="text-light text-decoration-none" href="https://twitter.com/"><i className="fab fa-twitter fa-lg fa-fw"></i></a>
                                </li>
                                <li className="list-inline-item border border-light rounded-circle text-center">
                                    <a rel="noreferrer" target="_blank" className="text-light text-decoration-none" href="https://www.linkedin.com/"><i className="fab fa-linkedin fa-lg fa-fw"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-auto">
                            <div className="input-group mb-2">
                            <p className="text-left text-light">
                                    Copyright &copy; 2023 Andres Vera
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 bg-black py-3">
                    <div className="container">
                        <div className="row pt-2">
                            <div className="col-12">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default withNamespaces()(Footer);