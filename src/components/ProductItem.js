import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DARK_GREY} from '../constants/Colors';
import {formatMoney} from '../utils/helper';

const ProductItem = ({
  imgSrc = '',
  productName = '',
  productId = '',
  price = '',
  numberOfInventories,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Image source={{uri: imgSrc}} style={styles.img} />

          <View style={styles.idNameContainer}>
            <Text style={styles.mainText}>{productName}</Text>
            <Text style={styles.productId}>{productId}</Text>
          </View>
        </View>

        <View style={styles.trailingNumberContainer}>
          <Text style={styles.mainText}>{formatMoney(price)} đ</Text>
          <Text style={[styles.mainText, styles.number]}>
            số lượng: {numberOfInventories}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

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
