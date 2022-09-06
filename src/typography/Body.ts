import { IInternalTypographyProps, TypographyComponent } from './types';
import { styledTheme } from '@theme';
import { getTypographyComponent, getStyles } from './utils';

const styles: IInternalTypographyProps = {
  fontSize: 16,
  fontWeight: styledTheme.font.weight.regular,
  lineHeight: 24,
  letterSpacing: 0.5
};

const Body: TypographyComponent = Object.assign(getTypographyComponent(styles, 'span'), {
  getStyles: () => getStyles(styles)
});



export default Body;