import type { FunctionComponent } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { Body, Subtitle } from '@typography';
import { Table } from '@molecules';
import { getSpacedDecimal, getFormattedDate } from '@utils';
import { IClient } from '@types';
import { ReceivingTableRowContainer, NameTableWrapper, GroupTableWrapper, AllCell, ControlsWrapper } from './styles';

export interface IReceivingTableRowProps {
  client: IClient;
  rows: number[][];
  allSum: number;
  timestamp: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ReceivingTableRow: FunctionComponent<IReceivingTableRowProps> = ({
  client,
  rows,
  allSum,
  timestamp,
  onEdit,
  onDelete
}) => {
  return (
    <ReceivingTableRowContainer rows={rows.length}>
      <NameTableWrapper>
        <Body>{client.name}</Body>
        <GroupTableWrapper rows={rows.length}>
          <Table width={450} rows={rows} />
          <AllCell>
            <Body>{getSpacedDecimal(allSum.toFixed(2))}</Body>
          </AllCell>
        </GroupTableWrapper>
      </NameTableWrapper>
      <ControlsWrapper>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <Subtitle>
          {getFormattedDate(timestamp)}
        </Subtitle>
      </ControlsWrapper>
    </ReceivingTableRowContainer>
  );
};

export default ReceivingTableRow;