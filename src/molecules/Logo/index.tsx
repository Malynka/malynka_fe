import React, { FunctionComponent } from 'react';
import { LogoIcon } from '@atoms';
import { LogoContainer } from './styles';
import { Headline } from '@typography';

const Logo: FunctionComponent = () => (
  <LogoContainer>
    <LogoIcon width={36} height={47}/>
    <Headline type="H4">Малинка</Headline>
  </LogoContainer>
);

export default Logo;
