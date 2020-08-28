import { initApiState } from '../config/initialState';
import * as types from '../types/ApiTypes';
import {
  loadingState,
  loadingResponseState,
  loadingErrorState,
  updateState,
  updateResponseState,
  updateErrorState,
} from './apiStates';

export const apiReducer = (state = initApiState, action: types.ApiActionTypes): types.ApiState => {
  switch (action.type) {
    case types.REQUEST:
      return {
        ...state,
        [action.component]:
          action.component === types.components.CREDENTIALS ||
          action.component === types.components.ROLLINGSTOCK ||
          action.component === types.components.LINES ||
          action.component === types.components.ROLES
            ? loadingState
            : updateState,
      };
    case types.RESPONSE:
      return {
        ...state,
        [action.component]:
          action.component === types.components.CREDENTIALS ||
          action.component === types.components.ROLLINGSTOCK ||
          action.component === types.components.LINES ||
          action.component === types.components.ROLES
            ? loadingResponseState
            : updateResponseState,
      };
    case types.ERROR:
      return {
        ...state,
        [action.component]:
          action.component === types.components.CREDENTIALS ||
          action.component === types.components.ROLLINGSTOCK ||
          action.component === types.components.LINES ||
          action.component === types.components.ROLES
            ? { ...loadingErrorState, errorInfo: action.error }
            : { ...updateErrorState, errorInfo: action.error },
      };

    default:
      return state;
  }
};

export default apiReducer;
