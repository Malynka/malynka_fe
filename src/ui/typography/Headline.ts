import { styledTheme } from '@theme';
import { IInternalTypographyProps, TypographyTypedComponent } from "./types";
import { getTypographyComponentWithTypes, getStyles } from "./utils";

const { font: { weight } } = styledTheme; 

export type THeadlineType = 'H1' | 'H2' | 'H3' | 'H4';

const headlineTypographyStyles: Record<THeadlineType, IInternalTypographyProps> = {
  H1: {
    as: 'h1',
    fontSize: 64,
    fontWeight: weight.light,
    lineHeight: 112,
    letterSpacing: -1.5
  },
  H2: {
    as: 'h2',
    fontSize: 40,
    fontWeight: weight.light,
    lineHeight: 72,
    letterSpacing: -0.5
  },
  H3: {
    as: 'h3',
    fontSize: 32,
    fontWeight: weight.regular,
    lineHeight: 56,
    letterSpacing: 0
  },
  H4: {
    as: 'h4',
    fontSize: 24,
    fontWeight: weight.regular,
    lineHeight: 36,
    letterSpacing: 0
  }
};

const Headline: TypographyTypedComponent<THeadlineType> = Object.assign(
  getTypographyComponentWithTypes(headlineTypographyStyles),
  {
    getStyles: (type: THeadlineType) => getStyles(headlineTypographyStyles[type])
  }
);

export default Headline;