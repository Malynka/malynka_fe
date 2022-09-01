import React, { FunctionComponent } from "react";
import AddIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { RoundedButton } from "@molecules"; 
import { Header } from "@organisms";
import { useDocumentTitle } from "@hooks";
import { IPageProps } from "../types";
import { ClientsContainer } from "./styles";

const Clients: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <>
      <Header title={name}>
        <RoundedButton
          text="Додати клієнта"
          icon={<AddIcon />}
          variant="contained"
        />
      </Header>
      <ClientsContainer>
        Clients Page
      </ClientsContainer>
    </>
  );
};

export default Clients;
