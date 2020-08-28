import * as roleTypes from '../types/roleTypes';
import * as _ from 'lodash';
import { RoleDTO } from '../../services/roleService/role.api.types';

export const setRoles = (roles: RoleDTO[]) => {
  return {
    type: roleTypes.SET_ROLE,
    roles: _.isEmpty(roles) ? [] : roles,
  };
};

export const roleActions = {
  setRoles,
};

export default roleActions;
