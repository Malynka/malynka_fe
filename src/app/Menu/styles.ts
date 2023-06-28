import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 250px;
  min-height: 100%;

  background-color: ${({ theme }) => theme.colors.white.dark};
  border-radius: 0 16px 16px 0;
  position: relative;
`;

export const MenuItemsContainer = styled.div``;

export const VersionContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  margin-top: auto;
  position: absolute;
  bottom: 0;
`;

export const AppUpdateButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;