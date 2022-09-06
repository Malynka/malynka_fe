import React, { FunctionComponent } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { Headline, Subtitle } from '@typography';
import { getSpacedDecimal, getFormattedDate } from '@utils';
import { OwnReceivingRowContainer, ControlsWrapper } from './styles';


export interface IOwnReceivingRowProps {
  id: string;
  weight: number;
  timestamp: number;
}

const OwnReceivingRow: FunctionComponent<IOwnReceivingRowProps> = ({ id, weight, timestamp }) => (
  <OwnReceivingRowContainer>
    <Headline type="H4">{ getSpacedDecimal(weight) } кг</Headline>
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
  </OwnReceivingRowContainer>
);

export default OwnReceivingRow;

