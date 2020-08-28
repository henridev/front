import { Role } from '../models/role.model';

export enum Endpoints {
  LOGIN = '/',
  PRESTA = '/prestataire',
  PRESTA_SELEC = '/prestataire/selection',
  PRESTA_QR_SCANNER = '/prestataire/scanner',
  PRESTA_BY_NUMBER = '/prestataire/number',
  PRESTA_CONFIRM = '/prestataire/confirmation',
  PRESTA_SUCCESS = '/prestataire/confirmation',
  DASHBOARD = '/smtr',
  HISTORY = '/smtr/history',
  HABILITATION = '/smtr/habilitations',
}

export const routesInfo = {
  [Endpoints.LOGIN]: {
    authorized: [Role.ADMIN, Role.RP, Role.SAGENT, Role.AGENT, Role.PCC],
  },
  [Endpoints.PRESTA]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.PRESTA_QR_SCANNER]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.PRESTA_BY_NUMBER]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.PRESTA_SELEC]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.PRESTA_CONFIRM]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.PRESTA_SUCCESS]: {
    authorized: [Role.AGENT],
  },
  [Endpoints.DASHBOARD]: {
    authorized: [Role.RP, Role.SAGENT, Role.PCC],
  },
  [Endpoints.HISTORY]: {
    authorized: [Role.RP, Role.SAGENT, Role.PCC],
  },
  [Endpoints.HABILITATION]: { authorized: [Role.ADMIN, Role.RP] },
};
