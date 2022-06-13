import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {
  statisticIncomeByDay,
  statisticIncomeByMonth,
  statisticQuantityByDay,
  statisticQuantityByMonth,
} from '../services/statistic';
import ExportButton from '../components/ExportButton';

const screenWidth = Dimensions.get('window').width;

export default function IncomeReportScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Ngày');
  const [items, setItems] = useState([
    {label: 'Ngày', value: 'Ngày'},
    {label: 'Tháng', value: 'Tháng'},
  ]);
  const list = useSelector(state => state.orderList.list);
  console.log(list);
  const [dataIncome, setDataIncome] = useState(statisticIncomeByDay(list));
  const [dataQuantity, setDataQuantity] = useState(
    statisticQuantityByDay(list),
  );

  useEffect(() => {
    if (value == 'Ngày') {
      setDataIncome(statisticIncomeByDay(list));
      setDataQuantity(statisticQuantityByDay(list));
    } else {
      setDataIncome(statisticIncomeByMonth(list));
      setDataQuantity(statisticQuantityByMonth(list));
    }
  }, [value, list.length]);

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
        <ExportButton
          dataType={value}
          passedIncomeData={dataIncome}
          passedQuantityData={dataQuantity}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.label}>DOANH THU BÁN HÀNG</Text>
        <LineChart
          data={dataIncome}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig.income}
          yAxisSuffix="K"
        />
        <Text style={styles.label}>SỐ LƯỢNG ĐƠN HÀNG</Text>

        <BarChart
          data={dataQuantity}
          width={screenWidth + 30}
          height={250}
          chartConfig={chartConfig.quantity}
          style={{marginLeft: -30}}
          //showValuesOnTopOfBars={true}
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
    width: 200,
    borderColor: '#bababa',
    zIndex: 5,
    marginRight: 15,
    marginLeft: 3,
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
  income: {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#e5e5e5',
    backgroundGradientTo: '#e5e5e5',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  },
  quantity: {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#e5e5e5',
    backgroundGradientTo: '#e5e5e5',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.6,
  },
};
