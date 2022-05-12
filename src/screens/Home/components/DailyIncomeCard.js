import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  TEXT_COLOR,
  TEXT_SECONDARY_COLOR,
  WHITE_COLOR,
} from '../../../constants/Colors';
import {formatMoney} from '../../../utils';

export function DailyIncomeCard() {
  const income = 5000000;
  const compareLastDay = 0.24;

  const renderPercent = number => {
    const sign = number < 0 ? '-' : '+';

    return `${sign}${(number * 100).toFixed(2)}%`;
  };
  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.text, styles.cardTitle]}>Doanh thu</Text>
      <Text style={[styles.text, styles.cardNumber]}>
        ₫ {formatMoney(income)}
      </Text>
      <Text style={[styles.text, styles.increasePercent]}>
        {renderPercent(compareLastDay)} so với hôm qua
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
