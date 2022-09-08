export const getSpacedDecimal = (num: number) => String(num).split('').reverse().reduce((acc, curr, index) => acc + curr + ((index + 1) % 3 === 0 ? '\xa0' : ''), '').split('').reverse().join('').trim();

export const getFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;

  return`${day / 10 >= 1 ? day : '0' + day}.${month / 10 >= 1 ? month : '0' + month}.${date.getFullYear()}`;
};