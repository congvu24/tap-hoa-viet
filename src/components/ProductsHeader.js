import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductsHeader = ({
  title = '',
  numberOfProducts = 0,
  inventoryNumber = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconsContainer}>
          <Icon name="search-outline" size={25} style={styles.icon} />
          <Icon name="add-outline" size={25} style={styles.icon} />
          <Icon name="funnel-outline" size={25} style={styles.icon} />
          <Icon />
        </View>
      </View>

      <View style={styles.extraSection}>
        <Text style={styles.numberText}>
          <Text style={styles.number}>{numberOfProducts}</Text> hàng hóa - Tồn
          kho <Text style={styles.number}>{inventoryNumber}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProductsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
  },
  mainSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
  icon: {
    marginLeft: 30,
  },
  extraSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  numberText: {
    fontWeight: '600',
  },
  number: {
    color: '#4C9FDB',
  },
});
