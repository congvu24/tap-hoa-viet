import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RedirectScreen({navigation}) {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
