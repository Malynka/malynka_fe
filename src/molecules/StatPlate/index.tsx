import React, { FunctionComponent } from 'react';
import { Subtitle, Headline, Body } from '@typography';
import { StatPlateContainer, ValueWrapper } from './styles';

export interface IStatPlateProps {
  label: string;
  value: string | number;
  unit: string;
}

const StatPlate: FunctionComponent<IStatPlateProps> = ({ label, value, unit }) => (
  <StatPlateContainer>
    <Subtitle>{ label }</Subtitle>
    <ValueWrapper>
      <Headline type="H2">{ value }</Headline>
      <Body>{ unit }</Body>
    </ValueWrapper>
  </StatPlateContainer>
);

export default StatPlate;
