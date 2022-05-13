import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  WHITE_COLOR,
} from '../../constants/Colors';
import {DailyIncomeCard, SliderShortcut, WeeklyIncomeChart} from './components';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const currentUser = user.name;
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.text]}>
            Welcome back{currentUser && `, ${currentUser}`}
          </Text>
          {/* <TouchableOpacity onPress={() => signOut()}>
            <Text>Signout</Text>
          </TouchableOpacity> */}
          <View style={styles.dailyIncomeContainer}>
            <DailyIncomeCard />
          </View>
        </View>
        <View style={styles.inner}>
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
    // backgroundColor: BACKGROUND_COLOR,
    paddingBottom: 80,
  },
  scrollViewContainer: {
    backgroundColor: PRIMARY_COLOR,
    flex: 1,
  },
  header: {
    height: 200,
    width: '100%',
    paddingTop: 30,
    paddingBottom: 20,

    alignItems: 'center',
  },
  dailyIncomeContainer: {
    width: '100%',
    marginVertical: 30,
  },
  inner: {
    marginTop: 50,
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    flex: 1,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  shortcutButtonsContainer: {
    marginTop: -100,
  },
  weeklyIncomeContainer: {
    marginTop: 10,
  },
  monthlyIncomeChart: {
    marginTop: 10,
  },
});
