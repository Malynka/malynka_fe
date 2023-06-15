import { TableCell } from '@atoms';
import type { FunctionComponent } from 'react';
import { TableHeaderContainer } from './styles';

export interface ITableHeaderProps {
  width?: string | number;
  headers: string[];
}

const TableHeader: FunctionComponent<ITableHeaderProps> = ({ width = '100%', headers }) => (
  <TableHeaderContainer width={width}>
    {headers.map((name) => (
      <TableCell key={name} header>
        { name }
      </TableCell>
    ))}
  </TableHeaderContainer>
);

export default TableHeader;
