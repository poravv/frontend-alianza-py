import React, { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
//import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getVwPropiedadTT, updatePropiedad } from '../../../services/Propiedad';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'

function ListaPropiedad({ token }) {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    // eslint-disable-next-line
    const navigate = useNavigate();
    useEffect(() => {
        getLstPropiedad();
        // eslint-disable-next-line
    }, []);

   
    const getLstPropiedad = async () => {
        let array = []
        const res = await getVwPropiedadTT({ token: token});
        res.body.map((row) => {
            delete row.Propiedad_has_fotos;
            array.push(row)
            return true;
        })
        console.log(array);
        setData(array);
    
}

    const handleDelete = async (id) => {
        await updatePropiedad({ token: token, param: id, json: { estado: "IN" } })
        getLstPropiedad();
    }

    const handleUpdate = async (newData) => {
        await updatePropiedad({ token: token, idpropiedad: newData.idpropiedad, json: newData })
        getLstPropiedad();
    }
    const columns = [

        {
            title: 'Nombre Cliente',
            dataIndex: 'nombre',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            //fixed: 'left',
            ...BuscadorTabla('nombre'),
        },
        {
            title: 'Apellido Cliente',
            dataIndex: 'apellido',
            //fixed: 'left',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.apellido.localeCompare(b.apellido),
            ...BuscadorTabla('apellido'),
        },
        {
            title: 'Documento Cliente',
            dataIndex: 'documento',
            //fixed: 'left',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.documento.localeCompare(b.documento),
            ...BuscadorTabla('documento'),
        },
        {
            title: 'Titulo',
            dataIndex: 'titulo',
            //width: '10%',
            editable: true,
            ...BuscadorTabla('titulo'),
        },
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            //width: '8%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('direccion'),
        },
        {
            title: 'Destacado',
            dataIndex: 'destacado',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('destacado'),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.destacado.localeCompare(b.destacado),
        },
        {
            title: 'Dimension',
            dataIndex: 'dimencion',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('dimencion'),
        },
        {
            title: 'Vendedor',
            dataIndex: 'nombre_vendedor',
            //width: '22%',
            editable: false,
            ...BuscadorTabla('nombre_vendedor'),
        },
        {
            title: 'Documento Vendedor',
            dataIndex: 'doc_vendedor',
            //width: '22%',
            editable: false,
            ...BuscadorTabla('nacionalidad'),
        },
        {
            title: 'Dormitorios',
            dataIndex: 'dormitorio',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('dormitorio'),
        },
        {
            title: 'Metros cuadrados',
            dataIndex: 'metros_c',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('metros_c'),
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            //width: '22%',
            editable: true,
            ...BuscadorTabla('precio'),
        },
        {
            title: 'Superficie terreno',
            dataIndex: 'superficie_terreno',
            //width: '22%',
            editable: true,
        },
        {
            title: 'Tipo de propiedad',
            dataIndex: 'tipo_propiedad',
            //width: '22%',
            editable: false,
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
            render: (_, { estado, idpropiedad }) => {
                let color = 'black';
                if (estado.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idpropiedad} >
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
                            onClick={() => save(record.idpropiedad)}
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
                            onConfirm={() => confirmDel(record.idpropiedad)}
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
        console.log('Entra a editar: ',record)
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.idpropiedad);
    };


    const isEditing = (record) => record.idpropiedad === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idpropiedad) => {
        message.success('Procesando');
        handleDelete(idpropiedad);
    };

    const save = async (idpropiedad) => {
        
        console.log('Editable')

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idpropiedad === item.idpropiedad);

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
            <Titulos text={`LISTA DE PROPIEDADES`} level={3}></Titulos>
            {/*
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearpropiedad')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            */}
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idpropiedad'} varx={2500} />
        </>
    )
}

export default React.memo(ListaPropiedad);
