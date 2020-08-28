import {
  REQUEST_ROLLINGSTOCK,
  RESPONSE_ROLLINGSTOCK,
  ERROR_ROLLINGSTOCK,
  REQUEST_POST_USED,
  UPDATE_ROLLINGSTOCK_USED,
  RESPONSE_POST_USED,
  ERROR_POST_USED,
  SET_ROLLINGSTOCK_STATUS,
  SET_ROLLINGSTOCK_FILTER_STATUS,
  SET_ROLLINGSTOCK_FILTER_CODE,
} from '../types/rollingStockTypes';
import { rollingStockMock } from '../../../__mocks__/mockstate';
import { rollingstockActions } from './rollingStockActions';
import { RollingStockFilter } from '../../models/rolling-stock.model';
/**
 * TEST-SUITE - ROLLINGSTOCK ACTIONS
 */
describe('ROLLINGSTOCK ACTIONS', () => {
  it('should create a REQUEST_ROLLINGSTOCK action', () => {
    const expectedAction = {
      type: REQUEST_ROLLINGSTOCK,
    };
    expect(rollingstockActions.requestRollingStock()).toEqual(expectedAction);
  });

  it('should create a ERROR_ROLLINGSTOCK action', () => {
    const errorInfo = 'error loading rolling stock';
    const expectedAction = {
      type: ERROR_ROLLINGSTOCK,
      errorInfo,
    };
    expect(rollingstockActions.errorRollingStock(errorInfo)).toEqual(expectedAction);
  });

  it('should create a RESPONSE_ROLLINGSTOCK action', () => {
    const dashBoardDTO = rollingStockMock;
    const expectedAction = {
      type: RESPONSE_ROLLINGSTOCK,
      dashBoardDTO,
    };
    expect(rollingstockActions.responseRollingStock(dashBoardDTO)).toEqual(expectedAction);
  });

  it('should create a REQUEST_POST_USED action', () => {
    const expectedAction = {
      type: REQUEST_POST_USED,
    };
    expect(rollingstockActions.requestIsUsedUpdate()).toEqual(expectedAction);
  });

  it('should create a UPDATE_ROLLINGSTOCK_USED action', () => {
    const id = 1;
    const expectedAction = {
      type: UPDATE_ROLLINGSTOCK_USED,
      id,
    };
    expect(rollingstockActions.updateRollingStockUsed(id)).toEqual(expectedAction);
  });

  it('should create a RESPONSE_POST_USED action', () => {
    const expectedAction = {
      type: RESPONSE_POST_USED,
    };
    expect(rollingstockActions.responseIsUsedUpdate()).toEqual(expectedAction);
  });

  it('should create a ERROR_POST_USED action', () => {
    const id = 1;
    const errorInfo = 'error updating used status';
    const expectedAction = {
      type: ERROR_POST_USED,
      payload: { id, errorInfo },
    };
    expect(rollingstockActions.errorIsUsedUpdate(id, errorInfo)).toEqual(expectedAction);
  });

  it('should create a SET_ROLLINGSTOCK_STATUS action', () => {
    const today = Date.now();
    const expectedAction = {
      type: SET_ROLLINGSTOCK_STATUS,
      today,
    };
    expect(rollingstockActions.setStatuses(today)).toEqual(expectedAction);
  });

  it('should create a SET_ROLLINGSTOCK_FILTER_STATUS action', () => {
    const status = RollingStockFilter.TO_DISINFECT;
    const expectedAction = {
      type: SET_ROLLINGSTOCK_FILTER_STATUS,
      status,
    };
    expect(rollingstockActions.setFilterStatus(status)).toEqual(expectedAction);
  });

  it('should create a SET_ROLLINGSTOCK_FILTER_CODE action', () => {
    const code = '1234';
    const expectedAction = {
      type: SET_ROLLINGSTOCK_FILTER_CODE,
      code,
    };
    expect(rollingstockActions.setFilterCode(code)).toEqual(expectedAction);
  });
});
