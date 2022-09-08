import styled from 'styled-components';

export const TableContainer = styled.div<{ width: string | number }>`
  width: ${({ width }) => typeof width === 'string' ? width : `${width}px`};
`;

export const TableRow = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white.main};

  &:nth-child(2n) {
      background-color: ${({ theme }) => theme.colors.white.dark};
  }
`;