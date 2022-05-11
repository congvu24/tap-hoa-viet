import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {GRAY_COLOR} from '../constants/Colors';
import {Picker} from '@react-native-picker/picker';

const PickerWithTitle = ({
  title = '',
  hint = '',
  items = [],
  selectedValue,
  setGroup,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: 'row',
        },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(value, index) => setGroup(value)}
      >
        {items.map((item, index) => {
          return (
            <Picker.Item label={item.label} value={item.value} key={index} />
          );
        })}
      </Picker>
    </SafeAreaView>
  );
};

export default PickerWithTitle;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 16,
    marginStart: 30,
    color: 'black',
  },
  picker: {
    flex: 2,
    fontSize: 16,
    color: GRAY_COLOR,
    width: 30,
    borderColor: 'black',
  },
});
