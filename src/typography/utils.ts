import styled, { css, DefaultTheme, ThemedStyledFunction, StyledInterface } from 'styled-components';
import { IExternalTypographyProps, IInternalTypographyProps } from './types';

export const getStyles = (props: Omit<IInternalTypographyProps, 'as'>) => css`
  font-size: ${props.fontSize}px;
  font-weight: ${props.fontWeight};
  line-height: ${props.lineHeight}px;
  letter-spacing: ${props.letterSpacing}px;
`;

const s = styled['div'];

export const getTypographyComponent = (typographyProps: IInternalTypographyProps, element: keyof StyledInterface = 'div') => 
(styled[element] as ThemedStyledFunction<typeof element, DefaultTheme, IExternalTypographyProps, never>)`
  font-family: Roboto, sans-serif;
  ${getStyles(typographyProps)}
  margin: ${(p) => p.margin ? typeof p.margin === 'number' ? `${p.margin}px` : p.margin : 0};
`;

export const getTypographyComponentWithTypes = <Type extends string | number>(typographyPropsRecord: Record<Type, IInternalTypographyProps>, defaultElement: keyof StyledInterface = 'div' ) =>
(styled[defaultElement] as ThemedStyledFunction<typeof defaultElement, DefaultTheme, {}, never>)
.attrs((props) => ({
  as: typographyPropsRecord[(props as unknown as { type: Type }).type].as
}))<IExternalTypographyProps & { type: Type }>`
  font-family: Roboto, sans-serif;
  ${(p) => getStyles(typographyPropsRecord[p.type])};
  margin: ${(p) => p.margin ? typeof p.margin === 'number' ? `${p.margin}px` : p.margin : 0};
`;
