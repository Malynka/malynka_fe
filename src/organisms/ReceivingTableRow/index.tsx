import React, { FunctionComponent } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { Body, Subtitle } from '@typography';
import { Table } from '@molecules';
import { getSpacedDecimal, getFormattedDate } from '@utils';
import { ReceivingTableRowContainer, NameTableWrapper, GroupTableWrapper, AllCell, ControlsWrapper } from './styles';

export interface IReceivingTableRowProps {
  client: {
    _id: string;
    name: string;
  };
  rows: number[][];
  allSum: number;
  timestamp: number;
}

const ReceivingTableRow: FunctionComponent<IReceivingTableRowProps> = ({ client, rows, allSum, timestamp }) => (
  <ReceivingTableRowContainer>
    <NameTableWrapper>
      <Body>{ client.name }</Body>
      <GroupTableWrapper>
        <Table width={471} rows={rows} />
        <AllCell>
          <Body>{ getSpacedDecimal(allSum) }</Body>
        </AllCell>
      </GroupTableWrapper>
    </NameTableWrapper>
    <ControlsWrapper>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <Subtitle>
        {getFormattedDate(timestamp)}
      </Subtitle>
    </ControlsWrapper>
  </ReceivingTableRowContainer>
);

export default ReceivingTableRow;