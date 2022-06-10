
import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, updateInfo} from '../redux/reducer/order';
import {useNavigation} from '@react-navigation/native';
import ProductItem from './ProductOrderItem';
import moment from 'moment';
import {formatMoney} from '../utils';
import {getProduct} from '../services/getProduct';
import auth from '@react-native-firebase/auth';
import {ProductOrderItem} from './components/ProductOrderItem';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  BORDER_GREY_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
}   from '../../../constants/Colors';
 export default function OrderDetailScreen(order) {

 const navigation = useNavigation();
 const dispatch = useDispatch();


   const numberOfProducts = Object.keys(order.products).reduce(
    (sum, key) => sum + order.products[key].number,
    0,
  );

   const [productInfo,setProductInfo] = useState(null)


    useEffect(() => {
    getProductsOrder({order.products[]});
  })

    const getProductsOrder = async filters => {
    dispatch(onLoading());
    try {
      const res = await getProductList( order.products);
      setProductInfo(res);
      console.log('res', res);
    } catch (error) {
      console.log('error at OrderDetailScreen -> getProducts', error);
    }
    dispatch(offLoading());
  };

  const amount = Object.keys(order.products).reduce(
    (sum, key) =>
      sum + order.products[key].sellPrice * order.products[key].number,
    0,
  );
  return ( <View style={styles.wrap}>
      <TouchableOpacity
        style={{
          padding: 4,
        }}
      >
        <Icon name="left" size={20} color={BLACK_COLOR} />
      </TouchableOpacity>
      <View style={styles.summaryWrap}>
        {/* <View style={styles.pageImage}>
          <Image source={require('../images/checkout.png')} />
        </View> */}
           <View style={styles.sectionWrap}>
            <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Người Mua </Text>
            <Text style={styles.rowValue}> {order.buyerName}</Text>
          </View>
          <View style={styles.rowWrap}>
          <Text style={styles.rowTitle}>SĐT </Text>
            <Text style={styles.rowValue}> 09090909 </Text>
          </View>
        </View>
        <View style={styles.sectionWrap}>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Số lượng sản phẩm: </Text>
            <Text style={styles.rowValue}> {numberOfProducts}sp</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Tạm tính: </Text>
            <Text style={styles.rowValue}>{formatMoney(amount)}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thời gian: </Text>
            <Text style={styles.rowValue}> 23:35 20/11/2022 </Text>
            //order ko luu ngay thi xoa gium luon
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Khuyến mãi: </Text>
            <Text style={styles.rowValue}>{order.discount}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thành tiền: </Text>
            <Text style={styles.rowValue}>{formatMoney(amount - order.discount)}đ

            </Text>
          </View>
        </View>

 <View style={styles.sectionWrap}>
         <Text style={styles.rowTitle}>Danh sách hàng </Text>

            <ScrollView style={styles.itemsContainer}>

             {products &&
          products
            .filter((item, index) => {
                return (
                  item._data.productName
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) &&
                  item._data.productGroup.includes(selectedProductGroupCode)
                );
              }
            )
            .map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                >
                  <ProductItem
                    imgSrc={productInfo.imagesUR}
                    productName={productInfo.productName}
                    price={productInfo.productPrice}
                    quantity= 'so luong'
                    //Hinh nhu deo luu so luong moi san pham, ko co thi xoa cai cho nay
                  />
                </TouchableOpacity>
              );
            })}




      </ScrollView>
        </View>

        <View style={styles.sectionWrap}>
         <Text style={styles.rowTitle}>Ghi chú </Text>
         <Text style={styles.rowValue}> {order.note}
         </Text>
        </View>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },


  summaryWrap: {
    marginTop: 10,
  },

  sectionWrap: {
    margin: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderStyle: 'dotted',
    // borderWidth: 1,
    borderColor: GRAY_COLOR,
    padding: 10,
    backgroundColor: WHITE_COLOR,
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 5,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: BLACK_COLOR,
    opacity: 0.7,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '400',
    color: BLACK_COLOR,
  },


  itemsContainer: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
