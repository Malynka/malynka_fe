import type { FunctionComponent } from 'react';
import { Headline } from '@typography';
import { HeaderContainer, ControlsWrapper, TableHeaderWrapper } from './styles';

export interface IHeaderProps {
  title: string;
  controls?: JSX.Element;
  tableHeader?: JSX.Element;
  tableHeaderWidth?: string | number
  tableHeaderPosition?: {
    right?: string | number;
    left?: string | number;
  }
}

const Header: FunctionComponent<IHeaderProps> = ({ title, controls, tableHeader, tableHeaderPosition = { left: 0, right: 0 } }, tableHeaderWidth = '100%') => (
  <HeaderContainer isTableHeader={!!tableHeader}>
    <Headline type="H2">{title}</Headline>
    {controls ? (
      <ControlsWrapper>
        {controls}
      </ControlsWrapper>
    ) : null}
    {tableHeader ? (
      <TableHeaderWrapper width={tableHeaderWidth} tableHeaderPosition={tableHeaderPosition as { left: string | number; right: string | number }}>
        {tableHeader}
      </TableHeaderWrapper>
    ) : null}
  </HeaderContainer>
);


export default Header;