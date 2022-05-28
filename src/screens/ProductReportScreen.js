import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity,FlatList } from 'react-native'
import ProductsGroupItem from '../components/ProductsGroupItem'
import {firebase} from '@react-native-firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react'
import _ from 'lodash';
import DefaultImage from '../images/ic_inventory.png';
import {getProduct} from '../services/getProduct';



export default function ProductReportScree() {
  const [products, setProducts] = useState(null);
  const [numberOfInventories, setNumberOfInventories] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const handleProducts = data => setProducts(data);
  const handleInventories = data => setNumberOfInventories(data);
  const handleNumberOfProducts = data => setNumberOfProducts(data);

  const [filePath, setFilePath] = useState(
    Image.resolveAssetSource(DefaultImage).uri,
  );

  useEffect(() => {
    handleData();
  }, []);

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

  console.log(products);
  console.log("ton kho nè: ",numberOfInventories);
  console.log("khong biet là cai gi nè: ",numberOfProducts);
  console.log(
    _.chain(products)
      // Group the elements of Array based on `color` property
      .groupBy("_data.productGroup")
      // `key` is group's name (color), `value` is the array of objects
      .map((value, key) => ({ group: key, products: value }))
      .value()
  );
  return (
    <View style={styles.screenContainer}>
      <View style={styles.itemsContainer}>
        <View style={styles.extraSection}>
          <Text style={styles.numberText}>
            <Text style={styles.title}> Số lượng sản phẩm có trong kho: <Text style={styles.number}>{numberOfInventories}</Text></Text>
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
          data={products}
          renderItem={({item}) => {
            return <ProductsGroupItem
              imgSrc = {filePath}
              productGroup = {item._data.productGroup}
              numberOfInventories = {item._data.numberOfProducts}
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
    marginTop: 8,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 16,
    color: 'black',
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