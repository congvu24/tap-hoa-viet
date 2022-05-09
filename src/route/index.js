import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WHITE_COLOR} from '../constants/Colors';
import LoadingModal from '../components/LoadingModal';
import RedirectScreen from '../screens/RedirectScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddProductScreen from '../screens/AddProductScreen';
import {BottomNavigationBar} from '../navigation/BottomNavigationBar';
import HomeScreen from '../screens/Home';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import EditProductScreen from '../screens/EditProductScreen';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar backgroundColor={WHITE_COLOR} hidden={false} />
      <NavigationContainer>
        {/* <Stack.Navigator
          initialRouteName="Root"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="Root" component={RedirectScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
        </Stack.Navigator> */}
        <BottomNavigationBar />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <LoadingModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
