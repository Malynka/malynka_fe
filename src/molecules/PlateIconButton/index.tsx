import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Body } from '@typography';
import { StyledMuiButton } from './styles';

export interface IPlateIconButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PlateIconButton: FunctionComponent<IPlateIconButtonProps> = ({ text, icon, onClick }) => (
  <StyledMuiButton variant="contained" color="secondary" startIcon={icon} onClick={onClick}>
    <Body>{ text }</Body>
  </StyledMuiButton>
);

export default PlateIconButton;
