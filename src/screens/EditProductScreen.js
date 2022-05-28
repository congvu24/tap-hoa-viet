import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import {TEXT_COLOR, PRIMARY_COLOR, DARK_GREY} from '../constants/Colors';
import CustomToolbar from '../components/CustomToolbar';
import ExtendedProductInfoItem from '../components/ExtendedProductInfoItem';
import EditProductImagesSlide from '../components/EditProductImagesSlide';
import {getProductToEdit} from '../services/getProduct';
import {editProduct} from '../services/editProduct';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';

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

const images = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80',
  'https://images.unsplash.com/photo-1581017316471-1f6ef7ce6fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  'https://images.unsplash.com/photo-1552066344-2464c1135c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

const EditProductScreen = ({navigation, route}) => {
  // passed parameters
  const {productCode} = route.params;

  // use state
  const [productName, setProductName] = useState('');
  const [barCode, setBarCode] = useState('');
  const [productGroup, setProductGroup] = useState('');
  const [brand, setBrand] = useState('');
  const [capitalPrice, setCapitalPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('');

  // use effect
  useEffect(() => {
    let uid = auth().currentUser?.uid;

    if (uid) {
      getProductToEdit(uid, productCode).then(data => {
        setProductName(data.productName);
        setBarCode(data.barCode);
        setProductGroup(data.productGroup);
        setBrand(data.brand);
        setCapitalPrice(data.capitalPrice.toString());
        setSellPrice(data.sellPrice.toString());
        setNumberOfProducts(data.numberOfProducts.toString());
      });
    }
  }, []);

  // method save
  const handleSave = () => {
    let uid = auth().currentUser?.uid;

    editProduct(
      productName,
      barCode,
      brand,
      productGroup,
      sellPrice,
      capitalPrice,
      numberOfProducts,
      uid,
      productCode,
    );

    navigation.pop();
  };

  const handleSavePress = () => {
    Alert.alert('Notification', 'Do you want to save your editing?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Save',
        onPress: () => handleSave(),
      },
    ]);
  };

  // methods on change text
  const handleProductName = text => {
    setProductName(text);
  };

  const handleBarCode = text => {
    setBarCode(text);
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

  return (
    <View style={styles.container}>
      <CustomToolbar
        productCode={productCode}
        isEdit={true}
        onBackPress={() => navigation.pop()}
        onButtonPress={handleSavePress}
      />
      <View style={styles.contentContainer}>
        <View style={styles.imageSliderContainer}>
          <EditProductImagesSlide images={images} />
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.nameContainer}>
            <TextInput
              value={productName}
              style={styles.mainText}
              onChangeText={text => handleProductName(text)}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã hàng</Text>
              <TextInput editable={false} style={styles.simpleText}>
                {productCode}
              </TextInput>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Mã vạch</Text>
              <TextInput
                value={barCode}
                style={styles.simpleText}
                onChangeText={text => handleBarCode(text)}
              />
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
              <SafeAreaView
                style={[
                  styles.pickerContainer,
                  {flexDirection: 'row', flex: 0.63},
                ]}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={productGroup}
                  onValueChange={(value, index) => setProductGroup(value)}
                >
                  <Picker.Item
                    label={'Nhóm hàng...'}
                    value={''}
                    enabled={false}
                  />
                  {groupOfProducts.map((item, index) => {
                    return (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </SafeAreaView>
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Thương hiệu</Text>
              <TextInput
                value={brand}
                style={styles.simpleText}
                onChangeText={text => handleBrand(text)}
              />
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá vốn</Text>
              <TextInput
                value={capitalPrice}
                style={[styles.simpleText, styles.primaryColor]}
                onChangeText={text => handleCapitalPrice(text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Giá bán</Text>
              <TextInput
                value={sellPrice}
                style={[styles.simpleText, styles.primaryColor]}
                onChangeText={text => handleSellPrice(text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.singleInfoItem}>
              <Text style={styles.simpleInfoHeader}>Tồn kho</Text>
              <TextInput
                value={numberOfProducts}
                style={[styles.simpleText, styles.primaryColor]}
                onChangeText={text => handleNumberOfProducts(text)}
                keyboardType="numeric"
              />
            </View>

            {/* <ExtendedProductInfoItem
              title={'Mô tả'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              isEdit={true}
            />
            <ExtendedProductInfoItem
              title={'Ghi chú'}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              isEdit={true}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageSliderContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  contentContainer: {flex: 1},
  productInfoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 8,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    flex: 1,
  },
  nameContainer: {
    paddingTop: 15,
  },

  detailsContainer: {},

  mainText: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  singleInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },

  simpleInfoHeader: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: '500',
    flex: 0.4,
  },

  simpleText: {
    fontSize: 18,
    flex: 0.6,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  primaryColor: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  pickerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  picker: {
    flex: 1,
    fontSize: 16,
    color: DARK_GREY,
    width: 30,
    borderColor: 'black',
  },
});
