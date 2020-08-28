import { testUser } from "../../../__mocks__/mockstate";
import { userReducer } from "./userReducer";
import { login, logout } from "../actions/userActions";
import { UserState } from "../types/userTypes";

/**
 * TEST-SUITE - USER REDUCERS
 */
describe("USER REDUCER", () => {
  const expectedUserStateLogin: UserState = {
    user: testUser,
    authenticated: true,
  };
  const expectedUserStateLogout: UserState = {
    user: undefined,
    authenticated: false,
  };
  it("should handle LOGIN", () => {
    expect(userReducer(undefined, login(testUser))).toEqual(
      expectedUserStateLogin
    );
  });
  it("should handle LOGOUT", () => {
    expect(userReducer(expectedUserStateLogin, logout())).toEqual(
      expectedUserStateLogout
    );
  });
});
