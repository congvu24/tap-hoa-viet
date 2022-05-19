import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function IncomeReport() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ngày', value: 'Ngày'},
    {label: 'Tuần', value: 'Tuần'},
    {label: 'Tháng', value: 'Tháng'},
  ]);
  //Data chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [`Doanh thu cuối ${value}`], // optional
  };
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
      <LineChart
        style={styles.chart}
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
      />
      <BarChart
        //style={graphStyle}
        data={data}
        width={screenWidth}
        height={250}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  dropdown: {
    width: 150,
    borderColor: '#bababa',
    zIndex: 5,
  },
  chart: {
    marginTop: 20,
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
