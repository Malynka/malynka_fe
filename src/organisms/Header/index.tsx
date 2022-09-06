import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Headline } from '@typography';
import { HeaderContainer, ControlsWrapper, TableHeaderWrapper } from './styles';

export interface IHeaderProps {
  title: string;
  controls?: JSX.Element;
  tableHeader?: JSX.Element;
}

const Header: FunctionComponent<IHeaderProps> = ({ title, controls, tableHeader }) => (
  <HeaderContainer isTableHeader={!!tableHeader}>
    <Headline type="H2">{title}</Headline>
    {controls ? (
      <ControlsWrapper>
        {controls}
      </ControlsWrapper>
    ) : null}
    {tableHeader ? (
      <TableHeaderWrapper>
        {tableHeader}
      </TableHeaderWrapper>
    ) : null}
  </HeaderContainer>
);


export default Header;