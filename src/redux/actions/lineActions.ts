import * as lineTypes from '../types/lineTypes';
import * as _ from 'lodash';

export const setLines = (lines: string[]) => {
  return {
    type: lineTypes.SET_LINES,
    lines: _.isEmpty(lines) ? [] : lines,
  };
};

export const lineActions = {
  setLines,
};

export default lineActions;
