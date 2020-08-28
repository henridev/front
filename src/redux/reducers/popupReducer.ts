import { PopupActionTypes, HIDE, SHOW, PopupState } from "../types/popupTypes";
import { initPopupState } from "../config/initialState";

export const popupReducer = (
  state = initPopupState,
  action: PopupActionTypes
): PopupState => {
  switch (action.type) {
    case HIDE:
      return {
        ...state,
        isVisible: false,
        message: undefined,
        popupType: undefined,
      };
    case SHOW:
      return {
        ...state,
        isVisible: true,
        message: action.payload.message,
        popupType: action.payload.popupType,
      };
    default:
      return state;
  }
};

export default popupReducer;
