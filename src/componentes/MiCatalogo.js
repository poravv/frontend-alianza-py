import { useNavigate } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import { updatePropiedad } from "../services/Propiedad";
import { Carousel } from "react-bootstrap";
import { getLstMisPropiedades } from "./utils/Init";

const MiCatalogo = ({ token, idvendedor, usuario, t }) => {

    const [miCatalogo, setMiCatalogo] = useState([]);
    const navigate = useNavigate();
    const [idborrar, setIdborrar] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        getLstMisPropiedades({ setMiCatalogo, idvendedor: idvendedor, token: token });
        // eslint-disable-next-line
    }, []);




    const handleClose = () => {
        setIdborrar(null)
        setShow(false)
    };

    const handleShow = (idpropiedad) => {
        setIdborrar(idpropiedad)
        setShow(true)
    };

    function navegacion(direccion) {
        navigate(direccion);
    }

    function confirmDelete() {
        return <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Alerta</Modal.Title>
            </Modal.Header>
            <Modal.Body>Esta seguro que desea eliminar el registro?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={() => handleDelete()}>
                    Si
                </Button>
            </Modal.Footer>
        </Modal>
    }

    const handleDelete = async () => {
        //console.log('Borrar: ', idborrar);
        await updatePropiedad({ token, json: { estado: 'IN' }, param: idborrar }).then((res) => {
            //console.log('Res: ', res)
            getLstMisPropiedades({ setMiCatalogo, idvendedor: idvendedor, token: token });
            handleClose();
        });

    }

    const nuevoRegistro = () => {
        if (usuario?.nivel === 2||usuario?.nivel === 1) {
            return <button type="submit" className="input-group-text bg-primary text-light" onClick={() => navegacion('/nuevo')} >
                Nuevo registro
            </button>
        }
    }


    const onDestacar = async (idpropiedad,destacado) => {
        const valor = destacado==='Si' ? 'No' : 'Si';
        console.log(destacado, 'Entra en destacar ', idpropiedad,valor,)
        
        await updatePropiedad({ token, json: { destacado: valor }, param: idpropiedad }).then((res) => {
            getLstMisPropiedades({ setMiCatalogo, idvendedor: idvendedor, token: token });
        });
    }

    const catalogo = () => (
        <div className="card-group ">
            {confirmDelete()}
            {miCatalogo ?
                miCatalogo.map((row, index) => {
                    return <div
                        key={index}
                        className="card m-1 bg-white shadow rounded"
                        style={{ minWidth: `400px`, maxWidth: `600px` }}>
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
                        <div className="card-body">
                            <h5 className="card-titulo">{row.titulo}</h5>
                            <p className="card-text">{row.descripcion}</p>
                            <p className="card-text">{
                            row.estado==='AC'? 'Activo': row.estado==='VE'?'Vendido': 'Inactivo'
                            }</p>
                            <p className="card-text"><small className="text-muted">{row.precio}</small></p>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="input-group-text bg-primary text-light" onClick={() => navegacion(`/editar/${row.documento}/${row.idpropiedad}`)} >Editar</button>
                                </div>
                                <div className="col">
                                    <button type="submit" className="input-group-text bg-success text-light" onClick={() => onDestacar(row.idpropiedad,row.destacado)} >{row.destacado==='Si' ? 'Des-destacar' : 'Destacar'}</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="input-group-text bg-warning text-light" onClick={(e) => handleShow(row.idpropiedad)} >Borrar</button>
                                </div>
                            </div>
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
                    <img key={index} src={'http://186.158.152.12:4002/' + name} alt=".." />
                </div>
            </Carousel.Item>

        }
    }

    return (
        <div>
            <section className="bg-white py-5">
                <div className="container">
                    <div className="col-md-8 text-success">
                        <h1>Mi Catalogo</h1>
                    </div>
                    {nuevoRegistro()}
                    {catalogo()}
                </div>
            </section>
        </div>
    )
}

export default withNamespaces()(MiCatalogo);