import { TableCell } from '@atoms';
import { getSpacedDecimal } from '@utils';
import type { FunctionComponent } from 'react';
import { TableContainer, TableRow } from './styles';

export interface ITableProps {
  width?: string | number;
  rows: (string | number)[][];
}

const Table: FunctionComponent<ITableProps> = ({ width = '100%', rows }) => {
  return (
    <TableContainer width={width}>
      {
        rows.map((r, rIndex) => (
          <TableRow key={rIndex}>
            {r.map((item, index) => (
              <TableCell key={`${index}-${item}`}>{typeof item === 'number' ? getSpacedDecimal(item) : item}</TableCell>
            ))}
          </TableRow>
        ))
      }
    </TableContainer>
  );
};

export default Table;