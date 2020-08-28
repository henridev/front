import * as _ from 'lodash';
import { DashboardDTO } from '../rollingStockService/rollingStock.api.types';
import { CountState } from '../../redux/types/rollingStockTypes';
import { DisinfectionStatus } from '../../models/rolling-stock.model';

export function someAreNil(...args: any[]): boolean {
  args.forEach((value, i) => {
    if (_.isNil(value) || !value) return true;
  });
  return false;
}

export function calcStatusCount(rollingStock: DashboardDTO[]): CountState {
  const count: CountState = {
    toDisinfect: 0,
    toClean: 0,
    completed: 0,
    total: 0,
  };
  rollingStock.forEach(({ isCleanedToday, disinfectionStatus }) => {
    count.total++;
    if (isCleanedToday && disinfectionStatus === DisinfectionStatus.GREEN) {
      count.completed++;
    } else {
      if (!isCleanedToday) count.toClean++;
      if (disinfectionStatus !== DisinfectionStatus.GREEN) count.toDisinfect++;
    }
  });
  return count;
}
