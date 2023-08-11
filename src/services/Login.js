import axios from 'axios';

const baseURL = 'http://186.158.152.12:4002/alianza/api/usuario/login/';

export const Login = async (credentials) => {
    const { data } = await axios.post(baseURL, credentials);
    window.localStorage.setItem('logAlianzaUser', JSON.stringify(data));
    return data;
}

export const Logout = () => {
    window.localStorage.removeItem('logAlianzaUser');
    // eslint-disable-next-line
    window.location.href = window.location.href;
}
