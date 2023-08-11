import React, { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
//import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getVwPersona, updateUniquePersona } from '../../../services/Persona';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'

function ListaPersona({ token }) {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    // eslint-disable-next-line
    const navigate = useNavigate();
    useEffect(() => {
        getLstPersona();
        // eslint-disable-next-line
    }, []);

    const getLstPersona = async () => {
        if (data.length <= 0) {
            const res = await getVwPersona({ token: token });
            console.log(res.body)
            setData(res.body);
        }
    }

    const handleDelete = async (id) => {
        await updateUniquePersona({ token: token, param: id, json: { estado: "IN" } })
        getLstPersona();
    }

    const handleUpdate = async (newData) => {
        await updateUniquePersona({ token: token, idpersona: newData.idpersona, json: newData })
        getLstPersona();
    }
    const columns = [

        {
            title: 'Nombre',
            dataIndex: 'nombre',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            //fixed: 'left',
            ...BuscadorTabla('nombre'),
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.apellido.localeCompare(b.apellido),
            ...BuscadorTabla('apellido'),
        },
        {
            title: 'Documento',
            dataIndex: 'documento',
            //fixed: 'left',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.documento.localeCompare(b.documento),
            ...BuscadorTabla('documento'),
        },
        {
            title: 'Nacimiento',
            dataIndex: 'fnacimiento',
            //width: '10%',
            editable: true,
            ...BuscadorTabla('fnacimiento'),
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',
            //width: '8%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.sexo.localeCompare(b.sexo),
            render: (_, { sexo, idpersona }) => {
                if (sexo) {
                    let color = 'black';
                    if (sexo.toUpperCase() === 'MA') { color = 'blue' }
                    else { color = 'volcano'; }
                    return (
                        <Tag color={color} key={idpersona} >
                            {sexo.toUpperCase() === 'MA' ? 'Masculino' : 'Femenino'}
                        </Tag>
                    );
                } else {
                    return null;
                }
            },
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('direccion'),
        },
        {
            title: 'Tipo documento',
            dataIndex: 'tipo_doc',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('tipo_doc'),
        },
        {
            title: 'Nacionalidad',
            dataIndex: 'nacionalidad',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('nacionalidad'),
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('correo'),
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('telefono'),
        },
        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            //width: '22%',
            editable: false,
            ...BuscadorTabla('ciudad'),
        },
        {
            title: 'Barrio',
            dataIndex: 'barrio',
            //width: '22%',
            editable: false,
            ...BuscadorTabla('barrio'),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            //width: '7%',
            editable: true,
            render: (_, { estado, idpersona }) => {
                let color = 'black';
                if (estado.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idpersona} >
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
                            onClick={() => save(record.idpersona)}
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
                            onConfirm={() => confirmDel(record.idpersona)}
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
        setEditingKey(record.idpersona);
    };


    const isEditing = (record) => record.idpersona === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idpersona) => {
        message.success('Procesando');
        handleDelete(idpersona);
    };

    const save = async (idpersona) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idpersona === item.idpersona);

            if (index > -1) {

                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                //console.log(newData[index]);
                //newData[index].fecha_upd = strFecha;
                console.log(newData[index])
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
            <Titulos text={`LISTA DE PERSONAS`} level={3}></Titulos>
            {/*
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearpersona')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            */}
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idpersona'} varx={2500} />
        </>
    )
}

export default React.memo(ListaPersona);
