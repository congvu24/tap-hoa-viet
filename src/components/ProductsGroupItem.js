import { StyleSheet, Text, View, Dimensions,SafeAreaView,TouchableOpacity,Image } from 'react-native'
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinerGradient from 'react-native-linear-gradient'

const width= Dimensions.get('window').width/2 - 20;


const ProductsGroupItem = ({
    reset = '',
    imgSrc = '',
    productGroup = '',
    numberOfInventories,
    categoryID = '',
  }) => {
  
  const navigation = useNavigation();
  const goToProductScreen = () => {
    navigation.navigate('Products',{categoryID})
    reset()
  }
  return (
    <TouchableOpacity
      onPress={goToProductScreen}
      activeOpacity={0.8}
      >
        <LinerGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors = {['#60cde5','#5dbeea','#1a90d0']} style={styles.card}>
          <View
            style={styles.imgContainer}>
            <Image
              source={{uri: imgSrc}}
              style={styles.image}
            />
          </View>

          <Text style={styles.textTitle}>
            {productGroup}
          </Text>
          <View
            style={styles.inventoryContainer}>
            <Text style={styles.textNumber}>
              {numberOfInventories}
            </Text>
            
          </View>
        </LinerGradient>
        
      </TouchableOpacity>
  );
};

export default ProductsGroupItem

const styles = StyleSheet.create({
    
    card: {
      height: 205,
      width,
      marginHorizontal: 10,
      borderRadius: 10,
      marginBottom: 40,
      padding: 15,
    },

    imgContainer: {
      height: 110,
      alignItems: 'center',
    },

    image: {
      width: 100,
      height: 100,
    },

    inventoryContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 15,
      borderRadius: 30,
      backgroundColor: '#2e6991',
      height: 60,
      width: 60,
    },
    
    textTitle: {
      fontWeight: '600',
      fontSize: 18, 
      marginTop: 10,
      color: '#fff',
      alignSelf: 'center',
    },

    textNumber: {
      fontSize: 18,
      fontWeight: '500',
      color: '#fff'
    }
})