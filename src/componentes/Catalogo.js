import { useNavigate } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import { separadorMiles } from "./utils/Separador"; 
import { Carousel } from "react-bootstrap";

const Catalogo = ({ dato, usuario, t }) => {
    
    const navigate = useNavigate();
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

    const onchangeDetalle = (e, idpropiedad) => {
        e.preventDefault();
        navegacion(`/detalle/${idpropiedad}`)
    }

    const catalogo = () => (
        <div className="card-group" >
            {dato ?
                dato.map((row, index) => {
                    return <div
                        key={index}
                        className="card m-1 shadow bg-white rounded"
                        style={{ minWidth: `400px`, maxWidth: `600px` }}
                    >
                        <Carousel fade interval={90000}>
                            {
                                row?.Propiedad_has_fotos.length !== 0 ?
                                    row?.Propiedad_has_fotos?.map((phf, index) => (
                                        phf.fotos_propiedads?.map((foto) => (
                                            imagenes(foto?.name, index)
                                        ))
                                    )) :
                                    imagenes(null, 1)
                            }
                        </Carousel>

                        <div className="card-body" style={{ cursor: `pointer` }} onClick={(e) => onchangeDetalle(e, row?.idpropiedad)}>
                            <h5 className="card-titulo">{row.titulo}</h5>
                            <p className="card-text">{row.descripcion}</p>
                            <p className="card-text"><small className="text-muted">{separadorMiles(parseInt(row.precio))}</small></p>
                        </div>
                    </div>
                })
                : null}
        </div>
    )

    const imagenes = (name, index) => {
        if (name === 'undefine' || name === null || !name) {
            //si es que el name no existe
            return <div style={{ height: `40vh`, display: `flex`, justifyContent: `center` }} className="carousel-item active" key={index} >
                <img className="img-fluid" key={index} style={{ height: `100%` }} src={require('../componentes/img/sinfoto.jpg')} alt=".." />
            </div>
        } else {
            return <Carousel.Item >
                <div style={{ height: `40vh`, display: `flex`, justifyContent: `center` }} key={index} >
                    <img key={index} src={'http://186.158.152.141:4002/' + name} alt=".." />
                </div>
            </Carousel.Item>
        }
    }

    return (
        <div>
            <section className="py-5" >
                <div className="container">
                    <div className="col-md-8 text-success">
                        <h1>Catálogo</h1>
                    </div>
                    {nuevoRegistro()}
                    {catalogo()}
                </div>
            </section>
        </div>
    )
}

export default withNamespaces()(Catalogo);