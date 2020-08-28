import { CredentialsState } from '../types/credentialsTypes';
import { CredentialPopInState } from '../types/credentialPopInTypes';
import { PopupState } from '../types/popupTypes';
import { RollingStockState } from '../types/rollingStockTypes';
import { UserState } from '../types/userTypes';
import { LineState } from '../types/lineTypes';
import { RolesState } from '../types/roleTypes';
import { AppStore } from '../types';
import { ApiState } from '../types/ApiTypes';

export const initApiState: ApiState = {
  credentials: {
    isUpdated: false,
    isLoaded: false,
    isError: false,
  },
  rollingstock: {
    isUpdated: false,
    isLoaded: false,
    isError: false,
  },
  lines: {
    isLoaded: false,
    isError: false,
  },
  roles: {
    isLoaded: false,
    isError: false,
  },
};

export const initRollingStockState: RollingStockState = {
  statusCounts: {
    toClean: 0,
    toDisinfect: 0,
    completed: 0,
    total: 0,
  },
  filter: {
    status: undefined,
    code: undefined,
  },
  rollingStocks: [],
  lines: [],
};

export const initCredentialsState: CredentialsState = {
  credentials: [],
  user: undefined,
  id: undefined,
};

export const initLineState: LineState = {
  lines: [],
};

export const initRoleState: RolesState = {
  roles: [],
};

export const initUserState: UserState = {
  authenticated: false,
  user: undefined,
};

export const initPopupState: PopupState = {
  isVisible: false,
};

export const initCredentialPopInState: CredentialPopInState = {
  meta: {
    validating: false,
    open: false,
  },
  selectedUser: { id: -1 },
  employeeId: '',
  roleName: '',
  roleId: -1,
  line: '',
  company: '',
};

export const initStore: AppStore = {
  userState: initUserState,
  rollingStockState: initRollingStockState,
  credentialsState: initCredentialsState,
  credentialPopInState: initCredentialPopInState,
  popupState: initPopupState,
  lineState: initLineState,
  roleState: initRoleState,
  apiState: initApiState,
};

export default initStore;
