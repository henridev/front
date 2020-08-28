import { LOGIN, LOGOUT, UserActionTypes, UserState } from "../types/userTypes";
import { initUserState } from "../config/initialState";

export const userReducer = (
  state = initUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: undefined,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
