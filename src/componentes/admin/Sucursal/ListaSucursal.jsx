import { useState, useEffect } from 'react'
import { handleExport } from '../../Utils/ExportXLS'
import { Popconfirm, Typography } from 'antd';
import { Form } from 'antd';
import TableModel from '../../TableModel/TableModel';
import { Tag } from 'antd';
import { message } from 'antd';
import {  PlusOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import { useNavigate } from "react-router-dom";
import { RiFileExcel2Line } from "react-icons/ri";
import { getSucursal, updateSucursal } from '../../../services/Sucursal';
import {Titulos} from '../../Utils/Titulos';
import {BuscadorTabla}  from '../../Utils/Buscador/BuscadorTabla'
import { Buffer } from 'buffer'

let fechaActual = new Date();
const ListaSucursal = ({ token,idsucursal }) => {
    

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
    const navigate = useNavigate();

    useEffect(() => {
        getLstSucursal();
        // eslint-disable-next-line
    }, []);

    const getLstSucursal = async () => {
        const res = await getSucursal({token:token,param:'get'});
        setData(res.body);

    }

    const handleDelete = async (id) => {
        await updateSucursal({ token: token, param: id, json: { estado: "IN" } })
        getLstSucursal();
    }

    const handleUpdate = async (newData) => {
        await updateSucursal({token:token,param:newData.idsucursal,json:newData}) 
        getLstSucursal();
    }


    const columns = [
        {
            title: 'Escuelas',
            dataIndex: 'sucursal',
            //width: '12%',
            editable: true,
            ...BuscadorTabla('sucursal'),
        },
        
        {
            title: 'Imagen',
            dataIndex: 'img',
            width: '15%',
            editable: true,
            render: (_, { img }) => {
                if (img && typeof img !== "string") {
                    //console.log(typeof img);
                    const asciiTraducido = Buffer.from(img.data).toString('ascii');
                    //console.log(asciiTraducido);
                    if (asciiTraducido) {
                        return (
                            <Image
                                style={{  borderRadius: `4px`,width:`60px` }}
                                alt="imagen"
                                //preview={false}
                                //style={{ width: '50%',margin:`0px`,textAlign:`center` }}
                                src={asciiTraducido}
                            />
                        );
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            },
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            width: '10%',
            editable: true,
            render: (_, { estado, idsucursal }) => {
                let color = 'black';
                if (estado.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idsucursal} >
                        {estado.toUpperCase() === 'AC' ? 'Activo' : 'Inactivo'}
                    </Tag>
                );
            },
        },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.idsucursal, record)}
                            style={{
                                marginRight: 8,
                            }} >
                            Guardar
                        </Typography.Link>
                        <br />
                        <Popconfirm title="Desea cancelar?" onConfirm={cancel}>
                            <a href='#/'>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link style={{ margin: `5px` }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Editar
                        </Typography.Link>

                        <Popconfirm
                            title="Desea eliminar este registro?"
                            onConfirm={() => confirmDel(record.idsucursal)}
                            onCancel={cancel}
                            okText="Si"
                            cancelText="No" >
                            <Typography.Link >
                                Borrar
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        }
    ]

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.idsucursal);
    };


    const isEditing = (record) => record.idsucursal === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idsucursal) => {
        message.success('Procesando');
        handleDelete(idsucursal);
    };

    const save = async (idsucursal, record) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idsucursal === item.idsucursal);

            if (index > -1) {
                const item = newData[index];
                //console.log(newData);

                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                if (record.idsucursal === item.idsucursal) {
                    //console.log('Entra en asignacion',record.img);
                    newData[index].img = record.img;
                }

                newData[index].fecha_upd = strFecha;

                console.log(newData);

                handleUpdate(newData[index]);
                setData(newData);
                setEditingKey('');
                message.success('Registro actualizado');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };



    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Titulos text={`ESCUELAS`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearsucursal')} >{<PlusOutlined />} Nuevo</Button>
                <Button type='primary' style={{ backgroundColor: `#08AF17`, margin: `2px` }}  ><RiFileExcel2Line onClick={()=>handleExport({data:data,title:'Escuelas'})} size={20} /></Button>
            </div>
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idsucursal'} />
        </>
    )
}
export default ListaSucursal