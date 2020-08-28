import * as credentialsTypes from '../types/credentialsTypes';
import { initCredentialsState } from '../config/initialState';

export const credentialsReducer = (
  state = initCredentialsState,
  action: credentialsTypes.CredentialsActionTypes,
): credentialsTypes.CredentialsState => {
  switch (action.type) {
    case credentialsTypes.SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.authorityDTO,
      };
    case credentialsTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case credentialsTypes.DELETE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
