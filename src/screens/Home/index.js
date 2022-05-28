import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  WHITE_COLOR,
} from '../../constants/Colors';
import {DailyIncomeCard, SliderShortcut, WeeklyIncomeChart} from './components';
import auth from '@react-native-firebase/auth';
import {setOffset} from '../../redux/reducer/app';
import useScroll from '../../utils/useScroll';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const {ref, onScroll} = useScroll();

  const currentUser = user.name;

  return (
    <Animated.View
      style={{
        ...styles.rootContainer,
        ...{opacity: 1},
      }}
    >
      <ScrollView
        ref={ref}
        onScroll={onScroll}
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
    </Animated.View>
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
