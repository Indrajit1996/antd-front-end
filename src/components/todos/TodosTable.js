import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Popconfirm ,Form,Button,  Table, Divider, DatePicker, Input} from 'antd';
import PropTypes from 'prop-types';

const Context = React.createContext();


function EditableDataCells(props) {
  
  function renderData({ getFieldDecorator }){
    const {  editable, children, record, dataIndex } =  props;

    let Item;

    if (editable) {
      if (dataIndex === 'date') {
        Item = (
          <Form.Item style={{ margin: 4 }}>
            {getFieldDecorator('date', {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: 'Date Field is required!'
                }
              ], 
              initialValue: moment(record[dataIndex], 'YYYY-MM-DD HH:mm:ss')
            })(<DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />)}
          </Form.Item>
        );
      } else {
        Item = (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: 'Action is required!'
                },
                { min: 5, message: 'Task must be a minimum of 5 characters.' }
              ],
              initialValue: record[dataIndex]
            })(<Input />)}
          </Form.Item>
        );
      }
    } else {
      Item = children;
    }

    return <td >{Item}</td>;
  };

    return (
        <Context.Consumer>{renderData}</Context.Consumer>
    );

}
function EditDeleteTodo(props)  {
 
    const [todoId, setTodoId] = useState('');
    const [saveButton, setSaveButton] = useState(false);

    let dataColumns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        editable: true
      },
      {
        title: 'DateAdded',
        dataIndex: 'date',
        key: 'date',
        editable: true
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
  
          const editable = record.id === todoId
          return editable ? (
            <span>
              <Context.Consumer>
                {(form) => (
                  <Button
                    key="submit"
                    type="primary"
                    loading={saveButton}
                    onClick={() => save(form, record.id)}
                    style={{ marginRight: 8 }}>
                    Save
                  </Button>
                )}
              </Context.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => cancel(record.id)}>
                <Button style={{ marginRight: 8 }}>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a style={{color: '#108ee9'}}
           
                onClick={() => edit(record.id)}>
                Edit
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteId(record.id)}>
                <a style={{color: '#108ee9'}}>Delete</a>
              </Popconfirm>
            </div>
          );
        }
      }
    ];

  function cancel(){
    
    setTodoId('');
  };


  function deleteId(id) 
  {
    props.delete(id);

    setTodoId('');

  };

  function save(form, id) {

    form.validateFields((error, value) => {
      if (error) {
        console.log(error);

        setSaveButton(false)
        
        return;
      }

      setSaveButton(true);
      const params = {
        action: value.action,
        date: value['date'].format('YYYY-MM-DD HH:mm:ss')
      };
      setTimeout(() => {
        props.edit_todo(id, params);

        setTodoId('');
        setSaveButton(false)
      }, 3000);
    });
  };


  function edit(id) {

    setTodoId(id);
  };



   dataColumns = dataColumns.map((data) => {
      if (!data.editable) {
        return data;
      }

      return {
        ...data,
        onCell: (record) => ({
          record,
          title: data.title,
          dataIndex: data.dataIndex,
          editable: record.id === todoId
        })
      };
    });

    let components = {
      body: {
        cell: EditableDataCells 
      }
    };

    return (
      <Context.Provider value={props.form}>
        
        <Table
          components={components}
          bordered
          dataSource={props.data}
          columns={dataColumns}
          rowClassName="editable-row"
          pagination={{ defaultPageSize: 5,
                        showSizeChanger: true, 
                        pageSizeOptions: ['5', '10', '20', '40'] }}

        />
      </Context.Provider>
    );
}

EditDeleteTodo.propTypes = {
  data: PropTypes.array.isRequired,
  edit_todo: PropTypes.func,
  delete: PropTypes.func
}

export const TodosTable = Form.create({name: 'edit_todo_form'})(EditDeleteTodo);