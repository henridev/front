import React, { ComponentType, FC } from 'react';
import { useTypedSelector } from '../../services/hooks/useTypedSelector';
import { Redirect } from 'react-router-dom';
import { routesInfo } from '../../routes/endpoint.config';

const disableCheck = false;

type Props = { path: string; Component: FC | ComponentType | any };

export default function PrivateRoute({ Component, path }: Props) {
  const userData = useTypedSelector(({ userState }) => userState);

  const isAuthorized = (roles: number[]): boolean => {
    let routeInfo = Object.entries(routesInfo).find(([route_endpoint]) => route_endpoint === path);
    return roles.some((role) => routeInfo && routeInfo[1].authorized.includes(role));
  };

  // only for development purposes
  if (disableCheck && process.env.NODE_ENV === 'development') return <Component />;

  // if login not confirmed or no use defined redirect to login
  if (!userData.authenticated || !userData.user) return <Redirect to={'/'} />;

  const currentRoles = userData.user.roles;
  // if role is allowed on this route then render the passed in child component
  // else also redirect to login or maybe we should redirect to unauthorize page ?
  if (currentRoles && isAuthorized(currentRoles)) return <Component />;

  return <Redirect to={'/'} />;
}
