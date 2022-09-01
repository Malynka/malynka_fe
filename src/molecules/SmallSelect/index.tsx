import React, { FunctionComponent, useState } from 'react';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import {
  MuiFormControl,
  MuiMenuItem,
  MuiSelect
} from './styles';

export interface IOption {
  value: string | number;
  label: string | number;
}

export interface ISmallSelectProps {
  options: IOption[];
  option: IOption['value'];
  onChange: (event: SelectChangeEvent) => void; 
}

const SmallSelect: FunctionComponent<ISmallSelectProps> = ({
  options,
  option,
  onChange
}) => {
  return (
    <MuiFormControl variant="filled">
      <MuiSelect
        value={option}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <MuiMenuItem key={label} value={value}>{ label }</MuiMenuItem>
        ))}
      </MuiSelect>
    </MuiFormControl>
  );
};

export default SmallSelect;