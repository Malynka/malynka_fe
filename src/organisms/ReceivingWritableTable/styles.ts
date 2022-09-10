import styled from "styled-components";

export const ReceivingWritableTableContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const TableWrapper = styled.div<{ rows: number }>`
  height: ${({ rows }) => 58 + rows*52}px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;