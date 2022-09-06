import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header<{ isTableHeader: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  margin-bottom: ${({ isTableHeader }) => isTableHeader ? 44 : 0}px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white.light};
  z-index: 9999;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const TableHeaderWrapper = styled.div<{ width?: string | number; tableHeaderPosition: { left: string | number; right: string | number } }>`
  position: absolute;
  width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
  ${({ tableHeaderPosition }) => css`
    left: ${typeof tableHeaderPosition.left === 'number' ? `${tableHeaderPosition.left}px` : tableHeaderPosition.left};
    right: ${typeof tableHeaderPosition.right === 'number' ? `${tableHeaderPosition.right}px` : tableHeaderPosition.right};
  `}
  bottom: 0;
  transform: translateY(100%);
`;