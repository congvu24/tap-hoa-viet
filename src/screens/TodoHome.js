import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  TEXT_COLOR,
} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateTask} from '../redux/reducer/todo';

export default function TodoHome() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.todo.data);

  const handleChangeDone = data => {
    console.log(data);
    if (data.isDone == undefined || data.isDone === false) {
      dispatch(updateTask({...data, isDone: true}));
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
      <View>
        <ScrollView>
          {data.map(item => (
            <View style={styles.item} key={item.id}>
              <View
                style={item.isUrgent ? styles.itemTimeRed : styles.itemTime}>
                <Text style={styles.timeText}>
                  {new Date(item.endDate).toLocaleTimeString().slice(0, 5)}
                </Text>
                <Text style={styles.timeText}>AM</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.contentText}>{item.title}</Text>
                <Text style={styles.contentTextSmall}>{item.description}</Text>
              </View>
              <View style={styles.statusBtn}>
                <TouchableOpacity onPress={() => handleChangeDone(item)}>
                  <Icon
                    name={item.isDone ? 'checkcircle' : 'checkcircleo'}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigator.navigate('TodoCreate')}>
        <Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: GREEN_COLOR,
  },
  item: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: 'white',
    margin: 10,
    alignItems: 'center',
  },
  itemTime: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREEN_COLOR,
    borderRadius: 4,
    marginRight: 6,
  },
  itemTimeRed: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    borderRadius: 4,
    marginRight: 6,
  },
  timeText: {
    fontWeight: '600',
    color: 'white',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_COLOR,
  },
  contentTextSmall: {
    opacity: 0.8,
    fontWeight: '500',
  },
  statusBtn: {
    marginLeft: 'auto',
  },
  floatBtn: {
    position: 'absolute',
    backgroundColor: BLUE_COLOR,
    width: 50,
    height: 50,
    borderRadius: 50,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
