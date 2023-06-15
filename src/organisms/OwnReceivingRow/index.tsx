import type { FunctionComponent } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { Headline, Subtitle } from '@typography';
import { getSpacedDecimal, getFormattedDate } from '@utils';
import { OwnReceivingRowContainer, ControlsWrapper } from './styles';


export interface IOwnReceivingRowProps {
  weight: number;
  timestamp: number;
  onEdit: () => void;
  onDelete: () => void;
}

const OwnReceivingRow: FunctionComponent<IOwnReceivingRowProps> = ({ weight, timestamp, onEdit, onDelete }) => (
  <OwnReceivingRowContainer>
    <Headline type="H4">{ getSpacedDecimal(weight) } кг</Headline>
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
  </OwnReceivingRowContainer>
);

export default OwnReceivingRow;

