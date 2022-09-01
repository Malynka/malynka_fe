import React, { FunctionComponent } from 'react';
import { HomeContainer } from './styles';
import { useDocumentTitle } from '@hooks';
import { IPageProps } from "../types";

const Home: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  return (
    <HomeContainer>
      Home page
    </HomeContainer>
  );
}

export default Home;