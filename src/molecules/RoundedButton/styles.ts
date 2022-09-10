import styled from "styled-components";
import { Button, buttonClasses } from '@mui/material';

export const MuiButton = styled(Button)`
  &.${buttonClasses.root} {
    min-width: 200px;
    text-transform: initial;
    color: ${({ variant, theme }) => variant === 'contained' ? theme.colors.white.main : theme.colors.black.main};
    height: 36px;
    border-radius: 18px;

    svg {
      width: 24px;
      height: 24px;
    }

    padding: 8px 16px;
  }
`;