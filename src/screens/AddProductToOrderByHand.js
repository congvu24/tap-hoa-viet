import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import HorizontalInputField from '../components/HorizontalInputField';

export default function AddProductToOrderByHand() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const goToCheckout = () => {
    navigation.goBack();
    navigation.goBack();
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Icon name="left" size={20} color={BLACK_COLOR} />
      </TouchableOpacity>
      <View style={styles.formWrap}>
        <HorizontalInputField title="Sản phẩm" hint="Vỉ trứng" />
        <HorizontalInputField title="Giá nhập" hint="8,000đ" />
        <HorizontalInputField title="Giá bán" hint="10,000đ" />
        <HorizontalInputField title="Số lượng" hint="1" />
        <HorizontalInputField title="Thành tiền" hint="10,000đ  " />
        <HorizontalInputField title="Ghi chú" hint="" />
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          style={[styles.addbtn, {backgroundColor: PRIMARY_COLOR}]}
          onPress={goToCheckout}
        >
          <Text style={styles.addbtnText}>Đơn hàng (1)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addbtn, {flex: 2, backgroundColor: GREEN_COLOR}]}
        >
          <Text style={styles.addbtnText}>Tiếp tục</Text>
          <Icon name="right" color={WHITE_COLOR} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative',
  },

  backBtn: {
    padding: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100000,
  },
  addbtn: {
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
  addbtnText: {
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
  formWrap: {
    flex: 1,
    paddingTop: 20,
  },
});
