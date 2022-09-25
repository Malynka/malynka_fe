import React, { FunctionComponent, useState, useEffect, ChangeEventHandler, KeyboardEventHandler } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WeightIcon from '@mui/icons-material/AllInboxRounded';
import PriceIcon from '@mui/icons-material/AttachMoneyRounded';
import { Body } from '@typography';
import { RoundedButton, Input, SmallSelect } from '@molecules';
import { Header, SaleRow, Dialog, DatePicker } from '@organisms';
import { getSalesByYear, createSale, updateSale, deleteSale, getYears } from '@middleware';
import { useDocumentTitle } from '@hooks';
import { getSpacedDecimal, FLOAT_NUMBER_REGEX } from '@utils';
import { ISale } from '@types';
import { IPageProps } from "../types";
import { SalesContainer, InputsWrapper, InputsFlexWrapper, CounterContainer, AggregationContainer } from './styles'; 
import { createNextState } from '@reduxjs/toolkit';

const Sales: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number>(null);
  const [sales, setSales] = useState<ISale[]>([]);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [weight, setWeight] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [editReceivingId, setEditReceivingId] = useState<string>('');
  const [saleToDelete, setSaleToDelete] = useState<ISale | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchAll = () => {
    if (year) {
        getSalesByYear(String(year)).then((res) => {
        setSales(res.data.sort((a, b) => b.timestamp - a.timestamp));      
      });
    }
  }

  const handleCreateButtonClick = () => {
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleEditButtonClick = (id:string) => () => {
    const sale = sales.find((r) => r._id === id);

    if (sale) {
      setDialogMode('edit');
      setEditReceivingId(sale._id);
      setWeight(String(sale.weight));
      setPrice(String(sale.price));
      setDate(dayjs(sale.timestamp));
      setDialogOpen(true);
    } else {
      alert('Помилка. Щось не так із ідентифікатором');
    }
    
  };
  
  const handleDeleteButtonClick = (id: string) => () => {
    const receiving = sales.find((r) => r._id === id);

    if (receiving) {
      setSaleToDelete(receiving);
      setDeleteDialogOpen(true);
    } else {
      alert('Помилка! Щось не так із ідентифікатором');
    }
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setWeight('');
    setPrice('');
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

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value === '' || FLOAT_NUMBER_REGEX.test(event.target.value)) {
      setPrice(event.target.value);
    }
  };

  const handleCreateSaleConfirm = () => {
    createSale({
      weight: Number(weight),
      price: Number(price),
      timestamp: date.toDate().getTime()
    }).then(() => {
      fetchAll();
      
      handleDialogCancel();
    });


  }

  const handleEditSaleConfirm = () => {
    updateSale({
      _id: editReceivingId,
      weight: Number(weight),
      price: Number(price),
      timestamp: date.toDate().getTime()
    }).then(() => {
      fetchAll();

      handleDialogCancel();
    });
  }

  const handleDeleteSaleCancel = () => {
    setDeleteDialogOpen(false);
    setTimeout(() => {
      setSaleToDelete(null);
    }, 100);
  };

  const handleDeleteSaleConfirm = () => {
    deleteSale(saleToDelete._id).then(() => {
      fetchAll();
      handleDeleteSaleCancel();
    })
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (dialogMode === 'create' && weight && price && date) {
        handleCreateSaleConfirm();
      }

      if (dialogMode === 'edit' && weight && price && date) {
        handleEditSaleConfirm();
      }

    }
  };

  useEffect(() => {
    fetchAll();
    getYears().then((res) => {
      setYears(res.data);
    })
  }, []);

  useEffect(() => {
    setYear(years[0] || null);
  }, [years]);

  useEffect(() => {
    fetchAll();
  }, [year]);

  return (
    <>
      <Header
        title={name}
        controls={
          <>
            <AggregationContainer>
              <Body>Продано</Body>
              <Body>{getSpacedDecimal(sales.reduce((acc, curr) => acc + curr.weight, 0))} кг</Body>
            </AggregationContainer>
            <AggregationContainer>
              <Body>Зароблено</Body>
              <Body>{getSpacedDecimal(sales.reduce((acc, curr) => acc + curr.weight * curr.price, 0))} грн</Body>
            </AggregationContainer>
            <SmallSelect
              options={years.map((y) => ({
                label: y,
                value: y
              }))}
              option={year}
              onChange={(event) => {
                setYear(Number(event.target.value));
              }}
            />
            <RoundedButton
              text="Додати продаж"
              icon={<AddIcon />}
              variant="contained"
              onClick={handleCreateButtonClick}
            />
          </>
        }
      />
      <SalesContainer>
        {sales.map(({ _id, weight, price, timestamp }) => (
          <SaleRow
            key={_id}
            weight={weight}
            price={price}
            timestamp={timestamp}
            onEdit={handleEditButtonClick(_id)}
            onDelete={handleDeleteButtonClick(_id)}
          />
        ))}
      </SalesContainer>
      <Dialog
        title={`${dialogMode === 'create' ? 'Додати' : 'Редагувати'} продаж`}
        open={dialogOpen}
        disableConfirm={!weight}
        onConfirm={dialogMode === 'create' ? handleCreateSaleConfirm : handleEditSaleConfirm}
        onCancel={handleDialogCancel}
        onKeyDown={onKeyDown}
        preButtonsComponent={
          <CounterContainer>
            <PriceIcon />
            <Body>Загальна ціна:</Body>
            <Body>{getSpacedDecimal(Number(weight) * Number(price))} грн</Body>
          </CounterContainer>
        }
      >
        <InputsFlexWrapper>
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
            <Input
              placeholder="Ціна"
              onChange={handlePriceChange}
              value={price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceIcon />
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
        </InputsFlexWrapper>
      </Dialog>
      <Dialog
        title="Увага"
        open={!!deleteDialogOpen}
        onConfirm={handleDeleteSaleConfirm}
        onCancel={handleDeleteSaleCancel}
      >
        <Body>Ви впевнені, що хочете видалити продаж малини вагою <b>{ getSpacedDecimal(saleToDelete?.weight) }&nbsp;кг</b> і загальною ціною <b>{saleToDelete ? getSpacedDecimal(saleToDelete.weight * saleToDelete.price) : null} грн</b> датований <b>{ dayjs(saleToDelete?.timestamp).format('DD.MM.YYYY') }</b>?</Body>
      </Dialog>
    </>
  );
};

export default Sales;