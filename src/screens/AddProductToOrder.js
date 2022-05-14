import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BACKGROUND_COLOR,
  GRAY_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CameraScreen} from 'react-native-camera-kit';
import Sound from 'react-native-sound';
import Toast from 'react-native-root-toast';
Sound.setCategory('Playback');

export default function AddProductToOrder() {
  const navigation = useNavigation();
  const [granted, setGranted] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('Undefined Product');
  const goBack = () => {
    navigation.goBack();
  };

  const onGetBarcode = event => {
    var whoosh = new Sound('beep_06.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        return;
      }
    });
    whoosh.play();

    setBarcodeValue(event.nativeEvent.codeStringValue);
    Toast.show(barcodeValue, {
      duration: 400,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    navigateToAddProductScreen(barcodeValue);
  };

  const navigateToAddProductScreen = value => {
    navigation.navigate('AddProduct', {productID: value});
  };

  const goAddByHand = () => {
    navigation.navigate('AddProductToOrderByHand');
  };

  const goCheckout = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Tạp Hoá Việt cần quyền truy cập camera của bạn',
          message: 'Ứng dụng sử dụng camera để quét mã vạch các sản phẩm',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGranted(true);
      } else {
        setGranted(false);
      }
    })();
  }, []);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Icon name="left" size={20} color={WHITE_COLOR} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goAddByHand} style={styles.addByHandBtn}>
        <Icon name="solution1" size={20} color={WHITE_COLOR} />
      </TouchableOpacity>
      {granted && (
        <CameraScreen
          hideControls={false}
          showCapturedImageCount={false}
          scanBarcode={true}
          onReadCode={onGetBarcode}
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
      )}

      <View style={styles.popup}>
        <Image source={require('../images/qr-scan.png')} />
        <Text style={styles.text}>Hãy quét mã Bar Code trên sản phẩm</Text>
        <TouchableOpacity style={styles.addbtn} onPress={goCheckout}>
          <Text style={styles.addbtnText}>Đơn hàng</Text>
          <Icon name="shoppingcart" color={WHITE_COLOR} size={16} />
          <Text style={styles.countPopup}>99</Text>
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
  cameraWrapper: {
    flex: 1,
    // width: '100%',
    // height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  camera: {backgroundColor: 'red', width: 300, height: 300},
  popup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 250,
    backgroundColor: WHITE_COLOR,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginTop: 10,
    color: GRAY_COLOR,
  },
  backBtn: {
    padding: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100000,
  },
  addByHandBtn: {
    padding: 4,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100000,
  },
  addbtn: {
    backgroundColor: PRIMARY_COLOR,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addbtnText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    lineHeight: 20,
  },
  countPopup: {
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 4,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: RED_COLOR,
    color: WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 14,
    fontSize: 11,
    fontWeight: '500',
  },
});
