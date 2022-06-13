import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomToolbar from '../components/CustomToolbar';
import {TEXT_COLOR, PRIMARY_COLOR} from '../constants/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import ExtendedProductInfoItem from '../components/ExtendedProductInfoItem';
import {useNavigation} from '@react-navigation/native';
import {getProductByQRCode, getProductGroup} from '../services/getProduct';
import {firebase} from '@react-native-firebase/auth';
import deleteFunctions from '../services/deleteProduct';
import auth from '@react-native-firebase/auth';
import {formatMoney} from '../utils/helper';

const ProductDetailsScreen = ({route}) => {
  const {qrCode} = route.params;
  const navigate = useNavigation();

  // const [images, setImages] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [productGroupToShow, setProductGroupToShow] = useState('');

  useEffect(() => {
    let unsubscribe;
    let uid = auth().currentUser?.uid;

    if (uid) {
      unsubscribe = fetchData(uid);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (productInfo) {
      getProductGroup(productInfo.productGroup)
        .then(res => {
          setProductGroupToShow(res.data().name);
        })
        .catch(err => console.log(err));
    }
  }, [productInfo]);

  // handle set products
  const handleSetProducts = data => {
    setProductInfo(data);
  };

  // fetch data
  const fetchData = userId => {
    return getProductByQRCode(userId, qrCode, handleSetProducts);
  };

  // on press delete button
  const handleDeletePress = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn xoá sản phẩm này?', [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Xoá',
        onPress: () => handleDelete(),
      },
    ]);
  };

  // handle delete
  const handleDelete = () => {
    let uid = auth().currentUser?.uid;

    navigate.pop();
    // deleteFunctions.deleteProductByQRcode(uid, qrCode);
    deleteFunctions.deleteProductByQRCode(uid, qrCode).then(() => {});
  };

  console.log(productInfo);

  return (
    <View style={styles.container}>
      <CustomToolbar
        productCode={productInfo && productInfo.productName.slice(0, 20)}
        onBackPress={() => navigate.pop()}
        onEditPress={() => navigate.push('EditProduct', {qrCode})}
        onDeletePress={handleDeletePress}
      />

      {productInfo ? (
        <ScrollView style={styles.scrolledContainer}>
          <View style={styles.imageSliderContainer}>
            <SliderBox
              images={productInfo.imagesURL}
              sliderBoxHeight={250}
              dotColor={PRIMARY_COLOR}
              imageLoadingColor={PRIMARY_COLOR}
            />
          </View>

          <View style={styles.productInfoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.mainText}>
                {productInfo && productInfo.productName}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Mã hàng</Text>
                <Text style={styles.simpleText}>
                  {productInfo && productInfo.qrCode}
                </Text>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
                <Text style={styles.simpleText}>
                  {/* {productInfo && showProductGroup(productInfo.productGroup)} */}
                  {productInfo.productGroup !== 'other'
                    ? productGroupToShow
                    : 'Khác'}
                </Text>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Thương hiệu</Text>
                <Text style={styles.simpleText}>
                  {productInfo && productInfo.brand}
                </Text>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Giá vốn</Text>
                <Text style={[styles.simpleText, styles.primaryColor]}>
                  {productInfo && formatMoney(productInfo.capitalPrice)} đ
                </Text>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Giá bán</Text>
                <Text style={[styles.simpleText, styles.primaryColor]}>
                  {productInfo && formatMoney(productInfo.sellPrice)} đ
                </Text>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Tồn kho</Text>
                <Text style={[styles.simpleText, styles.primaryColor]}>
                  {productInfo && productInfo.numberOfProducts}
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
      ) : (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
        </View>
      )}
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
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
