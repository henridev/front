import { PopupType } from "../../components/generic/Popup";

// state
export interface PopupState {
  isVisible: boolean;
  message?: string;
  popupType?: PopupType;
}

// constants for action types
export const HIDE = "HIDE";
export const SHOW = "SHOW";

export interface hide {
  type: typeof HIDE;
}

export interface show {
  type: typeof SHOW;
  payload: { message: string; popupType: PopupType };
}

export type PopupActionTypes = hide | show;
