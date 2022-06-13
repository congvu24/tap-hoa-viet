import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {WHITE_COLOR} from '../../../constants/Colors';
import {statisticIncomeByDay} from '../../../services/statistic';
import {formatMoney} from '../../../utils';

export function DailyIncomeCard() {
  const orders = useSelector(state => state.orderList.list);
  const dataIncome = statisticIncomeByDay(orders).datasets[0].data;

  // console.log(orders)

  const sumToday = orders
    .filter(item => {
      const date = new Date(item.createAt);
      const today = new Date();
      if (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      ) {
        return true;
      }
      return false;
    })
    .reduce((current, item) => current + item.amount, 0);

  console.log(sumToday);

  const compareIncomeWithYesterday = () => {
    const dataLength = dataIncome.length;
    const todayIncome = dataIncome[dataLength - 1];
    const yesterdayIncome = dataIncome[dataLength - 2];

    return {
      todayIncome,
      compareLastDay:
        todayIncome > yesterdayIncome
          ? todayIncome / yesterdayIncome
          : 1 - todayIncome / yesterdayIncome,
    };
  };
  console.log(compareIncomeWithYesterday());

  const renderPercent = number => {
    if (isNaN(number)) {
      return '+0%';
    }

    const sign = number < 0 ? '-' : '+';

    return `${sign}${(number * 100).toFixed(2)}%`;
  };
  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.text, styles.cardTitle]}>Doanh thu</Text>
      <Text style={[styles.text, styles.cardNumber]}>
        {formatMoney(sumToday)}đ
      </Text>
      <Text style={[styles.text, styles.increasePercent]}>
        {renderPercent(compareIncomeWithYesterday().compareLastDay)} so với hôm
        qua
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    margin: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE_COLOR,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: '700',
  },
  increasePercent: {
    fontSize: 12,
  },
});
