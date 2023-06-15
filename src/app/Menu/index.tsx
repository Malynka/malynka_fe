import type {FunctionComponent, PropsWithChildren} from 'react';
import type { IMenuIconProps } from '@atoms';
import { AppVersion } from '@atoms';
import { MenuItem, AppUpdateControl } from '@molecules';
import { Logo } from '@molecules';
import { MenuContainer, MenuItemsContainer, VersionContainer, AppUpdateButtonWrapper } from './styles';

export interface IMenuProps {
  data: {
    path: string;
    name: string;
    Icon: FunctionComponent<IMenuIconProps>,
  }[];
}

const Menu: FunctionComponent<PropsWithChildren<IMenuProps>> = ({ data }) => {
  return (
    <MenuContainer>
      <Logo />
      <MenuItemsContainer>
        {data.map((props) => (
          <MenuItem
            key={props.name}
            {...props}
          />
        ))}
      </MenuItemsContainer>
      <VersionContainer>
        <AppVersion />
      </VersionContainer>
      <AppUpdateButtonWrapper>
        <AppUpdateControl />
      </AppUpdateButtonWrapper>
    </MenuContainer>
  );
};

export default Menu;