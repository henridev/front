import { User } from '../../models/user.model';
import { AuthorityDTO } from '../../services/credentialsService/credentials.api.types';

/**
 * credentials State and Actions interfaces - generic api form
 */

// state
export interface CredentialsState {
  filter?: string;
  credentials?: AuthorityDTO[];
  user: AuthorityDTO | User | undefined; // User to create
  id: number | undefined; // User id to delete
}

// constants for action types
export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_USER = 'RESPONSE_CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

// action interfaces
export interface setCredentialsAction {
  type: typeof SET_CREDENTIALS;
  authorityDTO: AuthorityDTO[];
}

export interface setUserAction {
  type: typeof SET_USER;
  user: User;
}

export interface deleteUserAction {
  type: typeof DELETE_USER;
  id: number;
}

export type CredentialsActionTypes = setCredentialsAction | setUserAction | deleteUserAction;
