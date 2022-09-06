import { CSSProperties } from "react";
import { StyledComponent, StyledInterface, DefaultTheme } from 'styled-components';
import { getStyles } from './utils';

export interface IExternalTypographyProps {
  margin?: CSSProperties['margin'];
}

// type TMediaProp = 

export interface IInternalTypographyProps {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  as?: keyof JSX.IntrinsicElements;
}

export type TypographyComponent = StyledComponent<keyof StyledInterface, DefaultTheme, IExternalTypographyProps, never> & { getStyles: () => ReturnType<typeof getStyles> };
export type TypographyTypedComponent<T> = StyledComponent<keyof StyledInterface, DefaultTheme, IExternalTypographyProps, never> & { getStyles: (type: T) => ReturnType<typeof getStyles> };