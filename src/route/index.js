import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BLACK_COLOR, WHITE_COLOR} from '../constants/Colors';
import LoadingModal from '../components/LoadingModal';
import {BottomNavigationBar} from '../navigation/BottomNavigationBar';
import {
  AddProductScreen,
  LoginScreen,
  OrderHistoryScreen,
  ProductsScreen,
  RegisterScreen,
} from '../screens';
import EditProductScreen from '../screens/EditProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import HomePageScreen from '../screens/HomePageScreen';
import Splash from '../screens/SplashScreen';
import CreateOrderScreen from '../screens/CreateOrderScreen';
import AddProductToOrder from '../screens/AddProductToOrder';
import ReportScreen from '../screens/ReportScreen';
import AddProductToOrderByHand from '../screens/AddProductToOrderByHand';
import OrderSummary from '../screens/OrderSummary';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import OrderDetailScreen from '../screens/OrderDetail';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar backgroundColor={BLACK_COLOR} hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              animation: 'slide_from_left',
            }}
          />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Homepage" component={HomePageScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen
            name="CreateOrder"
            component={CreateOrderScreen}
            options={{
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen name="OrderSummary" component={OrderSummary} />
          <Stack.Screen
            name="AddProductToOrder"
            component={AddProductToOrder}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
          <Stack.Screen
            name="AddProductToOrderByHand"
            component={AddProductToOrderByHand}
            options={{
              animation: 'fade_from_bottom',
            }}
          />

          <Stack.Screen
            name="ScanBarcode"
            component={ScanBarcodeScreen}
            options={{
              animation: 'fade_from_bottom',
            }}
          />

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
