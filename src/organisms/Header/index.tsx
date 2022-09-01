import React, { FunctionComponent } from 'react';
import { Headline } from '@typography';
import { HeaderContainer } from './styles';

export interface IHeaderProps {
  title: string;
}

const Header: FunctionComponent<IHeaderProps> = ({ title }) => {

  return (
    <HeaderContainer>
      <Headline type="H2">{ title }</Headline>
    </HeaderContainer>
  );
};

export default Header;