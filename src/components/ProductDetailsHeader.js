import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const ProductDetailsHeader = ({productCode = ''}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Icon
          style={styles.chevronLeft}
          size={35}
          type="material"
          name="chevron-left"
        />
        <Text style={styles.productCode}>{productCode}</Text>
      </View>

      <View style={styles.rightSection}>
        <Icon type="material" name="edit" />
        <Icon style={styles.moreIcon} type="material" name="delete" />
      </View>
    </View>
  );
};

export default ProductDetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronLeft: {
    marginRight: 15,
  },
  productCode: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  rightSection: {flexDirection: 'row', alignItems: 'center'},
  moreIcon: {marginLeft: 25},
});
