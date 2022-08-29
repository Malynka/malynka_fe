import 'styled-components';
import { TStyledTheme } from '.';

declare module 'styled-components' {
  export interface DefaultTheme extends TStyledTheme {}
}