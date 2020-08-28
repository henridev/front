import { ApiMethod, KeyValue } from "./api.types";

const  { REACT_APP_API_URL = "/api"} = process.env;
/**
 * Class to configure api requests using fetch
 * @param {sting} _accessToken - example string as means of authenticating
 */
export class ApiService {
  
  private _method = "POST";
  private _headers: string[][] = [];
  private _endPoint: string =
    `${REACT_APP_API_URL}` || "http://localhost:4000/api";
  private _redirect: RequestRedirect = "error";
  private _credentials: RequestCredentials = "include";

  get headers(): string[][] {
    return this._headers;
  }

  get endPoint(): string {
    return this._endPoint;
  }

  set method(newMethod: ApiMethod) {
    this._method = newMethod;
  }

  set endPoint(newEndPoint: string) {
    this._endPoint = newEndPoint;
  }

  set redirect(newRedirect: RequestRedirect) {
    this._redirect = newRedirect;
  }

  set credentials(newCredentials: RequestCredentials) {
    this._credentials = newCredentials;
  }
  /**
   * function to determine headers a fetch request
   * @param {KeyValue} headers - key-value pairs specifying headers to use
   */
  public setHeaders(headers: KeyValue<string, string>[]): ApiService {
    headers.forEach((header) => {
      if (header.hasOwnProperty("key") && header.hasOwnProperty("value")) {
        this._headers.push([header.key, header.value]); // fetch api requires a nested array of string
      }
    });
    return this;
  }

  public resetHeaders(): ApiService {
    this._headers = [];
    return this;
  }

  public setMethod(newMethod: ApiMethod): ApiService {
    this._method = newMethod;
    return this;
  }

  /**
   * function to package up valid request data
   * @param {RequestInit} body
   * @returns {RequestInit} - valid fetch request initializer
   */
  public request<T>(body?: T): RequestInit {
    return body
      ? {
          redirect: this._redirect,
          credentials: this._credentials,
          headers: this._headers,
          method: this._method,
          body: JSON.stringify(body),
        }
      : {
          redirect: this._redirect,
          credentials: this._credentials,
          headers: this._headers,
          method: this._method,
        };
  }
}

/**
 * class to make valid request data body
 * send along with the fetch request
 * helps in tailloring requestbodies for each request
 */
export class RequestBody<T> {
  constructor(private _requestBody: T) {}

  get requestBody(): T {
    return this._requestBody;
  }

  set requestBody(newRequestBody: T) {
    this._requestBody = newRequestBody;
  }
}

export default ApiService;
