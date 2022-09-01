import { FunctionComponent } from "react";
import styled from "styled-components";
import { styledTheme } from '@theme';
import { IInternalTypographyProps } from "./types";
import { getTypographyComponentWithTypes } from "./utils";

const { font: { weight } } = styledTheme; 

export type THeadlineType = 'H1' | 'H2' | 'H3' | 'H4';

const headlineTypographyStyles: Record<THeadlineType, IInternalTypographyProps> = {
  H1: {
    as: 'h1',
    fontSize: 96,
    fontWeight: weight.light,
    lineHeight: 112,
    letterSpacing: -1.5
  },
  H2: {
    as: 'h2',
    fontSize: 60,
    fontWeight: weight.light,
    lineHeight: 72,
    letterSpacing: -0.5
  },
  H3: {
    as: 'h3',
    fontSize: 48,
    fontWeight: weight.regular,
    lineHeight: 56,
    letterSpacing: 0
  },
  H4: {
    as: 'h4',
    fontSize: 34,
    fontWeight: weight.regular,
    lineHeight: 36,
    letterSpacing: 0
  }
};

const Headline = getTypographyComponentWithTypes(headlineTypographyStyles);

export default Headline;