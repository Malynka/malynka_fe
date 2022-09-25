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
      <Headline type="H4">{ getSpacedDecimal(value) }</Headline>
      <Subtitle>{ unit }</Subtitle>
    </ValueWrapper>
  </StatPlateContainer>
);

export default StatPlate;
