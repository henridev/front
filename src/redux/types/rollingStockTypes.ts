/**
 * rollingstock State and Actions - generic api form
 */

import { DashboardDTO } from '../../services/rollingStockService/rollingStock.api.types';
import { RollingStockFilter } from '../../models/rolling-stock.model';

// state
export interface CountState {
  completed: number;
  toClean: number;
  toDisinfect: number;
  total: number;
}

export interface RollingStockState {
  statusCounts: CountState;
  rollingStocks: DashboardDTO[];
  filter: {
    status?: RollingStockFilter;
    code?: string;
  };
  lines: Array<string>;
}

// constants for action types
export const SET_ROLLINGSTOCK = 'SET_ROLLINGSTOCK';
export const SET_ROLLINGSTOCK_IS_USED = 'SET_ROLLINGSTOCK_IS_USED';
export const SET_ROLLINGSTOCK_STATUS = 'SET_ROLLINGSTOCK_STATUS';
export const SET_ROLLINGSTOCK_FILTER_STATUS = 'SET_ROLLINGSTOCK_FILTER_STATUS';
export const SET_ROLLINGSTOCK_FILTER_CODE = 'SET_ROLLINGSTOCK_FILTER_CODE';
export const SET_ROLLINGSTOCK_COUNTS = 'SET_ROLLINGSTOCK_COUNTS';

// action interfaces
export interface setRollingStockAction {
  type: typeof SET_ROLLINGSTOCK;
  dashBoardDTO: DashboardDTO[];
  today: number;
}
export interface setRollingStockIsUsedAction {
  type: typeof SET_ROLLINGSTOCK_IS_USED;
  id: number;
}
export interface setrollingStockFilterStatusAction {
  type: typeof SET_ROLLINGSTOCK_FILTER_STATUS;
  status?: RollingStockFilter;
}
export interface setrollingStockFilterCodeAction {
  type: typeof SET_ROLLINGSTOCK_FILTER_CODE;
  code?: string;
}
export interface setStatusesCountsAction {
  type: typeof SET_ROLLINGSTOCK_COUNTS;
  statusCounts: CountState;
}

export type RollingStockActionTypes =
  | setRollingStockAction
  | setRollingStockIsUsedAction
  | setrollingStockFilterStatusAction
  | setrollingStockFilterCodeAction
  | setStatusesCountsAction;
