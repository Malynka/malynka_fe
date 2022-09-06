import React, { FunctionComponent } from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledTextField } from './styles';

const Input: FunctionComponent<Omit<TextFieldProps, 'variant' | 'label'>> = (props) => (
  <StyledTextField
    variant="filled"
    {...props}
  />
);

export default Input;