import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  GREEN_COLOR,
  SECONDARY_BG_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import {useSelector} from 'react-redux';

export default function LoadingModal({text = 'Loading'}) {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  const loading = useSelector(state => state.app.loading);

  if (!loading) {
    return null;
  }

  return (
    <SafeAreaView style={{...styles.wrap, width: width, height: height}}>
      <View
        style={{
          ...styles.body,
          top: height / 2 - 50,
          right: width / 2 - 100,
        }}>
        <ActivityIndicator size={30} color={GREEN_COLOR} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 9999999,
    backgroundColor: '#23232966',
    top: 0,
    left: 0,
  },
  body: {
    position: 'absolute',
    backgroundColor: SECONDARY_BG_COLOR,
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    color: WHITE_COLOR,
  },
});
