/* eslint-disable react-hooks/exhaustive-deps */
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import CustomToolbar from '../../components/CustomToolbar';
import {offLoading, onLoading} from '../../redux/reducer/app';
import {getOrderList} from '../../services';
import {getYesterdayDate} from '../../utils';
import {EmptyOrder} from './components/EmptyOrder';
import {OrderCard} from './components/OrderCard';

export function OrderHistoryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  // DROPDOWN VARS
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);

  const [fromDate, setFromDate] = useState(getYesterdayDate());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    getOrderHistory({fromDate, toDate});
  }, [fromDate, toDate]);

  const getOrderHistory = async filters => {
    dispatch(onLoading());
    try {
      const res = await getOrderList(filters);
      setOrders(res);
      console.log('res', res);
    } catch (error) {
      console.log('error at OrderHistoryScreen -> getOrderHistory', error);
    }
    dispatch(offLoading());
  };

  const handleFromDateChange = (_, selectedDate) => {
    setFromDateOpen(false);
    setFromDate(selectedDate);
  };
  const handleToDateChange = (_, selectedDate) => {
    setToDateOpen(false);
    setToDate(selectedDate);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.itemsContainer}>
        <CustomToolbar
          productCode="Lịch sử đơn hàng"
          isEdit={true}
          buttonText=""
          onBackPress={() => navigation.pop()}
        />
        <View style={styles.extraSection}>
          <TouchableOpacity
            onPress={() => setFromDateOpen(true)}
            style={styles.dropdown}
          >
            <Text style={styles.title}>
              Từ: {fromDate.toLocaleDateString('vi-VN')}
            </Text>
            <Icon
              name="chevron-down-outline"
              type="ionicon"
              style={styles.addMoreImageIcon}
              size={24}
            />
            {fromDateOpen && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                onChange={handleFromDateChange}
                maximumDate={toDate}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToDateOpen(true)}
            style={styles.dropdown}
          >
            <Text style={styles.title}>
              Đến: {toDate.toLocaleDateString('vi-VN')}
            </Text>
            <Icon
              name="chevron-down-outline"
              type="ionicon"
              style={styles.addMoreImageIcon}
              size={24}
            />
            {toDateOpen && (
              <DateTimePicker
                value={toDate}
                mode="date"
                onChange={handleToDateChange}
                minimumDate={fromDate}
              />
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.ordersContainer}
          data={orders}
          keyExtractor={item => item.id || ''}
          ListEmptyComponent={EmptyOrder}
          renderItem={({item}) => {
            return <OrderCard order={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsContainer: {
    // marginTop: 8,
  },
  dropdown: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },

  extraSection: {
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ordersContainer: {
    // paddingHorizontal: 20,
    marginTop: 0,
    paddingBottom: 120,
    // flex: 1,
    // height: '100%',
  },
});
