import styled from "styled-components";
import { inputAdornmentClasses } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers";

export const StyledDatePicker = styled(DatePicker)`
  .${inputAdornmentClasses.root} > button {
    margin-right: 4px;
  }
`;