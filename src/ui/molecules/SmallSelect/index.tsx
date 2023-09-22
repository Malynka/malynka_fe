import type { FunctionComponent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
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
  defaultLabel?: string;
  options: readonly IOption[];
  option: IOption['value'];
  onChange?: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const SmallSelect: FunctionComponent<ISmallSelectProps> = ({
  defaultLabel,
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
        {(defaultLabel ? [{ label: defaultLabel, value: 'default' }, ...options] : options).map(({ label, value }) => (
          <MuiMenuItem key={label} value={value}>{ label }</MuiMenuItem>
        ))}
      </MuiSelect>
    </MuiFormControl>
  );
};

export default SmallSelect;