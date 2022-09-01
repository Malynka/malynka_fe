import { FunctionComponent } from "react";
import { IPageProps, Home, Clients, OwnReceivings, Receivings, Report } from '@pages';
import { IMenuIconProps, HomeIcon, TakingIcon, ReportIcon, OwnTakingIcon, ClientsIcon } from "@atoms";

export interface IRoute {
  name: string;
  path: string;
  Page: FunctionComponent<IPageProps>;
  Icon: FunctionComponent<IMenuIconProps>;
}

const routes: IRoute[] = [
  {
    name: 'Головна',
    path: '/',
    Page: Home,
    Icon: HomeIcon
  },
  {
    name: 'Прийом малини',
    path: '/receivings',
    Page: Receivings,
    Icon: TakingIcon
  },
  {
    name: 'Звіт',
    path: '/report',
    Page: Report,
    Icon: ReportIcon
  },
  {
    name: 'Клієнти',
    path: '/clients',
    Page: Clients,
    Icon: ClientsIcon
  }, 
  {
    name: 'Своя малина',
    path: '/own_receivings',
    Page: OwnReceivings,
    Icon: OwnTakingIcon
  }
];

export default routes;