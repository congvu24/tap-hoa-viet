import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TEXT_COLOR, PRIMARY_COLOR, DARK_GREY} from '../constants/Colors';
import CustomToolbar from '../components/CustomToolbar';
import ExtendedProductInfoItem from '../components/ExtendedProductInfoItem';
import EditProductImagesSlide from '../components/EditProductImagesSlide';
import {
  getAllProductGroups,
  getProductGroup,
  getProductToEdit,
} from '../services/getProduct';
import {editProduct} from '../services/editProduct';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import AnimatedLoader from 'react-native-animated-loader';
import {useDispatch} from 'react-redux';
import {fetchProductList} from '../redux/reducer/productSlice';

const EditProductScreen = ({navigation, route}) => {
  // passed parameters
  const {qrCode} = route.params;
  const dispatch = useDispatch();
  // loader
  const [visible, setVisible] = useState(false);

  // use state
  const [productName, setProductName] = useState('');
  const [productGroup, setProductGroup] = useState('');
  const [brand, setBrand] = useState('');
  const [capitalPrice, setCapitalPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('');
  const [productGroupsInfo, setProductGroupsInfo] = useState(null);

  // images
  const [existingImages, setExistingImages] = useState(null);
  const [imagesToAdd, setImagesToAdd] = useState([]);

  // use effect
  useEffect(() => {
    getAllProductGroups().then(res => {
      setProductGroupsInfo(res.docs);
    });

    let uid = auth().currentUser?.uid;

    if (uid) {
      getProductToEdit(uid, qrCode).then(data => {
        setProductName(data.productName);
        setProductGroup(data.productGroup);
        setBrand(data.brand);
        setCapitalPrice(data.capitalPrice.toString());
        setSellPrice(data.sellPrice.toString());
        setNumberOfProducts(data.numberOfProducts.toString());
        setExistingImages(data.imagesURL);
      });
    }
  }, []);

  useEffect(() => {
    if (productGroup !== '') {
      getProductGroup(productGroup)
        .then(res => {
          if (res) {
            setProductGroup(res.data().name);
          }
        })
        .catch(err => {});
    }
  }, [productGroup]);

  // images methods
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
        Alert.alert('Thông báo', 'Đã huỷ thao tác');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Thông báo', 'Camera không khả dụng');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Thông báo', 'Không có quyền truy cập');
        return;
      } else if (response.errorCode == 'others') {
        return;
      }

      setImagesToAdd([
        ...imagesToAdd,
        String(response.assets.map(item => item.uri)),
      ]);
    });
  };

  console.log('existing images: ', existingImages);
  console.log('images to add: ', imagesToAdd);

  // method save
  const handleSave = () => {
    let uid = auth().currentUser?.uid;

    setVisible(true);

    editProduct(
      productName,
      brand,
      productGroup,
      sellPrice,
      capitalPrice,
      numberOfProducts,
      uid,
      qrCode,
      imagesToAdd,
      existingImages,
    ).then(() => {
      setVisible(false);
      dispatch(fetchProductList());
      navigation.pop();
    });
  };

  const handleSavePress = () => {
    if (
      existingImages &&
      imagesToAdd.length === 0 &&
      existingImages.length === 0
    ) {
      Alert.alert('Thông báo', 'Sản phẩm phải có ít nhất một hình ảnh');
    } else {
      Alert.alert('Thông báo', 'Bạn có chắc muốn lưu những thay đổi?', [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Lưu',
          onPress: () => handleSave(),
        },
      ]);
    }
  };

  // methods on change text
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

  return (
    <View style={styles.container}>
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
        productCode={qrCode}
        isEdit={true}
        onBackPress={() => navigation.pop()}
        onButtonPress={handleSavePress}
      />
      {existingImages && productGroupsInfo ? (
        <View style={styles.contentContainer}>
          <View style={styles.imageSliderContainer}>
            <EditProductImagesSlide
              existingImages={existingImages}
              imagesToAdd={imagesToAdd}
              setExistingImages={setExistingImages}
              setImagesToAdd={setImagesToAdd}
              onChooseImagePress={() => chooseFile('photo')}
            />
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
                  {qrCode}
                </TextInput>
              </View>

              <View style={styles.singleInfoItem}>
                <Text style={styles.simpleInfoHeader}>Nhóm hàng</Text>
                <SafeAreaView
                  style={[
                    styles.pickerContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {flexDirection: 'row', flex: 0.63},
                  ]}
                >
                  <Picker
                    style={styles.picker}
                    selectedValue={productGroup}
                    onValueChange={(value, index) => setProductGroup(value)}
                  >
                    {productGroupsInfo &&
                      productGroupsInfo.map((item, index) => {
                        return (
                          <Picker.Item
                            label={item._data.name}
                            value={item._data.name}
                            key={index}
                          />
                        );
                      })}
                    <Picker.Item label={'Khác'} value={'other'} />
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
      ) : (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
        </View>
      )}
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
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
