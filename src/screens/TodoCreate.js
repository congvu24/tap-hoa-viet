import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {GREEN_COLOR, TEXT_COLOR} from '../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/reducer/todo';
import {v4 as uuidv4} from 'uuid';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default function TodoCreate() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isUrgent, setUrgent] = useState(false);

  const handleSave = () => {
    if (title && description && startDate && endDate) {
      dispatch(
        addTask({
          id: Math.random() * 1000000,
          title: title,
          description: description,
          isUrgent: isUrgent,
          startDate: startDate?.toLocaleString(),
          endDate: endDate?.toLocaleString(),
          done: false,
        }),
      );
      navigator.goBack();
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Icon name="bars" size={20} color="white" />
        <Text style={{marginLeft: 20, color: 'white'}}>Task List</Text>
        <Icon
          name="bells"
          size={20}
          color="white"
          style={{marginLeft: 'auto', marginRight: 10}}
        />
        <Icon name="search1" color="white" size={20} />
      </View>
      <View style={styles.formWrap}>
        <ScrollView>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Add title"
            value={title}
            onChangeText={value => setTitle(value)}
          />

          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            numberOfLines={3}
            value={description}
            onChangeText={value => setDescription(value)}
          />

          <Text style={styles.title}>Due Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Start date"
            value={startDate?.toLocaleString()}
            onChangeText={value => setStartDate(value)}
          />

          <Text style={styles.title}>Set Task Priority</Text>
          <View style={styles.radioWrap}>
            <View style={styles.radio}>
              <CheckBox
                value={!isUrgent}
                boxType="circle"
                onChange={check => {
                  if (check) {
                    setUrgent(false);
                  }
                }}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radio}>
              <CheckBox
                value={isUrgent}
                boxType="circle"
                onChange={check => {
                  if (check) {
                    setUrgent(true);
                  }
                }}
              />
              <Text>Urgent</Text>
            </View>
          </View>

          <Text style={styles.title}>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="End date"
            value={startDate?.toLocaleString()}
            onChangeText={value => setEndDate(value)}
          />

          <Button title="Save" onPress={handleSave} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: GREEN_COLOR,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eeeeee',
    padding: 8,
    textAlignVertical: 'top',
    borderRadius: 4,
    marginBottom: 10,
  },
  formWrap: {
    padding: 10,
  },
  radioWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
