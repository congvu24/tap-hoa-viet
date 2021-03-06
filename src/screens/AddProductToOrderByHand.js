import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  SegmentedControlIOSBase,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import HorizontalInputField from '../components/HorizontalInputField';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {addProduct} from '../redux/reducer/order';
import {formatMoney} from '../utils';

export default function AddProductToOrderByHand() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const numberRef = useRef();

  const productList = useSelector(state => state.product.productList);
  console.log(productList);
  const numberOfProducts = useSelector(
    state => Object.keys(state.order.products).length,
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const [number, setNumber] = useState(1);
  const [note, setNote] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const goToCheckout = () => {
    navigation.goBack();
    navigation.goBack();
  };

  const formMethod = useForm({
    resolver: () => {},
  });

  const onAdd = () => {
    if (selectedProduct) {
      dispatch(addProduct({...selectedProduct, number: number}));
      setNumber(1);
      setSelectedProduct('');
      setNote('');
      numberRef.current?.clear();
    }
  };

  return (
    <FormProvider {...formMethod}>
      <View style={styles.wrap}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Icon name="left" size={20} color={BLACK_COLOR} />
        </TouchableOpacity>
        <View style={styles.formWrap}>
          <SafeAreaView>
            <TouchableOpacity
              style={styles.selectWrap}
              onPress={() => setVisible(true)}
            >
              <Text style={styles.selectText}>
                {selectedProduct ? selectedProduct?.productName : 'S???n ph???m'}
              </Text>
              <Icon name="down" style={styles.selectIcon} />
            </TouchableOpacity>
            <ModalFilterPicker
              visible={visible}
              placeholderText="S???n ph???m"
              onSelect={({key}) => {
                console.log(key);
                setVisible(false);
                setSelectedProduct(
                  productList.find(item => item.productId == key),
                );
              }}
              onCancel={() => setVisible(false)}
              options={productList.map(item => ({
                key: item.productId,
                label: item.productName,
              }))}
            />
            <HorizontalInputField
              name="priceIn"
              title="Gi?? nh???p"
              hint={
                selectedProduct
                  ? formatMoney(selectedProduct?.capitalPrice) + '??'
                  : ''
              }
              isDisable={true}
              setInputData={() => {}}
              defaultValue={''}
            />
            <HorizontalInputField
              isDisable={true}
              name="priceOut"
              title="Gi?? b??n"
              hint={
                selectedProduct
                  ? formatMoney(selectedProduct?.sellPrice) + '??'
                  : ''
              }
              setInputData={() => {}}
              defaultValue={''}
            />
            <HorizontalInputField
              name="number"
              isNumberKeyBoard={true}
              title="S??? l?????ng"
              ref={numberRef}
              defaultValue={String(number)}
              setInputData={value => {
                if (!value) return setNumber(0);
                setNumber(parseInt(value));
              }}
            />
            <HorizontalInputField
              isDisable={true}
              name="sum"
              title="Th??nh ti???n"
              hint={
                selectedProduct
                  ? formatMoney(selectedProduct?.sellPrice * number) + '??'
                  : ''
              }
              setInputData={() => {}}
              defaultValue={''}
            />
            <HorizontalInputField
              name="note"
              title="Ghi ch??"
              hint=""
              setInputData={value => {
                setNote(value);
              }}
              defaultValue={''}
            />
          </SafeAreaView>
        </View>
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={[styles.addbtn, {backgroundColor: PRIMARY_COLOR}]}
            onPress={goToCheckout}
          >
            <Text style={styles.addbtnText}>????n h??ng ({numberOfProducts})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onAdd}
            style={[styles.addbtn, {flex: 2, backgroundColor: GREEN_COLOR}]}
          >
            <Text style={styles.addbtnText}>Ti???p t???c</Text>
            <Icon name="right" color={WHITE_COLOR} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
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
  selectWrap: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    flexDirection: 'row',
    marginTop: 30,
    height: 40,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BLACK_COLOR,
  },
  selectText: {
    flex: 1,
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  selectIcon: {
    // marginLeft: 'auto',
    width: 20,
  },
});
