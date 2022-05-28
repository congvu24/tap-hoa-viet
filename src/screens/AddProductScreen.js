import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import HorizontalInputField from '../components/HorizontalInputField';
import {Picker} from '@react-native-picker/picker';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {
  BACKGROUND_COLOR,
  MATERIAL_RED_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {addProduct} from '../services/addProducts';
import {deleteProduct} from '../services/deleteProduct';
import {nanoid} from '@reduxjs/toolkit';
import {Button} from 'react-native-elements';
import {PRIMARY_COLOR} from '../constants/Colors';
import {firebase} from '@react-native-firebase/auth';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DefaultImage from '../images/ic_upload.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerWithTitle from '../components/DateTimePickerWithTitle';
import uuid from 'react-native-uuid';
import CustomToolbar from '../components/CustomToolbar';

export const AddProductScreen = ({route, navigation}) => {
  const [userId, setUserId] = useState('bh45z18i7BbgTaIQJDSH7CCvgSP2');
  const [barCode, setBarCode] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [capitalPrice, setCapitalPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('25');
  const [productGroup, setProductGroup] = useState('thoiTrang');
  const [showBox, setShowBox] = useState(true);
  const {productID, ...otherParam} = route.params
    ? route.params
    : {productID: 'null'};
  const [productCode, setproductCode] = useState(uuid.v4().substring(0, 16));
  const schema = yup.object().shape({
    id: yup.string().required('Id is required'),
    name: yup.string().required().max(20),
    brand: yup.string().required().max(20),
    quantity: yup.number().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    description: yup.string().required(),
    importPrice: yup.number().required(),
    exportPrice: yup.number().required(),
    qrCode: yup.string(),
    importDate: yup.string(),
    exportDate: yup.string(),
  });

  const formMethod = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)();
    uploadProduct();
  }, [formMethod, onSubmit, uploadProduct]);

  const onSubmit = useCallback(data => {
    console.log(data);
  }, []);

  const [filePath, setFilePath] = useState(
    Image.resolveAssetSource(DefaultImage).uri,
  );

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 400,
      maxHeight: 400,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        alert('Đã huỷ thao tác');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera không khả dụng');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Không có quyền truy cập');
        return;
      } else if (response.errorCode == 'others') {
        alert('Fuck cậu Hoàn');
        return;
      }
      console.log(response.assets.map(item => item.uri));
      setFilePath(String(response.assets.map(item => item.uri)));
    });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
        console.log('Signed Out');
      }
    });
  }, []);

  const handleProductCode = text => {
    setproductCode(text);
  };

  const handleBarCode = text => {
    setBarCode(text);
  };

  const handleProductName = text => {
    setProductName(text);
  };

  const handleBrand = text => {
    setBrand(text);
  };

  const handleCapitalPrice = text => {
    setCapitalPrice(text);
  };

  const handleSellPrice = text => {
    setSellPrice(text);
  };

  const handleNumberOfProducts = text => {
    setNumberOfProducts(text);
  };

  const resetTextFields = () => {
    formMethod.reset();
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

  const showConfirmDialog = () => {
    return Alert.alert('Clear Form', 'Do you want to clear this form?', [
      {
        text: 'Yes',
        onPress: () => {
          setShowBox(false);
          resetTextFields();
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <FormProvider {...formMethod}>
      <KeyboardAvoidingView style={[styles.container]}>
        <CustomToolbar
          productCode={'Add Product'}
          isEdit={true}
          buttonText="Add"
          onButtonPress={() => uploadProduct()}
          onBackPress={() => navigation.pop()}
        />
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => chooseFile('photo')}
          >
            <Image style={styles.uploadLogo} source={{uri: filePath}} />
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <SafeAreaView>
              <HorizontalInputField
                name="id"
                title={'Mã Hàng'}
                isDisable={true}
                setInputData={handleProductCode}
                defaultValue={productCode}
                hint={productCode}
              />

              <HorizontalInputField
                name="qrCode"
                title="Mã Vạch"
                isDisable={true}
                value={JSON.stringify(productID)}
                hint={JSON.stringify(productID)}
              />

              <HorizontalInputField
                name="name"
                title="Tên Hàng"
                hint="Tên Hàng"
                setInputData={handleProductName}
                defaultValue={productName}
              />

              <HorizontalInputField
                name="brand"
                title="Thương hiệu"
                hint="Thương hiệu"
                setInputData={handleBrand}
                defaultValue={brand}
              />

              <HorizontalInputField
                name="importPrice"
                title="Giá vốn"
                hint="Giá vốn"
                isNumberKeyBoard={true}
                setInputData={handleCapitalPrice}
                defaultValue={capitalPrice}
              />

              <HorizontalInputField
                name="exportPrice"
                title="Giá bán"
                hint="Giá bán"
                isNumberKeyBoard={true}
                setInputData={handleSellPrice}
                defaultValue={sellPrice}
              />

              <HorizontalInputField
                name="quantity"
                title="Số lượng"
                hint="Số lượng"
                isNumberKeyBoard={true}
                setInputData={handleNumberOfProducts}
                defaultValue={numberOfProducts}
              />
            </SafeAreaView>

            <DateTimePickerWithTitle title="Ngày nhập kho" />

            <PickerWithTitle
              title="Nhóm Hàng"
              hint="Nhóm hàng..."
              items={groupOfProducts}
              selectedValue={productGroup}
              setGroup={setProductGroup}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={'Add'}
                buttonStyle={styles.addBtn}
                titleStyle={styles.btnTitle}
                onPress={onSubmitKey}
              />
              <Button
                title={'Clear'}
                buttonStyle={styles.deleteBtn}
                titleStyle={styles.btnTitle}
                onPress={showConfirmDialog}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative',
    flexDirection: 'column',
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

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addBtn: {
    width: 150,
    backgroundColor: PRIMARY_COLOR,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    marginStart: 10,
    marginEnd: 10,
  },

  deleteBtn: {
    width: 150,
    backgroundColor: MATERIAL_RED_COLOR,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
  },

  btnTitle: {
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
