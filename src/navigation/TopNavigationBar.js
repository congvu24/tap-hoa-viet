import { StyleSheet, Text, View } from 'react-native'
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ProductReportScreens from '../screens/ProductReportScreen'
import IncomeReportScreens from '../screens/IncomeReportScreen'
import {
    PRIMARY_COLOR,
    RED_COLOR,
    TEXT_COLOR,
    WHITE_COLOR,
  } from '../constants/Colors';
import React from 'react'

const Tab = createMaterialTopTabNavigator ();

export function TopNavigationBar () {
  return (
    <Tab.Navigator
        screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.rootContainer,
          ...styles.shadow,
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: TEXT_COLOR,
        headerShown: false,
      }}
    >
        <Tab.Screen 
            name="ProductReport" 
            component={ProductReportScreens} 
            options={{
                tabBarIcon: ({focused}) => (
                  <TabBarItem
                    focused={focused}
                    text="Thống kê sản phẩm"
                    
                  />
                ),
              }}
        />
        <Tab.Screen 
            name="IncomeReport" 
            component={IncomeReportScreens} 
            options={{
                tabBarIcon: ({focused}) => (
                  <TabBarItem
                    focused={focused}
                    text="Thống kê doanh thu"
                    
                  />
                ),
              }}
        />

    </Tab.Navigator>
  )
}



const TabBarItem = ({focused, text, imageSource}) => (
    <View style={styles.tabBarItemContainer}>
      
      <Text
        style={[styles.tabBarText, {color: focused ? PRIMARY_COLOR : TEXT_COLOR}]}
      >
        {text}
      </Text>
    </View>
  );


const styles = StyleSheet.create({
    rootContainer: {
        elevation: 5,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 50,
    },
      shadow: {
        shadowColor: PRIMARY_COLOR,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabBarItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        // top: 10,
    },
    tabBarText: {
        fontSize: 14,
        fontWeight: '500',
        left: -50,
    },
})