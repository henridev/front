import { User } from '../../models/user.model';
import { AuthorityDTO } from '../../services/credentialsService/credentials.api.types';
import {
  CredentialsActionTypes,
  SET_CREDENTIALS,
  SET_USER,
  DELETE_USER,
} from '../types/credentialsTypes';

/**
 * credentials Action functions
 */

export const setCredentials = (authorityDTO: AuthorityDTO[]): CredentialsActionTypes => {
  return {
    type: SET_CREDENTIALS,
    authorityDTO,
  };
};

export const setUser = (user: User): CredentialsActionTypes => {
  return {
    type: SET_USER,
    user,
  };
};

export const deleteUser = (id: number): CredentialsActionTypes => {
  return {
    type: DELETE_USER,
    id,
  };
};

export const credentialsActions = {
  setUser,
  deleteUser,
  setCredentials,
};

export default credentialsActions;
