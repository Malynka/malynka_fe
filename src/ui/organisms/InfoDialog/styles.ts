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