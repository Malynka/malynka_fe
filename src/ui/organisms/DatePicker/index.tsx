import type { FunctionComponent } from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';
import { Input } from '@molecules';
import { StyledDatePicker } from './styles';

const DatePicker: FunctionComponent<Omit<DatePickerProps<unknown, unknown>, 'renderInput'>> = (props) => (
  <StyledDatePicker
    {...props}
    renderInput={(params) => <Input {...params} />}
  />
);

export default DatePicker;
