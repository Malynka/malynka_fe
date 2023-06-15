import styled from 'styled-components';
import { Headline } from '@typography';
import { Dialog, DialogTitle, dialogClasses, dialogTitleClasses, dialogActionsClasses } from '@mui/material';

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

export const PreButtonsComponentWrapper = styled.div`
  padding: 0 24px;
`;

export const ButtonsWrapper = styled.div`
  margin-left: 0;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
`;
