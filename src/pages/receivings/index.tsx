import React, { FunctionComponent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { RoundedButton } from '@molecules';
import { Header } from '@organisms';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";
import { ReceivingsContainer } from './styles';


const Receivings: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header title={name}> 
        <RoundedButton
          text="Додати прийоми"
          icon={<AddIcon />}
          variant="contained"
        />
      </Header>
      <ReceivingsContainer> Receivings </ReceivingsContainer>
    </>
  );
};

export default Receivings;