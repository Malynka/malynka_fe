import styled from 'styled-components';
import { Body } from '@typography';
import type { UpdatingMessage } from '@types';

export const DownloadProgress = styled.div<{ progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
`;

export const Button = styled.button<{ message: UpdatingMessage}>`
  padding: 12px;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  width: 100%;
  transition: 0.3s ease all;
  position: relative;

  ${Body} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }

  ${DownloadProgress} {
    transition: 0.3s all ease;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.primary.light};

    ${DownloadProgress} {
      background-color: ${({ theme }) => theme.colors.secondary.light};
    }
  }
`;

