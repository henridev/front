import ApiService from "../apiTemplate/api";
import { ApiCredentialsResponse } from "./credentials.api.types";

class CredendtialsService extends ApiService {
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
   * getCredentialss
   */
  public async loadCredentials(): Promise<ApiCredentialsResponse> {
    this.setMethod("GET");
    try {
      const res = await fetch(
        `${this.endPoint}/v1/user/authority`,
        this.request()
      );
      const data = await res.json();
      const response: ApiCredentialsResponse = data;
      return response;
    } catch (error) {
      throw Error(
        `failed retrieve authority information due to --> ${error.toString()}`
      );
    }
  }
}

export default new CredendtialsService();