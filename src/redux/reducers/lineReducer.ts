import * as lineTypes from '../types/lineTypes';
import { initLineState } from '../config/initialState';

export const lineReducer = (
  state = initLineState,
  action: lineTypes.LineActionTypes,
): lineTypes.LineState => {
  switch (action.type) {
    case lineTypes.SET_LINES:
      return {
        ...state,

        lines: action.lines,
      };

    default:
      return state;
  }
};

export default lineReducer;
