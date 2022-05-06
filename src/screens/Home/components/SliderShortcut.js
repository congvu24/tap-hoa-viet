import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GRAY_COLOR} from '../../../constants/Colors';

const SLIDER_ITEMS = [
  {
    icon: 'warehouse',
    text: 'Warehouse',
  },
  {
    icon: 'basket-plus-outline',
    text: 'Product',
  },
  {
    icon: 'currency-usd',
    text: 'Sales',
  },
  {
    icon: 'history',
    text: 'History',
  },
];
export function SliderShortcut() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.shortcutContainer}>
      {SLIDER_ITEMS.map((item, idx) => (
        <Shortcut
          key={item.text}
          item={item}
          isLastShortcut={idx === SLIDER_ITEMS.length - 1}
        />
      ))}
    </ScrollView>
  );
}

const Shortcut = ({item, isLastShortcut}) => (
  <TouchableOpacity
    key={item.text}
    style={[styles.shortcut, isLastShortcut && styles.lastShortcut]}>
    <Icon name={item.icon} size={25} style={styles.shortcutIcon} />
    <Text style={styles.shortcutText}>{item.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shortcutContainer: {
    flex: 1,
    marginRight: -30,
  },
  shortcut: {
    backgroundColor: GRAY_COLOR,
    width: 90,
    height: 90,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 5,
  },
  lastShortcut: {
    marginRight: 30,
  },
  shortcutIcon: {
    width: 24,
    height: 24,
  },
  shortcutText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});
