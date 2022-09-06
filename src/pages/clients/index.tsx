import React, { FunctionComponent, useEffect, useState, KeyboardEventHandler, ChangeEventHandler, useRef } from "react";
import { GridColumns, GridRenderCellParams, ukUA } from '@mui/x-data-grid';
import { IconButton, InputAdornment } from "@mui/material";
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import PersonIcon from '@mui/icons-material/PersonOutlineRounded';
import NoteIcon from '@mui/icons-material/StickyNote2Rounded';
import { Body } from '@typography';
import { RoundedButton, Input } from "@molecules";
import { Header, Dialog } from "@organisms";
import { useDocumentTitle } from "@hooks";
import { getClients, createClient, updateClient, deleteClient } from "@middleware";
import { IClient } from "@types";
import { IPageProps } from "../types";
import { ClientsContainer, DataGrid, InputsWrapper } from "./styles";

const Clients: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const [clients, setClients] = useState<IClient[]>([]);
  const [editClientId, setEditClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientNote, setClientNote] = useState('');
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [clientToDelete, setClientToDelete] = useState<IClient | null>(null);

  const fetchAll = () => {
    getClients().then((res) => {
      setClients(res.data);
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreateClientButtonClick = () => {
    setDialogMode('create');
    setDialogOpen(true);
  }

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setClientName('');
    setClientNote('');

    if (dialogMode === 'edit') {
      setEditClientId('');
    }
  };

  const handleCreateClientConfirm = () => {
    createClient({
      name: clientName,
      note: clientNote
    }).then(() => {
      fetchAll();
      
      handleDialogCancel();
    });
  };

  const handleClientNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setClientName(event.target.value as string);
  }

  const handleClientNoteChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setClientNote(event.target.value as string);
  }

  const handleEditClientClick = (id: string) => {
    const client = clients.find((c) => c._id === id);

    if (client) {
      setEditClientId(id);
      setDialogMode('edit');
      setClientName(client.name);
      setClientNote(client.note);
      setDialogOpen(true);
    } else {
      alert('Помилка. Щось не так з ідентифікатором');
    }
  };

  const handleEditClientConfirm = () => {
    updateClient({
      _id: editClientId,
      name: clientName,
      note: clientNote
    }).then(() => {
      fetchAll();
    });

    handleDialogCancel();
  };

  const handleDeleteClientClick = (id: string) => {
    const client = clients.find((c) => c._id === id);

    if (client) {
      setClientToDelete(client);
    } else {
      alert('Помилка, щось не так з ідентифікатором');
    }
  };

  const handleDeleteClientCancel = () => {
    console.log("HERE TOO");
    setClientToDelete(null);
  }

  const handleDeleteClientConfirm = () => {
    console.log('HERE');
    deleteClient(clientToDelete._id).then(() => {
      fetchAll();
    });

    handleDeleteClientCancel();
  };

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
          <IconButton onClick={() => handleEditClientClick(String(params.id))}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClientClick(String(params.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  const clientNameInputRef = useRef<HTMLInputElement>(null);
  const clientNoteInputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const tagName = (event.target as HTMLDivElement).tagName;

    if ((tagName !== 'TEXTAREA' && event.key === 'Enter') || (event.ctrlKey && event.code === 'Enter')) {
      event.preventDefault();
      if (dialogMode === 'create' && clientName) {
        handleCreateClientConfirm();
      }

      if (dialogMode === 'edit' && clientName) {
        handleEditClientConfirm();
      }

    }
  };

  return (
    <>
      <Header
        title={name}
        controls={
          <RoundedButton
            text="Додати клієнта"
            icon={<AddIcon />}
            variant="contained"
            onClick={handleCreateClientButtonClick}
          />
        }
      />
      <ClientsContainer>
        <DataGrid
          columns={col}
          rows={clients.map(({ _id, name, note }) => ({
            id: _id,
            name,
            note
          }))}
          localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
        />
      </ClientsContainer>
      <Dialog
        title={`${dialogMode === 'create' ? 'Додати' : 'Редагувати'} клієнта`}
        open={dialogOpen}
        disableConfirm={!clientName}
        onConfirm={dialogMode === 'create' ? handleCreateClientConfirm : handleEditClientConfirm}
        onCancel={handleDialogCancel}
      >
        <InputsWrapper>
          <Input
            inputRef={clientNameInputRef}
            autoFocus
            placeholder="Назва клієнта"
            onChange={handleClientNameChange}
            onKeyDown={onKeyDown}
            value={clientName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />
          <Input
            inputRef={clientNoteInputRef}
            placeholder="Примітка"
            multiline
            rows={7}
            value={clientNote}
            onKeyDown={onKeyDown}
            onChange={handleClientNoteChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NoteIcon />
                </InputAdornment>
              )
            }}
          />
        </InputsWrapper>
      </Dialog>
      <Dialog
        title={`Увага`}
        open={!!clientToDelete}
        onConfirm={handleDeleteClientConfirm}
        onCancel={handleDeleteClientCancel}
      >
        <Body>Ви впевнені, що хочете видалити клієнта <b>{ clientToDelete?.name }</b></Body>
      </Dialog>
    </>
  );
};

export default Clients;
