import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {dataMonth, getOrders} from '../services/getOrders';

const screenWidth = Dimensions.get('window').width;

export default function IncomeReportScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Ngày');
  const [items, setItems] = useState([
    {label: 'Ngày', value: 'Ngày'},
    {label: 'Tuần', value: 'Tuần'},
    {label: 'Tháng', value: 'Tháng'},
  ]);
  //Data chart
  const data = {
    labels: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 71, 79, 33, 44, 10, 3],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [`Doanh thu cuối ${value}`], // optional
  };
  async function getData() {
    const datad = await dataMonth();
    console.log('screen', datad);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Thống kê theo: </Text>
        <DropDownPicker
          style={styles.dropdown}
          containerStyle={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.label}>DOANH THU BÁN HÀNG</Text>
        <LineChart
          data={data}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
        />
        <Text style={styles.label}>SỐ LƯỢNG ĐƠN HÀNG</Text>
        <BarChart
          data={data}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  dropdown: {
    width: 150,
    borderColor: '#bababa',
    zIndex: 5,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollView: {
    marginBottom: 110,
  },
});
const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#e5e5e5',
  backgroundGradientTo: '#e5e5e5',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};
