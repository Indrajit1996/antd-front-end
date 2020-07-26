import { combineReducers } from 'redux';
import user from './user.js';
import todos from './todos.js';


const crudApp = combineReducers({
    todos,
    user
});

export default crudApp;