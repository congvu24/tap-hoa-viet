import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WHITE_COLOR} from '../constants/Colors';
import LoadingModal from '../components/LoadingModal';
import {BottomNavigationBar} from '../navigation/BottomNavigationBar';
import {
  AddProductScreen,
  LoginScreen,
  ProductsScreen,
  RegisterScreen,
} from '../screens';
import EditProductScreen from '../screens/EditProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import HomePageScreen from '../screens/HomePageScreen';
import Splash from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar backgroundColor={WHITE_COLOR} hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Homepage" component={HomePageScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />

          {/* <BottomNavigationBar /> */}
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
