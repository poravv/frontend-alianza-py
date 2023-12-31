import axios from 'axios';

const baseURL = 'http://186.158.152.12:4002/alianza/api/usuario';

export const getUsuario = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/get`, config)
    return data;
};

export const getVwUsuario = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/getvw`, config)
    return data;
};

export const getUsuarioId = async ({token,idusuario}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/get/${idusuario}`, config)
    return data;
};

export const deleteUsuario  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateUsuario  = async ({token,idpersona,idusuario,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(`${baseURL}/put/${idpersona}/${idusuario}`,json, config)
    return data;
};

export const updateUniqueUsuario  = async ({token,idusuario,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(`${baseURL}/putusu/${idusuario}`,json, config)
    return data;
};

export const createUsuario  = async ({token,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    const {data} = await axios.post(`${baseURL}/post`, json,config)
    return data;
};

export const createUniqueUsuario  = async ({token,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const {data} = await axios.post(`${baseURL}/postusu`, json,config)
    return data;
};