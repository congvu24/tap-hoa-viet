import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TEXT_COLOR} from '../../../constants/Colors';
import {formatMoney} from '../../../utils';

export function OrderCard({order}) {
  if (!order) return null;

  const parsedCreateAt = new Date(order.createAt);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.text}>
        Created At: {parsedCreateAt.toLocaleString('VN')}
      </Text>
      <Text style={styles.text}>Products: {order.products?.length}</Text>
      <Text style={styles.text}>Price: {formatMoney(order.amount)}₫</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
});
