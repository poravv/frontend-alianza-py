

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { createBarrio } from '../../../services/Barrio';
import { Titulos } from '../Utils/Titulos';
import Buscador from '../Utils/Buscador/Buscador';
import { getCiudad } from '../../../services/Ciudad';

function NewBarrio({ token }) {
    const [form] = Form.useForm();
    const [ciudades, setCiudades] = useState();
    const [descripcion, setDescripcion] = useState(null);
    const [idciudad, setIdCiudad] = useState(null);

    useEffect(() => {
        getListCiudades();
        // eslint-disable-next-line
    }, []);

    const getListCiudades = async () => {
        const res = await getCiudad({ token: token });
        console.log(res.body)
        setCiudades(res.body);
    }

    const navigate = useNavigate();
    const create = async () => {
        //e.preventDefault()
        await createBarrio({
            token: token, 
            json:
            {
                estado: "AC",
                descripcion: descripcion,
                idciudad: idciudad,
                lat:'0',
                long:'0'
            }
        }).then((resultado) => {
            if (resultado?.error) {
                message.error('Error de guardado, verifique la existencia del barrio en estado activo')
                return;
            }
            navigate('/barrio');
        });

    }

    const onChangeCiudad = (value) => {
        //console.log('Entra en onchange ',value)
        setIdCiudad(value)
        form.setFieldValue('ciudad', value);
        //console.log(`selected ${value}`);
    };

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/barrio');
    }

    const onSearch = async (value) => {
        console.log('search:', value);
    };

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO BARRIO`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                style={{ textAlign: `center`, marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                autoComplete="off"
                onFinish={create}
                form={form} 
                >
                <Form.Item
                    label='Barrio'
                    id='barrio' name="barrio" 
                    rules={[{ required: true, message: 'Cargue barrio', },]}>
                    <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label='Ciudad'
                    //id='ciudad'
                    //name="ciudad"
                    rules={[{ required: true, message: 'Seleccione ciudad', },]}
                    >
                    {idciudad ?<Input id='ciudad' name='ciudad' value={idciudad} hidden/>: null}
                <Buscador title={'Ciudad'} label={'descripcion'} selected={idciudad} value={'idciudad'} data={ciudades} onChange={onChangeCiudad} onSearch={onSearch} />
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

export default NewBarrio;

/*

                

*/