import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RedirectScreen({navigation}) {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Go to Register page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
