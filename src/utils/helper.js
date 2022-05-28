export const formatMoney = (value, character = '.') =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, character);
export const format2Decimal = numb => {
  return Math.round((numb + Number.EPSILON) * 100) / 100;
};
export const formatK = value => {
  const price = Number((Number(value) / 1000).toFixed(2));
  if (price > 1) {
    return price + 'k';
  }
  return value;
};
export const parseDate = timeStamp => {
  const date = new Date(timeStamp);
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};
export const parseMonth = timeStamp => {
  const date = new Date(timeStamp);
  return date.getMonth() + 1;
};
