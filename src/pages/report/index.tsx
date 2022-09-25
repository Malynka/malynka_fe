import React, { FunctionComponent, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material';
import { RoundedButton, SmallSelect, Switch } from '@molecules';
import { Header, DatePicker } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { getReportByRange, getYears, getClients } from '@middleware';
import { IClient } from '@types';
import { IPageProps } from "../types";
import {
  ReportContainer,
  ControlsWrapper,
  DatePickersWrapper
} from './styles';

const startTimeStamp = 1618489894155;
const endTimeStamp = 1631709094155;

const Report: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const [years, setYears] = useState<number[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);
  const [client, setClient] = useState<string | 'default'>('default');
  const [rangeSwitchChecked, setRangeSwitchChecked] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(dayjs(Date.now()));
  const [endDate, setEndDate] = useState(dayjs(Date.now()));

  const minDate = dayjs(`01-01-${Math.min(...years)}`);
  const maxDate = dayjs(`12-31-${Math.max(...years)}`);

  const handleClientChange = (event: SelectChangeEvent<string>) => {
    setClient(event.target.value);
  }
  
  const handleSwitchChange = () => {
    setRangeSwitchChecked(prev => {
      if (!prev) {
        const today = dayjs(Date.now());

        if (today.diff(startDate) < 0) {
          setEndDate(startDate)
        } else {
          setEndDate(today);
        }
      }
      return !prev;
    }); 
  }

  const handleStartDateChange = (value: Dayjs) => {
    setStartDate(value);
    if (endDate.diff(value) < 0) setEndDate(value);
  };

  const handleEndDateChange = (value: Dayjs) => {
    setEndDate(value);
  }

  const handleGenerateExcel = () => {
    let startTimeStamp = startDate.toDate().getTime();
    let endTimeStamp = endDate.toDate().getTime();

    getReportByRange(startTimeStamp, rangeSwitchChecked ? endTimeStamp : undefined, client !== 'default' ? client : null).then((res) => {

      const fileName = `raport${client !== 'default' ? `-${clients.find((c) => c._id === client).name}`: ''}-${new Date(startTimeStamp).toLocaleDateString('uk')}${rangeSwitchChecked ? `-${new Date(endTimeStamp).toLocaleDateString('uk')}` : ''}.xlsx`;
      saveAs(res.data, fileName);
    });
  };

  useEffect(() => {
    getYears().then((res) => {
      setYears(res.data);
    });

    getClients().then((res) => {
      setClients(res.data);
    });
  }, []);

  return (
    <>
      <Header title={name} />
      <ReportContainer>
        <ControlsWrapper>
          <SmallSelect
            defaultLabel="Всі клієнти"
            options={clients.map((c) => ({
              label: c.name,
              value: c._id
            }))}
            option={client}
            onChange={handleClientChange}
          />
          <Switch
            labels={{
              unchecked: 'За день',
              checked: 'За період'
            }}
            checked={rangeSwitchChecked}
            onChange={handleSwitchChange}
          />
          <DatePickersWrapper>
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              minDate={minDate}
              maxDate={maxDate}
            />
            {rangeSwitchChecked ? (
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                maxDate={maxDate}
              />
            ) : null}
          </DatePickersWrapper>
          <RoundedButton
            text="Тиць!"
            variant="contained"
            onClick={handleGenerateExcel}
          />
        </ControlsWrapper>
      </ReportContainer>
    </>
  );
};

export default Report;