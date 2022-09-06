import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const PageMountPoint = styled.main`
  flex: 1;
  position: relative;
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
`;