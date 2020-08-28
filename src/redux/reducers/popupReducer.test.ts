import { initPopupState } from "../config/initialState";
import { popupReducer } from "./popupReducer";
import { hidePopup, showPopup } from "../actions/popupActions";
import { PopupState } from "../types/popupTypes";
import { PopupType } from "../../components/generic/Popup";

/**
 * TEST-SUITE - POPUP REDUCER
 */
describe("POPUP REDUCER", () => {
  const message = "hello world";
  const popType = PopupType.apiError;
  const expectedStateShowState: PopupState = {
    ...initPopupState,
    isVisible: true,
    message: message,
    popupType: popType,
  };

  it("should handle SHOW", () => {
    expect(popupReducer(initPopupState, showPopup(message, popType))).toEqual(
      expectedStateShowState
    );
  });

  it("should handle HIDE", () => {
    expect(popupReducer(expectedStateShowState, hidePopup())).toEqual(
      initPopupState
    );
  });
});
