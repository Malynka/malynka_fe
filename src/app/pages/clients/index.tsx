import type { FunctionComponent, KeyboardEventHandler, ChangeEventHandler } from "react";
import { AxiosError } from "axios";
import { useEffect, useState, } from 'react';
import { GridColumns, GridRenderCellParams, ukUA } from '@mui/x-data-grid';
import { IconButton, InputAdornment } from "@mui/material";
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import PersonIcon from '@mui/icons-material/PersonOutlineRounded';
import NoteIcon from '@mui/icons-material/StickyNote2Rounded';
import { Body } from '@typography';
import { RoundedButton, Input, DataGrid } from "@molecules";
import { Header, Dialog } from "@organisms";
import { useDocumentTitle } from "@hooks";
import { getClients, createClient, updateClient, deleteClient, restoreClient } from "@api/client";
import { IClient } from "@types";
import { IPageProps } from "../types";
import { ClientsContainer, InputsWrapper } from "./styles";

const Clients: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const [clients, setClients] = useState<IClient[]>([]);
  const [editClientId, setEditClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientNote, setClientNote] = useState('');
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clientExistsConfictDialogOpen, setClientExistsConfictDialogOpen] = useState(false);
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
    }).catch((error: AxiosError<{ message: string }>) => {
      if (error.response?.data.message === 'CLIENT_ALREADY_EXISTS') {
        setClientExistsConfictDialogOpen(true);
      }
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

  const handleClientCreateConfictRestoreConfirm = () => {
    restoreClient(clientName).then(() => {
      fetchAll();
      handleClientCreateConflictCancel();
    });
  };

  const handleClientCreateConflictCancel = () => {
    setClientExistsConfictDialogOpen(false);
    handleDialogCancel();
  };


  const handleDeleteClientCancel = () => {
    setClientToDelete(null);
  }

  const handleDeleteClientConfirm = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete._id).then(() => {
        fetchAll();
      });

      handleDeleteClientCancel();
    }
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
        title="Увага"
        open={!!clientToDelete}
        onConfirm={handleDeleteClientConfirm}
        onCancel={handleDeleteClientCancel}
      >
        <Body>Ви впевнені, що хочете видалити клієнта <b>{ clientToDelete?.name }</b>? Клієнт буде прихований, дані про нього збережуться. Також біля клієнта з'явиться позначення <b>(Прихований)</b>.</Body>
      </Dialog>
      <Dialog
        title="Увага"
        open={clientExistsConfictDialogOpen}
        confirmTitle="Відновити"
        onConfirm={handleClientCreateConfictRestoreConfirm}
        onCancel={handleClientCreateConflictCancel}
      >
        <Body>Клієнт з іменем <b>{ clientName }</b> вже існує, але він/вона приховані. Хочете відновити?</Body>
      </Dialog>
    </>
  );
};

export default Clients;
