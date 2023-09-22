import { IInternalTypographyProps } from './types';
import { styledTheme } from '@theme';
import { getTypographyComponent } from './utils';

const styles: IInternalTypographyProps = {
  fontSize: 16,
  fontWeight: styledTheme.font.weight.regular,
  lineHeight: 24,
  letterSpacing: 0.15
};

const Subtitle = getTypographyComponent(styles, 'div');

export default Subtitle;