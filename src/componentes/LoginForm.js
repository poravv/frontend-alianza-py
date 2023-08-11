import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Login } from '../services/Login'
import { withNamespaces } from 'react-i18next';
import { message } from "antd";

function LoginForm({ t,initModalLogin }) {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    
    function navegacion(direccion) {
        navigate(direccion);
    }

    const handleLoginSubmit = async (e) => {
        
        e.preventDefault();

        await Login({ usuario: usuario, password: password }).then((user) => {
            navegacion('/home');
            initModalLogin();
            message.success(`Bienvenido usuario ${usuario}`).then((e) =>{
            // eslint-disable-next-line
            window.location.href = window.location.href;
            });
        }).catch((error) => {
            setUsuario('');
            setPassword('');
            initModalLogin();
            message.error('Error de usuario o clave');
        });
    };


    return (
        <div>
            <div className='login-wrap p-4 p-md-5 d-flex justify-content-center'>
                <form className="col-6" onSubmit={handleLoginSubmit}>
                <div className='d-flex justify-content-center text-success'>
                    <h2 className="fw-bold mb-5">{t('identify.sign_in')}</h2>
                </div>
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required  />
                        <label className="form-label" htmlFor="form2Example1">{t('identify.email')}</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required  />
                        <label className="form-label" htmlFor="form2Example2">{t('identify.password')}</label>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <a href="#!">{t('identify.forgot_password')}</a>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">{t('identify.sign_in')}</button>
                </form>
            </div>
        </div>
    );
}

export default withNamespaces()(LoginForm);