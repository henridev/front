import { UserState, UserActionTypes } from './userTypes';

import { RollingStockState, RollingStockActionTypes } from './rollingStockTypes';
import { RolesState, RoleActionTypes } from './roleTypes';
import { LineState, LineActionTypes } from './lineTypes';
import { CredentialsState, CredentialsActionTypes } from './credentialsTypes';
import { CredentialPopInActionType, CredentialPopInState } from './credentialPopInTypes';

import { PopupState, PopupActionTypes } from './popupTypes';
import { ApiActionTypes, ApiState } from './ApiTypes';

export interface AppStore {
  popupState: PopupState;
  userState: UserState;
  rollingStockState: RollingStockState;
  credentialsState: CredentialsState;
  credentialPopInState: CredentialPopInState;
  lineState: LineState;
  roleState: RolesState;
  apiState: ApiState;
}

export interface combinedActionTypes {
  PopupActionTypes: PopupActionTypes;
  RollingStockActionTypes: RollingStockActionTypes;
  UserActionTypes: UserActionTypes;
  CredentialsActionTypes: CredentialsActionTypes;
  CredentialPopInActionType: CredentialPopInActionType;
  LineActionTypes: LineActionTypes;
  RoleActionTypes: RoleActionTypes;
  ApiTypes: ApiActionTypes;
}

export type actionTypes =
  | PopupActionTypes
  | RollingStockActionTypes
  | UserActionTypes
  | CredentialsActionTypes
  | LineActionTypes
  | RoleActionTypes
  | ApiActionTypes;
