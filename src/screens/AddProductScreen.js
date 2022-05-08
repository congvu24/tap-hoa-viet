import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import React, {Component, useState} from 'react';
import HorizontalInputField from '../components/HorizontalInputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {BACKGROUND_COLOR, WHITE_COLOR} from '../constants/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DefaultImage from '../images/ic_upload.png';
const AddProductScreen = () => {
  const [filePath, setFilePath] = useState(Image.resolveAssetSource(DefaultImage).uri);

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 400,
      maxHeight: 400,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response)
      if (response.didCancel) {
        alert('Đã huỷ thao tác')
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera không khả dụng')
        return;
      } else if (response.errorCode == 'permission') {
        alert('Không có quyền truy cập')
        return;
      } else if (response.errorCode == 'others') {
        alert('Fuck cậu Hoàn')
        return;
      }
      console.log(response.assets.map(item => item.uri))
      setFilePath(String(response.assets.map(item => item.uri)))
    });
  };

  {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            flexDirection: 'column',
          },
        ]}>
        <View
          style={styles.topContainer}>
          <TouchableOpacity style={styles.uploadButton}onPress={() => chooseFile('photo')}>
            <Image style={styles.uploadLogo} source={{uri: filePath}} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <SafeAreaView>
            <HorizontalInputField
              title="Mã Hàng"
              hint="Mã Hàng Tự Động"></HorizontalInputField>

            <HorizontalInputField
              title="Mã Vạch"
              hint="Mã Vạch"></HorizontalInputField>

            <HorizontalInputField
              title="Tên Hàng"
              hint="Tên Hàng"></HorizontalInputField>
          </SafeAreaView>

          <PickerWithTitle title="Nhóm Hàng" hint="Rau non"></PickerWithTitle>

          <PickerWithTitle
            title="Thương Hiệu"
            hint="Liên Xô chấm Mỹ"></PickerWithTitle>
        </View>
        <FAB 
        style={styles.FAB} />
      </KeyboardAvoidingView>
    );
  }
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
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
  },
  uploadLogo: {
    width: 120,
    height: 120,
  },
  uploadButton:{
    width: 150,
    height: 150,
    margin:10
  },
  title: {
    justifyContent: 'flex-start',
    fontSize: 16,
    marginStart: 20,
    marginTop: 30,
  },
  FAB: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    icon: 'add',
  },
});
