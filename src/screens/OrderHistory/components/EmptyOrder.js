import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {TEXT_COLOR, TEXT_SECONDARY_COLOR} from '../../../constants/Colors';

export function EmptyOrder() {
  return (
    <View style={styles.cardContainer}>
      <Icon name="receipt-outline" type="ionicon" size={69} />
      <Text style={styles.title}>No Orders Yet</Text>
      <Text style={styles.desc}>Try again with another date range.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  desc: {
    fontSize: 14,
    color: TEXT_SECONDARY_COLOR,
  },
});
