import { Form, Input, InputNumber, Table, Select, Spin,ColorPicker } from 'antd';
import { useEffect, useState } from 'react';
import Buscador from '../Buscador/Buscador';
import { getCiudad } from '../../../../services/Ciudad';

const { Option } = Select;
function TableModel({ token, form, data, mergedColumns, keyExtraido, varx }) {

  const [formatHex, setFormatHex] = useState('hex');
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    getLstCiudad();
    // eslint-disable-next-line
}, []);
  
  const getLstCiudad = async () => {
    const res = await getCiudad({ token: token, param: 'get' });
    //console.log(res)
    setCiudades(res.body);
  }

  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : inputType==='ColorPicker'? <ColorPicker showText format={formatHex} onFormatChange={setFormatHex} /> : <Input />;
    switch (dataIndex) {
      case 'estado':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear >
                    <Option value="AC">Activo</Option>
                    <Option value="IN">Inactivo</Option>
                  </Select>
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'idciudad':
        return (
          <td {...restProps}>
            {
              editing ?
                <Buscador label={'descripcion'} value={'idciudad'} data={ciudades} dataIndex={dataIndex} title={title} />
                : (children)
            }
          </td>);
      case 'destacado':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear > <Option value="Si">Si</Option> <Option value="No">No</Option> </Select>
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'description':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Input.TextArea />
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'subtitle':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Input.TextArea />
                </Form.Item>
              ) : (children)
            }
          </td>);
      //break;
      default:
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  {inputNode}
                </Form.Item>
              ) : (children)
            }
          </td>);
    }
  };

  return (
    <>
      {
        data ? <Form form={form} component={false}
        >
          <Table
            rowKey={keyExtraido}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{
              //x: (varx ?? 100),
              x: `calc(${varx ?? 600}px + 60%)`,
              y: 300,
            }}
            //pagination={{onChange: setCantidadRow,pageSize: 50,}}
            showSorterTooltip={{ title: 'Clic para ordenar' }}
          />
        </Form> :
          <section style={{ textAlign: `center`, margin: `10px` }}>
            <Spin />
          </section>
      }
    </>
  );
};
export default TableModel;