import type { FunctionComponent } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import WeightIcon from '@mui/icons-material/AllInboxRounded';
import PriceIcon from '@mui/icons-material/AttachMoneyRounded';
import { Body, Subtitle } from '@typography';
import { getSpacedDecimal, getFormattedDate } from '@utils';
import { SaleRowContainer, DataWrapper, DataRow, ControlsWrapper } from './styles';

export interface ISaleRowProps {
  weight: number;
  price: number;
  timestamp: number;
  onEdit: () => void;
  onDelete: () => void;
}

const SaleRow: FunctionComponent<ISaleRowProps> = ({ weight, price, timestamp, onEdit, onDelete }) => (
  <SaleRowContainer>
    <DataWrapper>
      <DataRow>
        <WeightIcon />
        <Body>{ getSpacedDecimal(weight) } кг</Body>
      </DataRow>
      <DataRow>
        <PriceIcon />
        <Body>{price} грн</Body>
      </DataRow>
      <DataRow>
        <Body>Загальна ціна: {getSpacedDecimal(weight * price)} грн</Body>
      </DataRow>
    </DataWrapper>
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
  </SaleRowContainer>
);

export default SaleRow;
