import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './componentes/Menu'
import About from "./componentes/About";
import Contact from "./componentes/Contact";
import Header from "./componentes/Header";
import Error from "./componentes/Error";
import { useState, useEffect } from 'react'
import Usuario from "./componentes/Usuario";
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
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
