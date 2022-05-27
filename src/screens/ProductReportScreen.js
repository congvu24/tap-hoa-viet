import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity,FlatList } from 'react-native'
import ProductsGroupItem from '../components/ProductsGroupItem'
import {firebase} from '@react-native-firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react'
import DefaultImage from '../images/ic_inventory.png';

const categories = ['Popular', 'Organic', 'Thời trang', 'Thể thao'];


export default function ProductReportScree() {
  const [filePath, setFilePath] = useState(
    Image.resolveAssetSource(DefaultImage).uri,
  );
  const handleData = () => {
    firebase.auth().onAuthStateChanged(user => {
      getProduct(
        user.uid,
        handleProducts,
        handleNumberOfProducts,
        handleInventories,
      );
    });
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.itemsContainer}>
        <View style={styles.extraSection}>
          <Text style={styles.numberText}>
            <Text> Số lượng sản phẩm có trong kho: <Text style={styles.number}>2576</Text></Text>
          </Text>
        </View>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={categories}
          renderItem={({item}) => {
            return <ProductsGroupItem
              imgSrc = {filePath}
              productGroup = {item}
              numberOfInventories = {3}
            />;
          }}
        />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  itemsContainer: {
    marginTop: 15,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },

  extraSection: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  numberText: {
    fontWeight: '600',
  },
  number: {
    color: '#4C9FDB',
  },
  
  // categoryContainer: {

  //   flexDirection: 'row',
  //   wrap: true,
  //   marginTop: 15,
  //   backgroundColor: 'white',
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   justifyContent: 'space-between',
  // },
   
    
    
});