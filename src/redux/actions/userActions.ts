import { LOGIN, LOGOUT, UserActionTypes } from "../types/userTypes";
import { User } from "../../models/user.model";

/**
 * authorization Action functions
 */
export const login = (user: User): UserActionTypes => {
  return {
    type: LOGIN,
    user,
  };
};
export const logout = (): UserActionTypes => {
  return {
    type: LOGOUT,
  };
};

export const userActions = {
  login,
  logout,
};

export default userActions;
