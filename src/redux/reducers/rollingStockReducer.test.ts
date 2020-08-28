import {
  requestRollingStock,
  responseRollingStock,
  errorRollingStock,
  updateRollingStockUsed,
  requestIsUsedUpdate,
  responseIsUsedUpdate,
  errorIsUsedUpdate,
  setStatuses,
  setFilterStatus,
  setFilterCode,
  setStatusesCount,
} from '../actions/rollingStockActions';
import { rollingStockReducer, setStockStatuses } from './rollingStockReducer';
import { initRollingStockState } from '../config/initialState';
import { rollingStockMock } from '../../../__mocks__/mockstate';
import { RollingStockState } from '../types/rollingStockTypes';
import { RollingStockFilter, DisinfectionStatus } from '../../models/rolling-stock.model';
import {
  loadingState,
  loadingResponseState,
  loadingErrorState,
  updateState,
  updateResponseState,
  updateErrorState,
} from './apiStates';
import { calcStatusCount } from '../../services/utils/Utils';

/**
 * TEST-SUITE - ROLLINGSTOCK REDUCER
 */
describe('ROLLINGSTOCK REDUCER', () => {
  const rollingStockMockWithStatuses = setStockStatuses(rollingStockMock, Date.now()).rollingStocks;
  const countState = calcStatusCount(rollingStockMockWithStatuses);

  const expectedStateRequest: RollingStockState = {
    ...initRollingStockState,
    meta: loadingState,
  };

  const expectedStateResponse: RollingStockState = {
    ...initRollingStockState,
    rollingStocks: rollingStockMockWithStatuses,
    meta: loadingResponseState,
  };

  const expectedStateError: RollingStockState = {
    ...initRollingStockState,
    meta: {
      ...loadingErrorState,
      errorInfo: '500 internal server isError',
    },
  };

  const expectedUpdatedState: RollingStockState = {
    ...expectedStateResponse,
    rollingStocks: [
      {
        ...rollingStockMockWithStatuses[0],
        isUsed: rollingStockMockWithStatuses[0].isUsed ? false : true,
      },
    ],
  };
  const expectedUpdatedCountState: RollingStockState = {
    ...expectedStateResponse,
    statusCounts: countState,
  };

  const expectedRequestUpdatedState: RollingStockState = {
    ...expectedUpdatedState,
    meta: updateState,
  };
  const expectedResponseUpdatedState: RollingStockState = {
    ...expectedRequestUpdatedState,
    meta: updateResponseState,
  };
  const expectedisErrorUpdatedState: RollingStockState = {
    ...expectedRequestUpdatedState,
    meta: {
      ...updateErrorState,
      errorInfo: 'failed to change used status',
      errorId: 1,
    },
  };
  const _expectedisErrorUpdatedState: RollingStockState = {
    ...expectedRequestUpdatedState,
    rollingStocks: [
      {
        ...rollingStockMockWithStatuses[0],
      },
    ],
    meta: {
      ...updateErrorState,
      errorInfo: 'failed to change used status',
      errorId: 1,
    },
  };

  const expectedUpdatedStatusState: RollingStockState = {
    ...expectedStateResponse,
    rollingStocks: rollingStockMockWithStatuses,
  };
  const expectedFilterState: RollingStockState = {
    ...expectedStateResponse,
    filter: { status: RollingStockFilter.TO_DISINFECT, code: undefined },
  };
  const _expectedFilterState: RollingStockState = {
    ...expectedStateResponse,
    filter: { status: undefined, code: '3' },
  };
  it('should handle REQUEST_ROLLINGSTOCK', () => {
    expect(rollingStockReducer(initRollingStockState, requestRollingStock())).toEqual(
      expectedStateRequest,
    );
  });

  it('should handle RESPONSE_ROLLINGSTOCK', () => {
    expect(
      rollingStockReducer(expectedStateRequest, responseRollingStock(rollingStockMock, Date.now())),
    ).toEqual(expectedStateResponse);
  });

  it('should handle ERROR_ROLLINGSTOCK', () => {
    expect(
      rollingStockReducer(expectedStateRequest, errorRollingStock('500 internal server isError')),
    ).toEqual(expectedStateError);
  });

  it('should handle UPDATE_ROLLINGSTOCK_USED', () => {
    expect(rollingStockReducer(expectedStateResponse, updateRollingStockUsed(1))).toEqual(
      expectedUpdatedState,
    );
  });

  it('should handle REQUEST_POST_USED', () => {
    expect(rollingStockReducer(expectedUpdatedState, requestIsUsedUpdate())).toEqual(
      expectedRequestUpdatedState,
    );
  });

  it('should handle RESPONSE_POST_USED', () => {
    expect(rollingStockReducer(expectedRequestUpdatedState, responseIsUsedUpdate())).toEqual(
      expectedResponseUpdatedState,
    );
  });

  it('should handle ERROR_POST_USED', () => {
    expect(
      rollingStockReducer(
        expectedRequestUpdatedState,
        errorIsUsedUpdate(1, 'failed to change used status'),
      ),
    ).toEqual(expectedisErrorUpdatedState);
  });

  it('should handle UPDATE_ROLLINGSTOCK_USED after ERROR_POST_USED ', () => {
    const errortState = rollingStockReducer(
      expectedRequestUpdatedState,
      errorIsUsedUpdate(1, 'failed to change used status'),
    );

    expect(
      rollingStockReducer(errortState, updateRollingStockUsed(errortState.meta.errorId!)),
    ).toEqual(_expectedisErrorUpdatedState);
  });

  it('should handle SET_ROLLINGSTOCK_STATUS', () => {
    expect(rollingStockReducer(expectedStateResponse, setStatuses(Date.now()))).toEqual(
      expectedUpdatedStatusState,
    );
  });

  it('should handle SET_ROLLINGSTOCK_COUNTS', () => {
    expect(rollingStockReducer(expectedUpdatedStatusState, setStatusesCount(countState))).toEqual(
      expectedUpdatedCountState,
    );
  });

  it('should handle SET_ROLLINGSTOCK_FILTER_STATUS', () => {
    expect(
      rollingStockReducer(expectedStateResponse, setFilterStatus(RollingStockFilter.TO_DISINFECT)),
    ).toEqual(expectedFilterState);
  });

  it('should handle SET_ROLLINGSTOCK_FILTER_CODE', () => {
    expect(rollingStockReducer(expectedStateResponse, setFilterCode('3'))).toEqual(
      _expectedFilterState,
    );
  });
});
