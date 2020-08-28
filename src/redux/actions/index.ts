import userActions from "./userActions";
import rollingStockActions from "./rollingStockActions";

export const combinedActions = {
  ...userActions,
  rollingStockActions,
};

export default combinedActions;
