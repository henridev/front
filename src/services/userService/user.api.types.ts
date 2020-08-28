import { User } from "../../models/user.model";

export type userRoleCategory = "rp" | "pres" | "pcc";

export type ApiRequestUser = {
  name: string;
  password: string;
};

export interface Token {
  payload: User;
}
