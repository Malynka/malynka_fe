import type { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Body } from '@typography';
import { StyledMuiButton } from './styles';

export interface IPlateIconButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  bgColor: string;
}

const PlateIconButton: FunctionComponent<IPlateIconButtonProps> = ({ text, icon, onClick, bgColor }) => (
  <StyledMuiButton variant="contained" bgColor={bgColor} startIcon={icon} onClick={onClick}>
    <Body>{ text }</Body>
  </StyledMuiButton>
);

export default PlateIconButton;
