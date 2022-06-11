import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {WHITE_COLOR} from '../../../constants/Colors';
import {statisticIncomeByDay} from '../../../services/statistic';
import {formatMoney} from '../../../utils';

export function DailyIncomeCard() {
  const orders = useSelector(state => state.orderList.list);
  const dataIncome = statisticIncomeByDay(orders).datasets[0].data;

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

  const renderPercent = number => {
    if (isNaN(number)) return '+0%';

    const sign = number < 0 ? '-' : '+';

    return `${sign}${(number * 100).toFixed(2)}%`;
  };
  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.text, styles.cardTitle]}>Doanh thu</Text>
      <Text style={[styles.text, styles.cardNumber]}>
        ₫ {formatMoney(compareIncomeWithYesterday().todayIncome)}
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
