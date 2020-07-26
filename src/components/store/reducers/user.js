import createReducer from '../utils/createReducer';
import actionTypes from '../const/actionTypes';
import { userData } from '../initialData.js'
import { deleteItem, updateItem, createItem } from '../collections'


const userState = {
  collection: userData
};

const userReducer = {};

userReducer[actionTypes.user.ADD] = (state, payload) => ({
  ...state,
  collection: createItem(state.collection, payload)
});

userReducer[actionTypes.user.EDIT] = (state, payload) => ({
  ...state,
  collection: updateItem(payload, state.collection),
});

userReducer[actionTypes.user.DELETE] = (state, payload) => ({
  ...state,
  collection: deleteItem(payload, state.collection)
});

export default createReducer(userReducer, userState);
