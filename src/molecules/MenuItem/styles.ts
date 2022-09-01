import styled, { css } from "styled-components";

export const MenuItemContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.5s all;
  
  svg, svg path {
    transition: 0.5s all;
  }

  ${({ active, theme }) => active ? css` 
    color: ${theme.colors.white.light};
    background-color: ${theme.colors.primary.dark};

    svg {
      path[fill] {
        fill: ${theme.colors.white.light};
      }

      path[stroke] {
        stroke: ${theme.colors.white.light};
      }
    }

  ` : css`
    :hover {
      color: ${theme.colors.white.main};
      background-color: ${theme.colors.primary.light};

      svg {
        path[fill] {
          fill: ${theme.colors.white.main};
        }

        path[stroke] {
          stroke: ${theme.colors.white.main};
        }
      }
    }
  `}
`;