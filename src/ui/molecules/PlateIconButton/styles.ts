import styled from "styled-components";
import { Button, buttonClasses } from "@mui/material";

export const StyledMuiButton = styled(Button)<{ bgColor: string }>`
  &.${buttonClasses.root} {
    width: 130px;
    height: 130px;
    padding: 16px;
    flex-direction: column;
    gap: 8px;
    text-transform: initial;
    background-color: ${({ bgColor }) => bgColor};

    :hover {
      background-color: ${({ bgColor }) => bgColor};
    }

    .${buttonClasses.startIcon} {
      margin: 0;
      svg {
        width: 48px;
        height: 48px;
      } 
    }
  }
`;