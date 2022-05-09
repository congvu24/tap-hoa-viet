
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import HorizontalInputField from '../components/HorizontalInputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import PickerWithTitle from '../components/PickerWithTitle';
import {FAB} from 'react-native-elements';
import {BACKGROUND_COLOR, WHITE_COLOR} from '../constants/Colors';

export default class AddProductScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            flexDirection: 'column',
          },
        ]}>
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
        <FAB style={styles.FAB} />
      </KeyboardAvoidingView>
    );
  }
}

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
  },
});
