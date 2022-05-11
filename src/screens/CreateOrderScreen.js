import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
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
      <View style={styles.emptyWrap}>
        <View style={styles.empty}>
          <Image source={require('../images/basket.png')} />
          <Text style={styles.subText}>Đơn hàng trống</Text>
          <TouchableOpacity style={styles.btn} onPress={goToAddProduct}>
            <Text style={styles.btnText}>Thêm sản phẩm +</Text>
          </TouchableOpacity>
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
});
