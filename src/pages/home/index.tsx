import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { HomeContainer } from './styles';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/clients');
  }, []);

  return (
    <HomeContainer>
      Home page
    </HomeContainer>
  );
}

export default Home;