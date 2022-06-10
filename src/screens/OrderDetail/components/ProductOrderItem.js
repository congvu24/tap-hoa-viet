import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DARK_GREY} from '../../../constants/Colors';

export function ProductOrderCard({}) {
const ProductOrderItem = ({
  imgSrc = '',
  productName = '',
  price = '',
  quantity,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Image source={{uri: imgSrc}} style={styles.img} />

          <View style={styles.idNameContainer}>
            <Text style={styles.mainText}>{productName}</Text>
          </View>
        </View>

        <View style={styles.trailingNumberContainer}>
          <Text style={styles.mainText}> đ</Text>
          <Text style={[styles.mainText, styles.number]}>
            số lượng: {quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
  },
  img: {width: 70, height: 70, marginRight: 15},
  idNameContainer: {},
  trailingNumberContainer: {
    alignItems: 'flex-end',
  },
  mainText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: '500',
  },
  productId: {
    color: DARK_GREY,
  },
  number: {
    color: '#4C9FDB',
  },
});
