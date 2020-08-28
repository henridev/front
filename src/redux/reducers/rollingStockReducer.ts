/**
 * reducer matériel roulant
 * Request / Response et Update sont des reducers génériques
 * ils pourraient être utilisés pour d'autres endpoints de l'api
 */
import * as rollingStockTypes from '../types/rollingStockTypes';
import { initRollingStockState } from '../config/initialState';
import { DashboardDTO } from '../../services/rollingStockService/rollingStock.api.types';
import { DisinfectionStatus } from '../../models/rolling-stock.model';

export const rollingStockReducer = (
  state = initRollingStockState,
  action: rollingStockTypes.RollingStockActionTypes,
): rollingStockTypes.RollingStockState => {
  switch (action.type) {
    // generic loading all data
    case rollingStockTypes.SET_ROLLINGSTOCK:
      return {
        ...state,
        ...setStockStatuses(action.dashBoardDTO, action.today),
      };
    case rollingStockTypes.SET_ROLLINGSTOCK_IS_USED:
      return {
        ...state,
        rollingStocks: state.rollingStocks?.map((rollingStock: DashboardDTO) => {
          if (rollingStock.id === action.id) {
            return { ...rollingStock, isUsed: !rollingStock.isUsed };
          }
          return rollingStock;
        }),
      };
    // set counts of statuses
    case rollingStockTypes.SET_ROLLINGSTOCK_COUNTS:
      return {
        ...state,
        statusCounts: action.statusCounts,
      };
    // change filters
    case rollingStockTypes.SET_ROLLINGSTOCK_FILTER_STATUS:
      const newState = Object.assign({}, state);
      newState.filter = {
        ...state.filter,
        status: action.status,
      };
      return newState;
    case rollingStockTypes.SET_ROLLINGSTOCK_FILTER_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          code: action.code,
        },
      };

    default:
      return state;
  }
};

export function setStockStatuses(
  rollingStocks: DashboardDTO[],
  timeToday: number,
): {
  rollingStocks: DashboardDTO[];
} {
  const updatedData = rollingStocks.map(({ ...rollingStock }) => {
    setDesinfectionAndCleanStatus(rollingStock, timeToday);
    return { ...rollingStock };
  });
  return { rollingStocks: updatedData };
}

function setDesinfectionAndCleanStatus(rollingStock: DashboardDTO, timeToday: number): void {
  let isCleanedToday = false;
  const msInDay = 86400000;

  const isLessThenDay = (date: Date | undefined) => {
    if (!date) return false;
    const difference = timeToday - date.valueOf();
    return difference < msInDay;
  };

  if (isLessThenDay(rollingStock.NP) || isLessThenDay(rollingStock.NC)) isCleanedToday = true;
  rollingStock.isCleanedToday = isCleanedToday;

  const checkOne = isLessThenDay(rollingStock.DESIN_MOST_RECENT);
  const checkTwo = isLessThenDay(rollingStock.DESIN_BEFORE_MOST_RECENT);

  if (checkOne && checkTwo) {
    rollingStock.disinfectionStatus = DisinfectionStatus.GREEN;
  } else if (checkOne || checkTwo) {
    rollingStock.disinfectionStatus = DisinfectionStatus.ORANGE;
  } else {
    rollingStock.disinfectionStatus = DisinfectionStatus.GREY;
  }
}

export default rollingStockReducer;
