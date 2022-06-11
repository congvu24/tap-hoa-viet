import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {TEXT_COLOR} from '../../../constants/Colors';
import {formatMoney} from '../../../utils';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export function OrderCard({order}) {
  const navigation = useNavigation();
  if (!order) return null;

  const parsedCreateAt = new Date(order.createAt);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetails', {orderId: order.id})}
      style={styles.cardContainer}
    >
      <View>
        <View style={styles.row}>
          <Text style={[styles.title, styles.text]}>Được tạo lúc: </Text>
          <Text style={styles.text}>{parsedCreateAt.toLocaleString('VN')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.title, styles.text]}>Số loại sản phẩm: </Text>
          <Text style={styles.text}>{order.products?.length}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.title, styles.text]}>Giá: </Text>
          <Text style={styles.text}>{formatMoney(order.amount)}₫</Text>
        </View>
      </View>
      <View style={styles.viewDetails}>
        <Icon
          style={styles.chevronLeft}
          size={25}
          type="material"
          name="chevron-right"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
  title: {
    fontWeight: '600',
  },
  viewDetails: {
    alignItems: 'center',
  },
});
