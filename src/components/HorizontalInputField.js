import {Text, StyleSheet, View, Image, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {GRAY_COLOR, MATERIAL_GREY_COLOR} from '../constants/Colors';

const HorizontalInputField = ({
  title = '',
  hint = '',
  showBarcodeIcon = false,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: 'row',
        },
      ]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textInput}>
        <TextInput placeholder={hint} multiline={false} />
      </View>
    </SafeAreaView>
  );
};

export default HorizontalInputField;

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
    marginTop: 10,
    color: 'black',
  },
  input: {
    flex: 2,
    fontSize: 16,
    color: GRAY_COLOR,
  },
  textInput: {
    flex: 2,
    color: MATERIAL_GREY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    marginTop: 10,
    marginEnd: 20,
  },
  barcodeButton: {
    width: 16,
    height: 16,
  },
});
