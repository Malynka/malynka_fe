import styled from "styled-components";
import { Dialog, DialogTitle, dialogClasses, dialogTitleClasses, dialogActionsClasses } from '@mui/material';
import { Headline } from "@typography";

export const StyledDialog = styled(Dialog)`
  .${dialogClasses.container} {
    backdrop-filter: blur(5px);
  }

  .${dialogActionsClasses.root} {
    display: block;
  }
`;

export const StyledTitle = styled(DialogTitle)`
  &.${dialogTitleClasses.root} {
    ${Headline.getStyles('H4')}
  }
`;

export const AuthCodeWrapper = styled.article`
  .authcode_container {
    display: flex;
    column-gap: 16px;

    input {
      width: 50px;
      height: 50px;
      border: 2px solid ${({ theme }) => theme.colors.black.light};
      outline: none;
      border-radius: 16px;
      text-align: center;
      font-size: 24px;
    }
  }
`;