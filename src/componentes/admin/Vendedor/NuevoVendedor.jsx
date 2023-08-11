

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, Row, Divider, Col, message } from 'antd';
import Buscador from '../Utils/Buscador/Buscador';
import { getLikePersona } from '../../../services/Persona';
import { createVendedor, getVendedor } from '../../../services/Vendedor';
import { Titulos } from '../Utils/Titulos';

function NuevoVendedor({ token }) {
    const [form] = Form.useForm();
    const [vendedores, setVendedores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [idusuario, setIdusuario] = useState('');
    const [personas, setPersonas] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState(null);
    const [contDocumento, setContDocumento] = useState(false);
    const [btn, setBtn] = useState(false);
    const [sdocumento, setSDocumento] = useState(null);
    const [fb, setFb] = useState('');
    const [inst, setInsta] = useState('');
    const [telefono, setTelefono] = useState('');


    useEffect(() => {
        getLstVendedor();
        // eslint-disable-next-line
    }, []);

    const getLstVendedor = async () => {
        const res = await getVendedor({ token: token });
        setVendedores(res.body);
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
        setIdusuario(null);
        form.setFieldValue('buscadoc', '');
        form.setFieldValue('nombre', '');
        form.setFieldValue('apellido', '');
        form.setFieldValue('documento', '');
    }

    const navigate = useNavigate();

    const create = async (e) => {
        let savevendedor = {
            idusuario: idusuario,
            fb:fb,
            inst:inst,
            telefono:telefono
        };
        let validExists=false;
        vendedores.map((row) => {
            if(row.idusuario===idusuario){
                validExists=true;
            }
            return true;
        })

        if(validExists){ 
            message.warning('Vendedor ya existe');
            return;
        }

        await createVendedor({
            token: token,
            json: savevendedor
        }).then((res) => {
            if(res?.mensaje==='error'){
                message.warning(res?.detmensaje);
                return;
            }else{
                message.success(res?.detmensaje);
                navigate('/vendedor')
            }
        });
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/vendedor');
    }

    const onChangePersona = (value) => {
        console.log(value)
        personas.find((element) => {
            if (element.idusuario === value) {
                setNombre(element.nombre);
                setApellido(element.apellido);
                setDocumento(element.documento);
                setContDocumento(true);
                setIdusuario(element.idusuario);
                form.setFieldValue('nombre', element.nombre);
                form.setFieldValue('apellido', element.apellido);
                form.setFieldValue('documento', element.documento);
                form.setFieldValue('idusuario', element.idusuario);
                form.setFieldValue('registro', element.registro);
                form.setFieldValue('tipod', element.tipo_doc);
                
                return true;
            } else {
                return false;
            }
        });
    };

    const onSearch = (value) => {
        console.log('search:', value);
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
                                    <Input hidden disabled id='busdoc1' value={idusuario} />
                                    <Buscador label={'documento'} title={'Documento'} selected={idusuario} value={'idusuario'} data={personas} onChange={onChangePersona} onSearch={onSearch} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={btnClear} style={{ backgroundColor: `green` }} >
                                    Limpiar
                                </Button>
                            </Row>
                        </Col>
                    }
                </Row>
                <Divider orientation="left" type="horizontal" style={{ color: `#7CC1FE` }} />
                {idusuario !== 0 && idusuario!==null?
                    <Form.Item
                        label='Idusuario'
                        id='idusuario' name="idusuario" >
                        <Input disabled value={idusuario} onChange={(e) => setIdusuario(e.target.value)} />
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

                <Form.Item label='Facebook' name="fb" >
                    <Input  placeholder='Facebook' value={fb} onChange={(e) => setFb(e.target.value)} />
                </Form.Item>

                <Form.Item label='Instagram' name="inst" >
                    <Input placeholder='Instagram' value={inst} onChange={(e) => setInsta(e.target.value)} />
                </Form.Item>

                <Form.Item label='Telefono' name="telefono" >
                    <Input placeholder='Telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
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

export default NuevoVendedor;

