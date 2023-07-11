import { withNamespaces } from 'react-i18next';
import { useEffect, useState } from 'react'
import { createFotos } from '../../services/Fotos';
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { deletePhF, getPhFId } from '../../services/PropiedadHFotos';

const Fotos = ({ t, token, propiedad, nextTab, prevTab, clienteIn }) => {
    //console.log(propiedad)
    const idpropiedad = propiedad?.idpropiedad ?? 0;
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const [file, setFile] = useState(null)
    const [imageList, setImageList] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        Modal.setAppElement('body')
        getListaFotos();
        setUpdated(false)
        // eslint-disable-next-line
    }, [updated])

    const getListaFotos = () => {
        console.log('idpropiedad: ', idpropiedad)
        getPhFId({ token: token, idpropiedad: idpropiedad }).then((fotos) => {
            console.log(fotos)
            if (fotos !== null) {
                setImageList(fotos?.body)
            }
        })
    }

    const modalHandler = (e,image,idfotos) => {
        e.preventDefault()
        setModalOpen(true)
        setCurrentImage(image)
        setCurrentId(idfotos)
    }

    const handleDelete = async (e,idfotos,currentImage) =>{
        e.preventDefault();
        await deletePhF({token:token,idfotos:idfotos,name:currentImage}).then((rs) => {
            console.log(rs)
            setUpdated(true)
            setModalOpen(false)
        })
    }

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const sendHandler = async () => {
        if (!file) {
            alert('you must upload file')
            return
        }

        const formdata = new FormData()
        formdata.append('image', file);



        try {
            await createFotos({ json: formdata, token, idpropiedad: idpropiedad }).then((resultado) => {
                console.log('res: ', resultado);
                if (resultado?.mensaje === 'error') {
                    setMensaje(resultado?.detmensaje)
                    setShow(true)
                    return;
                }
                setUpdated(true)

                //El evento que vuelve a la pagina de Nuevo

            });
        } catch (error) {
            //console.log('error', error?.response?.data)
            if (error?.mensaje === 'error') {
                setMensaje(error?.detmensaje)
                setShow(true)
                return;
            }
        }

        document.getElementById('fileinput').value = null

        setFile(null)
    }


    const mensajeAlerta = () => {
        if (show) {
            return <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{mensaje}</Alert.Heading>
            </Alert>
        } else {
            return null
        }
    }

    const save = (e) => {
        e.preventDefault();
        navegacion('/home')
    }

    function navegacion(direccion) {
        navigate(direccion);
    }

    return (
        <>
            <form method="get"
                id='formFotos'
                className='mt-4'
            >

                <div className="container mt-5">
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-10">
                                <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
                            </div>
                            <div className="col-2">
                                <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
                            </div>
                        </div>
                    </div>
                    <div className='container mt-5' style={{ display: `flex`, flexWrap: `wrap` }}>
                        {imageList ?
                            imageList.map((image) => {
                                //console.log(imageList)
                                return <div className='card m-2'>
                                    <img src={'http://186.158.152.141:4002/' + image?.Fotos_propiedad?.name} alt='...' className='card-img-top' style={{ maxWidth: `250px`, }} />
                                    <div>
                                        <button onClick={(e) => modalHandler(e,image?.Fotos_propiedad?.name, image?.Fotos_propiedad?.idfotos)} className='btn btn-dark'>View</button>
                                    </div>
                                </div>
                            }) : null}
                    </div>
                </div>
                <Modal style={{content:{right:`20%`,left:`20%`}}} isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                    <div className='card m-2'>
                        <img src={'http://186.158.152.141:4002/' + currentImage} alt='...' className='card-img-top' />
                        <div>
                            <button onClick={(e)=> handleDelete(e,currentId,currentImage)} className='btn btn-dark'>Delete</button>
                        </div>
                    </div>
                </Modal>

                <div className='row mt-5'>
                    {mensajeAlerta()}
                </div>
                <div className="mb-4 my-4">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => prevTab(e, 'propiedad')}>
                        Atras
                    </button>
                    <button type="button" className="btn btn-primary btn-block ms-2 mb-4" onClick={(e) => save(e)}>
                        Guardar
                    </button>
                </div>
            </form>
        </>
    );
}

export default withNamespaces()(Fotos)
