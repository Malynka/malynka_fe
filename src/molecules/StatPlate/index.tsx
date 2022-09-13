import React, { FunctionComponent } from 'react';
import { Subtitle, Headline, Body } from '@typography';
import { getSpacedDecimal } from '@utils';
import { StatPlateContainer, ValueWrapper } from './styles';

export interface IStatPlateProps {
  label: string;
  value: number;
  unit: string;
}

const StatPlate: FunctionComponent<IStatPlateProps> = ({ label, value, unit }) => (
  <StatPlateContainer>
    <Subtitle>{ label }</Subtitle>
    <ValueWrapper>
      <Headline type="H2">{ getSpacedDecimal(value) }</Headline>
      <Body>{ unit }</Body>
    </ValueWrapper>
  </StatPlateContainer>
);

export default StatPlate;
