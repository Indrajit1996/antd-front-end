import React, { Component } from 'react'
import { connect } from 'react-redux';
import todoAction from '../store/actions/todoActions'
import FormButton from '../common/FormButton';
import {CreateModalTodosList} from './AddTodoForm.js'
import {TodosTable} from './TodosTable'
import PropTypes from 'prop-types';

class Todos extends Component {
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
  
  handleCancel() {
    const { form } = this.formReference.props;
    form.resetFields(); 

    this.hideModal()
  }

  hideModal() {
    this.setState({
      showModal: false,
      Loading: false
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
        action: values.action,
        date: values['date'].format('YYYY-MM-DD HH:mm:ss')
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
    let edited_data = {id: id, action: data.action, date: data.date}

    console.log("EDIT", edited_data) 
    this.props.edit(edited_data)
    
  }
  delete(id){
    
    console.log("DELETE", id)
    this.props.delete(id)
  }
 


  render() {
    let { todos } = this.props
    let data = todos ? todos : []

    return (
      <div >
        <FormButton className="modal-display"
                    type="primary"
                    modalOpen={() => { this.setState({showModal: true}) }}
                    label="Add Todo"
                    size="large"
                />
                <CreateModalTodosList
                    visible={this.state.showModal}
                    loading={this.state.Loading}
                    onCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                    wrappedComponentRef={this.todoFormData}
              />


              <TodosTable 
                  data={data.collection}
                  edit_todo={this.edit}
                  delete={this.delete}
              />

      </div>
    )
  }
}

Todos.propTypes = {
  todos: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => (todoAction(dispatch));
const mapStateToProps = ({todos}) => ({todos})
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
