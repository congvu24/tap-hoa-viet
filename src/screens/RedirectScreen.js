import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

export function RedirectScreen({navigation}) {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to Add Product Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
