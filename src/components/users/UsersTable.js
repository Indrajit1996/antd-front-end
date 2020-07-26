import React, {useState, useEffect} from 'react';
import { Popconfirm ,Form,Button,  Table, Divider, Input} from 'antd';
import PropTypes from 'prop-types';


const Context = React.createContext();


function EditableDataCells(props) {
  
  function renderData({ getFieldDecorator }){
    const {  editable, children, record, dataIndex } =  props;

    let Item;

    if (editable) {
      if (dataIndex === 'name') {
        Item = (
            <Form.Item style={{ margin: 4 }}>
            {getFieldDecorator('name', {
                rules: [
                    { required: true, message: 'Please provide Name' },
                    { min: 5, message: 'Name must be a minimum of 5 characters.' }
                  ],
                  initialValue: record[dataIndex]
            })(<Input placeholder="Name" />)}
          </Form.Item>
        );
      } else {
        Item = (
            <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('email', {
                rules: [
                    {
                      required: true,
                      message: 'Please provide Email!'
                    },
                    {
                      type: 'email',
                      message: 'The input is not a valid Email!'
                    }
                ],
              initialValue: record[dataIndex]
            })(<Input  placeholder="Email" />)}
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
function EditDeleteUsers(props)  {
 
    const [userId, setuserId] = useState('');
    const [saveButton, setSaveButton] = useState(false);

    let dataColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        editable: true
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
        //   const { id } = this.state;
          const editable = record.id === userId
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
    
    setuserId('');
  };


  function deleteId(id) 
  {
    props.delete(id);

    setuserId('');

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
        name: value.name,
        email: value.email
      };
      setTimeout(() => {
        props.edit_user(id, params);

        setuserId('');
        setSaveButton(false)
      }, 3000);
    });
  };


  function edit(id) {

    setuserId(id);
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
          editable: record.id === userId
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

EditDeleteUsers.propTypes = {
  data: PropTypes.array.isRequired,
  edit_user: PropTypes.func,
  delete: PropTypes.func
}

export const UsersTable = Form.create({name: 'edit_user_form'})(EditDeleteUsers);