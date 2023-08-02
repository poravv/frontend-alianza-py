import axios from 'axios';

const baseURL = 'http://186.158.152.141:4002/alianza/api/phf';

export const getPhF = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {"Authorization": `Bearer ${token}`,}
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/get`, config)
    return data;
};



export const getPhFId = async ({token,idpropiedad}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/get/${idpropiedad}`, config)
    return data;
};


export const deletePhF  = async ({token,idfotos,name}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${idfotos}/${name}`, config)
    return data;
};

export const updatePhF  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createPhF  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    await axios.post(baseURL + "/post/", json, config)
    return true;
};