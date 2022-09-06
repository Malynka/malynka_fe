import React, { FunctionComponent, ReactNode, MouseEventHandler } from 'react';
import { Body } from '@typography';
import { MuiButton } from './styles';

export interface IRoundedButtonProps {
  icon?: ReactNode;
  text: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'inherit' | 'success' | 'warning';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const RoundedButton: FunctionComponent<IRoundedButtonProps> = ({
  icon,
  text,
  variant,
  color,
  onClick,
  disabled,
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
    >
      <Body>{ text }</Body>
    </MuiButton>
  );
};

export default RoundedButton;