import { useDispatch } from 'react-redux';
import { useRoutingRedirect } from './useRoutingRedirect';
import { PopupType } from '../../components/generic/Popup';
import { User } from '../../models/user.model';
import { HttpResponse } from '../apiTemplate/api.types';
// actions
import { showPopup } from '../../redux/actions/popupActions';
import { login } from '../../redux/actions/userActions';
import credentialsActions from '../../redux/actions/credentialsActions';
import lineActions from '../../redux/actions/lineActions';
import roleActions from '../../redux/actions/roleActions';
import rollingStockActions from '../../redux/actions/rollingStockActions';
import apiActions from '../../redux/actions/apiActions';
// services
import CredendtialsService from '../credentialsService/credentialsService';
import RoleService from '../roleService/roleService';
import RollingStockService from '../rollingStockService';
import UserService from '../userService';
import { components } from '../../redux/types/ApiTypes';

/**
 * useAsyncActions - hook à utiliser en remplacement de redux thunk / saga
 * 3 fonctionnalités
 * > vérifier si les données sont mises en cache
 * > mettre à jour le statut de la requête (error-loading-response)
 * > gérer le popup d'erreur
 */
export const useAsyncActions = () => {
  const { redirectUser } = useRoutingRedirect();
  const dispatch = useDispatch();

  const rollingStockService = RollingStockService;
  const userService = UserService;
  const roleService = RoleService;
  const credentialsService = CredendtialsService;

  const showError = (msg: string) => dispatch(showPopup(`désolé, ${msg}`, PopupType.apiError));

  async function tryLogin() {
    try {
      const user = await UserService.checkLoginSSO();
      if (user) {
        dispatch(login(user));

        redirectUser(user);
      } else {
        return false;
      }
    } catch (error) {
      showError(`erreur du login`);
    }
  }

  async function loadRollingStock() {
    const dp = dispatchThunks(components.ROLLINGSTOCK);
    dp.req();
    try {
      const res = await rollingStockService.loadRollingStock();
      dp.res();
      dispatch(rollingStockActions.setRollingStock(res, Date.now()));
    } catch (error) {
      dp.err(error);
      showError(`erreur du chargement des rollingstock`);
    }
  }

  async function loadCredentials() {
    const dp = dispatchThunks(components.CREDENTIALS);
    dp.req();
    try {
      const res = await credentialsService.loadCredentials();
      dp.res();
      dispatch(credentialsActions.setCredentials(res));
    } catch (error) {
      dp.err(error);
      showError(`erreur du chargement des habilitations`);
    }
  }

  /**
   * modifier le status d'utilisation de ce matériel roulant
   * @param id - id de matériel roulant
   * @param newIsUSed - nouveau statut à mettre en œuvre
   */
  async function toggleUsedStatus(id: number, newIsUSed: boolean) {
    const dp = dispatchThunks(components.USED_UPDATE);
    dp.req();
    try {
      const _ = await rollingStockService.postUsedUpdate(id, newIsUSed);
      dp.res();
      dispatch(rollingStockActions.setRollingstockIsUsed(id));
    } catch (error) {
      dp.err(error);
      showError(`erreur du changement de statut`);
      // si la modification a échoué, signaler une erreur et retourner à la valeur initiale.
    }
  }

  async function getLines() {
    const dp = dispatchThunks(components.LINES);
    dp.req();
    try {
      const res = await rollingStockService.loadLines();
      dp.res();
      dispatch(lineActions.setLines(res));
    } catch (error) {
      dp.err(error);
      showError(`erreur du chargement des lines`);
    }
  }

  async function getRoles() {
    const dp = dispatchThunks(components.ROLES);
    dp.req();
    try {
      const res = await roleService.loadRoles();
      dp.res();
      dispatch(roleActions.setRoles(res));
    } catch (error) {
      dp.err(error);
      showError(`erreur du chargement des roles`);
    }
  }

  async function createUser(user: User): Promise<HttpResponse> {
    const dp = dispatchThunks(components.CREDENTIALS);
    dp.req();
    try {
      const res = await userService.createUser(user);
      if (res.ok) {
        dp.res();
        dispatch(credentialsActions.setUser(user));
      } else {
        dp.err(res.message);
      }
      return res;
    } catch (error) {
      dp.err(error);
      showError(`erreur pendant la création de l'utilisateur`);
      throw error;
    }
  }

  async function deleteUser(id: number): Promise<HttpResponse> {
    const dp = dispatchThunks(components.CREDENTIALS);
    dp.req();
    try {
      const res = await userService.deleteUser(id);
      dp.res();
      dispatch(credentialsActions.deleteUser(id));
      return res;
    } catch (error) {
      dp.err(error);
      showError(`erreur pendant l'effacement de l'utilisateur`);
      throw error;
    }
  }

  function dispatchThunks(comp: components) {
    const req = () => dispatch(apiActions.request(comp));
    const err = (err: any) => dispatch(apiActions.error(comp, err));
    const res = () => dispatch(apiActions.response(comp));

    return { req, res, err };
  }

  return {
    tryLogin,
    loadRollingStock,
    loadCredentials,
    toggleUsedStatus,
    createUser,
    deleteUser,
    getRoles,
    getLines,
    showError,
  };
};
