import React, { FunctionComponent, ReactNode } from 'react';
import { Body } from '@typography';
import { MuiButton } from './styles';

export interface IRoundedButtonProps {
  icon?: ReactNode;
  text: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'inherit' | 'success' | 'warning';
}

const RoundedButton: FunctionComponent<IRoundedButtonProps> = ({
  icon,
  text,
  variant,
  color
}) => {
  return (
    <MuiButton variant={variant} color={color} startIcon={icon}>
      <Body>{ text }</Body>
    </MuiButton>
  );
};

export default RoundedButton;