import createReducer from '../utils/createReducer';
import actionTypes from '../const/actionTypes';
import { todoData } from '../initialData.js'
import { deleteItem, updateItem, createItem } from '../collections'


const todoState = {
  collection: todoData
};

const todoReducer = {};

todoReducer[actionTypes.todo.ADD] = (state, payload) => ({
  ...state,
  collection: createItem(state.collection, payload)
});

todoReducer[actionTypes.todo.EDIT] = (state, payload) => ({
  ...state,
  collection: updateItem(payload, state.collection),
});

todoReducer[actionTypes.todo.DELETE] = (state, payload) => ({
  ...state,
  collection: deleteItem(payload, state.collection)
});

export default createReducer(todoReducer, todoState);
