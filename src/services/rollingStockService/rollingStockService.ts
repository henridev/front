import ApiService, { RequestBody } from '../apiTemplate/api';
import DateTimeService from '../utils/dateTime';
import {
  ApiRollingStockResponse,
  ApiRequestUsedUpdate,
  ApiUsedUpdateResponse,
} from './rollingStock.api.types';

class RollingStockService extends ApiService {
  constructor() {
    super();
    this.endPoint = `${this.endPoint}/v1/rolling-stock`;
    this.credentials = 'include';
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
   * appel à l'api pour les matériels roulants
   */
  public async loadRollingStock(): Promise<ApiRollingStockResponse> {
    this.setMethod('GET');
    try {
      const res = await fetch(`${this.endPoint}/services`, this.request());

      let rawData = await res.text();
      const data = this.rollingStockParser(rawData);

      const response: ApiRollingStockResponse = data;

      return response;
    } catch (error) {
      throw Error(`load rolling-stock information failed --> ${error}`);
    }
  }

  // change name
  public async postUsedUpdate(id: number, isUsed: boolean): Promise<ApiUsedUpdateResponse> {
    this.setMethod('POST');
    try {
      const infoBody = new RequestBody<ApiRequestUsedUpdate>({ id, isUsed });
      const res = await fetch(`${this.endPoint}/used`, this.request(infoBody.requestBody));

      // TODO - error handling upon res
      if (res.status !== 201) {
        throw new Error(`failed changing status for ${id}`);
      }
      return 'success';
    } catch (error) {
      throw Error(`load rolling-stock information failed --> ${error}`);
    }
  }

  /**
   * load rolling stock lines
   */
  public async loadLines(): Promise<Array<string>> {
    this.setMethod('GET');
    try {
      const res = await fetch(`${this.endPoint}/lines`, this.request());
      return await res.json();
    } catch (error) {
      throw Error(`failed to get line list: ${error.toString()}`);
    }
  }

  private rollingStockParser(rawData: string) {
    const dateTimeCreator = (_: any, value: any) => {
      if (typeof value !== 'string') return value;
      const isISOString = new DateTimeService().isoDateParser(value, true);

      if (isISOString) return new Date(value);
      return value;
    };
    return JSON.parse(rawData, dateTimeCreator);
  }
}

export default new RollingStockService();
