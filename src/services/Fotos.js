import axios from 'axios';

const baseURL = 'http://186.158.152.141:4002/alianza/api/fotos';
const fp =      'http://186.158.152.141:4002/alianza/api/fp';

export const getFotos = async ({token}) => {
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


export const deleteFotos  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateFotos  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createFotos  = async ({token,json,idpropiedad}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    const { data } = await axios.post(`${fp}/images/${idpropiedad}`, json, config)
    return data;    
};