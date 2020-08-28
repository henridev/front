import ApiService from "../apiTemplate/api";
import { RoleDTO } from "./role.api.types";

class RoleService extends ApiService {
  constructor() {
    super();
    this.credentials = "include";
    this.redirect = "follow";
    this.setHeaders([
      {
        key: "Accept",
        value: "application/json",
      },
      {
        key: "ContentType",
        value: "application/json",
      },
    ]);
  }

  /**
   * get roles
   */
  public async loadRoles(): Promise<Array<RoleDTO>> {
    this.setMethod("GET");
    try {
      const res = await fetch(
        `${this.endPoint}/v1/role`,
        this.request()
      );
      const data = await res.json();
      return data as RoleDTO[];
    } catch (error) {
      throw Error(
        `failed retrieve role information due to --> ${error.toString()}`
      );
    }
  }

}

export default new RoleService();