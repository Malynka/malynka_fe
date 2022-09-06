import React, { FunctionComponent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { RoundedButton } from '@molecules';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";
import { OwnReceivingsContainer } from './styles'; 

const OwnReceivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header
        title={name}
        controls={
          <RoundedButton
            text="Додати прийоми"
            icon={<AddIcon />}
            variant="contained"
          />
        }
      />
      <OwnReceivingsContainer>
        Own receivings
      </OwnReceivingsContainer>
    </>
  );
};

export default OwnReceivings;