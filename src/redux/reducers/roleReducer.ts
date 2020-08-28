import * as roleTypes from '../types/roleTypes';
import { initRoleState } from '../config/initialState';

export const roleReducer = (
  state = initRoleState,
  action: roleTypes.RoleActionTypes,
): roleTypes.RolesState => {
  switch (action.type) {
    case roleTypes.SET_ROLE:
      return {
        ...state,
        roles: action.roles,
      };

    default:
      return state;
  }
};

export default roleReducer;
