import React from 'react';
import PropTypes from 'prop-types';
import PopupForm from '../common/PopUpForm';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

 class TodoPopUpForm extends React.Component {
  
  render(){
   let {visible, onCancel,loading, handleSubmit,form} = this.props
    return (
      <div>
        <PopupForm
          title="Add New Todo"
          visible={visible}
          onCancel={onCancel}
          handleSubmit={handleSubmit}
          saveBtnloading={loading}
          form={form}
          popupformType="Create_Todo_Form"
      />
      </div>
    );
  }
}

TodoPopUpForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  form: PropTypes.object,
}

export const CreateModalTodosList = Form.create({name: 'form_in_modal'})(TodoPopUpForm) 