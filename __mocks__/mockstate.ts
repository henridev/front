import { DashboardDTO } from "../src/services/rollingStockService/rollingStock.api.types";
import { User } from "../src/models/user.model";
import { AuthorityDTO } from "../src/services/credentialsService/credentials.api.types";

const someDate = new Date(2018, 11, 24, 10, 33, 30, 0);

export const rollingStockMock: DashboardDTO[] = [
  {
    id: 1,
    trainCode: "1234",
    isUsed: false,
    NC: someDate,
    NP: someDate,
    MEP: someDate,
    DEGRAF: someDate,
    DESIN_MOST_RECENT: someDate,
    DESIN_BEFORE_MOST_RECENT: someDate,
  },
];

export const testUser: User = {
  id: 1,
  registration_number: "PAOI00921",
  line_id: "13",
  organisation: "RATP",
  roles: [6, 3, 1],
};

/**
 * credentials requests
 */
export const authorityMock: AuthorityDTO[] = [
  {
    id: 1,
    roles: [2],
    organisation: "RATP",
    line_id: "13",
    registration_number: "test",
  },
];
