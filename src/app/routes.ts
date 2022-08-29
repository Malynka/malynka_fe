import { FunctionComponent } from "react";
import { Home, Clients } from '../pages';

export interface IRoute {
  path: string;
  Page: FunctionComponent;
}

const routes: IRoute[] = [
  {
    path: '/',
    Page: Home
  },
  {
    path: '/clients',
    Page: Clients
  }
];

export default routes;