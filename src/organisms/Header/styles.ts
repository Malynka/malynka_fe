import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
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