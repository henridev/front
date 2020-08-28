import * as ActionType from '../types/credentialPopInTypes';
import { AuthorityDTO } from '../../services/credentialsService/credentials.api.types';

export function closeCredentialPopInAction(): ActionType.CloseCredentialPopInAction {
  return {
    type: ActionType.CLOSE_POPIN,
  };
}
export function openCredentialPopInAction(): ActionType.OpenCredentialPopInAction {
  return {
    type: ActionType.OPEN_POPIN,
  };
}
export function selectUserAction(user: AuthorityDTO): ActionType.SelectUserAction {
  return {
    type: ActionType.TABLE_CUSTOM_USER_SELECTED,
    payload: user,
  };
}
export function unselectUserAction(): ActionType.UnselectUserAction {
  return {
    type: ActionType.TABLE_CUSTOM_USER_UNSELECTED
  };
}
export function validateCredentialPopInAction(): ActionType.ValidateCredentialPopInAction {
  return {
    type: ActionType.VALIDATE_POPIN,
  };
}

export function unvalidateCredentialPopInAction(): ActionType.UnvalidateCredentialPopInAction {
  return {
    type: ActionType.RESET_VALIDATION_POPIN,
  };
}
