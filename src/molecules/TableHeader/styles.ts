import styled from "styled-components";

export const TableHeaderContainer = styled.div<{ width: number | string }>`
  width: ${({ width }) => typeof width === 'string' ? width : `${width}px`};
  display: flex;
`;
