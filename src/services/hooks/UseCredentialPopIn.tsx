import * as _ from 'lodash';
import { shallowEqual, useDispatch } from 'react-redux';
import { User } from '../../models/user.model';
import * as Action from '../../redux/actions/credentialPopInActions';
import { AuthorityDTO } from '../credentialsService/credentials.api.types';
import { useTypedSelector } from './useTypedSelector';
import { useAsyncActions } from './useAsyncActions';

export const useCredentialPopIn = () => {
  const dispatch = useDispatch();
  const { createUser, deleteUser, loadCredentials, showError } = useAsyncActions();
  const selectedUser = useTypedSelector((state) => state.credentialPopInState.selectedUser, shallowEqual);

  function closeCredentialPopIn() {
    dispatch(Action.closeCredentialPopInAction());
    unselectUser();
  }

  function openCredentialPopIn() {
    dispatch(Action.openCredentialPopInAction());
  }

  function selectUser(user: AuthorityDTO) {
    dispatch(Action.selectUserAction(user));
  }

  function unselectUser() {
    dispatch(Action.unselectUserAction());
  }

  function validateCredentialPopIn() {
    dispatch(Action.validateCredentialPopInAction());
  }

  function unvalidateCredentialPopIn() {
    dispatch(Action.unvalidateCredentialPopInAction());
  }

  /**
   * Submit user creation
   * Submit user update if updated
   * TODO : should display feedback
   */
  async function submitCredentialPopIn(user: User | null) {
    if (user === null) return;
    if (_.isEqual(_.omit(user, ['__proto__']), _.omit(selectedUser, ['__proto__']))) {
      closeCredentialPopIn();
      return;
    }
    const response = await createUser(user);
    if (response.ok) {
      loadCredentials();
      closeCredentialPopIn();
    } else {
      showError(await response.message);
      // TODO : Display error to user
    }
  }

  async function deleteCredentialPopIn() {
    if (selectedUser.id === -1) return;
    const response = await deleteUser(selectedUser.id);
    if (response.ok) {
      loadCredentials();
      closeCredentialPopIn();
    } else {
      showError(response.message);
      // TODO : Display error to user
    }
  }

  return {
    closeCredentialPopIn,
    openCredentialPopIn,
    selectUser,
    submitCredentialPopIn,
    deleteCredentialPopIn,
    unvalidateCredentialPopIn,
    validateCredentialPopIn,
  };
};
