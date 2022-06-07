import {parseMonth, checkIn10Days} from '../utils/helper';
export const statisticIncomeByMonth = list => {
  let monthList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  list.forEach(element => {
    monthList[parseMonth(element.createAt) - 1] += element.amount / 1000;
  });
  const data = {
    labels: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    datasets: [
      {
        data: monthList,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Doanh thu cuối tháng'], // optional
  };
  console.log('data: ', data.datasets[0].data);
  return data;
};
export const statisticIncomeByDay = list => {
  let dayList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let labelDay = [];
  const currentDay = new Date();
  for (let i = 9; i >= 0; i--) {
    labelDay[i] = currentDay.getDate() + '/' + (currentDay.getMonth() + 1);
    currentDay.setDate(currentDay.getDate() - 1);
  }
  list.forEach(element => {
    if (checkIn10Days(element.createAt)) {
      const tmp = new Date(element.createAt);
      for (let i = 0; i < 10; i++) {
        if (labelDay[i] == tmp.getDate() + '/' + (tmp.getMonth() + 1))
          dayList[i] += element.amount / 1000;
      }
    }
  });
  const data = {
    labels: labelDay,
    datasets: [
      {
        data: dayList,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Doanh thu cuối ngày'], // optional
  };
  return data;
};
export const statisticQuantityByMonth = list => {
  let monthList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  list.forEach(element => {
    monthList[parseMonth(element.createAt) - 1] += 1;
  });
  const data = {
    labels: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    datasets: [
      {
        data: monthList,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return data;
};
export const statisticQuantityByDay = list => {
  let dayList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let labelDay = [];
  const currentDay = new Date();
  for (let i = 9; i >= 0; i--) {
    labelDay[i] = currentDay.getDate() + '/' + (currentDay.getMonth() + 1);
    currentDay.setDate(currentDay.getDate() - 1);
  }
  list.forEach(element => {
    if (checkIn10Days(element.createAt)) {
      const tmp = new Date(element.createAt);
      for (let i = 0; i < 10; i++) {
        if (labelDay[i] == tmp.getDate() + '/' + (tmp.getMonth() + 1))
          dayList[i] += 1;
      }
    }
  });
  const data = {
    labels: labelDay,
    datasets: [
      {
        data: dayList,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return data;
};
