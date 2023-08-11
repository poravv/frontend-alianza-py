import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Tag, message, Form, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getVwUsuario, updateUniqueUsuario } from '../../../services/Usuario';
import { Titulos } from '../Utils/Titulos';


const ListaUsuario = ({ token }) => {
    
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstUsuario();
        // eslint-disable-next-line
    }, []);

    const getLstUsuario = async () => {
        const res = await getVwUsuario({ token: token });
        console.log(res.body)
        setData(res.body);
    }

    const handleDelete = async (id) => {
        await updateUniqueUsuario({ token: token, idusuario: id, json: { estado: "IN" } });
        getLstUsuario();
    }

    const handleUpdate = async (newData) => {
        await updateUniqueUsuario({ token: token, idusuario: newData.idusuario, json: newData }).then((res) =>{
            console.log(res)
            if(res.mensaje==='error'){
                message.error(res.detmensaje)
            }else{
                message.success(res.detmensaje);
                getLstUsuario();
            }
        })
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            //width: '22%',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            editable: false,
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            //width: '22%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.apellido.localeCompare(b.apellido),
        },
        {
            title: 'Documento',
            dataIndex: 'documento',
            //width: '22%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.documento.localeCompare(b.documento),
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            //width: '22%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.direccion.localeCompare(b.direccion),
        },
        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            //width: '22%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.ciudad.localeCompare(b.ciudad),
        },
        {
            title: 'Barrio',
            dataIndex: 'barrio',
            //width: '22%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.barrio.localeCompare(b.barrio),
        },
        {
            title: 'Usuario',
            dataIndex: 'usuario',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.usuario.localeCompare(b.usuario),
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.correo.localeCompare(b.correo),
        },
        {
            title: 'Nivel',
            dataIndex: 'nivel',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nivel.localeCompare(b.nivel),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            //width: '7%',
            editable: false,
          
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',
            //width: '22%',
            editable: false,
            render: (_, {sexo,idusuario }) => {
                let color = 'black';
                    if (sexo?.toUpperCase() === 'MA') { color = 'blue' }
                    else { color = 'volcano'; }
                    return (
                        <Tag color={color} key={idusuario} >
                            {sexo?.toUpperCase() === 'MA' ? 'Masculino' : 'Femenino'}
                        </Tag>
                    )
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
                            onClick={() => save(record.idusuario)}
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
                            onConfirm={() => confirmDel(record.idusuario)}
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
        setEditingKey(record.idusuario);
    };


    const isEditing = (record) => record.idusuario === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idusuario) => {
        message.success('Procesando');
        handleDelete(idusuario);
    };

    const save = async (idusuario) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idusuario === item.idusuario);

            if (index > -1) {

                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                //console.log(newData);
                handleUpdate(newData[index]);
                setData(newData);
                setEditingKey('');

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

            <Titulos text={`USUARIOS`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearusuario')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idusuario'} varx={1100} />
        </>
    )
}

export default ListaUsuario;
