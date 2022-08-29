import React, { FunctionComponent, useEffect } from 'react';
import { HomeContainer } from './styles';
import { useDocumentTitle } from '@hooks';

const Home: FunctionComponent = () => {
  useDocumentTitle('Головна');

  return (
    <HomeContainer>
      Home page
    </HomeContainer>
  );
}

export default Home;