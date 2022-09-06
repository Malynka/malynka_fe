import React, { FunctionComponent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Headline, Body } from '@typography';
import { RoundedButton } from '@molecules';
import { Header, OwnReceivingRow } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { getSpacedDecimal } from '@utils';
import { IPageProps } from "../types";
import { AllWeightContainer, OwnReceivingsContainer } from './styles'; 

const OwnReceivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header
        title={name}
        controls={
          <>
            <AllWeightContainer>
              <Body>Всього</Body>
              <Body>{ getSpacedDecimal(412131) } кг</Body>
            </AllWeightContainer>
            <RoundedButton
              text="Додати прийоми"
              icon={<AddIcon />}
              variant="contained"
            />
          </>
        }
      />
      <OwnReceivingsContainer>
        {new Array(30).fill(0).map((_, i) => (
          <OwnReceivingRow key={i} id={'' + i} weight={1200} timestamp={Date.now()} />
        ))}
      </OwnReceivingsContainer>
    </>
  );
};

export default OwnReceivings;