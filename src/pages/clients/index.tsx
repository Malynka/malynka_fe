import React, { FunctionComponent } from "react";
import { GridColumns, GridRenderCellParams, ukUA } from '@mui/x-data-grid';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { RoundedButton } from "@molecules";
import { Header } from "@organisms";
import { useDocumentTitle } from "@hooks";
import { IPageProps } from "../types";
import { ClientsContainer, DataGrid } from "./styles";

const col: GridColumns = [
  {
    field: 'name',
    headerName: "Ім'я",
    flex: 1
  },
  {
    field: 'note',
    headerName: 'Примітка',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Дії',
    sortable: false,
    hideable: false,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <IconButton onClick={() => console.log('Edit ID:', params.id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Remove ID:', params.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }
];

const Clients: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header
        title={name}
        controls={
          <RoundedButton
            text="Додати клієнта"
            icon={<AddIcon />}
            variant="contained"
          />
        }
      />
      <ClientsContainer>
        <DataGrid
          columns={col}
          rows={new Array(30).fill(0).map((_, i) => ({
            id: i,
            name: 'Чернявка саня',
            note: 'Примітка'
          }))}
          localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
        />
      </ClientsContainer>
    </>
  );
};

export default Clients;
