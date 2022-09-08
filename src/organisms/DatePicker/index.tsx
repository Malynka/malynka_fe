import React, { FunctionComponent } from 'react';
import { Dayjs } from 'dayjs';
import { DatePickerProps } from '@mui/x-date-pickers';
import { Input } from '@molecules';
import { StyledDatePicker } from './styles';

export interface IDatePickerProps extends Omit<DatePickerProps<Dayjs, Dayjs>, 'renderInput'> {}

const DatePicker: FunctionComponent<IDatePickerProps> = (props) => (
  <StyledDatePicker
    {...props}
    renderInput={(params) => <Input {...params} />}
  />
);

export default DatePicker;
