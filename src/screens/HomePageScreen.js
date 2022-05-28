import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {BottomNavigationBar} from '../navigation/BottomNavigationBar';
import {useDispatch} from 'react-redux';
import {fetchProductList} from '../redux/reducer/productSlice';
import {fetchCategoryList} from '../redux/reducer/category';

export default function HomePageScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchCategoryList());
  }, [dispatch]);

  return <BottomNavigationBar />;
}
