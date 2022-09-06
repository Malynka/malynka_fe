import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white.main};
`;

export const PageMountPoint = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white.main};
  position: relative;
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;