import React, { FunctionComponent, useState } from 'react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Headline } from '@typography';
import { PlateIconButton, SmallSelect, StatPlate } from '@molecules';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import {
  HomeContainer,
  QuickAccessButtonsWrapper,
  StatsPlatesRow,
  StatsTitleYearWrapper
} from './styles';
import { IPageProps } from "../types";

const options = [2019, 2020, 2021, 2022].map((year) => ({
  label: year,
  value: year
}));

const Home: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const [option, setOption] = useState<string | number>(options[2].value);

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
            options={options}
            option={option}
            onChange={(event) => {
              setOption(event.target.value);
            }}
          />
        </StatsTitleYearWrapper>
        <Grid container>
          <Grid display="flex" flexDirection="column" rowGap="20px" item xs={12} lg={8}>
            <StatsPlatesRow>
              <StatPlate
                label="Середня ціна"
                value="50"
                unit="грн / кг"
              />
              <StatPlate
                label="Мінімальна ціна"
                value="38"
                unit="грн / кг"
              />
              <StatPlate
                label="Максимальна ціна"
                value="120"
                unit="грн / кг"
              />
            </StatsPlatesRow>
            <StatsPlatesRow>
              <StatPlate
                label="Вага"
                value="25 487"
                unit="кг"
              />
              <StatPlate
                label="Витрачено на закупівлю"
                value="230 458"
                unit="грн"
              />
            </StatsPlatesRow>
          </Grid>
        </Grid>
      </HomeContainer>
    </>
  );
}

export default Home;