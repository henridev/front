// state
export interface LineState {
  lines: string[];
}

export const SET_LINES = 'RESPONSE_LINES';

export interface setLines {
  type: typeof SET_LINES;
  lines: Array<string>;
}

export type LineActionTypes = setLines;
