import DateTimePicker from '@react-native-community/datetimepicker';
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
        <View style={styles.extraSection}>
          <TouchableOpacity
            onPress={() => setFromDateOpen(true)}
            style={styles.dropdown}
          >
            <Text style={styles.title}>
              From: {fromDate.toLocaleDateString('VN')}
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
              To: {toDate.toLocaleDateString('VN')}
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
  itemsContainer: {
    marginTop: 8,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },

  extraSection: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
  },

  ordersContainer: {
    marginTop: 10,
    paddingBottom: 50,
  },
});
