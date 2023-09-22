import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { saveAs } from 'file-saver';
import { getClients } from '@api/client';
import { getReportByRange, getYears, } from '@api/raport';
import { useDocumentTitle } from '@hooks';
import { RoundedButton, SmallSelect, Switch } from '@molecules';
import { Header, DatePicker } from '@organisms';
import type { IClient } from '@types';
import { ReportContainer, ControlsWrapper, DatePickersWrapper } from './styles';
import type { IPageProps } from "../types";

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

  const handleClientChange = (event: SelectChangeEvent<unknown>) => {
    setClient(event.target.value as string);
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

  const handleStartDateChange = (value: unknown) => {
    setStartDate(value as Dayjs);
    if (endDate.diff(value as Dayjs) < 0) setEndDate(value as Dayjs);
  };

  const handleEndDateChange = (value: unknown) => {
    setEndDate(value as Dayjs);
  }

  const handleGenerateExcel = () => {
    const startTimeStamp = startDate.toDate().getTime();
    const endTimeStamp = endDate.toDate().getTime();

    getReportByRange(startTimeStamp, rangeSwitchChecked ? endTimeStamp : undefined, client !== 'default' ? client : undefined).then((res) => {

      const fileName = `raport${client !== 'default' ? `-${clients.find((c) => c._id === client)!.name}`: ''}-${new Date(startTimeStamp).toLocaleDateString('uk')}${rangeSwitchChecked ? `-${new Date(endTimeStamp).toLocaleDateString('uk')}` : ''}.xlsx`;
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