import { useHistory } from "react-router-dom";
import { User } from "../../models/user.model";
import { Role } from "../../models/role.model";
import { Endpoints } from "../../routes/endpoint.config";

// type State = boolean;

/**
 * hook pour rediriger
 * utilisateur en fonction des rôles
 */
export function useRoutingRedirect(this: any) {
  // const [isValidated, setisValidated] = useState<State | undefined>(undefined);
  const history = useHistory();

  /**
   * determine redirection basse sur role
   * @param user
   */
  const redirectUser = (user: User) => {
    // mettre page utilise

    if (user.roles.includes(Role.RP)) {
      return history.push(Endpoints.DASHBOARD);
    }

    if (user.roles.includes(Role.AGENT)) return history.push(Endpoints.PRESTA);

    if (
      user.roles.includes(Role.RP) ||
      user.roles.includes(Role.SAGENT) ||
      user.roles.includes(Role.PCC)
    ) {
      return history.push(Endpoints.DASHBOARD);
    }

    if (user.roles.includes(Role.ADMIN)) {
      return history.push(Endpoints.HABILITATION);
    }
  };

  const redirectLogout = () => {
    history.push(Endpoints.LOGIN);
  };

  return { redirectUser, redirectLogout };
}
