import React, { FunctionComponent } from "react";
import { ClientsContainer } from "./styles";
import { IPageProps } from "../types";
import { useDocumentTitle } from "@hooks";

const Clients: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <ClientsContainer>
      Clients Page
    </ClientsContainer>
  );
};

export default Clients;
