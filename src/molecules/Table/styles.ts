import styled from 'styled-components';

export const TableContainer = styled.div<{ width: string | number }>`
  width: ${({ width }) => typeof width === 'string' ? width : `${width}px`};
`;

export const TableRow = styled.div`
  display: flex;

  > div {
    border-left: 1px solid ${({ theme }) => theme.colors.black.main};
  }

  &:nth-child(2n) {
      background-color: ${({ theme }) => theme.colors.white.dark};
  }
`;