import { PopupActionTypes, HIDE, SHOW } from "../types/popupTypes";
import { PopupType } from "../../components/generic/Popup";

export const hidePopup = (): PopupActionTypes => {
  return {
    type: HIDE,
  };
};

export const showPopup = (
  message: string,
  popupType: PopupType
): PopupActionTypes => {
  return {
    type: SHOW,
    payload: { message, popupType },
  };
};

export const popupActions = {
  hidePopup,
  showPopup,
};
