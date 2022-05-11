import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  PRIMARY_COLOR,
  RED_COLOR,
  TEXT_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {AddProductScreen, ProductsScreen, ProfileScreen} from '../screens';
import CreateOrderScreen from '../screens/CreateOrderScreen';
import HomeScreen from '../screens/Home';
const Tab = createBottomTabNavigator();

export function BottomNavigationBar() {
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={focused}
              text="Trang chủ"
              imageSource={require('../images/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Income"
        component={AddProductScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={focused}
              text="Thu nhập"
              imageSource={require('../images/income.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddOrder"
        component={CreateOrderScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="add-outline" size={45} style={{color: WHITE_COLOR}} />
          ),
          tabBarButton: props => <CustomCenterTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={focused}
              text="Sản phẩm"
              imageSource={require('../images/warehouse.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={focused}
              text="Tài khoản"
              imageSource={require('../images/user.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const CustomCenterTabBarButton = ({children, onPress}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.centerTabBar, styles.shadow]}
      onPress={() => navigation.navigate('CreateOrder')}
    >
      <View style={styles.centerTabBarButton}>{children}</View>
    </TouchableOpacity>
  );
};

const TabBarItem = ({focused, text, imageSource}) => (
  <View style={styles.tabBarItemContainer}>
    <Image
      source={imageSource}
      resizeMode="contain"
      style={[
        styles.tabBarImage,
        {tintColor: focused ? PRIMARY_COLOR : TEXT_COLOR},
      ]}
    />
    <Text
      style={[styles.tabBarText, {color: focused ? PRIMARY_COLOR : TEXT_COLOR}]}
    >
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: WHITE_COLOR,
    borderRadius: 15,
    height: 70,
  },
  shadow: {
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },

  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // top: 10,
  },
  tabBarImage: {
    width: 25,
    height: 25,
  },
  tabBarText: {
    fontSize: 12,
    fontWeight: '500',
  },
  centerTabBar: {
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabBarButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: RED_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
