import { combineReducers } from 'redux';
import { credentialsReducer } from './credentialsReducer';
import { popupReducer } from './popupReducer';
import { rollingStockReducer } from './rollingStockReducer';
import { userReducer } from './userReducer';
import { credentialPopInReducer } from './credentialPopInReducer';
import { lineReducer } from './lineReducer';
import { roleReducer } from './roleReducer';
import { apiReducer } from './apiReducer';

export const reducerObject = {
  popupState: popupReducer,
  userState: userReducer,
  rollingStockState: rollingStockReducer,
  credentialsState: credentialsReducer,
  credentialPopInState: credentialPopInReducer,
  lineState: lineReducer,
  roleState: roleReducer,
  apiState: apiReducer,
};

export const rootReducer = combineReducers(reducerObject);

export type RootState = ReturnType<typeof rootReducer>;
