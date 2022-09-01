import React, { FunctionComponent, ReactNode } from 'react';
import { Body } from '@typography';
import { StyledMuiButton } from './styles';

export interface IPlateIconButtonProps {
  text: string;
  icon: ReactNode;
}

const PlateIconButton: FunctionComponent<IPlateIconButtonProps> = ({ text, icon }) => (
  <StyledMuiButton variant="contained" color="secondary" startIcon={icon}>
    <Body>{ text }</Body>
  </StyledMuiButton>
);

export default PlateIconButton;
