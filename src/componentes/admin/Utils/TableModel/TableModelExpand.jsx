import { Form, Input, InputNumber, Table, Select, Spin } from 'antd';

const { Option } = Select;

function TableModelExpand({ token, form, data, mergedColumns, keyExtraido, columnDet, keyDet, varx }) {

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


  const expandedRowRender = (dataDet) => {
    return <Table bordered rowKey={keyDet} columns={columnDet} dataSource={dataDet} pagination={false} />;
  };

  return (
    <>
      {
        data ? <Form form={form} component={false}>
          <Table
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
            expandedRowRender={(record) => (
              //console.log('det: -',record.detalle)
              expandedRowRender(record.detalle ?? record.receta ?? record.det_inventarios ?? record.det_venta ?? record.det_planificacions)
            )}
            rowClassName="editable-row"
            scroll={{
              x: 'calc(800px + 60%)',
              //x: (varx??500),
              y: 1500,
            }}
          //pagination={{onChange: setCantidadRow,pageSize: 50,}}
          />
        </Form> :
          <section style={{ textAlign: `center`, margin: `10px` }}>
            <Spin />
          </section>
      }
    </>
  );
};
export default TableModelExpand;