import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IMenuIconProps } from '@atoms';
import { MenuItemText } from '@typography';
import { MenuItemContainer } from './styles';

export interface IMenuItemProps {
  Icon: FunctionComponent<IMenuIconProps>;
  name: string;
  path: string;
}

const MenuItem: FunctionComponent<IMenuItemProps> = ({
  Icon,
  name,
  path,
}) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = () => {
    navigate(path);
  };

  useEffect(() => {
    setActive(location.pathname === path);
  }, [location, path]);

  return (
    <MenuItemContainer
      key={path}
      active={active}
      onClick={handleMenuItemClick}
    >
      <Icon width={36} height={36} />
      <MenuItemText>{ name }</MenuItemText>
    </MenuItemContainer>
  )
};

export default MenuItem;