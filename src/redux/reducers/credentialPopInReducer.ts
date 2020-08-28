import { initCredentialPopInState } from '../config/initialState';
import * as types from '../types/credentialPopInTypes';

export const credentialPopInReducer = (
  state = initCredentialPopInState,
  action: types.CredentialPopInActionType,
): types.CredentialPopInState => {
  switch (action.type) {
    case types.CLOSE_POPIN:
      return {
        ...state,
        meta: {
          ...state.meta,
          open: false,
        },
      };
    case types.OPEN_POPIN:
      return {
        ...state,
        meta: {
          ...state.meta,
          open: true,
        },
      };
    case types.TABLE_CUSTOM_USER_SELECTED:
      return {
        ...state,
        meta: {
          ...state.meta,
          open: true,
        },
        selectedUser: action.payload,
      };
    case types.TABLE_CUSTOM_USER_UNSELECTED:
      return {
        ...state,
        selectedUser: { id : -1},
      };
    case types.VALIDATE_POPIN:
      return {
        ...state,
        meta: { ...state.meta, validating: true },
      };
    case types.RESET_VALIDATION_POPIN:
      return {
        ...state,
        meta: { ...state.meta, validating: false },
      };
    default:
      return state;
  }
};
