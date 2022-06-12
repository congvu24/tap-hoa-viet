import 'intl';
import 'intl/locale-data/jsonp/en';

export const formatMoney = (value, character = ',') =>
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
export function getYesterdayDate(date = new Date()) {
  return new Date(date.getTime() - 24 * 60 * 60 * 1000);
}
export const checkIn10Days = timeStamp => {
  const currentTime = new Date();
  let newTime = new Date();
  newTime.setDate(newTime.getDate() - 9);
  newTime = new Date(
    newTime.getFullYear(),
    newTime.getMonth(),
    newTime.getDate(),
  );
  if (newTime.getTime() <= timeStamp && timeStamp <= currentTime.getTime())
    return true;
  return false;
};
export const checkInDays = (timeStamp, numberOfDays) => {
  const currentTime = new Date();
  let newTime = new Date();
  newTime.setDate(newTime.getDate() - (numberOfDays - 1));
  newTime = new Date(
    newTime.getFullYear(),
    newTime.getMonth(),
    newTime.getDate(),
  );
  if (newTime.getTime() <= timeStamp && timeStamp <= currentTime.getTime())
    return true;
  return false;
};

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export const getDaysInCurrentMonth = () =>
  getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1);
