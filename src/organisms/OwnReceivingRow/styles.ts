import styled from "styled-components";
import { Subtitle } from '@typography';

export const OwnReceivingRowContainer = styled.article`
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white.dark};
  column-gap: 24px;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Subtitle} {
    width: 90px;
    margin-left: 24px;
  }

  svg {
    color: ${({ theme }) => theme.colors.black.light};
  }
`;