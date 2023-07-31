import { withNamespaces } from 'react-i18next';
import { useState } from 'react'
import { createCliente, updateCliente } from '../../services/Cliente';

import Alert from 'react-bootstrap/Alert';

const Cliente = ({ t, token, persona, nextTab, prevTab, clienteIn,setCliente }) => {
    //console.log(clienteIn)
    const idpersona = persona?.idpersona ?? 0;
    const idcliente = clienteIn?.idcliente ?? 0;
    const [categoria, setCategoria] = useState(clienteIn?.categoria ?? '');
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState(false);

    const save = async (e) => {
        e.preventDefault();
        if (categoria === '' || categoria === null || categoria === '0') {
            setMensaje('Seleccione una categoria');
            setShow(true)
            return;
        };
        let json = null;
        console.log(idcliente)

        if (idcliente === 0) {
            json = {
                idpersona: idpersona,
                categoria: categoria,
                estado: 'AC'
            }
            console.log('Entra a crear')
            try {
                await createCliente({ json, token: token }).then((resultado) => {
                    console.log('res: ', resultado);
                    if (resultado?.mensaje === 'error') {
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    setCliente(resultado?.body)
                    //El evento que vuelve a la pagina de Nuevo
                    nextTab(e, 'propiedad');
                });
            } catch (error) {
                //console.log('error', error?.response?.data)
                if (error?.mensaje === 'error') {
                    setMensaje(error?.detmensaje)
                    setShow(true)
                    return;
                }
            }
        } else {
            json = {
                //idcliente: idcliente,
                idpersona: idpersona,
                categoria: categoria,
                estado: 'AC'
            }
            try {
                await updateCliente({ json, token: token,idcliente:idcliente }).then((resultado) => {
                    console.log('res: ', resultado);
                    if (resultado?.mensaje === 'error') {
                        setMensaje(resultado?.detmensaje)
                        setShow(true)
                        return;
                    }
                    //setCliente(resultado?.body)
                    //El evento que vuelve a la pagina de Nuevo
                    nextTab(e, 'propiedad');
                });
            } catch (error) {
                //console.log('error', error?.response?.data)
                if (error?.mensaje === 'error') {
                    setMensaje(error?.detmensaje)
                    setShow(true)
                    return;
                }
            }
        }
        if (json === null) {
            setMensaje('No se cargaron los datos de forma correcta')
            setShow(true)
            return;
        }

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


    return (
        <>
            <form method="get"
                id='formCliente'
                className='mt-4'
            >
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <select id='categoria' className="form-select" defaultValue={categoria ?? '0'} onChange={(e) => setCategoria(e.target.value)}   >
                                <option key={0} value={'0'} >{t('common.selected')}</option>
                                <option key={1} value={'F'}>Fisico</option>
                                <option key={2} value={'J'}>Juridico</option>
                            </select>
                            <label className="form-label" htmlFor="categoria">Tipo Cliente</label>
                        </div>
                    </div>
                </div>
                <div className='row mt-5'>
                    {mensajeAlerta()}
                </div>
                <div className="mb-4 my-4">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => prevTab(e, 'persona')}>
                        Atras
                    </button>
                    <button type="button" className="btn btn-primary btn-block ms-2 mb-4" onClick={(e) => save(e)}>
                        Siguiente
                    </button>
                </div>
            </form>
        </>
    );
}

export default withNamespaces()(Cliente)