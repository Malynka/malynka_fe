import React, { FunctionComponent } from 'react';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";
import { OwnReceivingsContainer } from './styles'; 

const OwnReceivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header title={name} />
      <OwnReceivingsContainer>
        Own receivings
      </OwnReceivingsContainer>
    </>
  );
};

export default OwnReceivings;