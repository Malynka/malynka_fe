import { IInternalTypographyProps } from './types';
import { styledTheme } from '@theme';
import { getTypographyComponent } from './utils';

const styles: IInternalTypographyProps = {
  fontSize: 20,
  fontWeight: styledTheme.font.weight.medium,
  lineHeight: 24,
  letterSpacing: 0.15
};

const MenuItemText = getTypographyComponent(styles, 'span');

export default MenuItemText;