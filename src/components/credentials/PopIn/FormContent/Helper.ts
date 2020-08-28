import * as _ from 'lodash';
import { RoleDTO } from '../../../../services/roleService/role.api.types';
import { User } from '../../../../models/user.model';
import { someAreNil } from '../../../../services/utils/Utils';
import { State } from './FormContent';
import { AuthorityDTO } from '../../../../services/credentialsService/credentials.api.types';

/**
 * Retrieve role name by role id
 * @param userRoles 
 * @param roleList 
 */
export function getRoleNameById (
  userRoles: Array<number> | undefined,
  roleList: Array<RoleDTO>,
): string{
  if (userRoles === undefined) return '';
  const role = roleList.find((role) => userRoles.includes(role.id));
  return role ? role.name : '';
};

/**
 * Retrieve role object by name property
 * @param roles 
 * @param roleName 
 */
export function getRoleByName (roles: RoleDTO[], roleName: string | undefined): RoleDTO | null {
  if(_.isNil(roleName) || _.isNil(roles)) return null;
  let foundRoles = roles.filter((role) => role.name === roleName);
  return !_.isEmpty(foundRoles) ? foundRoles[0] : null;
};

/**
 * Validate form content
 * @param ref 
 */
export function validateForm (ref: any): boolean {
  const form = ref.current;
  if (form && !form.checkValidity()) {
    return false;
  }
  return true;
};

/**
 * Build User instance from state
 * @param userId id provided by fetch in case of update
 * @param roleList Array of roles object
 * @param state FormContent state
 */
export function getNewUser (userId : number, roleList: Array<RoleDTO>, state : State) : User | null {
  let selectedRole = getRoleByName(roleList, state.roleName);
  if (!selectedRole) return null;
  if(someAreNil(state.employeeId, state.line, state.organisation, selectedRole.id, userId)) return null;
  return new User(state.employeeId, state.line, state.organisation, [selectedRole.id], userId);
}

/**
 * Get initial state
 * @param selectedUser 
 * @param roleList 
 * @param lineList 
 */
export function initState(selectedUser : AuthorityDTO, roleList : Array<RoleDTO>, lineList : Array<string>){
  return {
    validated: false,
    employeeId: selectedUser.registration_number || '',
    roleName: getRoleNameById(selectedUser.roles, roleList),
    line: selectedUser.line_id || '',
    organisation: selectedUser.organisation || '',
  }
}