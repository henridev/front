import { AuthorityDTO } from '../../services/credentialsService/credentials.api.types';

export type CredentialPopInState = {
  meta: {
    validating: boolean;
    open: boolean;
  };
  selectedUser: AuthorityDTO;
  employeeId: string;
  roleName: string;
  roleId: number;
  line: string;
  company: string;
};

export const CLOSE_POPIN = 'CLOSE_POPIN';
export const OPEN_POPIN = 'OPEN_POPIN';
export const TABLE_CUSTOM_USER_SELECTED = 'TABLE_CUSTOM_USER_SELECTED';
export const TABLE_CUSTOM_USER_UNSELECTED = 'TABLE_CUSTOM_USER_UNSELECTED';
export const VALIDATE_POPIN = 'VALIDATE_POPIN';
export const RESET_VALIDATION_POPIN = 'RESET_VALIDATION_POPIN';

export interface CloseCredentialPopInAction {
  type: typeof CLOSE_POPIN;
}
export interface OpenCredentialPopInAction {
  type: typeof OPEN_POPIN;
}
export interface SelectUserAction {
  type: typeof TABLE_CUSTOM_USER_SELECTED;
  payload: AuthorityDTO;
}
export interface UnselectUserAction {
  type: typeof TABLE_CUSTOM_USER_UNSELECTED;
}
export interface ValidateCredentialPopInAction {
  type: typeof VALIDATE_POPIN;
}
export interface UnvalidateCredentialPopInAction {
  type: typeof RESET_VALIDATION_POPIN;
}

export type CredentialPopInActionType =
  | CloseCredentialPopInAction
  | OpenCredentialPopInAction
  | SelectUserAction
  | UnselectUserAction
  | ValidateCredentialPopInAction
  | UnvalidateCredentialPopInAction;
