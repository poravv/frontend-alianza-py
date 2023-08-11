import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './componentes/Menu'
import About from "./componentes/About";
import Contact from "./componentes/Contact";
import Header from "./componentes/Header";
import Error from "./componentes/Error";
import { useState, useEffect } from 'react'
import Usuario from "./componentes/Usuario";
import ListBarrios from "./componentes/admin/Barrios/ListBarrios"
import ListCiudad from "./componentes/admin/Ciudad/ListCiudad"
import {
  getLstTipoPropiedad,
  getLstCiudades,
  getLstPropiedades,
  getDestacados
}
  from "./componentes/utils/Init";
import Market from "./componentes/Catalogo";
import Nuevo from "./componentes/Nuevo/Nuevo";
import MiCatalogo from "./componentes/MiCatalogo";
import Editar from "./componentes/Nuevo/Editar";
import DetallePropiedad from "./componentes/DetallePropiedad";
import NewBarrio from "./componentes/admin/Barrios/NewBarrios";
import NewCiudad from "./componentes/admin/Ciudad/NewCiudad";
import ListTipoPropiedad from "./componentes/admin/TipoPropiedad/ListTipoPropiedad";
import NewTipoPropiedad from "./componentes/admin/TipoPropiedad/NewTipoPropiedad";
import ListaVendedor from "./componentes/admin/Vendedor/ListaVendedor";
import NuevoVendedor from "./componentes/admin/Vendedor/NuevoVendedor";
import ListaUsuario from "./componentes/admin/Usuario/ListaUsuario";
import NuevoUsuario from "./componentes/admin/Usuario/NuevoUsuario";
import ListaPersona from "./componentes/admin/Persona/ListaPersona";
import NuevoPersona from "./componentes/admin/Persona/NuevaPersona";
import ListaPropiedades from "./componentes/admin/Propiedades/ListaPropiedades";

function App() {
  const loggedUser = window.localStorage.getItem('logAlianzaUser');
  const userJson = JSON.parse(loggedUser);
  const [tipoPropiedad, setTipoPropiedad] = useState([]);
  const [dato, setDato] = useState([]);
  const [datoOrigen, setDatoOrigen] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [destacados, setDestacados] = useState([]);
  // eslint-disable-next-line
  const [userApp, setUserApp] = useState(userJson ?? null);
  const clearDato = () => { setDato(datoOrigen) }

  useEffect(() => {
    getLstTipoPropiedad({ setTipoPropiedad });
    getLstCiudades({ setCiudades });
    getLstPropiedades({setDato,setDatoOrigen})
    getDestacados({setDestacados,token:userApp?.token})
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header clearDato={clearDato} dato={dato} setDato={setDato} ciudades={ciudades} tipoPropiedad={tipoPropiedad} usuario={userApp} />}>
          <Route path="/" element={<Menu propiedad={dato} destacados={destacados}/>} />
          <Route path="/home" element={<Menu propiedad={dato} destacados={destacados}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/market" element={<Market dato={dato} />} />
          <Route path="/detalle/:idpropiedad" element={<DetallePropiedad propiedades={dato}/>} />
          <Route path="/micatalogo" element={<MiCatalogo idvendedor={userApp?.body?.vendedor.idvendedor} usuario={userApp?.body} token={userApp?.token} />} />
          <Route path="/editar/:documento/:idpropiedad" element={<Editar token={userApp?.token} ciudades={ciudades} usuario={userApp?.body} tipoPropiedad={tipoPropiedad} />} />
          <Route path="/nuevo" element={<Nuevo token={userApp?.token} ciudades={ciudades} usuario={userApp?.body} tipoPropiedad={tipoPropiedad} />} />
          <Route path="/usuario" element={<Usuario token={userApp?.token} usuario={userApp?.body} ciudades={ciudades} />} />
          <Route path="/barrio" element={<ListBarrios token={userApp?.token} />} />
          <Route path="/crearbarrio" element={<NewBarrio token={userApp?.token} />} />
          <Route path="/ciudad" element={<ListCiudad token={userApp?.token} />} />
          <Route path="/crearciudad" element={<NewCiudad token={userApp?.token} />} />
          <Route path="/tipoPropiedad" element={<ListTipoPropiedad token={userApp?.token} />} />
          <Route path="/creartipoPropiedad" element={<NewTipoPropiedad token={userApp?.token} />} />\
          <Route path="/vendedor" element={<ListaVendedor token={userApp?.token} />} />
          <Route path="/crearvendedor" element={<NuevoVendedor token={userApp?.token} />} />
          <Route path="/usuarios" element={<ListaUsuario token={userApp?.token} />} />
          <Route path="/crearusuario" element={<NuevoUsuario token={userApp?.token} />} />
          <Route path="/personas" element={<ListaPersona token={userApp?.token} />} />
          <Route path="/crearpersona" element={<NuevoPersona token={userApp?.token} />} />
          
          <Route path="/listapropiedades" element={<ListaPropiedades token={userApp?.token} />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
