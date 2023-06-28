const splitDecimal = (num: number | string) => String(num).split('').reverse().reduce((acc, curr, index) => acc + curr + ((index + 1) % 3 === 0 ? '\xa0' : ''), '').split('').reverse().join('').trim();
export const getSpacedDecimal = (num: number | string) => {
  const stringNum = String(num);

  const dotIndex = stringNum.indexOf('.');
  if (dotIndex === -1) {
    return splitDecimal(num);
  } else {
    const intPart = Number(stringNum.slice(0, dotIndex));

    return (splitDecimal(intPart) + stringNum.slice(dotIndex)).replace('.', ',');
  }
};

export const getFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;

  return`${day / 10 >= 1 ? day : '0' + day}.${month / 10 >= 1 ? month : '0' + month}.${date.getFullYear()}`;
};

export const FLOAT_NUMBER_REGEX = /^([0-9]+([,.][0-9]*)?|[,.][0-9]+)$/;