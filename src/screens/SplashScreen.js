import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';

export default function Splash({text = 'Loading', callback = null}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLogged = false;

  useEffect(() => {
    if (callback) {
      callback(navigation);
    } else {
      setTimeout(() => {
        if (isLogged) {
          // dispatch(
          //   getCurrentProfile({
          //     data: null,
          //     onSuccess: () => navigation.replace('Home'),
          //   }),
          // );

          navigation.replace('Homepage');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.imageWrap}>
        <Image source={require('../images/shop.png')} style={styles.image} />
      </View>
      <ActivityIndicator color={PRIMARY_COLOR} size={30} />
      <Text style={styles.text}>{text}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  imageWrap: {
    height: 400,
    width: 150,
    margin: 'auto',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    color: PRIMARY_COLOR,
    marginTop: 10,
  },
});
