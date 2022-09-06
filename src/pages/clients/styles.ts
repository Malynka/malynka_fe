import styled from "styled-components";
import { Body } from "@typography";
import { DataGrid as MuiDataGrid, gridClasses } from "@mui/x-data-grid";

export const ClientsContainer = styled.div`
`;

export const DataGrid = styled(MuiDataGrid)`
  &.${gridClasses.root} {
    ${Body.getStyles()}

    .${gridClasses.columnHeader} {
      background-color: ${({ theme }) => theme.colors.black.light};
      color: ${({ theme }) => theme.colors.white.main};

      .${gridClasses.iconButtonContainer} svg, .${gridClasses.menuIconButton} svg {
        color: ${({ theme }) => theme.colors.white.main};
      }
    }

    .${gridClasses.row} {
      max-height: unset !important;
      background-color: ${({ theme }) => theme.colors.white.main};

      &:nth-of-type(2n) {
        background-color: ${({ theme }) => theme.colors.white.dark};
      }

      .${gridClasses.cell} {
        max-height: unset !important;

        .${gridClasses.cellContent} {
          white-space: pre-wrap;
          word-wrap: break-word;
          padding: 8px 0;
        }
      }

      svg {
        color: ${({ theme }) => theme.colors.black.light};
      }
    }
  }
`;

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;