import React, { FunctionComponent, useState, useEffect, ChangeEventHandler, KeyboardEventHandler } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WeightIcon from '@mui/icons-material/AllInboxRounded';
import { Body } from '@typography';
import { RoundedButton, Input } from '@molecules';
import { Header, OwnReceivingRow, Dialog, DatePicker } from '@organisms';
import { getOwnReceivings, createOwnReceiving, updateOwnReceiving, deleteOwnReceiving } from '@middleware';
import { useDocumentTitle } from '@hooks';
import { getSpacedDecimal, FLOAT_NUMBER_REGEX } from '@utils';
import { IOwnReceiving } from '@types';
import { IPageProps } from "../types";
import { AllWeightContainer, OwnReceivingsContainer, InputsWrapper } from './styles'; 

const OwnReceivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);
  const [receivings, setReceivings] = useState<IOwnReceiving[]>([]);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [weight, setWeight] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [editReceivingId, setEditReceivingId] = useState<string>('');
  const [receivingToDelete, setReceivingToDelete] = useState<IOwnReceiving | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchAll = () => {
    getOwnReceivings().then((res) => {
      setReceivings(res.data.sort((a, b) => b.timestamp - a.timestamp));      
    });
  }

  const handleCreateButtonClick = () => {
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleEditButtonClick = (id:string) => () => {
    const receiving = receivings.find((r) => r._id === id);

    if (receiving) {
      setDialogMode('edit');
      setEditReceivingId(receiving._id);
      setWeight(String(receiving.weight));
      setDate(dayjs(receiving.timestamp));
      setDialogOpen(true);
    } else {
      alert('Помилка. Щось не так із ідентифікатором');
    }
    
  };
  
  const handleDeleteButtonClick = (id: string) => () => {
    const receiving = receivings.find((r) => r._id === id);

    if (receiving) {
      setReceivingToDelete(receiving);
      setDeleteDialogOpen(true);
    } else {
      alert('Помилка! Щось не так із ідентифікатором');
    }
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setWeight('');
    setDate(dayjs(Date.now()));

    if (dialogMode === 'edit') {
      setEditReceivingId('');
    }
  };

  const handleWeightChange: ChangeEventHandler<HTMLInputElement> = (event) => { 
    if (event.target.value === '' || FLOAT_NUMBER_REGEX.test(event.target.value)) {
      setWeight(event.target.value);
    }
  };

  const handleCreateOwnReceivingConfirm = () => {
    createOwnReceiving({
      weight: Number(weight),
      timestamp: date.toDate().getTime()
    }).then(() => {
      fetchAll();
      
      handleDialogCancel();
    });


  }

  const handleEditOwnReceivingConfirm = () => {
    updateOwnReceiving({
      _id: editReceivingId,
      weight: Number(weight),
      timestamp: date.toDate().getTime()
    }).then(() => {
      fetchAll();

      handleDialogCancel();
    });
  }

  const handleDeleteOwnReceivingCancel = () => {
    setDeleteDialogOpen(false);
    setTimeout(() => {
      setReceivingToDelete(null);
    }, 100);
  };

  const handleDeleteOwnReceivingConfirm = () => {
    deleteOwnReceiving(receivingToDelete._id).then(() => {
      fetchAll();
      handleDeleteOwnReceivingCancel();
    })
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Header
        title={name}
        controls={
          <>
            <AllWeightContainer>
              <Body>Всього</Body>
              <Body>{ getSpacedDecimal(receivings.reduce((acc, curr) => acc + curr.weight, 0)) } кг</Body>
            </AllWeightContainer>
            <RoundedButton
              text="Додати прийоми"
              icon={<AddIcon />}
              variant="contained"
              onClick={handleCreateButtonClick}
            />
          </>
        }
      />
      <OwnReceivingsContainer>
        {receivings.map(({ _id, weight, timestamp }) => (
          <OwnReceivingRow
            key={_id}
            weight={weight}
            timestamp={timestamp}
            onEdit={handleEditButtonClick(_id)}
            onDelete={handleDeleteButtonClick(_id)}
          />
        ))}
      </OwnReceivingsContainer>
      <Dialog
        title={`${dialogMode === 'create' ? 'Додати' : 'Редагувати'} прийом`}
        open={dialogOpen}
        disableConfirm={!weight}
        onConfirm={dialogMode === 'create' ? handleCreateOwnReceivingConfirm : handleEditOwnReceivingConfirm}
        onCancel={handleDialogCancel}
      >
        <InputsWrapper>
          <Input
            autoFocus
            placeholder="Вага"
            onChange={handleWeightChange}
            value={weight}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeightIcon />
                </InputAdornment>
              )
            }} 
          />
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            minDate={dayjs('01-01-2018')}
          />

        </InputsWrapper>
      </Dialog>
      <Dialog
        title={`Увага`}
        open={!!deleteDialogOpen}
        onConfirm={handleDeleteOwnReceivingConfirm}
        onCancel={handleDeleteOwnReceivingCancel}
      >
        <Body>Ви впевнені, що хочете видалити прийом власної малини вагою <b>{ getSpacedDecimal(receivingToDelete?.weight) }&nbsp;кг</b> датований <b>{ dayjs(receivingToDelete?.timestamp).format('DD.MM.YYYY') }</b>?</Body>
      </Dialog>
    </>
  );
};

export default OwnReceivings;