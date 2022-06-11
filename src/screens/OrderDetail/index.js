/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
} from '../../constants/Colors';
import {offLoading, onLoading} from '../../redux/reducer/app';
import {getOrderDetailsById} from '../../services';
import {formatMoney} from '../../utils';
import {ProductOrderItem} from './components/ProductOrderItem';
import CustomToolbar from '../../components/CustomToolbar';

export default function OrderDetailScreen({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {orderId} = route.params;
  const [order, setOrder] = useState();

  if (!orderId) {
    navigation.dispatch(CommonActions.goBack());
  }

  const numberOfProducts = order =>
    Object.keys(order.products).reduce(
      (sum, key) => sum + order.products[key].number,
      0,
    );

  useEffect(() => {
    (async () => {
      dispatch(onLoading());
      try {
        const result = await getOrderDetailsById(orderId);
        console.log('🚀 ~ file: index.js ~ line 45 ~ result', result);
        setOrder(result);
      } catch (error) {
        console.log('error at OrderDetailsScreen -> getOrderDetails', error);
      }
      dispatch(offLoading());
    })();
  }, []);

  const amount = order =>
    Object.keys(order.products).reduce(
      (sum, key) =>
        sum + order.products[key].sellPrice * order.products[key].number,
      0,
    );

  if (!order) {
    return null;
  }
  return (
    <View style={styles.wrap}>
      <CustomToolbar
        productCode="Order Details"
        isEdit={true}
        buttonText=""
        onBackPress={() => navigation.pop()}
      />
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
            <Text style={styles.rowValue}> {numberOfProducts(order)}</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Tạm tính: </Text>
            <Text style={styles.rowValue}>{formatMoney(amount(order))}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thời gian: </Text>
            <Text style={styles.rowValue}>
              {new Date(order.createAt).toLocaleString('VN')}
            </Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Khuyến mãi: </Text>
            <Text style={styles.rowValue}>{order.discount}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thành tiền: </Text>
            <Text style={styles.rowValue}>
              {formatMoney(amount(order) - order.discount)}đ
            </Text>
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.rowTitle}>Danh sách hàng </Text>

          <ScrollView style={styles.itemsContainer}>
            {order &&
              order.products.map((item, index) => (
                <TouchableOpacity key={index}>
                  <ProductOrderItem product={item} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.rowTitle}>Ghi chú </Text>
          <Text style={styles.rowValue}> {order.note}</Text>
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
