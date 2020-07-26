import React from 'react';
import PropTypes from 'prop-types';
import PopupForm from '../common/PopUpForm';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

 class UserPopUpForm extends React.Component {
  
  render(){
   let {visible, onCancel,loading, handleSubmit,form} = this.props
    return (
      <div>
        <PopupForm
          title="Add New User"
          visible={visible}
          onCancel={onCancel}
          handleSubmit={handleSubmit}
          saveBtnloading={loading}
          form={form}
          popupformType="Create_User_Form"
      />
      </div>
    );
  }
}

UserPopUpForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  form: PropTypes.object,
}

export const CreateModalUserList = Form.create({name: 'form_in_modal'})(UserPopUpForm) 