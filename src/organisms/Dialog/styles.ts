import styled from 'styled-components';
import { Headline } from '@typography';
import { Dialog, DialogTitle, dialogClasses, dialogTitleClasses } from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .${dialogClasses.container} {
    backdrop-filter: blur(5px);
  }
`;

export const StyledTitle = styled(DialogTitle)`
  &.${dialogTitleClasses.root} {
    ${Headline.getStyles('H4')}
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 24px;
`;