import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import {GREEN_COLOR} from '../constants/Colors';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import {formatMoney} from '../utils/helper';
import Icon from 'react-native-vector-icons/AntDesign';

const ExportButton = ({dataType, passedIncomeData, passedQuantityData}) => {
  console.log('income excel: ', passedQuantityData.labels);

  const processData = () => {
    if (dataType === 'Tháng') {
      const monthData = [];

      for (let i = 0; i < 12; i++) {
        monthData.push({
          tháng: i + 1,
          'Doanh thu cuối tháng': formatMoney(
            passedIncomeData.datasets[0].data[i] * 1000,
          ),
          'Số lượng đơn hàng': passedQuantityData.datasets[0].data[i],
        });
      }

      return monthData;
    } else {
      const dayData = [];

      for (let i = 0; i < 10; i++) {
        dayData.push({
          Ngày: passedQuantityData.labels[i],
          'Doanh thu trong ngày': formatMoney(
            passedIncomeData.datasets[0].data[i] * 1000,
          ),
          'Số lượng đơn hàng': passedQuantityData.datasets[0].data[i],
        });
      }

      return dayData;
    }
  };

  const handleAlertExport = () => {
    if (dataType === 'Ngày') {
      Alert.alert(
        'Thông báo',
        'Bạn có chắc muốn xuất doanh thu trong 10 ngày qua?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => exportDataToExcel(),
          },
        ],
      );
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn có chắc muốn xuất doanh thu trong năm nay?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => exportDataToExcel(),
          },
        ],
      );
    }
  };

  const exportDataToExcel = () => {
    // Created Sample data
    let sample_data_to_export = processData();

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    // Write generated excel to Storage

    let fileName =
      dataType === 'Tháng'
        ? 'Doanh_số_năm_nay.xlsx'
        : 'Doanh_số_10_ngày_qua.xlsx';

    RNFS.writeFile(
      RNFS.ExternalStorageDirectoryPath + `/${fileName}`,
      wbout,
      'ascii',
    )
      .then(r => {
        console.log(RNFS.DownloadDirectoryPath + `/${fileName}`);
        Alert.alert(
          'Thông báo',
          'Đã xuất thành công, vui lòng kiểm tra thư mục của bạn!',
        );
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Thông báo', 'Có lỗi xảy ra!');
      });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          handleAlertExport();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        handleAlertExport();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      {/* <Text style={styles.btnText}>Xuất theo {dataType}</Text> */}
      <Icon name="download" size={20} />
    </TouchableOpacity>
  );
};

export default ExportButton;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: GREEN_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#ccc',
    marginLeft: 'auto',
    marginRight: 20,
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
});
