import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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

export default function CreateOrderScreen() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const goToAddProduct = () => {
    navigation.push('AddProductToOrder');
  };

  const goToSummary = () => {
    navigation.push('OrderSummary');
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
      {/* <View style={styles.emptyWrap}>
        <View style={styles.empty}>
          <Image source={require('../images/basket.png')} />
          <Text style={styles.subText}>Đơn hàng trống</Text>
          <TouchableOpacity style={styles.btn} onPress={goToAddProduct}>
            <Text style={styles.btnText}>Thêm sản phẩm +</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView>
        <View>
          <View style={styles.item}>
            <View style={styles.itemNameWrap}>
              <Image
                source={require('../images/shop.png')}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>item</Text>
            </View>
            <View style={styles.itemBtnWrap}>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="minus" />
              </TouchableOpacity>
              <Text style={styles.itemBtn}>1</Text>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemNameWrap}>
              <Image
                source={require('../images/shop.png')}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>item</Text>
            </View>
            <View style={styles.itemBtnWrap}>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="minus" />
              </TouchableOpacity>
              <Text style={styles.itemBtn}>1</Text>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemNameWrap}>
              <Image
                source={require('../images/shop.png')}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>item</Text>
            </View>
            <View style={styles.itemBtnWrap}>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="minus" />
              </TouchableOpacity>
              <Text style={styles.itemBtn}>1</Text>
              <TouchableOpacity style={styles.itemBtn}>
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.addItem} onPress={goToAddProduct}>
            <Text style={styles.addItemText}>Thêm sản phẩm</Text>
            <Icon name="plus" style={styles.addItemText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.btnWrap}>
        <TouchableOpacity
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
