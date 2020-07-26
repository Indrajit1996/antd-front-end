import React from 'react'
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

const moment = 'YYYY-MM-DD HH:mm:ss';

const PopUpForm = ({title,visible, onCancel, saveBtnLoading, handleSubmit,form,  ...props}) => {

    return (
        <div>
        <Modal
          title={title}
          visible={visible}
          onCancel={onCancel}
          footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={props.saveBtnloading} onClick={handleSubmit}>
              Submit
            </Button>,
          ]}
        >
        <Form  layout="vertical">
           {  props.popupformType === "Create_Todo_Form" ?
           <React.Fragment>
              <Form.Item
              label="Action"
              name="action"
              rules={[
                {
                  required: true,
                  message: 'Please enter the task!',
                },
              ]}
            >
            {form.getFieldDecorator('action', {
              rules: [
                  { required: true, message: 'Please provide action' },
                  { min: 5, message: 'Task must be minimum 5 characters.' },
              ],
            })(
              <Input placeholder="Action" />,
            )}
        
            </Form.Item>
            <Form.Item
                    label="Date"
                    name="task"
                  >
                  {form.getFieldDecorator('date', {
                    rules: [
                      {
                        type: 'object',
                        required: true,
                        message: 'Please provide Date'
                      }
                    ]
                  })
                  (<DatePicker showTime format={moment} />)}
            </Form.Item>
            </React.Fragment>

             :

            <React.Fragment>
            <Form.Item
              label="Name"
              name="name"
            >
              {form.getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please provide Name' },
                  { min: 5, message: 'Name must be a minimum of 5 characters.' }
                ]
              })
              (<Input placeholder="Name" />)}
            </Form.Item>   
            <Form.Item
                label="Email"
                name="email"
              >
          {form.getFieldDecorator('email', {
            rules: [
                { required: true, message: 'Please provide Email' },
                { type: 'email', message: 'Input is not a valid Email' },
            ],
          })(
            <Input placeholder="Email" />,
          )}
      
          </Form.Item>
          </React.Fragment>   
          }
          </Form>
        </Modal>
      </div>
    )
}

PopUpForm.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  saveBtnLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  form: PropTypes.object,
}

export default PopUpForm