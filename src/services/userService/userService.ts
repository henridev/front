import ApiService from '../apiTemplate/api';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model';
import { Token } from './user.api.types';
import CookieService from '../utils/cookie';
import { HttpResponse } from '../../services/apiTemplate/api.types'; // why imported?

class UserService extends ApiService {
  constructor() {
    super();
    this.credentials = 'include';
    this.redirect = 'follow';
    this.setHeaders([
      {
        key: 'Accept',
        value: 'application/json',
      },
      {
        key: 'Content-Type',
        value: 'application/json',
      },
    ]);
  }

  /**
   * Check le status de la connexion du compte avec le SSO
   */
  public async checkStatusLoginSSO() {
    this.setMethod('GET');
    try {
      const request = await fetch(`${this.endPoint}/auth/check-auth`, {
        credentials: 'include',
        method: 'GET',
      });
      if (request.status === 200) return true;
      return false;
    } catch (err) {
      console.log(`Unable to connect due to --> ${err}`);
      return false;
    }
  }

  /**
   * Retourne les informations utilisateur en fonction du token présent dans les cookies retourné par le SSO.
   * @param cookies - cookies du navigateur
   * @returns {User}
   */
  public async checkLoginSSO() {
    try {
      const userToken = await new CookieService().getCookie('authorization');

      const statusLoginSSO = await this.checkStatusLoginSSO();

      if (userToken && statusLoginSSO) {
        return this.getJwtToUser(userToken as string);
      } else {
        return null;
      }
    } catch (err) {
      throw Error(`login failed due to --> ${err}`);
    }
  }

  /**
   * logout
   */
  public async logout() {
    this.setMethod('GET');
    try {
      await new CookieService().removeCookie('authorization');
      await fetch(`${this.endPoint}/auth/logout`, {
        credentials: 'include',
        mode: 'no-cors'
      });
    } catch (err) {
      throw Error(`logout failed due to --> ${err}`);
    }
  }

  /**
   * Create User
   */
  public async createUser(user: User): Promise<HttpResponse> {
    this.setMethod('POST');
    try {
      const res = await fetch(`${this.endPoint}/v1/user`, this.request(user));
      return { ok: res.ok, message: (res.json() as unknown) as string };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create User
   */
  public async deleteUser(id: number): Promise<HttpResponse> {
    this.setMethod('DELETE');
    try {
      const res = await fetch(`${this.endPoint}/v1/user/${id}`, this.request());
      return { ok: res.ok, message: '' };
    } catch (err) {
      throw Error(`Can not delete user : --> ${err}`);
    }
  }

  private getJwtToUser(token: string): User {
    const decoded = jwt.decode(token) as Token;
    if (!decoded || !decoded.payload) throw Error('Invalid token');
    return decoded.payload;
  }
}

export default new UserService();
