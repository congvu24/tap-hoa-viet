import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import {TEXT_COLOR, PRIMARY_COLOR} from '../constants/Colors';
import ExtendedProductInfoItem from '../components/ExtendedProductInfoItem';
import EditProductImagesSlide from '../components/EditProductImagesSlide';

const images = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80',
  'https://images.unsplash.com/photo-1581017316471-1f6ef7ce6fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  'https://images.unsplash.com/photo-1552066344-2464c1135c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

const EditProductScreen = ({
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
    <View style={styles.container}>
      <ProductDetailsHeader productCode={productCode} isEdit={true} />
      <ScrollView style={styles.scrolledContainer}>
        <View style={styles.imageSliderContainer}>
          <EditProductImagesSlide images={images} />
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.nameContainer}>
            <TextInput style={styles.mainText}>{productName}</TextInput>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã hàng</Text>
              <TextInput style={styles.simpleText}>{productCode}</TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã vạch</Text>
              <TextInput style={styles.simpleText}>{barCode}</TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
              <TextInput style={styles.simpleText}>{category}</TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Thương hiệu</Text>
              <TextInput style={styles.simpleText}>{brand}</TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá vốn</Text>
              <TextInput style={[styles.simpleText, styles.primaryColor]}>
                {capitalPrice}
              </TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá bán</Text>
              <TextInput style={[styles.simpleText, styles.primaryColor]}>
                {sellPrice}
              </TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Tồn kho</Text>
              <TextInput style={[styles.simpleText, styles.primaryColor]}>
                {numberOfProduct}
              </TextInput>
            </View>

            <ExtendedProductInfoItem
              title={'Mô tả'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              isEdit={true}
            />
            <ExtendedProductInfoItem
              title={'Ghi chú'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              isEdit={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageSliderContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  scrolledContainer: {},
  productInfoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 8,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
  nameContainer: {
    paddingTop: 15,
  },

  detailsContainer: {},

  mainText: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  singleInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },

  simpleInfoHeader: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: '500',
    flex: 0.4,
  },

  simpleText: {
    fontSize: 18,
    flex: 0.6,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  primaryColor: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
});
