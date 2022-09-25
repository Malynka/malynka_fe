import styled from 'styled-components';

export const HomeContainer = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

export const QuickAccessButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const StatsTitleYearWrapper = styled.div`
  margin: 16px 0;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatsPlatesColumn = styled.div`
  flex: 1;

  > div:not(:last-of-type) {
    margin-bottom: 16px;
  }
`;