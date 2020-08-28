import { popupActions } from "./popupActions";
import { HIDE, SHOW, show, hide } from "../types/popupTypes";
import { PopupType } from "../../components/generic/Popup";

/**
 * TEST-SUITE - POPUP ACTIONS
 */
describe("POPUP ACTIONS", () => {
  it("should create a LOGIN action", () => {
    const expectedAction: show = {
      type: SHOW,
      payload: {
        message: "hello world",
        popupType: PopupType.apiError,
      },
    };
    expect(popupActions.showPopup("hello world", PopupType.apiError)).toEqual(
      expectedAction
    );
  });

  it("should create a LOGOUT action", () => {
    const expectedAction: hide = {
      type: HIDE,
    };
    expect(popupActions.hidePopup()).toEqual(expectedAction);
  });
});
