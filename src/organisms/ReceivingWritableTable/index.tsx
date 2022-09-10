import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  GridColumns,
  GridValidRowModel,
  GridEventListener,
  GridActionsCellItem,
  GridRowId,
  GridPreProcessEditCellProps,
  GridCellParams,
  GridCellModesModel,
  GridCellModes,
  GridCallbackDetails
} from '@mui/x-data-grid';
import PositionIcon from '@mui/icons-material/InboxRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import uniqueId from 'lodash.uniqueid';
import { DataGrid, RoundedButton  } from '@molecules';
import { getSpacedDecimal, FLOAT_NUMBER_REGEX } from '@utils';
import { ReceivingWritableTableContainer, TableWrapper } from './styles';

const funcForUseStateType = () => useState<GridValidRowModel[]>([]);

export interface IReceivingWritableTableProps {
  rowsState: ReturnType<typeof funcForUseStateType>;
  onChange: (isCompleted: boolean) => void;
}

const ReceivingWritableTable: FunctionComponent<IReceivingWritableTableProps> = ({
  rowsState,
  onChange
}) => {
  const [rows, setRows] = rowsState;

  const handleDeleteRowClick = (id: GridRowId) => () => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleAddReceivingButtonClick = () => {
    setRows((prev) => [...prev, {
      id: uniqueId(),
      weight: '',
      price: '',
      sum: ''
    }]);
  };

  const handleEditCell: GridEventListener<'cellEditCommit'> = (params) => {
    setRows((prev) => {
      const res = prev.slice();

      const changedRowIndex = res.findIndex((r) => r.id === params.id);

      const changedRow = { ...res[changedRowIndex] };
      changedRow[params.field] = params.value !== '' ? Number(params.value) : '';

      changedRow.sum = changedRow.weight && changedRow.price ? getSpacedDecimal(changedRow.weight * changedRow.price) : '';

      res.splice(changedRowIndex, 1, changedRow);
      return res;
    });
  }

  useEffect(() => {
    onChange(rows.every((r) => Object.keys(r).length === Object.values(r).filter(v => v).length));
  }, [rows]);

  const preProcessEditCellProps = (params: GridPreProcessEditCellProps<any, any>) => {
    const hasError = !(FLOAT_NUMBER_REGEX.test(params.props.value) || params.props.value === '');
    return { ...params.props, error: hasError };
  }

  const columns: GridColumns = [
    {
      field: 'weight',
      headerName: 'Вага (кг)',
      editable: true,
      preProcessEditCellProps,
      flex: 1,
      sortable: false
    },
    {
      field: 'price',
      headerName: 'Ціна (грн)',
      editable: true,
      preProcessEditCellProps,
      flex: 1,
      sortable: false
    },
    {
      field: 'sum',
      headerName: 'Сума (грн)',
      editable: false,
      flex: 1,
      sortable: false
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      renderCell: ({ id }) => {
        const index = rows.findIndex((r) => r.id === id);

        return index !== 0 ? (
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Видалити"
            onClick={handleDeleteRowClick(id)}
          />
        ) : null;
      }
    }
  ];

  return (
    <ReceivingWritableTableContainer>
      <TableWrapper rows={rows.length}>
        <DataGrid
          columns={columns}
          rows={rows}
          hideFooter
          onCellEditCommit={handleEditCell}
          disableColumnMenu
          disableSelectionOnClick
        />
      </TableWrapper>
      <RoundedButton
        color="primary"
        variant="outlined"
        text="Додати позицію"
        icon={<PositionIcon />}
        onClick={handleAddReceivingButtonClick}
      />
    </ReceivingWritableTableContainer>
  );
};

export default ReceivingWritableTable;
