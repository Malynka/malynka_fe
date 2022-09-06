import styled from 'styled-components';
import { Body } from '@typography';
import { TextField, textFieldClasses, formLabelClasses, inputBaseClasses, inputAdornmentClasses } from '@mui/material';

export const StyledTextField = styled(TextField)`
  &.${textFieldClasses.root} {
    .${inputBaseClasses.input}, .${formLabelClasses.root} {
      ${Body.getStyles()}
    }

    .${inputAdornmentClasses.root}.${inputAdornmentClasses.positionStart} {
      margin-top: 0;
      height: fit-content;
    }

    .${inputBaseClasses.root} {
      min-height: 56px;
      display: flex;
      align-items: center;
      border-radius: 28px;

      &.${inputBaseClasses.multiline} {
        align-items: flex-start;
      }

      .${inputBaseClasses.input} {
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 12px;
      }

      ::before, ::after {
        content: none;
      }
    }
  }
`;

