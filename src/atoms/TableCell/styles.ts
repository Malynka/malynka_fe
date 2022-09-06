import styled, { css } from "styled-components";
 
export const CellContainer = styled.div<{ header?: boolean }>`
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;
  flex: 1;
  ${({ header, theme }) => header ? css`
    background-color: ${theme.colors.black.light};
    color: ${theme.colors.white.light};
  ` : null}
`;