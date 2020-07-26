import actionTypes from '../const/actionTypes';

const todoAction = dispatch => ({
    add: (data) => {
        dispatch({
            type: actionTypes.todo.ADD,
            payload: data 
        })
    },
    edit: (data) => { 
        dispatch({
            type: actionTypes.todo.EDIT,
            payload: data
            })
    },
    delete: (id) => {
        dispatch({
            type: actionTypes.todo.DELETE,
            payload: {id}
        })
    }
});

export default todoAction;