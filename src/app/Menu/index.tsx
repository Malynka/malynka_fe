import React, {FunctionComponent, PropsWithChildren} from 'react';
import { IMenuIconProps } from '@atoms';
import { MenuItem } from '@molecules';
import { Logo } from '@molecules';
import { MenuContainer, MenuItemsContainer } from './styles';


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
            {...props}
          />
        ))}
      </MenuItemsContainer>
    </MenuContainer>
  );
};

export default Menu;