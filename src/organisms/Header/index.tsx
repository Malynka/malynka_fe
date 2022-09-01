import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Headline } from '@typography';
import { HeaderContainer, ControlsWrapper } from './styles';

export interface IHeaderProps {
  title: string;
}

const Header: FunctionComponent<PropsWithChildren<IHeaderProps>> = ({ title, children }) => (
  <HeaderContainer>
    <Headline type="H2">{title}</Headline>
    {children ? (
      <ControlsWrapper>
        {children}
      </ControlsWrapper>
    ) : null}
  </HeaderContainer>
);


export default Header;