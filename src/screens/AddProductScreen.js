import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component, useCallback, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import HorizontalInputField from '../components/HorizontalInputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {BACKGROUND_COLOR, WHITE_COLOR} from '../constants/Colors';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DefaultImage from '../images/ic_upload.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const AddProductScreen = () => {
  const schema = yup.object().shape({
    name: yup.string().required().max(20),
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
  }, [formMethod, onSubmit]);

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

  return (
    <FormProvider {...formMethod}>
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            flexDirection: 'column',
          },
        ]}
      >
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => chooseFile('photo')}
        >
          <Image style={styles.uploadLogo} source={{uri: filePath}} />
        </TouchableOpacity>

        <ScrollView style={styles.bottomContainer}>
          <SafeAreaView>
            <HorizontalInputField
              name="name"
              title="Tên sản phẩm"
              hint="Nhập tên sản phẩm"
            />

            <HorizontalInputField
              name="description"
              title="Mô tả"
              hint="Mô tả sản phẩm"
            />

            <HorizontalInputField
              name="quantity"
              title="Số lượng"
              hint="Nhập mã QR Code"
            />

            <HorizontalInputField
              name="importPrice"
              title="Giá nhập"
              hint="Nhập giá nhập kho"
            />

            <HorizontalInputField
              name="exportPrice"
              title="Giá xuất"
              hint="Nhập giá xuất kho"
            />

            <HorizontalInputField
              name="qrCode"
              title="Mã QR"
              hint="Nhập mã QR Code"
            />

            <HorizontalInputField
              name="importDate"
              title="Ngày nhập kho"
              hint="Ngày nhập kho"
            />

            <HorizontalInputField
              name="exportDate"
              title="Ngày nhập kho"
              hint="Ngày nhập kho"
            />
          </SafeAreaView>

          <PickerWithTitle title="Nhóm Hàng" hint="Rau non" />

          <PickerWithTitle title="Thương Hiệu" hint="Liên Xô chấm Mỹ" />
        </ScrollView>
        <FAB style={styles.FAB} onPress={onSubmitKey} />
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  topContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomContainer: {
    flex: 4,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 5,
    backgroundColor: WHITE_COLOR,
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
  FAB: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
    icon: 'add',
    marginBottom: 100,
  },
});
