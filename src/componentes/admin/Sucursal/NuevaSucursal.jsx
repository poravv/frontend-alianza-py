

import {
    //useEffect, 
    useState
} from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import UploadFile from '../../Utils/Upload';
import { createSucursal } from '../../../services/Sucursal';
import { Titulos } from '../../Utils/Titulos';

function NuevoSucursal({ token }) {
    const [form] = Form.useForm();
    const [sucursal, setSucursal] = useState('');
    const navigate = useNavigate();

    const [previewImage1, setPreviewImage1] = useState();

    //procedimiento para actualizar
    const create = async (e) => {
        
        if (!previewImage1) { message.error('Debe cargar una imagen'); return; }
        
        try {
            await createSucursal({
                token: token, json: {
                    idciudad: 1,
                    estado: "AC",
                    img: previewImage1,
                    sucursal: sucursal,
                    ruc: 'nn',
                    direccion: 'nn'
                }
            }).then((rs) => {
                navigate('/sucursal');
                message.success('Registro almacenado');
            });
        } catch (error) {
            message.error('Error en la creacion de registro');
        }
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/sucursal');
    }

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVA ESCUELA`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                form={form} 
                style={{ textAlign: `center`, marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                //onFinishFailed={create}
                layout="vertical"
                autoComplete="off" >
                <Form.Item label='Nombre de escuela' name="sucursal" rules={[{ required: true, message: 'Cargue sucursal', },]}>
                    <Input placeholder='Escuela' value={sucursal} onChange={(e) => setSucursal(e.target.value)} />
                </Form.Item>
                <Form.Item name="imagen" id='imagen' style={{ margin: `10px` }}  >
                    <UploadFile previewImage={previewImage1} setPreviewImage={setPreviewImage1} />
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

export default NuevoSucursal;
