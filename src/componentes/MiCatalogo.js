import { useNavigate } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import { getVwPropiedad } from "../services/Propiedad";
import { useEffect, useState } from "react";

const MiCatalogo = ({ token, usuario, t }) => {
    //console.log(usuario.idusuario)
    const navigate = useNavigate();
    const [dato, setDato] = useState([]);
    const idusuario = usuario?.idusuario;


    useEffect(() => {
        getLstPropiedades();
        // eslint-disable-next-line
    }, []);


    const getLstPropiedades = async () => {
        try {
            const res = await getVwPropiedad({ token: token, idusuario });
            setDato(res.body);
            //console.log(res.body);
        } catch (e) {
            console.log('error: ',e);
        }
    }


    function navegacion(direccion) {
        navigate(direccion);
    }

    const nuevoRegistro = () => {
        //console.log(usuario?.nivel)
        if (usuario?.nivel === 2) {
            return <button type="submit" className="input-group-text bg-primary text-light" onClick={() => navegacion('/nuevo')} >
                Nuevo registro
            </button>
        }
    }


    const catalogo = () => (
        <div className="card-group">
            {dato ?
                dato.map((row, index) => (
                    <div key={index} className="card m-1" style={{ minWidth: `200px`, maxWidth: `500px` }}>
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    row?.Propiedad_has_fotos?.map((phf, index) => (
                                        
                                        phf.Fotos_propiedads.map((foto)=> (
                                            imagenes(foto?.name, index)
                                        ))
                                    ))
                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-titulo">{row.titulo}</h5>
                            <p className="card-text">{row.descripcion}</p>
                            <p className="card-text"><small className="text-muted">{row.precio}</small></p>
                        </div>
                    </div>
                ))
                : null}
        </div>
    )

    const imagenes = (name, index) => {
        //console.log(foto)
        if (index === 0) {
            //console.log('Entra en index 1');
            return <div className="carousel-item active" key={index} >
                <img key={index} className="w-100" src={'http://186.158.152.141:4002/' + name} alt="" />
            </div>
        } else {
            //console.log('Entra en index !1');
            return <div className="carousel-item" key={index} >
                <img key={index} className="w-100" src={'http://186.158.152.141:4002/' + name} alt="" />
            </div>
        } 
    }

    return (
        <div>
            <section className="bg-success py-5">
                <div className="container">
                    <div className="col-md-8 text-white">
                        <h1>Catalogo</h1>
                    </div>
                    {nuevoRegistro()}
                    {catalogo()}
                </div>
            </section>
        </div>
    )
}


export default withNamespaces()(MiCatalogo);