import { CSSProperties } from "react";

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