import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import ProductDetailsImages from '../components/ProductDetailsImages';

const ProductDetailsScreen = ({
  productName = 'Giày thể thao cá tính',
  productCode = 'NU016',
  barCode = 'thisIsBarCode',
  category = 'Phụ kiện phụ nữ',
  brand = 'Nike',
  capitalPrice = 0,
  sellPrice = 0,
  numberOfProduct = 0,
}) => {
  return (
    <ScrollView>
      <ProductDetailsHeader productCode={productCode} />
      <ScrollView>
        <View style={styles.carouselContainer}>
          <ProductDetailsImages />
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.mainText}>{productName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã hàng</Text>
              <Text>{productCode}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã vạch</Text>
              <Text>{barCode}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
              <Text>{category}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Thương hiệu</Text>
              <Text>{brand}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá vốn</Text>
              <Text>{capitalPrice}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá bán</Text>
              <Text>{sellPrice}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Tồn kho</Text>
              <Text>{numberOfProduct}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  productInfoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
});
