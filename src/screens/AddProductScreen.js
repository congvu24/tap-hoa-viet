import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import HorizontalInputField from '../components/HorizontalInputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {BACKGROUND_COLOR, WHITE_COLOR} from '../constants/Colors';
import {addProduct} from '../services/products';
import {nanoid} from '@reduxjs/toolkit';
import {Button} from 'react-native-elements';
import {PRIMARY_COLOR} from '../constants/Colors';
import {firebase} from '@react-native-firebase/auth';

export const AddProductScreen = () => {
  const [userId, setUserId] = useState('');
  const [productCode, setproductCode] = useState(nanoid(11));
  const [barCode, setbarCode] = useState('');
  const [productName, setproductName] = useState('');
  const [brand, setbrand] = useState('');
  const [capitalPrice, setcapitalPrice] = useState('');
  const [sellPrice, setsellPrice] = useState('');
  const [numberOfProducts, setnumberOfProducts] = useState('');
  const [productGroup, setproductGroup] = useState('thoiTrang');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setUserId(user.uid));
  }, []);

  const handleProductCode = text => {
    setproductCode(text);
  };

  const handleBarCode = text => {
    setbarCode(text);
  };

  const handleProductName = text => {
    setproductName(text);
  };

  const handleBrand = text => {
    setbrand(text);
  };

  const handleCapitalPrice = text => {
    setcapitalPrice(text);
  };

  const handleSellPrice = text => {
    setsellPrice(text);
  };

  const handleNumberOfProducts = text => {
    setnumberOfProducts(text);
  };

  const resetTextFields = () => {
    setbarCode('');
    setproductName('');
    setbrand('');
    setcapitalPrice('');
    setsellPrice('');
    setnumberOfProducts('');
    setproductGroup('thoiTrang');

    // reset product code
    const newCode = nanoid(11);
    setproductCode(newCode);
  };

  const uploadProduct = () => {
    addProduct(
      userId,
      productCode,
      barCode,
      productName,
      brand,
      capitalPrice,
      sellPrice,
      numberOfProducts,
      productGroup,
    )
      .then(() => {
        console.log('product added!');
        Alert.alert('Status', 'Add product successfully!');
        resetTextFields();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Status', 'Failed to add product!');
      });
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}
    >
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.topContainer}>
          <Image
            style={styles.uploadLogo}
            source={require('../images/ic_upload.png')}
          />
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <SafeAreaView>
            <HorizontalInputField
              title="Mã Hàng"
              hint="Mã Hàng Tự Động"
              isDisable={true}
              defaultValue={productCode}
            />

            <HorizontalInputField
              title="Mã Vạch"
              hint="Mã Vạch"
              setInputData={handleBarCode}
              defaultValue={barCode}
            />

            <HorizontalInputField
              title="Tên Hàng"
              hint="Tên Hàng"
              setInputData={handleProductName}
              defaultValue={productName}
            />

            <HorizontalInputField
              title="Thương hiệu"
              hint="Thương hiệu"
              setInputData={handleBrand}
              defaultValue={brand}
            />

            <HorizontalInputField
              title="Giá vốn"
              hint="Giá vốn"
              isNumberKeyBoard={true}
              setInputData={handleCapitalPrice}
              defaultValue={capitalPrice}
            />

            <HorizontalInputField
              title="Giá bán"
              hint="Giá bán"
              isNumberKeyBoard={true}
              setInputData={handleSellPrice}
              defaultValue={sellPrice}
            />

            <HorizontalInputField
              title="Số lượng"
              hint="Số lượng"
              isNumberKeyBoard={true}
              setInputData={handleNumberOfProducts}
              defaultValue={numberOfProducts}
            />
          </SafeAreaView>

          <PickerWithTitle
            title="Nhóm Hàng"
            hint="Nhóm hàng..."
            items={groupOfProducts}
            selectedValue={productGroup}
            setGroup={setproductGroup}
          />

          <View style={styles.addBtnContainer}>
            <Button
              title={'Add Product'}
              buttonStyle={styles.addBtn}
              titleStyle={styles.addBtnTitle}
              onPress={uploadProduct}
            />
          </View>
        </View>
      </ScrollView>
      {/* <FAB style={styles.FAB} /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 5,
    backgroundColor: WHITE_COLOR,
    paddingBottom: 120,
  },
  uploadLogo: {
    width: 100,
    height: 100,
    margin: 30,
  },
  title: {
    justifyContent: 'flex-start',
    fontSize: 16,
    marginStart: 20,
    marginTop: 30,
  },
  addBtnContainer: {
    alignItems: 'center',
  },

  addBtn: {
    backgroundColor: PRIMARY_COLOR,
    marginTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
  },

  addBtnTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  FAB: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    icon: 'add',
  },
});

const groupOfProducts = [
  {
    label: 'Thời trang',
    value: 'thoiTrang',
  },

  {
    label: 'Đồ ăn',
    value: 'doAn',
  },

  {
    label: 'Thức uống',
    value: 'thucUong',
  },

  {
    label: 'Chế phẩm',
    value: 'chePham',
  },

  {
    label: 'Phương tiện',
    value: 'phuongTien',
  },

  {
    label: 'Dụng cụ',
    value: 'dungCu',
  },

  {
    label: 'Thiết bị',
    value: 'thietBi',
  },

  {
    label: 'Khác',
    value: 'khac',
  },
];
