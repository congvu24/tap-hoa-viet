import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WHITE_COLOR} from '../constants/Colors';
import LoadingModal from '../components/LoadingModal';
import RedirectScreen from '../screens/RedirectScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar backgroundColor={WHITE_COLOR} hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Root"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="Root" component={RedirectScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
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
