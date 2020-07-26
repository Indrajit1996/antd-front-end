import React, { Component } from 'react'
import { connect } from 'react-redux';
import userActions from '../store/actions/userActions'
import FormButton from '../common/FormButton';
import {CreateModalUserList} from './AddUserForm.js'
import {UsersTable} from './UsersTable.js'
import PropTypes from 'prop-types';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      Loading: false,
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }
  
  handleCancel = () => {
    const { form } = this.formReference.props;
    form.resetFields(); 

    this.hideModal()
  }

  hideModal = () => {
    this.setState({
      showModal: false,
      Loading: false,
    })
  }

  handleSubmit = () =>  {
    
    const { form } = this.formReference.props;
    form.validateFields((error, values) => {
      if (error) {

        this.setState({ Loading: false });
        return;
      }
      this.setState({
        Loading: true
      });
      const params = {
        name: values.name,
        email: values.email
      };
      setTimeout(() => {
        this.props.add(params);
        form.resetFields(); 
        this.hideModal();
      }, 3000);
    });
  }

  todoFormData = (formRef) =>  {

    this.formReference = formRef
  }

  edit = (id, data) => {

    let edited_data = {id: id, name: data.name, email: data.email}
    this.props.edit(edited_data)
    console.log("EDIT", data) 
  }
  
  delete = (id) => {
    
    this.props.delete(id)
    console.log("DELETE", id)
  }
 


  render() {
    let { user } = this.props
    let data = user ? user : []

    return (
      <div >
        <FormButton className="modal-display"
                    type="primary"
                    modalOpen={() => { this.setState({showModal: true}) }}
                    label="Add User"
                    size="large"
                />
                <CreateModalUserList
                    visible={this.state.showModal}
                    loading={this.state.Loading}
                    onCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                    wrappedComponentRef={this.todoFormData}
              />
   
              <UsersTable 
                    data={data.collection}
                    edit_user={this.edit}
                    delete={this.delete}
                />
      </div>
    )
  }
}

Users.propTypes = {
  user: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => (userActions(dispatch));
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, mapDispatchToProps)(Users);

