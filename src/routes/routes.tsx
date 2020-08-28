import React, { ComponentType, FC, Fragment } from 'react';
import { Route as RouteDom, Switch, Redirect } from 'react-router-dom';
import { Endpoints as EP } from './endpoint.config';
// components shared
import NotFound from '../pages/404';
import Homepage from '../pages/Home.page';
import PrivateRoute from '../components/authorization/PrivateRoute';
// components presta
import Confirmation from '../pages/prestataires/Confirmation.page';
import Selectionpage from '../pages/prestataires/Selection.page';
import QrScannerpage from '../pages/prestataires/QrScanner.page';
import ByNumberPage from '../pages/prestataires/ByNumber.page';
import Success from '../pages/prestataires/Success.page';
import NavigatorPhone from '../components/navigators/Navigator.phone';
// components non presta
import Dashboard from '../pages/responsable/Dashboard.page';
import Historypage from '../pages/responsable/History.page';
import Credentialspage from '../pages/responsable/Credentials.page';
import NavigatorTablet from '../components/navigators/Navigator.tablet';

interface RenderRoutesProps {
  routes: Route[];
  Shared?: FC | ComponentType | any;
}

interface Route {
  key: string;
  Component: FC | ComponentType | any;
  path?: string;
  exact?: boolean;
  routes?: Route[];
  isTablet?: boolean;
}

const ROUTES: Route[] = [
  {
    path: EP.LOGIN,
    key: 'LOGIN',
    exact: true,
    Component: () => <Homepage />,
  },
  {
    path: EP.PRESTA,
    key: 'APP_PRESTA',
    exact: false,
    Component: (props: RenderRoutesProps) => {
      return <RenderRoutes {...props} routes={props.routes} Shared={NavigatorPhone} />;
    },
    routes: [
      {
        path: EP.PRESTA,
        key: 'PRESTA_ROOT',
        exact: true,
        Component: () => <PrivateRoute Component={Selectionpage} path={EP.PRESTA} />,
      },
      {
        path: EP.PRESTA_QR_SCANNER,
        key: 'PRESTA_SCANNER',
        exact: true,
        Component: () => <PrivateRoute Component={QrScannerpage} path={EP.PRESTA_QR_SCANNER} />,
      },
      {
        path: EP.PRESTA_BY_NUMBER,
        key: 'PRESTA_NUMBER',
        exact: true,
        Component: () => <PrivateRoute Component={ByNumberPage} path={EP.PRESTA_BY_NUMBER} />,
      },
      {
        path: EP.PRESTA_SELEC,
        key: 'PRESTA_SELECTION',
        exact: true,
        Component: () => <PrivateRoute Component={Selection} path={EP.PRESTA_SELEC} />,
      },
      {
        path: EP.PRESTA_CONFIRM,
        key: 'PRESTA_CONFIRM',
        exact: true,
        Component: () => <PrivateRoute Component={Confirmation} path={EP.PRESTA_CONFIRM} />,
      },
      {
        path: EP.PRESTA_SUCCESS,
        key: 'PRESTA_SUCCES',
        exact: true,
        Component: () => <PrivateRoute Component={Success} path={EP.PRESTA_SUCCESS} />,
      },
    ],
  },
  {
    path: EP.DASHBOARD,
    key: 'APP',
    Component: (props: RenderRoutesProps) => {
      return <RenderRoutes {...props} routes={props.routes} Shared={NavigatorTablet} />;
    },
    routes: [
      {
        path: EP.DASHBOARD,
        key: 'APP_ROOT',
        exact: true,
        Component: () => <PrivateRoute Component={Dashboard} path={EP.DASHBOARD} />,
      },
      {
        path: EP.HABILITATION,
        key: 'APP_HAB',
        exact: true,
        Component: () => <PrivateRoute Component={Credentialspage} path={EP.HABILITATION} />,
      },
      {
        path: EP.HISTORY,
        key: 'APP_HIST',
        exact: true,
        Component: () => <PrivateRoute Component={Historypage} path={EP.HISTORY} />,
      },
    ],
  },
  {
    path: '/login',
    key: 'LOGIN_REDIRECT',
    exact: true,
    Component: () => <Redirect to={'/'} />,
  },
];

/**
 * Render a single route that is part of a certain route group
 * @param route
 */
function RouteWithSubRoutes(route: Route) {
  const { Component, path, routes, exact } = route;
  console.log('exact :>> ', exact, path);
  return (
    <RouteDom
      path={path}
      exact={exact}
      render={(props) => <Component {...props} routes={routes} />}
    />
  );
}

/**
 * render route with subroutes
 * @param props - desctructure all defined sub-route and a an optional shared-component
 */
export function RenderRoutes({ routes, Shared }: RenderRoutesProps) {
  return (
    <Fragment>
      {Shared ? <Shared /> : null}
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes
            {...route}
            key={route.key}
            path={route.path}
            Component={route.Component}
          />
        ))}
        <RouteDom component={() => <NotFound />} />
      </Switch>
    </Fragment>
  );
}

export default ROUTES;
