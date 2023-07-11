
import { getTipoPropiedad } from '../../services/TipoPropiedad';
import { getCiudad } from '../../services/Ciudad';

const fotos_propiedad =[
  {idfoto:1,foto: require('../img/banner_img_01.jpg')},
  {idfoto:2,foto: require('../img/banner_img_02.jpg')}
]

const fotos_propiedad2 =[
  {idfoto:1,foto: require('../img/banner_img_03.jpg')},
  {idfoto:2,foto: require('../img/brand_04.png')}
]

const fotos_propieda3 =[
  {idfoto:1,foto: require('../img/brand_01.png')},
  {idfoto:2,foto: require('../img/brand_02.png')}
]
export const listado = [
   {idpropiedad:1,idtipo_propiedad:1,idciudad:1,titulo: 'Titulo1', descripcion: 'Descripcion1', precio: 200000, propiedad_has_fotos:{fotos_propiedad:fotos_propiedad},lat:'-25.346144',lng:'-57.437233'},
   {idpropiedad:2,idtipo_propiedad:2,idciudad:2,titulo: 'Titulo2', descripcion: 'Descripcion2', precio: 1000000, propiedad_has_fotos:{fotos_propiedad:fotos_propiedad2},lat:'-25.346144',lng:'-57.437233'},
   {idpropiedad:3,idtipo_propiedad:3,idciudad:1,titulo: 'Titulo3', descripcion: 'Descripcion3', precio: 800000, propiedad_has_fotos:{fotos_propiedad:fotos_propieda3},lat:'-25.346144',lng:'-57.437233'},
   {idpropiedad:4,idtipo_propiedad:4,idciudad:2,titulo: 'Titulo4', descripcion: 'Descripcion4', precio: 2000000, propiedad_has_fotos:{fotos_propiedad:fotos_propiedad},lat:'-25.346144',lng:'-57.437233'}
]


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

  export const getLstCiudades = async ({setCiudades}) => {
    try {
      const res = await getCiudad({ param: 'get' });
      setCiudades(res.body);
      //console.log(res.body);
    } catch (e) {
      console.log(e);
    }
  }
 