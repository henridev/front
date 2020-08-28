import * as rollingStockTypes from '../types/rollingStockTypes';
import * as _ from 'lodash';
import { DashboardDTO } from '../../services/rollingStockService/rollingStock.api.types';
import { RollingStockFilter } from '../../models/rolling-stock.model';

// API actions
export const setRollingStock = (
  dashBoardDTO: DashboardDTO[],
  today: number,
): rollingStockTypes.RollingStockActionTypes => {
  return {
    type: rollingStockTypes.SET_ROLLINGSTOCK,
    dashBoardDTO: _.isEmpty(dashBoardDTO) ? [] : dashBoardDTO,
    today,
  };
};

export const setRollingstockIsUsed = (id: number): rollingStockTypes.RollingStockActionTypes => {
  return {
    type: rollingStockTypes.SET_ROLLINGSTOCK_IS_USED,
    id,
  };
};
// local actions
export const setStatusCounts = (
  statusCounts: rollingStockTypes.CountState,
): rollingStockTypes.RollingStockActionTypes => {
  return {
    type: rollingStockTypes.SET_ROLLINGSTOCK_COUNTS,
    statusCounts,
  };
};
export const setFilterStatus = (
  status: RollingStockFilter | undefined,
): rollingStockTypes.RollingStockActionTypes => {
  return {
    type: rollingStockTypes.SET_ROLLINGSTOCK_FILTER_STATUS,
    status,
  };
};
export const setFilterCode = (
  code: string | undefined,
): rollingStockTypes.RollingStockActionTypes => {
  return {
    type: rollingStockTypes.SET_ROLLINGSTOCK_FILTER_CODE,
    code,
  };
};

export const rollingstockActions = {
  setRollingStock,
  setRollingstockIsUsed,
  setFilterStatus,
  setFilterCode,
  setStatusCounts,
};

export default rollingstockActions;
