import React, { FunctionComponent, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Headline } from '@typography';
import { PlateIconButton, SmallSelect, StatPlate } from '@molecules';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { getYears, getStats } from '@middleware';
import { IStats } from '@types';
import {
  HomeContainer,
  QuickAccessButtonsWrapper,
  StatsPlatesColumn,
  StatsTitleYearWrapper
} from './styles';
import { IPageProps } from "../types";

const Home: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number | 'default'>('default');
  const [stats, setStats] = useState<IStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getYears().then(({ data }) => {
      setYears(data);
      setMounted(true);
    });
  }, []);
  
  useEffect(() => {
    setYear(years[0] || 'default');
  }, [years]);

  useEffect(() => {
    if (mounted) {
      getStats(year === 'default' ? '' : year).then(({ data }) => {
        setStats(data);
      });
    }
  }, [year, mounted]);

  return (
    <>
      <Header title={name} />
      <HomeContainer>
        <Headline type="H4" margin="12px 0">Швидкий доступ</Headline>
        <QuickAccessButtonsWrapper>
          <PlateIconButton text="Додати прийом" icon={<AddIcon />} />
        </QuickAccessButtonsWrapper>
        <StatsTitleYearWrapper>
          <Headline type="H4" margin="24px 0">Статистика</Headline>
          <SmallSelect
            options={years.map((y) => ({
              label: y,
              value: y
            }))}
            option={year}
            defaultLabel="За всі роки"
            onChange={(event) => {
              const value = event.target.value;
              setYear(value === 'default' ? value : Number(event.target.value));
            }}
          />
        </StatsTitleYearWrapper>
        <Grid container gap="16px">
          <Grid item xs={2}>
            <StatsPlatesColumn>
              <StatPlate
                label="Максимальна ціна"
                value={stats?.maxPrice || 0}
                unit="грн / кг"
              />
              <StatPlate
                label="Середня ціна"
                value={stats?.avgPrice || 0}
                unit="грн / кг"
              />
              <StatPlate
                label="Мінімальна ціна"
                value={stats?.minPrice || 0}
                unit="грн / кг"
              />      
            </StatsPlatesColumn>
          </Grid>
          <Grid item xs={3}>
            <StatsPlatesColumn>
              <StatPlate
                label="Закуплена вага"
                value={stats?.totalWeight || 0}
                unit="кг"
              />
              <StatPlate
                label="Витрачено на закупівлю"
                value={stats?.totalPrice || 0}
                unit="грн"
              />
            </StatsPlatesColumn>
          </Grid>
          <Grid item xs={3}>
            <StatsPlatesColumn>
              <StatPlate
                label="Продано"
                value={stats?.soldWeight || 0}
                unit="кг"
              />
              <StatPlate
                label="Зароблено"
                value={stats?.earned || 0}
                unit="грн"
              />
            </StatsPlatesColumn>
          </Grid>
          <Grid item xs={3}>
            <StatsPlatesColumn>
              <StatPlate
                label="Залишок"
                value={(stats?.totalWeight || 0) - (stats?.soldWeight || 0)}
                unit="кг"
              />
              <StatPlate
                label="Прибуток"
                value={(stats?.earned || 0) - (stats?.totalPrice || 0)}
                unit="грн"
              />
            </StatsPlatesColumn>
          </Grid>
        </Grid>
      </HomeContainer>
    </>
  );
}

export default Home;