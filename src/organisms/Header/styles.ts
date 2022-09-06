import styled from 'styled-components';

export const HeaderContainer = styled.header<{ isTableHeader: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  margin-bottom: ${({ isTableHeader }) => isTableHeader ? 44 : 0}px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white.main};
  z-index: 9999;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const TableHeaderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  
  padding-left: 196px;
  padding-right: 24px;
`;