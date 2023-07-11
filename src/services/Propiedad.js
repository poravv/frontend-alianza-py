import axios from 'axios';

const baseURL = 'http://186.158.152.141:4002/alianza/api/propiedad';

export const getPropiedad = async ({token,param}) => {
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

export const getVwPropiedad = async ({token,idusuario}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/getview/${idusuario}`, config)
    //console.log(data)
    return data;
};


export const deletePropiedad  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updatePropiedad  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createPropiedad  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    const { data } =  await axios.post(baseURL + "/post/", json, config);
    return data;
};