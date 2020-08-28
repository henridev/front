import { User } from "../../models/user.model";

/**
 * authorization State and Actions interfaces
 */

// state
export interface UserState {
  authenticated: boolean;
  user?: User;
}

// constants for action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// action interfaces
export interface loginAction {
  type: typeof LOGIN;
  user: User;
}
export interface logoutAction {
  type: typeof LOGOUT;
}
export type UserActionTypes = loginAction | logoutAction;
