import { RoleDTO } from '../../services/roleService/role.api.types';

export interface RolesState {
  roles: RoleDTO[];
}

export const SET_ROLE = 'SET_ROLE';

export interface setRole {
  type: typeof SET_ROLE;
  roles: RoleDTO[];
}

export type RoleActionTypes = setRole;
