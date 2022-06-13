import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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
import {addProduct, clearOrder, removeProduct} from '../redux/reducer/order';
import {formatMoney} from '../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadFile} from '../services/upload';

export default function CreateOrderScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const productIds = Object.keys(order.products);
  const productCount = productIds.length;

  const goBack = () => {
    navigation.goBack();
  };

  const goToAddProduct = () => {
    navigation.push('AddProductToOrder');
  };

  const goToSummary = () => {
    navigation.push('OrderSummary');
  };

  const handleClearOrder = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn tiếp tục huỷ đơn hàng?', [
      {
        text: 'Huỷ',
        onPress: () => {
          console.log('Cancel clear');
        },
        style: 'cancel',
      },
      {text: 'Tiếp tục', onPress: () => dispatch(clearOrder())},
    ]);
  };

  const handleAddProduct = product => {
    console.log(product);
    dispatch(addProduct({...product, number: 1}));
  };

  const handleRemoveProduct = product => {
    console.log(product);
    dispatch(removeProduct({...product, number: 1}));
  };

  console.log(order);

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
      {productCount === 0 && (
        <View style={styles.emptyWrap}>
          <View style={styles.empty}>
            <Image source={require('../images/basket.png')} />
            <Text style={styles.subText}>Đơn hàng trống</Text>
            <TouchableOpacity style={styles.btn} onPress={goToAddProduct}>
              <Text style={styles.btnText}>Thêm sản phẩm +</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {productCount !== 0 && (
        <>
          <ScrollView>
            <View>
              {productIds.map(key => {
                const item = order.products[key];
                return (
                  <View style={styles.item} key={key}>
                    <View style={styles.itemNameWrap}>
                      <Image
                        source={{uri: item.imagesURL[0] ?? ''}}
                        style={styles.itemImage}
                      />
                      <View>
                        <Text style={styles.itemName}>{item.productName}</Text>
                        <Text style={styles.itemMoney}>
                          {formatMoney(item.number * item.sellPrice)}đ
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemBtnWrap}>
                      <TouchableOpacity
                        style={styles.itemBtn}
                        onPress={() =>
                          handleRemoveProduct({...item, productId: key})
                        }
                      >
                        <Icon name="minus" color={BLACK_COLOR} />
                      </TouchableOpacity>
                      <Text style={styles.itemBtn}>{item.number}</Text>
                      <TouchableOpacity
                        style={styles.itemBtn}
                        onPress={() =>
                          handleAddProduct({...item, productId: key})
                        }
                      >
                        <Icon name="plus" color={BLACK_COLOR} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}

              <TouchableOpacity style={styles.addItem} onPress={goToAddProduct}>
                <Text style={styles.addItemText}>Thêm sản phẩm</Text>
                <Icon name="plus" style={styles.addItemText} />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.btnWrap}>
            <TouchableOpacity
              onPress={handleClearOrder}
              style={[styles.nextBtn, {backgroundColor: PRIMARY_COLOR}]}
            >
              <Text style={styles.nextBtnText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextBtn, {flex: 2, backgroundColor: GREEN_COLOR}]}
              onPress={goToSummary}
            >
              <Text style={styles.nextBtnText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    elevation: 0.5,
  },
  btn: {
    marginTop: 20,
    backgroundColor: GREEN_COLOR,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: '500',
    color: 'white',
  },
  subText: {
    fontSize: 13,
    opacity: 0.8,
    fontWeight: '500',
    color: GRAY_COLOR,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: WHITE_COLOR,
    margin: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: BLACK_COLOR,
  },
  itemMoney: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
    color: GRAY_COLOR,
  },
  itemBtn: {
    padding: 4,
    margin: 2,
    backgroundColor: BACKGROUND_COLOR,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 17,
    fontWeight: '400',
    fontSize: 12,
    borderRadius: 5,
    color: BLACK_COLOR,
  },
  itemBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 100,
  },
  itemImage: {
    width: 50,
    height: 50,
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
  btnWrap: {
    height: 80,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  addItem: {
    margin: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: GRAY_COLOR,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
    color: GRAY_COLOR,
  },
});
