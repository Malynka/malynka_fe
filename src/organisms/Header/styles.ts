import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  padding: 12px 0;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white.main};
`;