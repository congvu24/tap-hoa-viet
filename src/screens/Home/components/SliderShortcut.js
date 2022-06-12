import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLACK_COLOR, TEXT_COLOR, WHITE_COLOR} from '../../../constants/Colors';

const SLIDER_ITEMS = [
  {
    icon: 'warehouse',
    text: 'Kho hàng',
    route: 'Products'
  },
  {
    icon: 'basket-plus-outline',
    text: ' Thêm sản phẩm',
    route: 'AddProduct',
  },
  {
    icon: 'history',
    text: 'Lịch sử',
    route: 'OrderHistory',
  },
  {
    icon: 'currency-usd',
    text: 'Khuyến mãi',
  },
];
export function SliderShortcut() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.shortcutContainer}
    >
      {SLIDER_ITEMS.map((item, idx) => (
        <Shortcut
          key={item.text}
          item={item}
          style={idx === SLIDER_ITEMS.length - 1 && styles.lastShortcut}
        />
      ))}
    </ScrollView>
  );
}

const Shortcut = ({item, style, resetTabbar, ...rest}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={item.text}
      style={[styles.shortcut, {...style}]}
      onPress={() => {
        if (item.route) {
          navigation.navigate(item.route);
          // resetTabbar();
        }
      }}
      {...rest}
    >
      <Icon name={item.icon} size={30} style={styles.shortcutIcon} />
      <Text style={styles.shortcutText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shortcutContainer: {
    flex: 1,
    width: '100%',
  },
  shortcut: {
    backgroundColor: WHITE_COLOR,
    width: 100,
    height: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 20,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadow: {
    shadowColor: BLACK_COLOR,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },
  lastShortcut: {
    marginRight: 30,
  },
  shortcutIcon: {
    width: 30,
    height: 30,
    color: TEXT_COLOR,
  },
  shortcutText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: TEXT_COLOR,
  },
});
