import {Text, StyleSheet, View, Image, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_COLOR,
  MATERIAL_GREY_COLOR,
} from '../constants/Colors';
import {Controller, useController} from 'react-hook-form';
const HorizontalInputField = ({
  name,
  title = '',
  hint = '',
  propsValue = '',
  showBarcodeIcon = false,
  isNumberKeyBoard = false,
  isDisable = false,
  setInputData,
  defaultValue = '',
  control,
}) => {
  // const {
  //   field: {onChange, onBlur, value, ref},
  //   fieldState: {invalid, error},
  // } = useController({
  //   name,
  //   defaultValue,
  // });

  // const onChangeText = value => {
  //   onChange(value);
  //   setInputData(value);
  // };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.textInput}>
        {!isNumberKeyBoard ? (
          // <TextInput
          //   placeholder={hint}
          //   placeholderTextColor={BLACK_COLOR}
          //   multiline={false}
          //   editable={!isDisable}
          //   onChangeText={onChangeText}
          //   onBlur={onBlur}
          //   ref={ref}
          // />

          <Controller
            name={name}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder={hint}
                value={value}
                placeholderTextColor={BLACK_COLOR}
                multiline={false}
                editable={true}
                onChangeText={onChange}
                onBlur={onBlur}
                // ref={ref}
              />
            )}
          />
        ) : (
          <Controller
            name={name}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder={hint}
                value={value}
                keyboardType="numeric"
                placeholderTextColor={BLACK_COLOR}
                multiline={false}
                editable={true}
                onChangeText={onChange}
                onBlur={onBlur}
                // ref={ref}
              />
            )}
          />
        )}
        {/* <Text style={error ? styles.error : styles.invisible}>
          Vui lòng nhập đúng thông tin
        </Text> */}
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
    flexDirection: 'row',
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
  barcodeIcon: {},
  error: {
    color: 'red',
  },
  invisible: {
    display: 'none',
  },
  inputField: {},
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
