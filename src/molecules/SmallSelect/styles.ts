import styled from "styled-components";
import { FormControl, formControlClasses, inputBaseClasses, Select, selectClasses, MenuItem } from '@mui/material';

export const MuiFormControl = styled(FormControl)`
  &.${formControlClasses.root} {
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
    padding: 8px;
    padding-left: 12px;
    border-radius: 43px;
  }
  
  > .${selectClasses.select}.${selectClasses.select}.${selectClasses.select} {
    padding-right: 52px;
  }

  .${selectClasses.icon} {
    margin-right: 16px;
  }
`;

export const MuiMenuItem = styled(MenuItem)``;