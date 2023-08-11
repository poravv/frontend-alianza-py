

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, Row, Divider, Radio, Col, message } from 'antd';
import Buscador from '../Utils/Buscador/Buscador';
import { getLikePersona } from '../../../services/Persona';
import { createUniqueUsuario, getUsuario } from '../../../services/Usuario';
import { Titulos } from '../Utils/Titulos';

function NuevoUsuario({ token }) {
    const [form] = Form.useForm();
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [idpersona, setIdpersona] = useState('');
    const [personas, setPersonas] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState(null);
    const [contDocumento, setContDocumento] = useState(false);
    const [btn, setBtn] = useState(false);
    const [sdocumento, setSDocumento] = useState(null);
    const [correo, setCorreo] = useState('');
    const [nivel, setNivel] = useState('');


    useEffect(() => {
        getLstUsuario();
        // eslint-disable-next-line
    }, []);

    const getLstUsuario = async () => {
        const res = await getUsuario({ token: token });
        setUsuarios(res.body);
    }

    const getLstPersonas = async (valor) => {
        const res = await getLikePersona({ token: token, param: valor });
        setPersonas(res.body);
    }


    const btnBuscador = async (e) => {
        e.preventDefault();
        //console.log(sdocumento)
        if (sdocumento === null) return;
        setBtn(true)
        await getLstPersonas(sdocumento);
    }

    const btnClear = async (e) => {
        e.preventDefault();
        setBtn(false)
        setPersonas([])
        //console.log('Elemento:', element);
        setNombre('');
        setApellido('');
        setSDocumento(null)
        setDocumento(null);
        setContDocumento(false);
        setIdpersona(null);
        form.setFieldValue('buscadoc', '');
        form.setFieldValue('nombre', '');
        form.setFieldValue('apellido', '');
        form.setFieldValue('documento', '');
    }

    const navigate = useNavigate();

    const create = async (e) => {
        let saveusuario = {
            idpersona: idpersona,
            usuario: correo,
            password: documento,
            correo: correo,
            nivel: nivel,
            estado: 'AC'
        };
        let validExists = false;
        usuarios.map((row) => {
            // eslint-disable-next-line
            if (row.idpersona === idpersona && row.nivel == nivel) {
                validExists = true;
            }
            return true;
        })

        if (validExists) {
            message.warning('Ya existe usuario');
            return;
        }

        await createUniqueUsuario({
            token: token,
            json: saveusuario
        }).then((res) => {
            console.log(res)
            if (res?.mensaje === 'error') {
                message.warning(res?.detmensaje);
                return;
            } else {
                message.success(res?.detmensaje);
                navigate('/usuarios')
            }
        });
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/usuarios');
    }

    const onChangePersona = (value) => {
        //console.log(value)
        personas.find((element) => {
            if (element.idpersona === value) {
                setNombre(element.nombre);
                setApellido(element.apellido);
                setDocumento(element.documento);
                setContDocumento(true);
                setIdpersona(element.idpersona);
                form.setFieldValue('nombre', element.nombre);
                form.setFieldValue('apellido', element.apellido);
                form.setFieldValue('documento', element.documento);
                form.setFieldValue('idpersona', element.idpersona);
                return true;
            } else {
                return false;
            }
        });
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };


    const onchangenivel = (e) => {
        //console.log('radio checked', e.target.value);
        setNivel(e.target.value);
    };

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO VENDEDOR`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                style={{ textAlign: `center`, marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                //onFinishFailed={create}
                autoComplete="off"
                form={form} >
                <Divider orientation="left" type="horizontal" style={{ color: `#7CC1FE` }}>Busqueda por documento</Divider>
                <Row style={{ marginBottom: `20px` }}>
                    {btn === false ?
                        <Col style={{ width: `100%` }}>
                            <Row>
                                <Form.Item id='buscadoc' name="buscadoc" style={{ width: `100%` }}>
                                    <Input placeholder='Documento' value={sdocumento} onChange={(e) => setSDocumento(e.target.value)} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={btnBuscador}  >
                                    Buscar
                                </Button>
                            </Row>
                        </Col>
                        : <Col style={{ width: `100%` }}>
                            <Row>
                                <Form.Item id='busdoc1' name="busdoc1" style={{ width: `100%` }}>
                                    <Input hidden disabled id='busdoc1' value={idpersona} />
                                    <Buscador label={'documento'} title={'Documento'} selected={idpersona} value={'idpersona'} data={personas} onChange={onChangePersona} onSearch={onSearch} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={btnClear} style={{ backgroundColor: `green` }} >
                                    Limpiar
                                </Button>
                            </Row>
                        </Col>
                    }
                </Row>
                <Divider orientation="left" type="horizontal" style={{ color: `#7CC1FE` }} />
                {idpersona !== 0 && idpersona !== null ?
                    <Form.Item
                        label='Idusuario'
                        id='idpersona' name="idpersona" >
                        <Input disabled value={idpersona} onChange={(e) => setIdpersona(e.target.value)} />
                    </Form.Item>
                    : null}
                <Form.Item label={'Documento de identidad'} id='documento' name="documento" rules={[{ required: true, message: 'Cargue numero de documento', },]}>
                    <Input placeholder='Documento de identidad' disabled={contDocumento} value={documento} onChange={(e) => setDocumento(e.target.value)} />
                </Form.Item>

                <Form.Item label='Nombre' id='nombre' name="nombre" rules={[{ required: true, message: 'Cargue nombre', },]}>
                    <Input disabled placeholder='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Item>

                <Form.Item label='Apellido' name="apellido" rules={[{ required: true, message: 'Cargue apellido', },]}>
                    <Input disabled placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </Form.Item>

                <Form.Item label='Correo' name="correo" rules={[{ required: true, message: 'Cargue correo', },]}>
                    <Input placeholder='Correo' value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </Form.Item>
                <Form.Item label='Nivel' id='nivel' name="nivel" rules={[{ required: true, message: 'Seleccione nivel', },]}>
                    <Radio.Group onChange={onchangenivel} value={nivel} id='nivel' name='nivel'>
                        <Radio value={1}>Administrador</Radio>
                        <Radio value={2}>Vendedor</Radio>
                        <Radio value={3}>Publico</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    style={{ margin: `20px` }}>
                    <Button type="primary" htmlType="submit" style={{ margin: `20px` }} >
                        Guardar
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={btnCancelar} style={{ margin: `20px` }} >
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default NuevoUsuario;

