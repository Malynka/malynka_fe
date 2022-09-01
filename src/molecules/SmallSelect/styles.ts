import styled from "styled-components";
import { FormControl, formControlClasses, inputBaseClasses, filledInputClasses, Select, selectClasses, MenuItem } from '@mui/material';

export const MuiFormControl = styled(FormControl)`
  &.${formControlClasses.root} {
    min-width: 130px;

    .${inputBaseClasses.root} {
      border-radius: 28px;

      ::before, ::after {
        content: none;
      }
    }
  }
`;

export const MuiSelect = styled(Select)`
  .${inputBaseClasses.input} {
    height: 56px;
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 24px;
    border-radius: 28px;
  }
`;

export const MuiMenuItem = styled(MenuItem)``;