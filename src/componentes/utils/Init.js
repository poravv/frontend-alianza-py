
import { getTipoPropiedad } from '../../services/TipoPropiedad';
import { getCiudad } from '../../services/Ciudad';
import { getListaDestacados, getVwPropiedad,getVwPropiedadTT } from "../../services/Propiedad";



export const init = async (setUserApp) => {
    const loggedUser = window.localStorage.getItem('logAlianzaUser');
    if (loggedUser) {
      const userJson = JSON.parse(loggedUser);
      //console.log(userJson);
      setUserApp(userJson);
      //console.log(userJson.body.idsucursal)
    }
  }

  export const getLstTipoPropiedad = async ({setTipoPropiedad}) => {
    try {
      const res = await getTipoPropiedad({ param: 'get' });
      setTipoPropiedad(res.body);
      //console.log(res.body);
    } catch (e) {
      console.log(e);
    }
  }

 export const getLstMisPropiedades = async ({setMiCatalogo,token,idvendedor}) => {
    try {
        const res = await getVwPropiedad({ token: token, idvendedor });
        setMiCatalogo(res.body);
    } catch (e) {
        console.log('error: ',e);
    }
}

  export const getLstCiudades = async ({setCiudades}) => {
    try {
      const res = await getCiudad({ param: 'get' });
      setCiudades(res.body);
    } catch (e) {
      console.log(e);
    }
  }

  export const getLstPropiedades = async ({setDato,setDatoOrigen}) => {
    try {
        const res = await getVwPropiedadTT();
        setDato(res.body);
        setDatoOrigen(res.body);
        //console.log(res)
    } catch (e) {
        console.log('error: ',e);
    }
}
 
export const getDestacados = async ({setDestacados,token}) => {
  try {
      const res = await getListaDestacados({token:token});
      setDestacados(res.body);
      //console.log(res.body)
  } catch (e) {
      console.log('error: ',e);
  }
}
