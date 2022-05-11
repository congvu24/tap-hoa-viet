import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {BACKGROUND_COLOR, TEXT_COLOR} from '../../constants/Colors';
import {DailyIncomeCard, SliderShortcut, WeeklyIncomeChart} from './components';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const currentUser = user.email;
  const income = 50000000;
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={[styles.text]}>Welcome back, {currentUser}</Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Text>Signout</Text>
          </TouchableOpacity>
          <View style={styles.dailyIncomeContainer}>
            <DailyIncomeCard income={income} />
          </View>

          <View style={styles.shortcutButtonsContainer}>
            <SliderShortcut />
          </View>

          <View style={styles.weeklyIncomeContainer}>
            <Text style={[styles.text]}>Doanh thu tháng này</Text>

            <View style={styles.monthlyIncomeChart}>
              <WeeklyIncomeChart />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  inner: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  dailyIncomeContainer: {
    marginTop: 10,
  },
  shortcutButtonsContainer: {
    marginTop: 20,
  },
  weeklyIncomeContainer: {
    marginTop: 20,
  },
  monthlyIncomeChart: {
    marginTop: 10,
  },
});
