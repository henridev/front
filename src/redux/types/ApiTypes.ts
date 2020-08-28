export enum components {
  CREDENTIALS = 'credentials',
  ROLLINGSTOCK = 'rollingstock',
  USED_UPDATE = 'used_update',
  CREATE_USER = 'create_user',
  DELETE_USER = 'delete_user',
  LINES = 'lines',
  ROLES = 'roles',
}

export interface ApiState {
  credentials: {
    isUpdated: boolean;
    isLoaded: boolean;
    isError: boolean;
    errorInfo?: any;
  };
  rollingstock: {
    isUpdated: boolean;
    isLoaded: boolean;
    isError: boolean;
    errorInfo?: any;
  };
  lines: {
    isLoaded: boolean;
    isError: boolean;
    errorInfo?: any;
  };
  roles: {
    isLoaded: boolean;
    isError: boolean;
    errorInfo?: any;
  };
}

export const REQUEST = 'REQUEST';
export const RESPONSE = 'RESPONSE';
export const ERROR = 'ERROR';

export interface requestAction {
  type: typeof REQUEST;
  component: components;
}
export interface responseAction {
  type: typeof RESPONSE;
  component: components;
}
export interface errorAction {
  type: typeof ERROR;
  component: components;
  error: any;
}

export type ApiActionTypes = requestAction | responseAction | errorAction;
