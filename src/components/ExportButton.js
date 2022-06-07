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

const ExportButton = ({dataType, passedIncomeData, passedQuantityData}) => {
  console.log('income excel: ', passedQuantityData.labels);

  const processData = () => {
    if (dataType === 'Tháng') {
      const monthData = [];

      for (let i = 0; i < 12; i++) {
        monthData.push({
          tháng: i + 1,
          'Doanh thu cuối tháng': passedIncomeData.datasets[0].data[i] + 'K',
          'Số lượng đơn hàng': passedQuantityData.datasets[0].data[i],
        });
      }

      return monthData;
    } else {
      const dayData = [];

      for (let i = 0; i < 10; i++) {
        dayData.push({
          Ngày: passedQuantityData.labels[i],
          'Doanh thu trong ngày': passedIncomeData.datasets[0].data[i] + 'K',
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

    RNFS.writeFile(RNFS.DownloadDirectoryPath + `/${fileName}`, wbout, 'ascii')
      .then(r => {
        Alert.alert(
          'Thông báo',
          'Đã xuất thành công, vui lòng kiểm tra thư mục "tải về"!',
        );
      })
      .catch(e => {
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
      <Text style={styles.btnText}>Xuất theo {dataType}</Text>
    </TouchableOpacity>
  );
};

export default ExportButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREEN_COLOR,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
});
