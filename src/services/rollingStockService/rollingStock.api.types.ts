// import { RollingStock } from "../../models/rolling-stock.model";

import { RollingStockFilter, DisinfectionStatus } from '../../models/rolling-stock.model';

export interface DashboardDTO {
  id: number;
  trainCode: string;
  isUsed: boolean;
  NC?: Date;
  NP?: Date;
  MEP?: Date;
  DEGRAF?: Date;
  DESIN_MOST_RECENT?: Date;
  DESIN_BEFORE_MOST_RECENT?: Date;
  disinfectionStatus?: DisinfectionStatus;
  isCleanedToday?: boolean;
}

export type ApiRequestRollingStock = {
  id: number;
};

export type ApiRequestUsedUpdate = {
  id: number;
  isUsed: boolean;
};

export type ApiRollingStockResponse = DashboardDTO[];
export type ApiUsedUpdateResponse = string;
