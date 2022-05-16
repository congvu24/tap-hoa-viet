import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import {TEXT_COLOR, PRIMARY_COLOR} from '../constants/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import ExtendedProductInfoItem from '../components/ExtendedProductInfoItem';
import {useNavigation} from '@react-navigation/native';

const images = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80',
  'https://images.unsplash.com/photo-1581017316471-1f6ef7ce6fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  'https://images.unsplash.com/photo-1552066344-2464c1135c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

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
  // const [images, setImages] = useState([]);
  // useEffect(() => {}, [])
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <ProductDetailsHeader
        productCode={productCode}
        onBackPress={() => navigate.pop()}
      />
      {/* <ActivityIndicator /> */}
      <ScrollView style={styles.scrolledContainer}>
        <View style={styles.imageSliderContainer}>
          {/* <SliderBox
            images={images}
            sliderBoxHeight={250}
            dotColor={PRIMARY_COLOR}
          /> */}
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.mainText}>{productName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã hàng</Text>
              <Text style={styles.simpleText}>{productCode}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã vạch</Text>
              <Text style={styles.simpleText}>{barCode}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
              <Text style={styles.simpleText}>{category}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Thương hiệu</Text>
              <Text style={styles.simpleText}>{brand}</Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá vốn</Text>
              <Text style={[styles.simpleText, styles.primaryColor]}>
                {capitalPrice}
              </Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá bán</Text>
              <Text style={[styles.simpleText, styles.primaryColor]}>
                {sellPrice}
              </Text>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Tồn kho</Text>
              <Text style={[styles.simpleText, styles.primaryColor]}>
                {numberOfProduct}
              </Text>
            </View>

            {/* <ExtendedProductInfoItem
              title={'Mô tả'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            />
            <ExtendedProductInfoItem
              title={'Ghi chú'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageSliderContainer: {
    marginBottom: 10,
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
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  detailsContainer: {},

  mainText: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR,
  },

  singleInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
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
  },

  primaryColor: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
});
