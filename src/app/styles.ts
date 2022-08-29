import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const PageMountPoint = styled.main`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.white.main};

  padding: 24px;
`;