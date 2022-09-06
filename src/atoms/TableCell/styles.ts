import styled, { css } from "styled-components";
 
export const CellContainer = styled.div<{ header?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 8px;
  flex: 1;
  height: 44px;
  ${({ header, theme }) => header ? css`
    background-color: ${theme.colors.black.light};
    color: ${theme.colors.white.light};
  ` : null}
`;