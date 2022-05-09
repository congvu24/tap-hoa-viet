import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Card} from 'react-native-elements';
import {formatMoney} from '../../../utils';
import {GRAY_COLOR, TEXT_COLOR} from '../../../constants/Colors';

export function DailyIncomeCard({income}) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Text style={[styles.text, styles.cardTitle]}>Doanh thu hôm nay</Text>
      <Text style={[styles.text, styles.cardNumber]}>
        {formatMoney(income)} VND
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: GRAY_COLOR,
    margin: 0,
    paddingVertical: 30,
    borderRadius: 6,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardNumber: {
    fontSize: 24,
  },
});
