import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GRAY_COLOR} from '../constants/Colors';
import {Picker} from '@react-native-picker/picker';

const PickerWithTitle = ({title = '', hint = ''}) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <Picker style={styles.picker}>
        <Picker.Item label={hint} value="key0" />
        <Picker.Item label="Rau xanh" value="key1" />
        <Picker.Item label="Rau múp" value="key2" />
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
    flexDirection: 'row',
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
