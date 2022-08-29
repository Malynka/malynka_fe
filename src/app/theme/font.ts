const font = {
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900
  }
};

export type TFontWeight = keyof typeof font.weight;

export default font;