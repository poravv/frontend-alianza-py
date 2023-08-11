//import axios from 'axios'
import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Table, Select } from 'antd';
import { Spin } from 'antd';

const { Option } = Select;
function TableModel({ token, form, data, mergedColumns, keyExtraido, varx }) {
  //Celdas editables
  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    switch (dataIndex) {
      case 'estado':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear > <Option value="AC">Activo</Option> <Option value="IN">Inactivo</Option> </Select>
                </Form.Item>
              ) : (children)
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
            rowSelection={rowSelection}
            rowKey={keyExtraido}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            showSorterTooltip={{ title: 'Clic para ordenar' }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{
              x: (varx ?? 100),
              y: 300,
            }}

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