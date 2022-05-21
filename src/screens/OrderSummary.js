import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React from 'react';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  BORDER_GREY_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, updateInfo} from '../redux/reducer/order';
import moment from 'moment';

export default function OrderSummary() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const order = useSelector(state => state.order);
  const numberOfProducts = Object.keys(order.products).reduce(
    (sum, key) => sum + order.products[key].number,
    0,
  );
  const amount = Object.keys(order.products).reduce(
    (sum, key) =>
      sum + order.products[key].sellPrice * order.products[key].number,
    0,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const goToAddProduct = () => {
    navigation.push('AddProductToOrder');
  };

  const handleOrderInfoChange = (key, value) => {
    dispatch(updateInfo({[key]: value}));
  };

  const handleCheckout = () => {
    dispatch(
      createOrder({
        onSuccess: () => {
          Alert.alert('Thành công', 'Tạo đơn hàng thành công', [
            {
              text: 'Đóng',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        },
        onFailed: () => {
          Alert.alert('Lỗi', 'Lỗi không thể tạo đơn hàng', [
            {text: 'Đóng', onPress: () => {}},
          ]);
        },
      }),
    );
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        onPress={goBack}
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
            <Text style={styles.rowTitle}>Số lượng sản phẩm: </Text>
            <Text style={styles.rowValue}>{numberOfProducts}sp</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Tạm tính: </Text>
            <Text style={styles.rowValue}>{amount}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thời gian: </Text>
            <Text style={styles.rowValue}>
              {moment().locale('vi').format('llll')}
            </Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Khuyến mãi: </Text>
            <Text style={styles.rowValue}>{order.discount}đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thành tiền: </Text>
            <Text style={styles.rowValue}>{amount - order.discount}đ</Text>
          </View>
        </View>
        <View style={styles.sectionWrap}>
          <TextInput
            placeholder="Người mua"
            style={styles.customerInput}
            placeholderTextColor={GRAY_COLOR}
            onChangeText={value => {
              handleOrderInfoChange('buyerName', value);
            }}
          />
          <TextInput
            placeholder="SĐT"
            keyboardType="phone-pad"
            style={styles.customerInput}
            placeholderTextColor={GRAY_COLOR}
            onChangeText={value => {
              handleOrderInfoChange('buyerPhone', value);
            }}
          />
        </View>
        <View style={styles.sectionWrap}>
          <TextInput
            placeholder="Ghi chú"
            numberOfLines={5}
            textAlignVertical="top"
            style={styles.customerInput}
            placeholderTextColor={GRAY_COLOR}
            onChangeText={value => {
              handleOrderInfoChange('note', value);
            }}
          />
        </View>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          onPress={handleCheckout}
          style={[styles.nextBtn, {flex: 2, backgroundColor: GREEN_COLOR}]}
        >
          <Text style={styles.nextBtnText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  nextBtn: {
    backgroundColor: PRIMARY_COLOR,
    padding: 8,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  nextBtnText: {
    color: WHITE_COLOR,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
    // lineHeight: 20,
  },
  summaryWrap: {
    marginTop: 10,
  },
  btnWrap: {
    height: 80,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 'auto',
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
  customerInput: {
    color: BLACK_COLOR,
  },
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  pageImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
