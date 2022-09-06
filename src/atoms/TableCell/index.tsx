import { Body } from '@typography';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { CellContainer } from './styles';

export interface ITableCellProps {
  header?: boolean;
}

const TableCell: FunctionComponent<PropsWithChildren<ITableCellProps>> = ({ children, header }) => (
  <CellContainer header={header}>
    <Body>
      { children }
    </Body>
  </CellContainer>
);

export default TableCell;