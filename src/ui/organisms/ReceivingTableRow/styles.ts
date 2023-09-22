import styled from "styled-components";
import { Body, Subtitle } from '@typography';

export const ReceivingTableRowContainer = styled.article<{ rows: number }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white.dark};
  height: auto;
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

export const GroupTableWrapper = styled.div<{ rows: number }>`
  display: flex;
  height: ${({ rows }) => rows * 44 + (rows - 1) * 2}px;
  outline: 2px solid ${({ theme }) => theme.colors.black.light};
  border-radius: 4px;
  outline-offset: -2px;
`;

export const AllCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 148px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white.dark};
  border-left: 2px solid ${({ theme }) => theme.colors.black.light};
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