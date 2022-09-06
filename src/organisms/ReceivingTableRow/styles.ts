import styled from "styled-components";
import { Body, Subtitle } from '@typography';

export const ReceivingTableRowContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white.dark};
  height: 176px;
  column-gap: 24px;
`;

export const NameTableWrapper = styled.div`
  display: flex;
  column-gap: 32px;
  align-items: center;

  ${Body} {
    width: 140px;
  }
`;

export const GroupTableWrapper = styled.div`
  display: flex;
  height: 176px;
`;

export const AllCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white.dark};
  border-left: 2px solid ${({ theme }) => theme.colors.black.light};
  box-sizing: border-box;
  text-align: center;
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