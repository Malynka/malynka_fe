import styled from "styled-components";

export const StatPlateContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white.dark};
  border-radius: 16px;
`;

export const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;