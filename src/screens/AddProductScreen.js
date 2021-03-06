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
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import HorizontalInputField from '../components/HorizontalInputField';
import {Picker} from '@react-native-picker/picker';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
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
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DefaultImage from '../images/ic_upload.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerWithTitle from '../components/DateTimePickerWithTitle';
import {useDispatch, useSelector} from 'react-redux';
import {resetOffset, setOffset} from '../redux/reducer/app';
import useScroll from '../utils/useScroll';
import uuid from 'react-native-uuid';
import CustomToolbar from '../components/CustomToolbar';
import CustomImagesSlider from '../components/CustomImagesSlider';
import {uploadFile} from '../services/upload';
import {uploadMultipleImages} from '../services/uploadMultipleImages';
import AnimatedLoader from 'react-native-animated-loader';

export const AddProductScreen = ({route, navigation}) => {
  const categoryList = useSelector(state => state.category.categoryList).map(
    item => ({
      label: item.name,
      key: item.categoryId,
    }),
  );
  categoryList.push({
    label: 'Khác',
    key: 'other',
  });

  const userId = useSelector(state => state.user.uid);
  const [barCode, setBarCode] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [capitalPrice, setCapitalPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('25');
  const [productGroup, setProductGroup] = useState('other');
  const [showBox, setShowBox] = useState(true);
  const {productID, ...otherParam} = route.params
    ? route.params
    : {productID: 'null'};
  const [productCode, setproductCode] = useState(nanoid(16));
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const schema = yup.object().shape({
    id: yup.string(),
    productName: yup.string().required().max(20),
    brand: yup.string().required().max(20),
    quantity: yup.number().required(),
    capitalPrice: yup.number().required(),
    sellPrice: yup.number().required(),
    qrCode: yup.string(),
    // importDate: yup.string(),
    // exportDate: yup.string(),
  });

  const {handleSubmit, reset, control, getValues, setValue} = useForm({
    defaultValues: {
      qrCode: productCode,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(uploadProduct());
  };

  const onInvalid = err => {
    console.log(err);
  };

  // const onSubmitKey = event => {
  //   handleSubmit(event);
  //   // uploadProduct();
  //   // handle(formMethod.getValues());
  // };

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
        // alert('Đã huỷ thao tác');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera không khả dụng');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Không có quyền truy cập');
        return;
      } else if (response.errorCode == 'others') {
        alert('Lỗi');
        return;
      }
      setImages([...images, String(response.assets.map(item => item.uri))]);
    });
  };

  const uploadProduct = () => {
    setVisible(true);
    uploadMultipleImages(images)
      .then(imagesURL => {
        console.log(imagesURL);
        addProduct({...getValues(), productGroup, imagesURL})
          .then(() => {
            console.log('product added with ' + imagesURL.length + ' images');
            setVisible(false);
            Alert.alert('Thông báo', 'Thêm sản phẩm thành công');
            resetTextFields();
          })
          .catch(err => {
            console.log(err);
            Alert.alert('Lỗi', 'Thêm sản phẩm thất bại!');
          });
      })
      .catch(err => {
        console.log(err);
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

  const log = message => {
    console.log(message);
  };
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
    reset();
    resetUID();
    setImages([]);
  };

  const resetUID = () => {
    setproductCode(nanoid(16));
    console.log(productCode);
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        source={require('../images/loader.json')}
        speed={1}
      >
        <Text>Doing something...</Text>
      </AnimatedLoader>
      <CustomToolbar
        productCode={'Thêm sản phẩm'}
        isEdit={true}
        buttonText="Lưu"
        onButtonPress={() => uploadProduct()}
        onBackPress={() => navigation.pop()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.topContainer}>
          <CustomImagesSlider
            images={images}
            onClick={() => {
              chooseFile('photo');
            }}
          />
          {/* <Image style={styles.uploadLogo} source={{uri: filePath}} /> */}
        </View>

        <View style={styles.bottomContainer}>
          <SafeAreaView>
            <HorizontalInputField
              name="qrCode"
              title="Mã Vạch"
              editable={true}
              selectTextOnFocus={false}
              setValue={setValue}
              // value={productCode}
              // hint={productCode}
              control={control}
              showBarcodeIcon={true}
            />

            <HorizontalInputField
              name="productName"
              title="Tên Hàng"
              hint="Tên Hàng"
              setInputData={handleProductName}
              defaultValue={productName}
              control={control}
            />

            <HorizontalInputField
              name="brand"
              title="Thương hiệu"
              hint="Thương hiệu"
              setInputData={handleBrand}
              defaultValue={brand}
              control={control}
            />

            <HorizontalInputField
              name="capitalPrice"
              title="Giá vốn"
              hint="Giá vốn"
              isNumberKeyBoard={true}
              setInputData={handleCapitalPrice}
              defaultValue={capitalPrice}
              control={control}
            />

            <HorizontalInputField
              name="sellPrice"
              title="Giá bán"
              hint="Giá bán"
              isNumberKeyBoard={true}
              setInputData={handleSellPrice}
              defaultValue={sellPrice}
              control={control}
            />

            <HorizontalInputField
              name="quantity"
              title="Số lượng"
              hint="Số lượng"
              isNumberKeyBoard={true}
              setInputData={handleNumberOfProducts}
              defaultValue={numberOfProducts}
              control={control}
            />
          </SafeAreaView>

          <DateTimePickerWithTitle title="Ngày nhập kho" />

          <PickerWithTitle
            title="Nhóm Hàng"
            hint="Nhóm hàng..."
            items={categoryList}
            selectedValue={productGroup}
            setGroup={setProductGroup}
          />
          {/* <View style={styles.buttonContainer}>
            <Button
              title={'Add'}
              buttonStyle={styles.addBtn}
              titleStyle={styles.btnTitle}
              onPress={handleSubmit(onSubmit, onInvalid)}
            />
            <Button
              title={'Clear'}
              buttonStyle={styles.deleteBtn}
              titleStyle={styles.btnTitle}
              onPress={showConfirmDialog}
            />
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginVertical: 10,
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
