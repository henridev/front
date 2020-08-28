import { ApiActionTypes, components, REQUEST, RESPONSE, ERROR } from '../types/ApiTypes';

export const request = (component: components): ApiActionTypes => {
  return {
    type: REQUEST,
    component,
  };
};

export const response = (component: components): ApiActionTypes => {
  return {
    type: RESPONSE,
    component,
  };
};

export const error = (component: components, error: any): ApiActionTypes => {
  return {
    type: ERROR,
    component,
    error,
  };
};

export const apiActions = {
  request,
  response,
  error,
};

export default apiActions;
