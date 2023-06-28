import type { FunctionComponent } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { CircularProgress } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import AllWeightIcon from '@mui/icons-material/AllInboxRounded';
import AllPriceIcon from '@mui/icons-material/AttachMoneyRounded';
import { GridValidRowModel } from '@mui/x-data-grid';
import { Body } from '@typography';
import { RoundedButton, SmallSelect, TableHeader } from '@molecules';
import { Header, ReceivingTableRow, Dialog, DatePicker, ReceivingWritableTable } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { getReceivingsByYear, getYears, getClients, createReceiving, updateReceiving, deleteReceiving } from '@middleware';
import { IClient, IReceiving } from '@types';
import { getSpacedDecimal } from '@utils';
import { IPageProps } from "../types";
import {
  ReceivingsContainer,
  InputsWrapper,
  CountersWrapper,
  CounterContainer,
  LoaderWrapper
} from './styles';
import uniqueId from 'lodash.uniqueid';


const Receivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const { state } = useLocation();

  const rowsState = useState<GridValidRowModel[]>([
    {
      id: uniqueId(),
      weight: '',
      price: '',
      sum: ''
    }
  ]);

  const [rows, setRows] = rowsState;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [receivings, setReceivings] = useState<IReceiving[] | null>();
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [clients, setClients] = useState<IClient[]>([]);
  const [client, setClient] = useState<string>('default');

  const [date, setDate] = useState<Dayjs>(dayjs(Date.now()));

  const [isTableCompleted, setIsTableCompleted] = useState(false);

  const isFormCompleted = client !== 'default' && isTableCompleted;

  const [editReceivingId, setEditReceivingId] = useState<string>('');
  const [receivingToDelete, setReceivingToDelete] = useState<IReceiving | null>(null);

  const getData = useCallback(async () => {
    if (year) {
      getReceivingsByYear(year).then((res) => {
        setReceivings(res.data);
      });
    }
  }, [year]);

  const handleCreateReceivingButtonClick = () => {
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setClient('default');
    setRows([{
      id: uniqueId(),
      weight: '',
      price: '',
      sum: ''
    }]);
    setDate(dayjs(Date.now()));

    if (dialogMode === 'edit') {
      setEditReceivingId('');
    }
  };

  const handleCreateReceivingConfirm = () => {
    createReceiving({
      client,
      records: rows.map(({ weight, price }) => ({ weight, price })),
      timestamp: date.toDate().getTime()
    }).then((res) => {
      const newReceiving = res.data;

      if (new Date(newReceiving.timestamp).getFullYear() === year) {
        setReceivings((prev) => [...(prev || []), newReceiving].sort((a,b) => b.timestamp - a.timestamp));
      }

      handleDialogCancel();
    });
  };

  const handleEditReceivingButtonClick = (id: string) => () => {
    const receiving = receivings?.find((r) => r._id === id);

    if (receiving) {
      setDialogMode('edit');
      setEditReceivingId(id);
      setRows(receiving.records.map(({ price, weight }) => ({
        id: uniqueId(),
        weight,
        price,
        sum: weight * price
      })));
      setClient(receiving.client._id);
      setDate(dayjs(receiving.timestamp));
      setDialogOpen(true);
    } else {
      alert('Помилка! Щось не так з ідентифікатором.');
    }
  };

  const handleEditReceivingConfirm = () => {
    updateReceiving({
      _id: editReceivingId,
      client,
      timestamp: date.toDate().getTime(),
      records: rows.map(({ weight, price }) => ({ weight, price }))
    }).then((res) => {
      const updatedReceiving = res.data;

      setReceivings((prev) => prev?.filter((r) => r._id !== updatedReceiving._id) || []);

      if (new Date(updatedReceiving.timestamp).getFullYear() === year) {
        setReceivings((prev) => [...(prev || []), updatedReceiving].sort((a,b) => b.timestamp - a.timestamp));
      }

      handleDialogCancel();
    })
  };

  const handleDeleteReceivingButtonClick = (id: string) => () => {
    const receiving = receivings?.find((r) => r._id === id);

    if (receiving) {
      setReceivingToDelete(receiving);
      setDeleteDialogOpen(true);
    } else {
      alert('Помилка! Щось не так з ідентифікатором');
    }

  };

  const handleDeleteReceivingConfirm = () => {
    if (receivingToDelete) {
      deleteReceiving(receivingToDelete._id).then(() => {
        setReceivings((prev) => prev?.filter((r) => r._id !== receivingToDelete._id) || []);
        setDeleteDialogOpen(false);

        setTimeout(() => {
          setReceivingToDelete(null);
        }, 100);
      });
    }
  }

  const handleDeleteReceivingCancel = () => {
    setDeleteDialogOpen(false);
    setTimeout(() => {
      setReceivingToDelete(null);
    }, 100);
  }

  const handleTableChange = (isCompleted: boolean) => {
    setIsTableCompleted(isCompleted);
  };

  useEffect(() => {
    getYears().then((res) => {
      setYears(res.data);
    })

    getClients().then((res) => {
      setClients(res.data);

      if (state && (state as { addReceiving: boolean }).addReceiving) {
        handleCreateReceivingButtonClick();
      }
    });
  }, [state]);

  useEffect(() => {
    setYear(years[0] || null);
  }, [years]);

  useEffect(() => {
    getData();
  }, [year, getData]);

  return (
    <>
      <Header
        title={name}
        controls={
          <>
            <SmallSelect
              options={years.map((y) => ({
                label: y,
                value: y
              }))}
              option={year || ''}
              onChange={(event) => {
                setYear(Number(event.target.value));
              }}
            />

            <RoundedButton
              text="Додати прийом"
              icon={<AddIcon />}
              variant="contained"
              onClick={handleCreateReceivingButtonClick}
            />
          </>
        }
        tableHeader={ 
            <TableHeader width={600} headers={['Вага (кг)', 'Ціна (грн)', 'Сума (грн)', 'Всього (грн)']} />
        }
        tableHeaderPosition={{
          left: 196,
          right: 24
        }}
      />  
      
      <ReceivingsContainer>
          {receivings ? receivings?.map(({ _id, client, timestamp, records }) => (
            <ReceivingTableRow
              key={`${client._id}-${_id}`}
              timestamp={timestamp}
              client={client}
              rows={records.map(({ weight, price }) => [
                weight,
                price,
                weight * price
              ])}
              allSum={records.reduce((acc, curr) => acc + curr.price * curr.weight, 0)}
              onEdit={handleEditReceivingButtonClick(_id)}
              onDelete={handleDeleteReceivingButtonClick(_id)}
            />
          )) : (
          <LoaderWrapper>
            <CircularProgress color="primary" />
          </LoaderWrapper>
        )}
      </ReceivingsContainer>
      <Dialog
        title={`${dialogMode === 'create' ? 'Додати' : 'Редагувати'} прийом`}
        open={dialogOpen}
        disableConfirm={!isFormCompleted}
        onConfirm={dialogMode === 'create' ? handleCreateReceivingConfirm : handleEditReceivingConfirm}
        onCancel={handleDialogCancel}
        preButtonsComponent={
          <CountersWrapper>
            <CounterContainer>
              <AllWeightIcon />
              <Body>Загальна вага:</Body>
              <Body>{rows.reduce((acc, { weight }) => acc + (weight === '' ? 0 : weight), 0).toFixed(2).replace('.', ',')} кг</Body>
            </CounterContainer>
            <CounterContainer>
              <AllPriceIcon />
              <Body>Загальна ціна:</Body>
              <Body>{getSpacedDecimal(Math.round(rows.reduce((acc, { weight, price }) => acc + (weight === '' || price === '' ? 0 : Number(weight) * Number(price)), 0))).replace('.', ',')} грн</Body>
            </CounterContainer>
          </CountersWrapper>
        }
      >
        <InputsWrapper>
          <SmallSelect
            defaultLabel="Оберіть клієнта"
            options={clients.map((c) => ({
              label: c.name,
              value: c._id
            }))}
            option={client}
            onChange={(event) => {
              setClient(event.target.value as string);
            }}
          />
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue as Dayjs);
            }}
            minDate={dayjs('01-01-2018')}
          />
        </InputsWrapper>
        <ReceivingWritableTable
          rowsState={rowsState}
          onChange={handleTableChange}
        />
      </Dialog>
      <Dialog
        title={`Увага`}
        open={deleteDialogOpen}
        onConfirm={handleDeleteReceivingConfirm}
        onCancel={handleDeleteReceivingCancel}
      >
        <Body>Ви впевнені, що хочете видалити прийом клієнта <b>{ receivingToDelete?.client.name }</b> датований <b>{ dayjs(receivingToDelete?.timestamp).format('DD.MM.YYYY') }</b>?</Body>
      </Dialog>
    </>
  );
};

export default Receivings;