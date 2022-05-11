import {Text, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MATERIAL_GREY_COLOR} from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native';
const DateTimePickerWithTitle = ({title = ''}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setIsPickerShow(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      {!isPickerShow && (
        <TouchableOpacity style={styles.calendarPicker} onPress={showPicker}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      )}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default DateTimePickerWithTitle;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    marginStart: 30,
    color: 'black',
  },
  calendarPicker: {
    color: MATERIAL_GREY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    marginTop: 10,
    marginEnd: 20,
  },
});
