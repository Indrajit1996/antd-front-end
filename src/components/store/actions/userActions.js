import actionTypes from '../const/actionTypes';

const userAction = dispatch => ({
    add: (data) => {
        dispatch({
            type: actionTypes.user.ADD,
            payload: data 
        })
    },
    edit: (data) => { 
        dispatch({
            type: actionTypes.user.EDIT,
            payload: data
            })
    },
    delete: (id) => {
        dispatch({
            type: actionTypes.user.DELETE,
            payload: {id}
        })
    }
});

export default userAction;