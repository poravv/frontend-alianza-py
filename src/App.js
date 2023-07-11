import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './componentes/Menu'
import About from "./componentes/About";
import Contact from "./componentes/Contact";
import Header from "./componentes/Header";
import Error from "./componentes/Error";
import { useState, useEffect } from 'react'
import Usuario from "./componentes/Usuario";
import {listado,getLstTipoPropiedad,getLstCiudades} from "./componentes/utils/Init";
import Market from "./componentes/Catalogo";
import Nuevo from "./componentes/Nuevo/Nuevo";
import MiCatalogo from "./componentes/MiCatalogo";

function App() {
  const loggedUser = window.localStorage.getItem('logAlianzaUser');
  const userJson = JSON.parse(loggedUser);
  const [tipoPropiedad, setTipoPropiedad] = useState([]);
  const [dato, setDato] = useState(listado);
  const [ciudades, setCiudades] = useState([]);
  // eslint-disable-next-line
  const [userApp, setUserApp] = useState(userJson??null);
  const clearDato = () =>{setDato(listado)}

  useEffect(() => {
    getLstTipoPropiedad({setTipoPropiedad});
    getLstCiudades({setCiudades});
    //init({setUserApp});
    // eslint-disable-next-line
  }, []);

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header clearDato={clearDato} dato={dato} setDato={setDato} ciudades={ciudades} tipoPropiedad={tipoPropiedad} usuario={userApp} />}>
          <Route path="/" element={<Menu />} />
          <Route path="/home" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/market" element={<Market dato={dato} />} />
          <Route path="/micatalogo" element={<MiCatalogo usuario={userApp?.body} token={userApp?.token} />} />
          <Route path="/nuevo" element={<Nuevo token={userApp?.token} ciudades={ciudades} usuario={userApp?.body} tipoPropiedad={tipoPropiedad} />} />
          <Route path="/usuario" element={<Usuario token={userApp?.token} usuario={userApp?.body} ciudades={ciudades} />} />
          <Route path="*" element={<Error />} />
        </Route>
        {/*<Route path="/identify" element={<LoginForm />} />*/}
        {/*<Route path="/registro" element={<Registro ciudades={ciudades} />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
