import {View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BLUE_COLOR, GREEN_COLOR, WHITE_COLOR} from '../constants/Colors';
import LoadingModal from '../components/LoadingModal';
import RedirectScreen from '../screens/RedirectScreen';
import LoginScreen from '../screens/LoginScreen';
import TodoHome from '../screens/TodoHome';
import TodoCreate from '../screens/TodoCreate';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar backgroundColor={GREEN_COLOR} hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TodoHome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="Root" component={RedirectScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TodoHome" component={TodoHome} />
          <Stack.Screen name="TodoCreate" component={TodoCreate} />
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
