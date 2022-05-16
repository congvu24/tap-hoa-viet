import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
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

export default function OrderSummary() {
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
      <View style={styles.summaryWrap}>
        {/* <View style={styles.pageImage}>
          <Image source={require('../images/checkout.png')} />
        </View> */}
        <View style={styles.sectionWrap}>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Số lượng sản phẩm: </Text>
            <Text style={styles.rowValue}>20sp</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Tạm tính: </Text>
            <Text style={styles.rowValue}>200.000đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thời gian: </Text>
            <Text style={styles.rowValue}>19h, 20/02/2022</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Khuyến mãi: </Text>
            <Text style={styles.rowValue}>0đ</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={styles.rowTitle}>Thành tiền: </Text>
            <Text style={styles.rowValue}>200.000đ</Text>
          </View>
        </View>
        <View style={styles.sectionWrap}>
          <TextInput placeholder="Người mua" style={styles.customerInput} />
          <TextInput placeholder="SĐT" style={styles.customerInput} />
        </View>
        <View style={styles.sectionWrap}>
          <TextInput
            placeholder="Ghi chú"
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
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
  customerInput: {},
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  pageImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
