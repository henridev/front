import { userActions } from "./userActions";

import { testUser } from "../../../__mocks__/mockstate";
import { LOGIN, LOGOUT } from "../types/userTypes";

/**
 * TEST-SUITE - USER ACTIONS
 */
describe("USER ACTIONS", () => {
  it("should create a LOGIN action", () => {
    const expectedAction = {
      type: LOGIN,
      user: testUser,
    };
    expect(userActions.login(testUser)).toEqual(expectedAction);
  });

  it("should create a LOGOUT action", () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(userActions.logout()).toEqual(expectedAction);
  });
});
