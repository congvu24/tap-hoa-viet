import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {BottomNavigationBar} from '../navigation/BottomNavigationBar';
import {useDispatch} from 'react-redux';
import {fetchProductList} from '../redux/reducer/productSlice';
import {fetchCategoryList} from '../redux/reducer/category';
import {fetchOrderList} from '../redux/reducer/orderList';
import Auth from '@react-native-firebase/auth';

export default function HomePageScreen() {
  const dispatch = useDispatch();
  const currentUser = Auth().currentUser;

  useEffect(() => {
    console.log('-------- reset ---------')
    dispatch(fetchProductList());
    dispatch(fetchCategoryList());
    dispatch(fetchOrderList());
  }, [dispatch, currentUser?.uid]);

  return <BottomNavigationBar />;
}
