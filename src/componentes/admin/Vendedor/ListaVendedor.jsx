import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Tag, message, Form, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getVwVendedor, updateVendedor } from '../../../services/Vendedor';
import { Titulos } from '../Utils/Titulos';


const ListaVendedor = ({ token }) => {
    
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstVendedor();
        // eslint-disable-next-line
    }, []);

    const getLstVendedor = async () => {
        const res = await getVwVendedor({ token: token });
        console.log(res.body)
        setData(res.body);
    }

    const handleDelete = async (id) => {
        await updateVendedor({ token: token, param: id, json: { estado: "IN" } });
        getLstVendedor();
    }

    const handleUpdate = async (newData) => {
        await updateVendedor({ token: token, param: newData.idvendedor, json: newData })
        getLstVendedor();
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
            title: 'Facebook',
            dataIndex: 'fb',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.fb.localeCompare(b.fb),
        },
        {
            title: 'Instagram',
            dataIndex: 'inst',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.inst.localeCompare(b.inst),
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.telefono.localeCompare(b.telefono),
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
            render: (_, { sexo, idvendedor }) => {
                let color = 'black';
                if (sexo.toUpperCase() === 'MA') { color = 'blue' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idvendedor} >
                        {sexo.toUpperCase() === 'MA' ? 'Masculino' : 'Femenino'}
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
                            onClick={() => save(record.idvendedor)}
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
                            onConfirm={() => confirmDel(record.idvendedor)}
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
        setEditingKey(record.idvendedor);
    };


    const isEditing = (record) => record.idvendedor === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idvendedor) => {
        message.success('Procesando');
        handleDelete(idvendedor);
    };

    const save = async (idvendedor) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idvendedor === item.idvendedor);

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

            <Titulos text={`VENDEDORES`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearvendedor')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idvendedor'} varx={1000} />
        </>
    )
}

export default ListaVendedor;
